import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Target, DollarSign, Activity, Globe, ShoppingCart } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Analytics = () => {
  // Revenue by game category
  const gameCategoryData = [
    { category: 'Action', revenue: 45000, players: 3200, conversion: 4.2 },
    { category: 'Strategy', revenue: 38000, players: 2800, conversion: 3.8 },
    { category: 'RPG', revenue: 52000, players: 4100, conversion: 5.1 },
    { category: 'Puzzle', revenue: 28000, players: 5200, conversion: 2.8 },
    { category: 'Sports', revenue: 35000, players: 3100, conversion: 3.5 }
  ];

  // Geographic distribution
  const geoData = [
    { region: 'North America', revenue: 65000, percentage: 52 },
    { region: 'Europe', revenue: 42000, percentage: 34 },
    { region: 'Asia Pacific', revenue: 15000, percentage: 12 },
    { region: 'Other', revenue: 2892, percentage: 2 }
  ];

  // Player behavior radar data
  const behaviorData = [
    { metric: 'Session Length', value: 85 },
    { metric: 'Retention Rate', value: 78 },
    { metric: 'Purchase Frequency', value: 92 },
    { metric: 'Social Sharing', value: 65 },
    { metric: 'Ad Engagement', value: 88 },
    { metric: 'Feature Usage', value: 73 }
  ];

  // Time-based engagement
  const engagementData = [
    { hour: '00:00', active: 1200, purchases: 45 },
    { hour: '04:00', active: 800, purchases: 28 },
    { hour: '08:00', active: 1800, purchases: 67 },
    { hour: '12:00', active: 2200, purchases: 89 },
    { hour: '16:00', active: 1900, purchases: 72 },
    { hour: '20:00', active: 1600, purchases: 58 },
    { hour: '24:00', active: 1200, purchases: 45 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="cosmic-gradient border-cosmic-light/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cosmic-muted">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-cosmic-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124,892</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cosmic-gradient border-cosmic-light/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cosmic-muted">
                  Active Players
                </CardTitle>
                <Users className="h-4 w-4 text-cosmic-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,429</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+8.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cosmic-gradient border-cosmic-light/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cosmic-muted">
                  Conversion Rate
                </CardTitle>
                <Target className="h-4 w-4 text-cosmic-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.24%</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+0.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cosmic-gradient border-cosmic-light/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cosmic-muted">
                  ARPU
                </CardTitle>
                <Activity className="h-4 w-4 text-cosmic-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$14.82</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+2.1%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Chart */}
          <Card className="cosmic-gradient border-cosmic-light/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-cosmic-accent" />
                Daily Engagement
              </CardTitle>
              <CardDescription>
                Active players and purchases throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="hour" 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#f9fafb'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="active" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="purchases" 
                      stackId="2"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {/* Revenue by Game Category */}
          <Card className="cosmic-gradient border-cosmic-light/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cosmic-accent" />
                Revenue by Game Category
              </CardTitle>
              <CardDescription>
                Revenue breakdown across different game types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gameCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="category" 
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
                        name === 'revenue' ? 'Revenue' : name === 'players' ? 'Players' : 'Conversion %'
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="cosmic-gradient border-cosmic-light/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cosmic-accent" />
                  Geographic Revenue
                </CardTitle>
                <CardDescription>
                  Revenue distribution by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={geoData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ region, percentage }) => `${region} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {geoData.map((entry, index) => (
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
              </CardContent>
            </Card>

            <Card className="cosmic-gradient border-cosmic-light/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-cosmic-accent" />
                  Conversion by Category
                </CardTitle>
                <CardDescription>
                  Purchase conversion rates by game category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gameCategoryData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        type="number"
                        stroke="#9ca3af"
                        fontSize={12}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis 
                        dataKey="category" 
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
                        formatter={(value) => [`${value}%`, 'Conversion Rate']}
                      />
                      <Bar dataKey="conversion" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          {/* Player Behavior Radar */}
          <Card className="cosmic-gradient border-cosmic-light/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-cosmic-accent" />
                Player Behavior Analysis
              </CardTitle>
              <CardDescription>
                Key player engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={behaviorData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="metric" stroke="#9ca3af" fontSize={12} />
                    <PolarRadiusAxis stroke="#9ca3af" fontSize={12} />
                    <Radar 
                      name="Player Behavior" 
                      dataKey="value" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3} 
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#f9fafb'
                      }}
                      formatter={(value) => [`${value}%`, 'Score']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          {/* Player Segments */}
          <Card className="cosmic-gradient border-cosmic-light/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-cosmic-accent" />
                Player Segment Analysis
              </CardTitle>
              <CardDescription>
                Detailed breakdown of player segments and their behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                  <h4 className="font-medium mb-2 text-green-500">Whales (Top 1%)</h4>
                  <div className="text-2xl font-bold text-cosmic-accent">$89,234</div>
                  <p className="text-sm text-cosmic-muted">71% of total revenue</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Avg Session:</span>
                      <span>45 min</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Purchase Freq:</span>
                      <span>3.2/week</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                  <h4 className="font-medium mb-2 text-blue-500">Mid-Spenders (5%)</h4>
                  <div className="text-2xl font-bold text-cosmic-accent">$24,891</div>
                  <p className="text-sm text-cosmic-muted">20% of total revenue</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Avg Session:</span>
                      <span>28 min</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Purchase Freq:</span>
                      <span>1.8/week</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-cosmic-light/5 border border-cosmic-light/10">
                  <h4 className="font-medium mb-2 text-yellow-500">Casual (94%)</h4>
                  <div className="text-2xl font-bold text-cosmic-accent">$10,767</div>
                  <p className="text-sm text-cosmic-muted">9% of total revenue</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Avg Session:</span>
                      <span>12 min</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Purchase Freq:</span>
                      <span>0.3/week</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
