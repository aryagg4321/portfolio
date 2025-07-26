from motor.motor_asyncio import AsyncIOMotorClient
from models import Portfolio, ContactSubmission, VisitLog
from datetime import datetime
import os

class PortfolioService:
    def __init__(self, db):
        self.db = db
        self.portfolio_collection = db.portfolio
        self.contact_collection = db.contact_submissions
        self.visits_collection = db.visits

    async def initialize_portfolio_data(self):
        """Initialize portfolio with Arya's data if not exists"""
        existing = await self.portfolio_collection.find_one()
        if not existing:
            portfolio_data = {
                "id": "arya-portfolio-001",
                "personal": {
                    "name": "Arya G Guddad",
                    "title": "AI & Quantum Technology Student",
                    "subtitle": "Defense Tech Enthusiast | Cybersecurity Researcher | Future Innovation Leader",
                    "phone": "+91 81380 24979",
                    "email": "aryagg4321@gmail.com",
                    "linkedin": "linkedin.com/in/arya-g-guddad-85892a36b",
                    "location": "Coimbatore, Tamil Nadu",
                    "resume_file_name": "Arya_G_Guddad_Resume.pdf"
                },
                "summary": "First-year B.Tech student specializing in Artificial Intelligence and Quantum Technology at Amrita Vishwa Vidyapeetham. Passionate about applying AI in defense, cybersecurity, and autonomous systems. Strong foundation in programming and web development, with a keen analytical interest in geopolitical dynamics and intelligence strategy. A motivated team player, aspiring to contribute to national security through research and innovation in next-gen defense technology.",
                "skills": {
                    "programming": ["Java", "Python"],
                    "web_development": ["HTML", "CSS", "JavaScript", "Git"],
                    "professional": ["Leadership", "Team Collaboration", "Public Speaking"],
                    "domain_interests": ["Geopolitics", "Cybersecurity", "Autonomous Defense Systems", "Intelligence Analysis"],
                    "tools": ["VS Code", "GitHub", "Scratch", "Blender", "Linux (basic)", "OpenCV (familiar)"]
                },
                "education": {
                    "degree": "B.Tech in Artificial Intelligence & Quantum Technology",
                    "institution": "Amrita Vishwa Vidyapeetham, Coimbatore",
                    "expected_graduation": "2029",
                    "coursework": [
                        "Introduction to AI",
                        "Data Structures",
                        "Linear Algebra",
                        "Quantum Computing Basics"
                    ]
                },
                "projects": [
                    {
                        "id": 1,
                        "title": "Interactive War Timeline Website",
                        "status": "In Progress",
                        "description": "Collaboratively developing a web platform that visualizes major wars in history through an interactive timeline. Responsible for UI design, data organization, and front-end implementation using modern web tools.",
                        "technologies": ["HTML", "CSS", "JavaScript", "UI/UX Design"],
                        "demo_available": False,
                        "demo_url": None,
                        "github_url": None
                    }
                ],
                "certifications": [
                    {
                        "title": "Creating 3D Environments in Blender",
                        "provider": "Udemy",
                        "status": "In Progress",
                        "completion_date": None
                    },
                    {
                        "title": "Web Stack Development",
                        "provider": "Udemy",
                        "status": "In Progress",
                        "completion_date": None
                    }
                ],
                "achievements": [
                    "First-year student in prestigious AI & Quantum Technology program",
                    "Active contributor to collaborative web development projects",
                    "Passionate researcher in defense technology applications",
                    "Strong analytical skills in geopolitical intelligence"
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            await self.portfolio_collection.insert_one(portfolio_data)
            return portfolio_data
        return existing

    async def get_portfolio(self):
        """Get portfolio data"""
        portfolio = await self.portfolio_collection.find_one()
        if portfolio:
            # Remove MongoDB _id for JSON serialization
            portfolio.pop('_id', None)
        return portfolio

    async def update_portfolio(self, update_data: dict):
        """Update portfolio data"""
        update_data["updated_at"] = datetime.utcnow()
        result = await self.portfolio_collection.update_one(
            {},  # Update the first (and only) document
            {"$set": update_data}
        )
        return result.modified_count > 0

    async def submit_contact(self, contact_data: dict):
        """Submit contact form"""
        contact_submission = ContactSubmission(**contact_data)
        result = await self.contact_collection.insert_one(contact_submission.dict())
        return contact_submission

    async def get_contact_submissions(self):
        """Get all contact submissions"""
        submissions = await self.contact_collection.find().to_list(1000)
        for submission in submissions:
            submission.pop('_id', None)
        return submissions

    async def log_visit(self, visitor_ip: str, user_agent: str, page: str):
        """Log website visit"""
        visit = VisitLog(
            visitor_ip=visitor_ip,
            user_agent=user_agent,
            page=page
        )
        await self.visits_collection.insert_one(visit.dict())

    async def get_visit_stats(self):
        """Get visit statistics"""
        total_visits = await self.visits_collection.count_documents({})
        unique_visitors = len(await self.visits_collection.distinct("visitor_ip"))
        
        return {
            "total_visits": total_visits,
            "unique_visitors": unique_visitors,
            "last_updated": datetime.utcnow()
        }