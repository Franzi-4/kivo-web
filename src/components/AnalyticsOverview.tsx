import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Target, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

  // Revenue trend data
  const revenueData = [
    { month: 'Jan', revenue: 89000, players: 7200 },
    { month: 'Feb', revenue: 95000, players: 7800 },
    { month: 'Mar', revenue: 102000, players: 8100 },
    { month: 'Apr', revenue: 98000, players: 7900 },
    { month: 'May', revenue: 115000, players: 8300 },
    { month: 'Jun', revenue: 124892, players: 8429 }
  ];

  // Player segment data
  const segmentData = [
    { name: 'Whales (1%)', value: 45000, percentage: 36, color: '#6b7280' },
    { name: 'Dolphins(5%)', value: 52000, percentage: 42, color: '#9ca3af' },
    { name: 'Casual (94%)', value: 27892, percentage: 22, color: '#d1d5db' }
  ];

  const COLORS = ['#6b7280', '#9ca3af', '#d1d5db'];

  return (
    <div className="space-y-6">
      {/* Four Gaming KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-card border border-border hover:bg-muted/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="text-primary">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend
            </CardTitle>
            <CardDescription>
              Monthly revenue and player growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${Number(value).toLocaleString()}` : value,
                      name === 'revenue' ? 'Revenue' : 'Players'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1"
                    stroke="#6b7280" 
                    fill="#6b7280" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="players" 
                    stackId="2"
                    stroke="#9ca3af" 
                    fill="#9ca3af" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Player Segments Pie Chart */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              Revenue by Segment
            </CardTitle>
            <CardDescription>
              Revenue distribution across player segments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name }) => name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {segmentData.map((segment, index) => (
                <div key={segment.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-foreground">{segment.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">${segment.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
