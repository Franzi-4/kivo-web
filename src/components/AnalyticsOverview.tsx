import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Target, DollarSign, Activity } from 'lucide-react';

const AnalyticsOverview = () => {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$124,892",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: "Active Players",
      value: "8,429",
      change: "+8.2%",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      trend: "up",
      icon: <Target className="h-4 w-4" />
    },
    {
      title: "ARPU",
      value: "$14.82",
      change: "+2.1%",
      trend: "up",
      icon: <Activity className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="cosmic-gradient border-cosmic-light/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cosmic-muted">
                {metric.title}
              </CardTitle>
              <div className="text-cosmic-accent">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <Card className="cosmic-gradient border-cosmic-light/20 absolute bottom-0 w-full">
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cosmic-accent" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>
              Track your monetization performance across different player segments
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-40">
                <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                  <h4 className="font-medium mb-2">Whales (Top 1%)</h4>
                  <div className="text-2xl font-bold text-cosmic-accent">$89,234</div>
                  <p className="text-sm text-cosmic-muted">71% of total revenue</p>
                </div>
                <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                  <h4 className="font-medium mb-2">Mid-Spenders (5%)</h4>
                  <div className="text-2xl font-bold text-cosmic-accent">$24,891</div>
                  <p className="text-sm text-cosmic-muted">20% of total revenue</p>
                </div>
                <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                  <h4 className="font-medium mb-2">Casual (94%)</h4>
                  <div className="text-2xl font-bold text-cosmic-accent">$10,767</div>
                  <p className="text-sm text-cosmic-muted">9% of total revenue</p>
                </div>
              </div>
            </div>
            {/* Gradient overlay to fade out the bottom content */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cosmic-darker to-transparent pointer-events-none"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
