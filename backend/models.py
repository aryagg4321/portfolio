from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Portfolio Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    subtitle: str
    phone: str
    email: str
    linkedin: str
    location: str
    resume_file_name: Optional[str] = None

class Skills(BaseModel):
    programming: List[str]
    web_development: List[str]
    professional: List[str]
    domain_interests: List[str]
    tools: List[str]

class Education(BaseModel):
    degree: str
    institution: str
    expected_graduation: str
    coursework: List[str]

class Project(BaseModel):
    id: int
    title: str
    status: str
    description: str
    technologies: List[str]
    demo_available: bool = False
    demo_url: Optional[str] = None
    github_url: Optional[str] = None

class Certification(BaseModel):
    title: str
    provider: str
    status: str
    completion_date: Optional[datetime] = None

class Portfolio(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    personal: PersonalInfo
    summary: str
    skills: Skills
    education: Education
    projects: List[Project]
    certifications: List[Certification]
    achievements: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Contact Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"  # 'new', 'read', 'replied'
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# API Response Models
class APIResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[dict] = None

class ErrorResponse(BaseModel):
    message: str
    code: str

# Update Models for CRUD operations
class PortfolioUpdate(BaseModel):
    personal: Optional[PersonalInfo] = None
    summary: Optional[str] = None
    skills: Optional[Skills] = None
    education: Optional[Education] = None
    projects: Optional[List[Project]] = None
    certifications: Optional[List[Certification]] = None
    achievements: Optional[List[str]] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Analytics Models (for future use)
class VisitLog(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    visitor_ip: str
    user_agent: str
    page: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)