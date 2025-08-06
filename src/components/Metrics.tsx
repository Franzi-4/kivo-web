import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Zap, AlertTriangle, TrendingUp, Timer, Target as TargetIcon, DollarSign, Users, ShoppingBag, Percent } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, current, target, unit, color, icon }) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <Card className="p-6 bg-card border-border hover:bg-muted/30 transition-colors">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-md bg-muted/80">
            {icon}
          </div>
          <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
            {current}/{target} {unit}
          </Badge>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-light">{title}</h4>
            <span className="text-xs text-muted-foreground font-light">{percentage.toFixed(1)}%</span>
          </div>
          <Progress value={percentage} className="h-1.5" />
          <div className="text-xs text-muted-foreground/60 font-light">
            {target - current} {unit} remaining
          </div>
        </div>
      </div>
    </Card>
  );
};

const PurchaseFunnelChart: React.FC = () => {
  const funnelData = [
    { stage: 'Store Views', count: 25000, rate: 100 },
    { stage: 'Item Views', count: 8500, rate: 34 },
    { stage: 'Add to Cart', count: 2800, rate: 11.2 },
    { stage: 'Checkout', count: 1200, rate: 4.8 },
    { stage: 'Purchase', count: 950, rate: 3.8 },
  ];

  const maxCount = Math.max(...funnelData.map(d => d.count));

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-light text-foreground">Purchase Funnel</h3>
        <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
          Conversion: 3.8%
        </Badge>
      </div>
      <div className="space-y-6">
        {funnelData.map((data, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-light">{data.stage}</span>
              <div className="flex items-center gap-3">
                <span className="text-foreground font-light">{data.count.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground font-light">({data.rate}%)</span>
              </div>
            </div>
            <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-foreground/70 rounded-full transition-all duration-700"
                style={{ width: `${(data.count / maxCount) * 100}%`, opacity: 1 - (index * 0.15) }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-light">Drop-off Rate</span>
          <span className="text-muted-foreground/60 font-light">96.2%</span>
        </div>
      </div>
    </Card>
  );
};

const TopPerformingItems: React.FC = () => {
  const topItems = [
    { name: 'Legendary Sword Pack', revenue: 12400, sales: 310, price: 39.99, trend: 'up' },
    { name: 'Premium Currency Bundle', revenue: 9800, sales: 980, price: 9.99, trend: 'up' },
    { name: 'Epic Armor Set', revenue: 7200, sales: 144, price: 49.99, trend: 'down' },
    { name: 'Boost Package', revenue: 5600, sales: 1120, price: 4.99, trend: 'stable' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-muted-foreground" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-muted-foreground/60 rotate-180" />;
      default: return <div className="h-3 w-3 rounded-full bg-muted-foreground/40"></div>;
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-light text-foreground">Top Performing Items</h3>
        <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
          This month
        </Badge>
      </div>
      <div className="space-y-4">
        {topItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-md bg-muted/80">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-light text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground font-light">
                  ${item.price} • {item.sales} sales
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-light text-foreground">${item.revenue.toLocaleString()}</p>
              </div>
              {getTrendIcon(item.trend)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const PlayerSegmentChart: React.FC = () => {
  const segmentData = [
    { segment: 'Whales (>$100/mo)', users: 245, revenue: 42800, percentage: 63.8 },
    { segment: 'Dolphins ($10-$100/mo)', users: 1420, revenue: 18200, percentage: 27.1 },
    { segment: 'Minnows ($1-$10/mo)', users: 3200, revenue: 4800, percentage: 7.2 },
    { segment: 'Free Players ($0)', users: 7650, revenue: 1200, percentage: 1.9 },
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-light text-foreground">Player Segments</h3>
        <div className="text-sm text-muted-foreground font-light">12,515 total players</div>
      </div>
      <div className="space-y-6">
        {segmentData.map((data, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-foreground/60" style={{ opacity: 1 - (index * 0.2) }}></div>
                <div>
                  <span className="text-sm text-foreground font-light">{data.segment}</span>
                  <p className="text-xs text-muted-foreground font-light">{data.users.toLocaleString()} users</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-light text-foreground">${(data.revenue / 1000).toFixed(0)}K</span>
                <p className="text-xs text-muted-foreground font-light">{data.percentage}%</p>
              </div>
            </div>
            <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-foreground/70 rounded-full transition-all duration-700"
                style={{ width: `${data.percentage}%`, opacity: 1 - (index * 0.15) }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const PerformanceMetrics: React.FC = () => {
  return (
    <div className="space-y-8 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-light text-foreground">Monetization Performance</h2>
          <p className="text-sm text-muted-foreground font-light">Track conversion rates and player behavior</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
            Real-time
          </Badge>
          <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
            June 2024
          </Badge>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProgressCard
          title="Monthly Revenue Goal"
          current={67}
          target={80}
          unit="K"
          color="blue"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <ProgressCard
          title="Conversion Target"
          current={3.8}
          target={5.0}
          unit="%"
          color="green"
          icon={<Percent className="h-4 w-4 text-muted-foreground" />}
        />
        <ProgressCard
          title="Paying Users Goal"
          current={4865}
          target={6000}
          unit="users"
          color="purple"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <ProgressCard
          title="ARPU Target"
          current={5.36}
          target={6.50}
          unit="$"
          color="yellow"
          icon={<TargetIcon className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PurchaseFunnelChart />
        <PlayerSegmentChart />
      </div>

      {/* Top Items Grid */}
      <div className="grid grid-cols-1 gap-8">
        <TopPerformingItems />
      </div>
    </div>
  );
};

export default PerformanceMetrics;
