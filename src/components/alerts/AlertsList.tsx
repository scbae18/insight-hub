import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AlertTriangle, Clock, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UnansweredAlert } from '@/lib/api';
import { cn } from '@/lib/utils';

interface AlertsListProps {
  alerts: UnansweredAlert[];
  isLoading?: boolean;
  onSelectAlert?: (alert: UnansweredAlert) => void;
}

export function AlertsList({ alerts, isLoading = false, onSelectAlert }: AlertsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 border-warning/30">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-warning/10 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card className="p-8 text-center border-primary/20 bg-primary/5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-foreground">미응답 문의가 없습니다</h3>
        <p className="mt-1 text-xs text-muted-foreground">모든 문의에 응답이 완료되었습니다</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <Card
          key={alert.id}
          className={cn(
            "p-4 border-warning/40 bg-warning/5 cursor-pointer transition-all hover:shadow-card-hover animate-fade-in",
          )}
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => onSelectAlert?.(alert)}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">
                  {alert.user_id || `사용자 #${alert.id}`}
                </span>
                <Badge variant="outline" className="text-xs border-warning/40 text-warning">
                  <Clock className="mr-1 h-3 w-3" />
                  {alert.unanswered_minutes}분
                </Badge>
              </div>
              
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {alert.last_question}
              </p>
              
              <p className="mt-2 text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(alert.last_message_time), { 
                  addSuffix: true,
                  locale: ko 
                })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
