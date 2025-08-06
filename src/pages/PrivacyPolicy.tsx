import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                How we collect, use, and protect your personal data
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: Apr 8, 2022
              </p>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Kivo Games ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
                    This privacy policy will inform you about how we look after your personal data when you visit our website 
                    and tell you about your privacy rights and how the law protects you.
                  </p>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped 
                    together as follows:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Identity Data</h3>
                      <p>Includes first name, last name, username or similar identifier.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Contact Data</h3>
                      <p>Includes email address and telephone numbers.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Technical Data</h3>
                      <p>
                        Includes internet protocol (IP) address, your login data, browser type and version, time zone setting 
                        and location, browser plug-in types and versions, operating system and platform.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Usage Data</h3>
                      <p>Includes information about how you use our website, products and services.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal 
                    data in the following circumstances:
                  </p>
                  
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>To register you as a new customer or user.</li>
                    <li>To process and deliver your order or request.</li>
                    <li>To manage our relationship with you.</li>
                    <li>To improve our website, products/services, marketing or customer relationships.</li>
                    <li>To recommend products or services that may be of interest to you.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally 
                    lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your 
                    personal data to those employees, agents, contractors and other third parties who have a business need to know.
                  </p>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Your Legal Rights</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Under certain circumstances, you have rights under data protection laws in relation to your personal data, 
                    including the right to:
                  </p>
                  
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Request access to your personal data.</li>
                    <li>Request correction of your personal data.</li>
                    <li>Request erasure of your personal data.</li>
                    <li>Object to processing of your personal data.</li>
                    <li>Request restriction of processing your personal data.</li>
                    <li>Request transfer of your personal data.</li>
                    <li>Right to withdraw consent.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
                  </p>
                  
                  <div className="space-y-2">
                    <p><strong className="text-foreground">Email:</strong> hello@kivogames.com</p>
                    <p>Or visit our contact page on the website.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
