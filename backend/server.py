from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
import shutil
import mimetypes

from models import Portfolio, ContactSubmissionCreate, APIResponse, ErrorResponse
from portfolio_service import PortfolioService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize portfolio service
portfolio_service = PortfolioService(db)

# Create the main app without a prefix
app = FastAPI(title="Arya's Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Create uploads directory if it doesn't exist
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize portfolio data on startup"""
    try:
        await portfolio_service.initialize_portfolio_data()
        logger.info("Portfolio data initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize portfolio data: {e}")

# Portfolio endpoints
@api_router.get("/")
async def root():
    return {"message": "Arya's Portfolio API is running!"}

@api_router.get("/portfolio")
async def get_portfolio():
    """Get portfolio data"""
    try:
        portfolio = await portfolio_service.get_portfolio()
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        return APIResponse(success=True, data=portfolio)
    except Exception as e:
        logger.error(f"Error fetching portfolio: {e}")
        raise HTTPException(
            status_code=500, 
            detail=ErrorResponse(message="Failed to fetch portfolio", code="FETCH_ERROR").dict()
        )

@api_router.put("/portfolio")
async def update_portfolio(portfolio_update: dict):
    """Update portfolio data (admin only)"""
    try:
        success = await portfolio_service.update_portfolio(portfolio_update)
        if not success:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        return APIResponse(success=True, data={"message": "Portfolio updated successfully"})
    except Exception as e:
        logger.error(f"Error updating portfolio: {e}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(message="Failed to update portfolio", code="UPDATE_ERROR").dict()
        )

# Resume endpoints
@api_router.get("/resume/download")
async def download_resume():
    """Download resume PDF"""
    try:
        portfolio = await portfolio_service.get_portfolio()
        if not portfolio or not portfolio.get("personal", {}).get("resume_file_name"):
            raise HTTPException(status_code=404, detail="Resume not found")
        
        resume_filename = portfolio["personal"]["resume_file_name"]
        resume_path = UPLOAD_DIR / resume_filename
        
        if not resume_path.exists():
            # Return a placeholder response for now
            raise HTTPException(status_code=404, detail="Resume file not found on server")
        
        return FileResponse(
            path=resume_path,
            filename=resume_filename,
            media_type='application/pdf'
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading resume: {e}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(message="Failed to download resume", code="DOWNLOAD_ERROR").dict()
        )

@api_router.post("/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    """Upload new resume PDF (admin only)"""
    try:
        # Validate file type
        if file.content_type != 'application/pdf':
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Save file
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Update portfolio with new resume filename
        await portfolio_service.update_portfolio({
            "personal.resume_file_name": file.filename
        })
        
        return APIResponse(
            success=True, 
            data={"message": f"Resume {file.filename} uploaded successfully"}
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading resume: {e}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(message="Failed to upload resume", code="UPLOAD_ERROR").dict()
        )

# Contact endpoints
@api_router.post("/contact")
async def submit_contact(contact_data: ContactSubmissionCreate):
    """Submit contact form"""
    try:
        submission = await portfolio_service.submit_contact(contact_data.dict())
        return APIResponse(
            success=True, 
            data={
                "message": "Contact form submitted successfully",
                "submission_id": submission.id
            }
        )
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(message="Failed to submit contact form", code="CONTACT_ERROR").dict()
        )

@api_router.get("/contact")
async def get_contact_submissions():
    """Get all contact submissions (admin only)"""
    try:
        submissions = await portfolio_service.get_contact_submissions()
        return APIResponse(success=True, data={"submissions": submissions})
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {e}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(message="Failed to fetch contact submissions", code="FETCH_ERROR").dict()
        )

# Analytics endpoints
@api_router.post("/analytics/visit")
async def log_visit(request: Request, page: str = "/"):
    """Track page visits"""
    try:
        visitor_ip = request.client.host
        user_agent = request.headers.get("user-agent", "Unknown")
        
        await portfolio_service.log_visit(visitor_ip, user_agent, page)
        return APIResponse(success=True, data={"message": "Visit logged"})
    except Exception as e:
        logger.error(f"Error logging visit: {e}")
        # Don't raise error for analytics - just log it
        return APIResponse(success=False, error={"message": "Failed to log visit", "code": "ANALYTICS_ERROR"})

@api_router.get("/analytics/stats")
async def get_analytics():
    """Get visit statistics"""
    try:
        stats = await portfolio_service.get_visit_stats()
        return APIResponse(success=True, data=stats)
    except Exception as e:
        logger.error(f"Error fetching analytics: {e}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(message="Failed to fetch analytics", code="ANALYTICS_ERROR").dict()
        )

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)