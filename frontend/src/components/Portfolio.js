import React, { useState } from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail, Phone, MapPin, ChevronRight, Code, Brain, Shield, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import ParticleBackground from './ParticleBackground';
import NeonGrid from './NeonGrid';
import DefenseAnimations from './DefenseAnimations';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import usePortfolio from '../hooks/usePortfolio';
import { resumeAPI } from '../services/api';

const Portfolio = () => {
  const { portfolioData, loading, error, refetchPortfolio } = usePortfolio();
  const [resumeDownloading, setResumeDownloading] = useState(false);

  const handleResumeDownload = async () => {
    try {
      setResumeDownloading(true);
      await resumeAPI.downloadResume();
    } catch (error) {
      console.error('Resume download failed:', error);
      // You could show a toast notification here
      alert('Resume download failed. Please try again later.');
    } finally {
      setResumeDownloading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <NeonGrid />
        <div className="content-layer">
          <LoadingSpinner size="large" message="Initializing quantum matrix..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <NeonGrid />
        <div className="content-layer">
          <ErrorMessage 
            message={error} 
            onRetry={refetchPortfolio}
            showRetry={true}
          />
        </div>
      </div>
    );
  }

  // Show portfolio if data is loaded
  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <NeonGrid />
        <div className="content-layer">
          <ErrorMessage 
            message="Portfolio data not found" 
            onRetry={refetchPortfolio}
            showRetry={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <NeonGrid />
      
      {/* Fixed Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-red-500/20 z-50 content-layer">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-red-500 font-mono neon-glow glitch-effect">
              {portfolioData.personal.name.split(' ').map(name => name[0]).join('')}
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:neon-glow">About</a>
              <a href="#skills" className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:neon-glow">Skills</a>
              <a href="#education" className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:neon-glow">Education</a>
              <a href="#projects" className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:neon-glow">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:neon-glow">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 content-layer cyber-grid">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 slide-in-up">
              <div className="space-y-4">
                <div className="text-red-500 font-mono text-lg animate-pulse">Hi, I'm</div>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight gradient-text">
                  {portfolioData.personal.name}
                </h1>
                <h2 className="text-3xl text-gray-300 font-light neon-glow">
                  {portfolioData.personal.title}
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                  {portfolioData.personal.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-black font-bold px-8 py-6 text-lg border-0 rounded-none btn-cyber pulse-glow"
                  onClick={handleResumeDownload}
                  disabled={resumeDownloading}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {resumeDownloading ? 'Downloading...' : 'Download Resume'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-black px-8 py-6 text-lg rounded-none btn-cyber"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-gray-400">
                <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-red-500 transition-all duration-300 hover:neon-glow">
                  <Mail className="h-6 w-6" />
                </a>
                <a href={`https://${portfolioData.personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-all duration-300 hover:neon-glow">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-red-500 transition-all duration-300 hover:neon-glow">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Defense Animations Component - Replaces Spline */}
            <div className="hidden lg:block">
              <DefenseAnimations />
            </div>

            {/* Mobile Alternative - Enhanced Animated Gradient */}
            <div className="lg:hidden flex items-center justify-center h-[400px] relative overflow-hidden">
              <div className="w-64 h-64 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full blur-xl animate-pulse pulse-glow"></div>
              <div className="absolute w-48 h-48 bg-gradient-to-l from-red-600/30 to-red-400/30 rounded-full blur-lg animate-ping"></div>
              <div className="absolute w-32 h-32 bg-red-500/40 rounded-full blur-md neon-glow"></div>
              <div className="absolute w-16 h-16 bg-red-400/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/20 backdrop-blur-sm content-layer circuit-pattern">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">
              About <span className="text-red-500 neon-glow">Me</span>
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <Card className="bg-black/60 border-red-500/20 hover:border-red-500/40 transition-all duration-300 cyber-border backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-red-500 mx-auto mb-4 neon-glow" />
                  <h3 className="text-xl font-bold mb-2">AI Enthusiast</h3>
                  <p className="text-gray-400">Passionate about artificial intelligence and quantum technology applications</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/60 border-red-500/20 hover:border-red-500/40 transition-all duration-300 cyber-border backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-red-500 mx-auto mb-4 neon-glow" />
                  <h3 className="text-xl font-bold mb-2">Defense Tech</h3>
                  <p className="text-gray-400">Focused on cybersecurity and autonomous defense systems</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/60 border-red-500/20 hover:border-red-500/40 transition-all duration-300 cyber-border backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-red-500 mx-auto mb-4 neon-glow" />
                  <h3 className="text-xl font-bold mb-2">Geopolitics</h3>
                  <p className="text-gray-400">Analytical interest in intelligence strategy and global dynamics</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto fade-in">
                {portfolioData.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 content-layer">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">
            Technical <span className="text-red-500 neon-glow">Arsenal</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="cyber-border bg-black/40 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-500 neon-glow">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.programming.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10 hover:neon-glow transition-all duration-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="cyber-border bg-black/40 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-500 neon-glow">Web Development</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.web_development.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10 hover:neon-glow transition-all duration-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="cyber-border bg-black/40 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-500 neon-glow">Professional Skills</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.professional.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10 hover:neon-glow transition-all duration-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="cyber-border bg-black/40 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-500 neon-glow">Domain Interests</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.domain_interests.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10 hover:neon-glow transition-all duration-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2 cyber-border bg-black/40 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-red-500 neon-glow">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.tools.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10 hover:neon-glow transition-all duration-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-black/20 backdrop-blur-sm content-layer circuit-pattern">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">
            Academic <span className="text-red-500 neon-glow">Journey</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/60 border-red-500/20 hover:border-red-500/40 transition-all duration-300 cyber-border backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 gradient-text">{portfolioData.education.degree}</h3>
                    <p className="text-xl text-red-500 mb-2 neon-glow">{portfolioData.education.institution}</p>
                    <p className="text-gray-400">Expected Graduation: {portfolioData.education.expected_graduation}</p>
                  </div>
                  <Code className="h-12 w-12 text-red-500 neon-glow pulse-glow" />
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4 text-red-500">Relevant Coursework</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {portfolioData.education.coursework.map((course, index) => (
                      <div key={index} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-red-500 mr-2 neon-glow" />
                        <span className="text-gray-300">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 content-layer">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">
            Current <span className="text-red-500 neon-glow">Projects</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {portfolioData.projects.map((project) => (
              <Card key={project.id} className="bg-black/60 border-red-500/20 hover:border-red-500/40 transition-all duration-300 mb-8 cyber-border backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 gradient-text">{project.title}</h3>
                      <Badge variant="outline" className="border-red-500 text-red-500 neon-glow">
                        {project.status}
                      </Badge>
                    </div>
                    <Code className="h-12 w-12 text-red-500 neon-glow pulse-glow" />
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 text-red-500">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10 hover:neon-glow transition-all duration-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    {project.demo_available ? (
                      <Button className="bg-red-500 hover:bg-red-600 text-black font-bold border-0 rounded-none btn-cyber">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    ) : (
                      <Button disabled className="bg-gray-700 text-gray-400 font-bold border-0 rounded-none cursor-not-allowed">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo Coming Soon
                      </Button>
                    )}
                    
                    <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-none btn-cyber">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Certifications */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
                Active <span className="text-red-500 neon-glow">Certifications</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.certifications.map((cert, index) => (
                  <Card key={index} className="bg-black/60 border-red-500/20 hover:border-red-500/40 transition-all duration-300 cyber-border backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2 gradient-text">{cert.title}</h4>
                      <p className="text-red-500 mb-2 neon-glow">{cert.provider}</p>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500 animate-pulse">
                        {cert.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 content-layer">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 gradient-text">
            Let's <span className="text-red-500 neon-glow">Connect</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 mb-8 fade-in">
              Ready to collaborate on cutting-edge defense technology or discuss the future of AI? Let's build something extraordinary together.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a href={`tel:${portfolioData.personal.phone}`} className="flex items-center justify-center p-4 cyber-border bg-black/40 hover:border-red-500/40 transition-all duration-300 backdrop-blur-sm">
                <Phone className="h-6 w-6 text-red-500 mr-3 neon-glow" />
                <span className="text-gray-300">{portfolioData.personal.phone}</span>
              </a>
              
              <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center justify-center p-4 cyber-border bg-black/40 hover:border-red-500/40 transition-all duration-300 backdrop-blur-sm">
                <Mail className="h-6 w-6 text-red-500 mr-3 neon-glow" />
                <span className="text-gray-300">{portfolioData.personal.email}</span>
              </a>
              
              <div className="flex items-center justify-center p-4 cyber-border bg-black/40 backdrop-blur-sm">
                <MapPin className="h-6 w-6 text-red-500 mr-3 neon-glow" />
                <span className="text-gray-300">{portfolioData.personal.location}</span>
              </div>
            </div>

            <Button 
              className="bg-red-500 hover:bg-red-600 text-black font-bold px-12 py-6 text-lg border-0 rounded-none btn-cyber pulse-glow"
              onClick={() => window.location.href = `mailto:${portfolioData.personal.email}`}
            >
              Send Message
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 py-8 border-t border-red-500/20 content-layer backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 {portfolioData.personal.name}. Crafted with precision for the future of defense technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;