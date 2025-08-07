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
                Legal disclosure in accordance with § 5 TMG
              </p>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Company Details</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Company Name:</strong> Styx Ventures UG (haftungsbeschränkt)</p>
                      <p><strong className="text-foreground">Registration Number:</strong> HRB [Your Number]</p>
                      <p><strong className="text-foreground">VAT ID:</strong> DE[Your VAT Number]</p>
                      <p><strong className="text-foreground">Commercial Register:</strong> Amtsgericht Berlin (Charlottenburg)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong className="text-foreground">Address:</strong><br />
                        Styx Ventures UG (haftungsbeschränkt)<br />
                        Alte Landstraße 29<br />
                        53902 Bad Münstereifel<br />
                        Germany
                      </p>
                      <p><strong className="text-foreground">Email:</strong> legal@styxventures.com</p>
                      <p><strong className="text-foreground">Phone:</strong> +49 [Your Phone Number]</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Management</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">Managing Director:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Franziska Harzheim</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Responsible for Content</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">According to § 55 Abs. 2 RStV:</strong></p>
                  <p>Franziska Harzheim<br />
                    Styx Ventures UG (haftungsbeschränkt)<br />
                    Alte Landstraße 29<br />
                    53902 Bad Münstereifel<br />
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
                      As a service provider, we are responsible for our own content on these pages according to § 7 (1) TMG. 
                      According to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information 
                      or to investigate circumstances that indicate illegal activity.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Liability for Links</h3>
                    <p>
                      Our website contains links to external websites of third parties, on whose contents we have no influence. 
                      Therefore, we cannot accept any liability for these external contents. The respective provider or operator 
                      of the linked sites is always responsible for the content of those sites.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Copyright</h3>
                    <p>
                      The content and works created by the site operators on these pages are subject to German copyright law. 
                      Reproduction, processing, distribution and any kind of exploitation outside the limits of copyright 
                      require the written consent of the respective author or creator.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                <div className="text-muted-foreground">
                  <p>
                    You can use our website without providing personal data as far as possible. If personal data 
                    (such as name, address or email address) is collected on our site, it is always done on a voluntary basis. 
                    This data will not be disclosed to third parties without your explicit consent.
                  </p>
                  <p className="mt-4">
                    Please refer to our Privacy Policy for more detailed information.
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

