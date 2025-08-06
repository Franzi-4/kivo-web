import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Zap, AlertCircle, CheckCircle, TrendingUp, Activity } from 'lucide-react';

const PerformanceMetrics = () => {
  const systemMetrics = [
    {
      title: "API Response Time",
      value: "127ms",
      status: "good",
      target: "< 200ms",
      progress: 64,
      icon: <Zap className="h-4 w-4" />
    },
    {
      title: "Pricing Engine Latency",
      value: "45ms",
      status: "excellent",
      target: "< 100ms",
      progress: 45,
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: "Cache Hit Rate",
      value: "94.2%",
      status: "good",
      target: "> 90%",
      progress: 94,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Error Rate",
      value: "0.03%",
      status: "excellent",
      target: "< 0.1%",
      progress: 97,
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-cosmic-muted';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'default';
      case 'good':
        return 'secondary';
      case 'warning':
        return 'outline';
      case 'critical':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="cosmic-gradient border-cosmic-light/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cosmic-muted">
                {metric.title}
              </CardTitle>
              <div className={getStatusColor(metric.status)}>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge variant={getStatusBadgeVariant(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-cosmic-muted">
                  <span>Target: {metric.target}</span>
                  <span>{metric.progress}%</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cosmic-gradient border-cosmic-light/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-cosmic-accent" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              System events and performance updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pricing model updated</p>
                  <p className="text-xs text-cosmic-muted">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="h-4 w-4 mt-0.5 text-blue-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Cache optimization completed</p>
                  <p className="text-xs text-cosmic-muted">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">High traffic detected</p>
                  <p className="text-xs text-cosmic-muted">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cosmic-gradient border-cosmic-light/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cosmic-accent" />
              Performance Trends
            </CardTitle>
            <CardDescription>
              24-hour performance overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Avg Response Time</h4>
                  <span className="text-green-500 text-sm">-12ms</span>
                </div>
                <div className="text-2xl font-bold text-cosmic-accent">142ms</div>
                <p className="text-xs text-cosmic-muted">Improved from yesterday</p>
              </div>
              <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Requests Processed</h4>
                  <span className="text-green-500 text-sm">+2.3K</span>
                </div>
                <div className="text-2xl font-bold text-cosmic-accent">18.7K</div>
                <p className="text-xs text-cosmic-muted">Higher than average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
