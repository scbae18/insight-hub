import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PeriodSelectorProps {
  value: 'today' | 'week' | 'month';
  onChange: (value: 'today' | 'week' | 'month') => void;
}

const periods = [
  { value: 'today' as const, label: '오늘' },
  { value: 'week' as const, label: '이번 주' },
  { value: 'month' as const, label: '이번 달' },
];

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant="ghost"
          size="sm"
          className={cn(
            "px-4 py-1.5 text-sm font-medium transition-all",
            value === period.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-transparent"
          )}
          onClick={() => onChange(period.value)}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}
