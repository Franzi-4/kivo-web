import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Imprint = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Imprint
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Legal information and company details
              </p>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Company Details</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Company Name:</strong> Cosmos Tasks GmbH</p>
                      <p><strong className="text-foreground">Registration Number:</strong> HRB 123456</p>
                      <p><strong className="text-foreground">VAT ID:</strong> DE123456789</p>
                      <p><strong className="text-foreground">Commercial Register:</strong> Amtsgericht Berlin</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Address:</strong><br />
                        Cosmos Tasks GmbH<br />
                        Muster Straße 123<br />
                        10115 Berlin<br />
                        Germany
                      </p>
                      <p><strong className="text-foreground">Email:</strong> legal@cosmostasks.com</p>
                      <p><strong className="text-foreground">Phone:</strong> +49 30 12345678</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Management</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">Managing Directors:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Max Mustermann</li>
                    <li>Anna Schmidt</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Responsible for Content</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">According to § 55 Abs. 2 RStV:</strong></p>
                  <p>Max Mustermann<br />
                    Cosmos Tasks GmbH<br />
                    Muster Straße 123<br />
                    10115 Berlin<br />
                    Germany
                  </p>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Liability for Content</h3>
                    <p>
                      As service providers, we are liable for own contents of these websites according to Sec. 7, 
                      paragraph 1 of the TMG (Telemediengesetz – Tele Media Act by German law). However, according 
                      to Sec. 8 to 10 of the TMG, we as service providers are under no obligation to monitor 
                      submitted or stored information or to research circumstances pointing to illegal activity.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Liability for Links</h3>
                    <p>
                      Our offer includes links to external third party websites. We have no influence on the 
                      contents of those websites, therefore we cannot guarantee for those contents. Providers 
                      or administrators of linked websites are always responsible for their own contents.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Copyright</h3>
                    <p>
                      Contents and compilations published on these websites by the providers are subject to 
                      German copyright laws. Reproduction, editing, distribution as well as the use of any kind 
                      outside the scope of the copyright law require a written permission of the author or originator.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                <div className="text-muted-foreground">
                  <p>
                    The use of our website is usually possible without providing personal information. 
                    As far as personal data (e.g. name, address or email addresses) are collected on our 
                    pages, this always happens on a voluntary basis, as far as possible. This data will 
                    not be passed on to third parties without your express consent.
                  </p>
                  <p className="mt-4">
                    For detailed information about data protection, please refer to our Privacy Policy.
                  </p>
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

export default Imprint;
