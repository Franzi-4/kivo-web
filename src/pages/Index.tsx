
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  // Update document meta tags for SEO
  useEffect(() => {
    // Update document title
    document.title = "Kivo Games - AI-Powered Mobile Game Monetization Platform";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Kivo Games helps mobile game studios maximize revenue through AI-powered dynamic pricing, personalized offers, and data-driven monetization strategies. Boost your LTV and player retention.');
    
    // Update Open Graph tags
    updateMetaTag('og:title', 'Kivo Games - AI-Powered Mobile Game Monetization Platform');
    updateMetaTag('og:description', 'Kivo Games helps mobile game studios maximize revenue through AI-powered dynamic pricing, personalized offers, and data-driven monetization strategies.');
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', window.location.origin);
    updateMetaTag('og:site_name', 'Kivo Games');
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Kivo Games - AI-Powered Mobile Game Monetization Platform');
    updateMetaTag('twitter:description', 'Kivo Games helps mobile game studios maximize revenue through AI-powered dynamic pricing, personalized offers, and data-driven monetization strategies.');
    
    // Update keywords
    updateMetaTag('keywords', 'mobile game monetization, AI pricing, dynamic pricing, game revenue, player retention, mobile gaming, LTV optimization');
  }, []);

  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (property.startsWith('og:')) {
        metaTag.setAttribute('property', property);
      } else if (property.startsWith('twitter:')) {
        metaTag.setAttribute('name', property);
      } else {
        metaTag.setAttribute('name', property);
      }
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
