
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Loader } from 'lucide-react';

// Lazy load AnalyticsOverview component
const AnalyticsOverview = lazy(() => import('./AnalyticsOverview'));

const DashboardPreview = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use IntersectionObserver to trigger animation when component enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('dashboard');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="dashboard" className="w-full py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div 
          className={`text-center space-y-4 max-w-3xl mx-auto transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Powerful analytics dashboard
          </h2>
          <p className="text-cosmic-muted text-lg">
            Real-time insights with interactive charts and key performance metrics
          </p>
        </div>
        
        <div 
          className={`cosmic-glow relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm bg-cosmic-darker/70 shadow-[0_0_15px_rgba(203,255,77,0.15)] transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Analytics Dashboard */}
          <div className="bg-cosmic-darker/80 backdrop-blur-md w-full">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between p-4 border-b border-cosmic-light/10">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-md bg-cosmic-light/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-sm bg-cosmic-accent"></div>
                </div>
                <span className="text-white font-medium">Analytics Dashboard</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-cosmic-light/30 border-2 border-cosmic-darker"></div>
                  <div className="h-8 w-8 rounded-full bg-cosmic-light/20 border-2 border-cosmic-darker"></div>
                  <div className="h-8 w-8 rounded-full bg-cosmic-light/40 border-2 border-cosmic-darker"></div>
                  <div className="h-8 w-8 rounded-full bg-cosmic-accent/20 border-2 border-cosmic-darker flex items-center justify-center text-xs text-cosmic-accent">+3</div>
                </div>
                
                <div className="h-8 px-3 rounded-md bg-cosmic-light/10 flex items-center justify-center text-white text-sm">
                  Export
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-6">
              <Suspense fallback={
                <div className="flex items-center justify-center h-96 bg-cosmic-light/5 rounded-lg border border-cosmic-light/10">
                  <div className="text-center space-y-4">
                    <Loader className="h-8 w-8 animate-spin text-cosmic-accent mx-auto" />
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Loading Analytics</h4>
                      <p className="text-cosmic-muted text-sm">Preparing your dashboard...</p>
                    </div>
                  </div>
                </div>
              }>
                <AnalyticsOverview />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
