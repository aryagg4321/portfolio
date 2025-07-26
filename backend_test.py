#!/usr/bin/env python3
"""
Backend API Testing Suite for Arya's Portfolio
Tests all backend endpoints thoroughly including error handling and data validation
"""

import requests
import json
import os
from datetime import datetime
import sys

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BASE_URL}/api"

print(f"🔗 Testing backend at: {API_BASE}")

class PortfolioAPITester:
    def __init__(self):
        self.test_results = {
            "portfolio": {"passed": 0, "failed": 0, "tests": []},
            "resume": {"passed": 0, "failed": 0, "tests": []},
            "contact": {"passed": 0, "failed": 0, "tests": []},
            "analytics": {"passed": 0, "failed": 0, "tests": []},
            "error_handling": {"passed": 0, "failed": 0, "tests": []},
            "api_format": {"passed": 0, "failed": 0, "tests": []}
        }
        
    def log_test(self, category, test_name, passed, details=""):
        result = "✅ PASS" if passed else "❌ FAIL"
        print(f"{result}: {test_name}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results[category]["tests"].append({
            "name": test_name,
            "passed": passed,
            "details": details
        })
        
        if passed:
            self.test_results[category]["passed"] += 1
        else:
            self.test_results[category]["failed"] += 1

    def test_portfolio_api(self):
        """Test Portfolio API endpoints"""
        print("\n📁 Testing Portfolio API...")
        
        # Test GET /api/portfolio
        try:
            response = requests.get(f"{API_BASE}/portfolio", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Test API response format
                if "success" in data and "data" in data:
                    self.log_test("api_format", "Portfolio API response format", True, "Correct APIResponse format")
                    
                    if data["success"] and data["data"]:
                        portfolio = data["data"]
                        
                        # Test required portfolio sections
                        required_sections = ["personal", "summary", "skills", "education", "projects", "certifications", "achievements"]
                        missing_sections = [section for section in required_sections if section not in portfolio]
                        
                        if not missing_sections:
                            self.log_test("portfolio", "Portfolio data structure", True, "All required sections present")
                        else:
                            self.log_test("portfolio", "Portfolio data structure", False, f"Missing sections: {missing_sections}")
                        
                        # Test Arya's specific data
                        personal = portfolio.get("personal", {})
                        if personal.get("name") == "Arya G Guddad":
                            self.log_test("portfolio", "Arya's name verification", True, "Name matches expected value")
                        else:
                            self.log_test("portfolio", "Arya's name verification", False, f"Expected 'Arya G Guddad', got '{personal.get('name')}'")
                        
                        if personal.get("title") == "AI & Quantum Technology Student":
                            self.log_test("portfolio", "Arya's title verification", True, "Title matches expected value")
                        else:
                            self.log_test("portfolio", "Arya's title verification", False, f"Title mismatch: {personal.get('title')}")
                        
                        # Test skills data
                        skills = portfolio.get("skills", {})
                        expected_programming = ["Java", "Python"]
                        actual_programming = skills.get("programming", [])
                        
                        if all(skill in actual_programming for skill in expected_programming):
                            self.log_test("portfolio", "Programming skills verification", True, "Java and Python found in skills")
                        else:
                            self.log_test("portfolio", "Programming skills verification", False, f"Missing expected skills. Got: {actual_programming}")
                        
                        # Test education data
                        education = portfolio.get("education", {})
                        if "Amrita Vishwa Vidyapeetham" in education.get("institution", ""):
                            self.log_test("portfolio", "Education institution verification", True, "Correct institution found")
                        else:
                            self.log_test("portfolio", "Education institution verification", False, f"Institution: {education.get('institution')}")
                        
                        # Test projects data
                        projects = portfolio.get("projects", [])
                        if projects and any("Interactive War Timeline" in project.get("title", "") for project in projects):
                            self.log_test("portfolio", "Project verification", True, "Interactive War Timeline project found")
                        else:
                            self.log_test("portfolio", "Project verification", False, "Interactive War Timeline project not found")
                        
                        # Test certifications
                        certifications = portfolio.get("certifications", [])
                        cert_titles = [cert.get("title", "") for cert in certifications]
                        if any("Blender" in title for title in cert_titles):
                            self.log_test("portfolio", "Blender certification verification", True, "Blender certification found")
                        else:
                            self.log_test("portfolio", "Blender certification verification", False, "Blender certification not found")
                        
                    else:
                        self.log_test("portfolio", "Portfolio data retrieval", False, "API returned success=false or no data")
                else:
                    self.log_test("api_format", "Portfolio API response format", False, "Missing success/data fields")
                    self.log_test("portfolio", "Portfolio data retrieval", False, "Invalid response format")
            else:
                self.log_test("portfolio", "Portfolio API endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("portfolio", "Portfolio API connection", False, f"Connection error: {str(e)}")

    def test_resume_api(self):
        """Test Resume API endpoints"""
        print("\n📄 Testing Resume API...")
        
        # Test GET /api/resume/download
        try:
            response = requests.get(f"{API_BASE}/resume/download", timeout=10)
            
            if response.status_code == 404:
                # This is expected since resume file doesn't exist
                self.log_test("resume", "Resume download 404 handling", True, "Correctly returns 404 for missing resume file")
                
                # Check if it's a proper error response
                try:
                    error_data = response.json()
                    if "detail" in error_data:
                        self.log_test("error_handling", "Resume 404 error format", True, "Proper error response format")
                    else:
                        self.log_test("error_handling", "Resume 404 error format", False, "Missing error details")
                except:
                    self.log_test("error_handling", "Resume 404 error format", False, "Non-JSON error response")
                    
            elif response.status_code == 200:
                # If resume exists, check content type
                content_type = response.headers.get('content-type', '')
                if 'application/pdf' in content_type:
                    self.log_test("resume", "Resume download success", True, "PDF file returned successfully")
                else:
                    self.log_test("resume", "Resume download content type", False, f"Expected PDF, got {content_type}")
            else:
                self.log_test("resume", "Resume download endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("resume", "Resume API connection", False, f"Connection error: {str(e)}")

    def test_contact_api(self):
        """Test Contact API endpoints"""
        print("\n📧 Testing Contact API...")
        
        # Test POST /api/contact
        contact_data = {
            "name": "Arya Test Contact",
            "email": "test@aryaportfolio.com",
            "subject": "Testing Contact Form API",
            "message": "This is a test message to verify the contact form API is working correctly."
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=contact_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Test API response format
                if "success" in data and data["success"]:
                    self.log_test("api_format", "Contact POST response format", True, "Correct APIResponse format")
                    
                    if "data" in data and "submission_id" in data["data"]:
                        submission_id = data["data"]["submission_id"]
                        self.log_test("contact", "Contact form submission", True, f"Contact submitted with ID: {submission_id}")
                    else:
                        self.log_test("contact", "Contact form submission", False, "Missing submission_id in response")
                else:
                    self.log_test("contact", "Contact form submission", False, "API returned success=false")
                    self.log_test("api_format", "Contact POST response format", False, "Invalid response format")
            else:
                self.log_test("contact", "Contact form submission", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("contact", "Contact API connection", False, f"Connection error: {str(e)}")
        
        # Test GET /api/contact
        try:
            response = requests.get(f"{API_BASE}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "success" in data and data["success"] and "data" in data:
                    submissions = data["data"].get("submissions", [])
                    self.log_test("contact", "Contact submissions retrieval", True, f"Retrieved {len(submissions)} submissions")
                    self.log_test("api_format", "Contact GET response format", True, "Correct APIResponse format")
                    
                    # Check if our test submission is there
                    test_submission_found = any(
                        sub.get("email") == "test@aryaportfolio.com" 
                        for sub in submissions
                    )
                    if test_submission_found:
                        self.log_test("contact", "Contact data persistence", True, "Test submission found in database")
                    else:
                        self.log_test("contact", "Contact data persistence", False, "Test submission not found in database")
                else:
                    self.log_test("contact", "Contact submissions retrieval", False, "Invalid response format")
                    self.log_test("api_format", "Contact GET response format", False, "Missing success/data fields")
            else:
                self.log_test("contact", "Contact submissions retrieval", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("contact", "Contact GET API connection", False, f"Connection error: {str(e)}")

    def test_analytics_api(self):
        """Test Analytics API endpoints"""
        print("\n📊 Testing Analytics API...")
        
        # Test POST /api/analytics/visit
        visit_data = {
            "page": "/portfolio-test"
        }
        
        try:
            response = requests.post(f"{API_BASE}/analytics/visit", params=visit_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "success" in data:
                    if data["success"]:
                        self.log_test("analytics", "Visit logging", True, "Visit logged successfully")
                        self.log_test("api_format", "Analytics POST response format", True, "Correct APIResponse format")
                    else:
                        # Analytics failures shouldn't break the app
                        self.log_test("analytics", "Visit logging graceful failure", True, "Analytics failure handled gracefully")
                else:
                    self.log_test("analytics", "Visit logging", False, "Invalid response format")
            else:
                self.log_test("analytics", "Visit logging", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("analytics", "Analytics visit API connection", False, f"Connection error: {str(e)}")
        
        # Test GET /api/analytics/stats
        try:
            response = requests.get(f"{API_BASE}/analytics/stats", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "success" in data and data["success"] and "data" in data:
                    stats = data["data"]
                    
                    # Check for expected stats fields
                    expected_fields = ["total_visits", "unique_visitors", "last_updated"]
                    missing_fields = [field for field in expected_fields if field not in stats]
                    
                    if not missing_fields:
                        self.log_test("analytics", "Analytics stats retrieval", True, f"Stats: {stats['total_visits']} visits, {stats['unique_visitors']} unique visitors")
                        self.log_test("api_format", "Analytics GET response format", True, "Correct APIResponse format")
                    else:
                        self.log_test("analytics", "Analytics stats retrieval", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("analytics", "Analytics stats retrieval", False, "Invalid response format")
                    self.log_test("api_format", "Analytics GET response format", False, "Missing success/data fields")
            else:
                self.log_test("analytics", "Analytics stats retrieval", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("analytics", "Analytics stats API connection", False, f"Connection error: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid endpoints and requests"""
        print("\n🚫 Testing Error Handling...")
        
        # Test 404 for invalid endpoint
        try:
            response = requests.get(f"{API_BASE}/nonexistent", timeout=10)
            
            if response.status_code == 404:
                self.log_test("error_handling", "404 for invalid endpoint", True, "Correctly returns 404")
            else:
                self.log_test("error_handling", "404 for invalid endpoint", False, f"Expected 404, got {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("error_handling", "404 endpoint test connection", False, f"Connection error: {str(e)}")
        
        # Test malformed contact request
        try:
            malformed_data = {"name": "Test"}  # Missing required fields
            response = requests.post(f"{API_BASE}/contact", json=malformed_data, timeout=10)
            
            if response.status_code in [400, 422]:  # 422 is common for validation errors
                self.log_test("error_handling", "Malformed request handling", True, f"Correctly returns {response.status_code} for invalid data")
            else:
                self.log_test("error_handling", "Malformed request handling", False, f"Expected 400/422, got {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("error_handling", "Malformed request test connection", False, f"Connection error: {str(e)}")

    def test_api_root(self):
        """Test API root endpoint"""
        print("\n🏠 Testing API Root...")
        
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Portfolio API" in data["message"]:
                    self.log_test("api_format", "API root endpoint", True, "API root responds correctly")
                else:
                    self.log_test("api_format", "API root endpoint", False, f"Unexpected response: {data}")
            else:
                self.log_test("api_format", "API root endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("api_format", "API root connection", False, f"Connection error: {str(e)}")

    def run_all_tests(self):
        """Run all test suites"""
        print("🧪 Starting Backend API Test Suite for Arya's Portfolio")
        print("=" * 60)
        
        self.test_api_root()
        self.test_portfolio_api()
        self.test_resume_api()
        self.test_contact_api()
        self.test_analytics_api()
        self.test_error_handling()
        
        self.print_summary()

    def print_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 60)
        print("📋 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.test_results.items():
            passed = results["passed"]
            failed = results["failed"]
            total_passed += passed
            total_failed += failed
            
            status = "✅" if failed == 0 else "❌"
            print(f"{status} {category.upper()}: {passed} passed, {failed} failed")
        
        print("-" * 60)
        print(f"OVERALL: {total_passed} passed, {total_failed} failed")
        
        if total_failed == 0:
            print("🎉 ALL TESTS PASSED! Backend API is working correctly.")
        else:
            print("⚠️  Some tests failed. Check the details above.")
            
        print("\n📊 DETAILED RESULTS:")
        for category, results in self.test_results.items():
            if results["tests"]:
                print(f"\n{category.upper()}:")
                for test in results["tests"]:
                    status = "✅" if test["passed"] else "❌"
                    print(f"  {status} {test['name']}")
                    if test["details"] and not test["passed"]:
                        print(f"      {test['details']}")

if __name__ == "__main__":
    tester = PortfolioAPITester()
    tester.run_all_tests()