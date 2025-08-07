import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Zap, AlertCircle, CheckCircle, TrendingUp, Activity, Server } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart } from 'recharts';

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

  // Performance trend data
  const performanceData = [
    { time: '00:00', responseTime: 145, requests: 1200, errors: 2 },
    { time: '04:00', responseTime: 132, requests: 800, errors: 1 },
    { time: '08:00', responseTime: 127, requests: 1800, errors: 3 },
    { time: '12:00', responseTime: 142, requests: 2200, errors: 4 },
    { time: '16:00', responseTime: 138, requests: 1900, errors: 2 },
    { time: '20:00', responseTime: 135, requests: 1600, errors: 3 },
    { time: '24:00', responseTime: 127, requests: 1200, errors: 2 }
  ];

  // Response time distribution
  const responseTimeData = [
    { range: '< 50ms', count: 45, percentage: 45 },
    { range: '50-100ms', count: 30, percentage: 30 },
    { range: '100-200ms', count: 20, percentage: 20 },
    { range: '200-500ms', count: 4, percentage: 4 },
    { range: '> 500ms', count: 1, percentage: 1 }
  ];

  // System load data
  const systemLoadData = [
    { time: '00:00', cpu: 45, memory: 62, network: 38 },
    { time: '04:00', cpu: 32, memory: 58, network: 25 },
    { time: '08:00', cpu: 68, memory: 75, network: 52 },
    { time: '12:00', cpu: 78, memory: 82, network: 65 },
    { time: '16:00', cpu: 72, memory: 79, network: 58 },
    { time: '20:00', cpu: 65, memory: 73, network: 48 },
    { time: '24:00', cpu: 48, memory: 65, network: 35 }
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
      {/* System Metrics Cards */}
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

      {/* Performance Trends Chart */}
      <Card className="cosmic-gradient border-cosmic-light/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cosmic-accent" />
            Performance Trends (24h)
          </CardTitle>
          <CardDescription>
            Real-time system performance monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => `${value}ms`}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                  formatter={(value, name) => [
                    name === 'responseTime' ? `${value}ms` : 
                    name === 'requests' ? `${Number(value).toLocaleString()}` : 
                    `${value}`,
                    name === 'responseTime' ? 'Response Time' : 
                    name === 'requests' ? 'Requests' : 'Errors'
                  ]}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="errors" 
                  fill="#ef4444" 
                  radius={[2, 2, 0, 0]}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Load & Response Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Load Chart */}
        <Card className="cosmic-gradient border-cosmic-light/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-cosmic-accent" />
              System Load
            </CardTitle>
            <CardDescription>
              CPU, Memory, and Network utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={systemLoadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                    formatter={(value) => [`${value}%`, 'Utilization']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cpu" 
                    stackId="1"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="memory" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="network" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">CPU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Memory</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Network</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Distribution */}
        <Card className="cosmic-gradient border-cosmic-light/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-cosmic-accent" />
              Response Time Distribution
            </CardTitle>
            <CardDescription>
              API response time breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    type="number"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    dataKey="range" 
                    type="category"
                    stroke="#9ca3af"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                    formatter={(value, name) => [
                      `${value}%`,
                      'Percentage'
                    ]}
                  />
                  <Bar 
                    dataKey="percentage" 
                    fill="#10b981" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {responseTimeData.map((item) => (
                <div key={item.range} className="flex items-center justify-between">
                  <span className="text-sm">{item.range}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.percentage}%</span>
                    <span className="text-xs text-cosmic-muted">({item.count} requests)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
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
    </div>
  );
};

export default PerformanceMetrics;
