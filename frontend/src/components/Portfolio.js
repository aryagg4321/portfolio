import React, { useState } from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail, Phone, MapPin, ChevronRight, Code, Brain, Shield, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import Spline from '@splinetool/react-spline';
import portfolioData from '../mock';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResumeDownload = () => {
    setIsLoading(true);
    // Mock download - will be replaced with actual API call
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = portfolioData.personal.resumeUrl;
      link.download = 'Arya_G_Guddad_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-red-500/20 z-50">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-red-500 font-mono">
              {portfolioData.personal.name.split(' ').map(name => name[0]).join('')}
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-400 hover:text-red-500 transition-colors">About</a>
              <a href="#skills" className="text-gray-400 hover:text-red-500 transition-colors">Skills</a>
              <a href="#education" className="text-gray-400 hover:text-red-500 transition-colors">Education</a>
              <a href="#projects" className="text-gray-400 hover:text-red-500 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-red-500 font-mono text-lg">Hi, I'm</div>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  {portfolioData.personal.name}
                </h1>
                <h2 className="text-3xl text-gray-300 font-light">
                  {portfolioData.personal.title}
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                  {portfolioData.personal.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-black font-bold px-8 py-6 text-lg border-0 rounded-none"
                  onClick={handleResumeDownload}
                  disabled={isLoading}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {isLoading ? 'Downloading...' : 'Download Resume'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-black px-8 py-6 text-lg rounded-none"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-gray-400">
                <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-red-500 transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
                <a href={`https://${portfolioData.personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-red-500 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* 3D Spline Component */}
            <div className="hidden lg:block">
              <div className="w-full h-[600px] relative overflow-visible">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg"></div>
                <Spline 
                  scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>

            {/* Mobile Alternative - Animated Gradient */}
            <div className="lg:hidden flex items-center justify-center h-[400px] relative overflow-hidden">
              <div className="w-64 h-64 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute w-48 h-48 bg-gradient-to-l from-red-600/30 to-red-400/30 rounded-full blur-lg animate-ping"></div>
              <div className="absolute w-32 h-32 bg-red-500/40 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              About <span className="text-red-500">Me</span>
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <Card className="bg-black border-red-500/20 hover:border-red-500/40 transition-colors">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">AI Enthusiast</h3>
                  <p className="text-gray-400">Passionate about artificial intelligence and quantum technology applications</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-red-500/20 hover:border-red-500/40 transition-colors">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Defense Tech</h3>
                  <p className="text-gray-400">Focused on cybersecurity and autonomous defense systems</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-red-500/20 hover:border-red-500/40 transition-colors">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Geopolitics</h3>
                  <p className="text-gray-400">Analytical interest in intelligence strategy and global dynamics</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {portfolioData.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Technical <span className="text-red-500">Arsenal</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.programming.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">Web Development</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.webDevelopment.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">Professional Skills</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.professional.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">Domain Interests</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.domainInterests.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-red-500">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.tools.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-red-500/30 text-white hover:bg-red-500/10">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-900/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Academic <span className="text-red-500">Journey</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black border-red-500/20 hover:border-red-500/40 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{portfolioData.education.degree}</h3>
                    <p className="text-xl text-red-500 mb-2">{portfolioData.education.institution}</p>
                    <p className="text-gray-400">Expected Graduation: {portfolioData.education.expectedGraduation}</p>
                  </div>
                  <Code className="h-12 w-12 text-red-500" />
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4">Relevant Coursework</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {portfolioData.education.coursework.map((course, index) => (
                      <div key={index} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-red-500 mr-2" />
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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Let's <span className="text-red-500">Connect</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 mb-8">
              Ready to collaborate on cutting-edge defense technology or discuss the future of AI? Let's build something extraordinary together.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a href={`tel:${portfolioData.personal.phone}`} className="flex items-center justify-center p-4 border border-red-500/20 hover:border-red-500/40 transition-colors">
                <Phone className="h-6 w-6 text-red-500 mr-3" />
                <span className="text-gray-300">{portfolioData.personal.phone}</span>
              </a>
              
              <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center justify-center p-4 border border-red-500/20 hover:border-red-500/40 transition-colors">
                <Mail className="h-6 w-6 text-red-500 mr-3" />
                <span className="text-gray-300">{portfolioData.personal.email}</span>
              </a>
              
              <div className="flex items-center justify-center p-4 border border-red-500/20">
                <MapPin className="h-6 w-6 text-red-500 mr-3" />
                <span className="text-gray-300">{portfolioData.personal.location}</span>
              </div>
            </div>

            <Button 
              className="bg-red-500 hover:bg-red-600 text-black font-bold px-12 py-6 text-lg border-0 rounded-none"
              onClick={() => window.location.href = `mailto:${portfolioData.personal.email}`}
            >
              Send Message
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/40 py-8 border-t border-red-500/20">
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