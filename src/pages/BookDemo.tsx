import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSubscription from '@/components/NewsletterSubscription';

const BookDemo = () => {

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-12 cosmic-gradient cosmic-grid">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-medium mb-6 text-balance">
              Book a Demo
              <span className="block text-primary">with Kivo Games</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance mb-1">
              Schedule a personalized demo to see how our in-game monetization and dynamic pricing solutions can boost your revenue.
            </p>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-12 px-6 md:px-12 flex justify-center">
          <div className="w-full max-w-2xl">
            <iframe
              src="https://cal.com/franzi-harzheim/kivo-games?layout=month_view"
              title="Book a Demo with Kivo Games"
              width="100%"
              height="700"
              style={{
                border: "none",
                borderRadius: "1rem",
                minWidth: "320px",
                background: "transparent"
              }}
              allow="camera; microphone; fullscreen; speaker; display-capture"
            ></iframe>
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Powered by <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Cal.com</a>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 px-6 md:px-12 bg-card">
          <div className="max-w-4xl mx-auto">
            <NewsletterSubscription
              title="Stay Updated"
              description="Get the latest insights on in-game monetization, dynamic pricing, and player behavior analytics delivered straight to your inbox."
              source="book-demo"
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDemo;