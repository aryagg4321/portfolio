# Portfolio Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for Arya's futuristic portfolio website.

## Current Mock Data (frontend/src/mock.js)
- **Personal Information**: Name, contact details, resume URL
- **Professional Summary**: Bio and career objectives  
- **Skills**: Programming languages, web development, professional skills, domain interests, tools
- **Education**: Degree details, institution, coursework
- **Projects**: Current project (Interactive War Timeline Website)
- **Certifications**: In-progress Udemy courses
- **Achievements**: Academic and professional milestones

## Backend Implementation Plan

### 1. Database Models

#### Portfolio Model
```javascript
{
  _id: ObjectId,
  personal: {
    name: String,
    title: String,
    subtitle: String,
    phone: String,
    email: String,
    linkedin: String,
    location: String,
    resumeFileName: String
  },
  summary: String,
  skills: {
    programming: [String],
    webDevelopment: [String],
    professional: [String],
    domainInterests: [String],
    tools: [String]
  },
  education: {
    degree: String,
    institution: String,
    expectedGraduation: String,
    coursework: [String]
  },
  projects: [{
    id: Number,
    title: String,
    status: String,
    description: String,
    technologies: [String],
    demoAvailable: Boolean,
    demoUrl: String,
    githubUrl: String
  }],
  certifications: [{
    title: String,
    provider: String,
    status: String,
    completionDate: Date
  }],
  achievements: [String],
  createdAt: Date,
  updatedAt: Date
}
```

#### Contact Model (for contact form submissions)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String, // 'new', 'read', 'replied'
  createdAt: Date
}
```

### 2. API Endpoints

#### Portfolio Endpoints
- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio` - Update portfolio data (admin only)

#### Resume Endpoints  
- `GET /api/resume/download` - Download resume PDF
- `POST /api/resume/upload` - Upload new resume (admin only)

#### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (admin only)

#### Analytics Endpoints (Optional)
- `POST /api/analytics/visit` - Track page visits
- `GET /api/analytics/stats` - Get visit statistics

### 3. File Storage
- Resume PDF will be stored in `/app/backend/uploads/` directory
- Implement file upload functionality for resume management

### 4. Frontend Integration Changes

#### Remove Mock Data
- Replace `import portfolioData from '../mock'` with API calls
- Add loading states for data fetching
- Add error handling for API failures

#### API Integration Points
1. **Portfolio.js**: 
   - `useEffect` to fetch portfolio data on component mount
   - Replace `portfolioData` with state from API response

2. **Resume Download**:
   - Replace mock download with actual API call to `/api/resume/download`
   - Handle file download with proper content-type headers

3. **Contact Form** (if added):
   - Add contact form functionality
   - Submit to `/api/contact` endpoint

### 5. Environment Variables
```bash
# Already exists in backend/.env
MONGO_URL=mongodb://localhost:27017/portfolio_db
DB_NAME=portfolio_db

# New additions needed
RESUME_UPLOAD_PATH=/app/backend/uploads
MAX_FILE_SIZE=5242880  # 5MB
```

### 6. Error Handling
- API endpoints return consistent error format:
```javascript
{
  success: false,
  error: {
    message: "Error description",
    code: "ERROR_CODE"
  }
}
```

### 7. Success Response Format
```javascript
{
  success: true,
  data: { /* response data */ }
}
```

## Integration Steps

1. **Create MongoDB models and sample data**
2. **Implement portfolio API endpoints**  
3. **Add resume upload/download functionality**
4. **Create contact form API**
5. **Update frontend to use APIs instead of mock data**
6. **Add proper loading states and error handling**
7. **Test all integrations**

## Notes
- Keep all existing UI/UX and visual effects intact
- Maintain the futuristic design and particle animations
- Ensure mobile responsiveness is preserved
- Add loading spinners that match the neon red theme
- Implement proper error messages with cyberpunk styling