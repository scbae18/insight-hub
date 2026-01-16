import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CarrierStat } from '@/lib/api';
import { Smartphone } from 'lucide-react';

interface CarrierChartProps {
  carriers: CarrierStat[];
  isLoading?: boolean;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const CARRIER_LABELS: Record<string, string> = {
  'SK': 'SK텔레콤',
  'KT': 'KT',
  'LGU+': 'LG U+',
};

export function CarrierChart({ carriers, isLoading = false }: CarrierChartProps) {
  const chartData = carriers.map((c) => ({
    name: CARRIER_LABELS[c.carrier] || c.carrier,
    value: c.count,
  }));

  if (isLoading) {
    return (
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">통신사별 문의</h3>
        </div>
        <div className="h-64 bg-muted rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <Card className="p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">통신사별 문의</h3>
      </div>
      
      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">데이터가 없습니다</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => [`${value}건`, '문의']}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--foreground))', fontSize: '12px' }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
