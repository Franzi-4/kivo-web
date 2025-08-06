import React from 'react';
const Testimonials = () => {
  const testimonials = [{
    quote: "Our payment processing efficiency increased by 40% and transaction failures dropped to near zero. The automation features are game-changing.",
    author: "Sarah Johnson",
    position: "CFO at TechCorp",
    avatar: "bg-cosmic-light/30"
  }, {
    quote: "The real-time analytics and fraud detection capabilities have saved us millions. We can spot issues before they become problems.",
    author: "Michael Chen",
    position: "Head of Risk at FinanceFlow",
    avatar: "bg-cosmic-light/20"
  }, {
    quote: "Compliance used to be a nightmare. Now our regulatory reporting is automated and we're always audit-ready.",
    author: "Leila Rodriguez",
    position: "Operations Director at GlobalPay",
    avatar: "bg-cosmic-light/40"
  }];
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Trusted by Financial Leaders
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-16">
            See how our solutions have transformed payment operations for companies worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-8 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center text-foreground font-semibold`}>
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;