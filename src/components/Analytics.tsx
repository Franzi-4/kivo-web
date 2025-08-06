import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Calendar, Gamepad2, CreditCard } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon }) => (
  <Card className="p-6 bg-card border-border hover:bg-muted/30 transition-colors">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-md bg-muted/80">
          {icon}
        </div>
        <div className={`flex items-center gap-2 ${changeType === 'positive' ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
          {changeType === 'positive' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span className="text-xs font-medium">{change}</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-light text-foreground">{value}</p>
      </div>
    </div>
  </Card>
);

const RevenueChart: React.FC = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, growth: 12 },
    { month: 'Feb', revenue: 52000, growth: 15.6 },
    { month: 'Mar', revenue: 48000, growth: -7.7 },
    { month: 'Apr', revenue: 61000, growth: 27.1 },
    { month: 'May', revenue: 58000, growth: -4.9 },
    { month: 'Jun', revenue: 67000, growth: 15.5 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-light text-foreground">Revenue Trend</h3>
        <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
          +15.5% vs last month
        </Badge>
      </div>
      <div className="space-y-6">
        {revenueData.map((data, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-light">{data.month}</span>
              <div className="flex items-center gap-3">
                <span className="text-foreground font-light">${(data.revenue / 1000).toFixed(0)}K</span>
                <span className={`text-xs font-light ${data.growth >= 0 ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                  {data.growth >= 0 ? '+' : ''}{data.growth}%
                </span>
              </div>
            </div>
            <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-foreground/80 rounded-full transition-all duration-700"
                style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-light">Total YTD Revenue</span>
          <span className="text-foreground font-light">${(revenueData.reduce((sum, d) => sum + d.revenue, 0) / 1000).toFixed(0)}K</span>
        </div>
      </div>
    </Card>
  );
};

const UserEngagementChart: React.FC = () => {
  const engagementData = [
    { metric: 'Daily Active Users', value: 12500, change: 8.2 },
    { metric: 'Session Duration', value: 23.4, change: 12.1, unit: 'min' },
    { metric: 'Conversion Rate', value: 3.8, change: -2.3, unit: '%' },
    { metric: 'Retention Rate', value: 67.2, change: 5.7, unit: '%' },
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-light text-foreground">User Engagement</h3>
        <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
          Live metrics
        </Badge>
      </div>
      <div className="space-y-6">
        {engagementData.map((data, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-foreground/60"></div>
              <div>
                <p className="text-sm font-light text-foreground">{data.metric}</p>
                <p className="text-xs text-muted-foreground font-light">Last 24 hours</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-light text-foreground">
                {data.value.toLocaleString()}{data.unit || ''}
              </p>
              <p className={`text-xs font-light ${data.change >= 0 ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                {data.change >= 0 ? '+' : ''}{data.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const AnalyticsOverview: React.FC = () => {
  return (
    <div className="space-y-8 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-light text-foreground">Business Analytics</h2>
          <p className="text-sm text-muted-foreground font-light">Real-time insights into revenue and user engagement</p>
        </div>
        <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
          Last 30 days
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value="$67K"
          change="+15.5%"
          changeType="positive"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Active Players"
          value="12.5K"
          change="+8.2%"
          changeType="positive"
          icon={<Gamepad2 className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="ARPU"
          value="$5.36"
          change="+12.3%"
          changeType="positive"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.8%"
          change="-2.3%"
          changeType="negative"
          icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <UserEngagementChart />
      </div>
    </div>
  );
};

export default AnalyticsOverview;
