
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Sliders, BarChart2, ShieldCheck, PlugZap } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "Dynamic Pricing Engine",
      description: "Optimize every offer in real time based on player behavior and context.",
      expandedDescription:
        "Leverage AI to deliver personalized in-game pricing for each player. Our engine analyzes behavioral data, purchase history, and in-game context to serve the right price at the right time. Boost conversion rates and maximize revenue without compromising player experience.",
      icon: <Sliders size={24} className="text-cosmic-accent" />
    },
    {
      title: "Player Segmentation",
      description: "Identify high-value players and tailor monetization strategies accordingly.",
      expandedDescription:
        "Automatically segment your player base into behavior-driven cohorts. Target whales, mid-spenders, and non-payers with different pricing strategies. Our system updates segments in real time, so your monetization always adapts to player evolution.",
      icon: <BarChart2 size={24} className="text-cosmic-accent" />
    },
    {
      title: "Revenue Protection",
      description: "Avoid churn and pricing fatigue with smart offer pacing and controls.",
      expandedDescription:
        "Prevent overexposure to offers and avoid aggressive pricing with our built-in pacing logic. Kivo's safeguards ensure monetization strategies remain sustainable and engaging, reducing churn and protecting long-term revenue.",
      icon: <ShieldCheck size={24} className="text-cosmic-accent" />
    },
    {
      title: "Plug-and-Play Integration",
      description: "Integrate in days, not weeks—with minimal engineering effort.",
      expandedDescription:
        "Drop our SDK into your existing monetization stack and go live in no time. Kivo plays well with Unity, Unreal, and custom engines. You get full control over triggers, experiments, and offer logic while we handle the heavy lifting.",
      icon: <PlugZap size={24} className="text-cosmic-accent" />
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Everything your business needs
          </h2>
          <p className="text-cosmic-muted text-lg">
            Comprehensive fintech solutions to streamline your financial operations and drive growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border ${openFeature === index ? 'border-cosmic-light/40' : 'border-cosmic-light/20'} cosmic-gradient transition-all duration-300`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-full bg-cosmic-light/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-cosmic-muted transition-transform duration-200 ${
                      openFeature === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                <p className="text-cosmic-muted">{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-cosmic-light/10">
                  <p className="text-cosmic-muted">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-cosmic-accent hover:text-cosmic-accent/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
