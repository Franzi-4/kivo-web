
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X, CircleDot, Calendar, Sun, Moon, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Link, useLocation } from 'react-router-dom';
import { TubelightNavBar } from '@/components/ui/tubelight-navbar';

const Header = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState('features');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
  
  // Get current active page based on location
  const getCurrentPage = () => {
    if (location.pathname === '/') return 'features';
    if (location.pathname === '/book-demo') return 'book-demo';
    if (location.pathname === '/blog') return 'blog';
    return 'features';
  };
  
  const currentPage = getCurrentPage();
  
  // Navigation items for tubelight navbar
  const navItems = [
    { 
      name: 'Features', 
      url: '/', 
      icon: CircleDot,
      isScrollTarget: true
    },
    { 
      name: 'Book Call', 
      url: '/book-demo', 
      icon: Calendar 
    },
    { 
      name: 'Blog', 
      url: '/blog', 
      icon: BookOpen 
    }
  ];
  
  useEffect(() => {
    // Apply the theme to the document when it changes
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);
  
  const handleNavClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage(page);
    // Only scroll if we're on the homepage
    if (location.pathname === '/') {
      const element = document.getElementById(page);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="sticky top-0 z-50 pt-8 px-4">
      <header className="w-full max-w-7xl mx-auto py-3 px-6 md:px-8 flex items-center justify-between">
        <Link to="/" className="p-3">
          <Logo />
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-3 rounded-2xl text-muted-foreground hover:text-foreground"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <TubelightNavBar 
            items={navItems}
            onNavClick={handleNavClick}
          />
        </nav>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md py-4 px-6 border border-border rounded-2xl shadow-lg z-50">
            <div className="flex flex-col gap-4">
              {location.pathname === '/' ? (
                <a 
                  href="#features" 
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    activePage === 'features' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={handleNavClick('features')}
                >
                  <CircleDot size={16} className="inline-block mr-1.5" /> Features
                </a>
              ) : (
                <Link 
                  to="/" 
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    location.pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CircleDot size={16} className="inline-block mr-1.5" /> Features
                </Link>
              )}
              
              <Link 
                to="/book-demo" 
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/book-demo' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar size={16} className="inline-block mr-1.5" /> Book Call
              </Link>
              
              <Link 
                to="/blog" 
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/blog' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen size={16} className="inline-block mr-1.5" /> Blog
              </Link>
              
              {/* Add theme toggle for mobile */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-2">
                  <Moon size={16} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch 
                    checked={!isDarkMode} 
                    onCheckedChange={toggleTheme} 
                    className="data-[state=checked]:bg-primary"
                  />
                  <Sun size={16} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle for desktop */}
          <div className="flex items-center gap-2 rounded-full px-3 py-2">
            <Moon size={18} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
            <Switch 
              checked={!isDarkMode} 
              onCheckedChange={toggleTheme} 
              className="data-[state=checked]:bg-primary"
            />
            <Sun size={18} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="rounded-2xl">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted">Log in</Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
