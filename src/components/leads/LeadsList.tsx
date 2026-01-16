import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MessageCircle, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/lib/api';
import { cn } from '@/lib/utils';

interface LeadsListProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  selectedLeadId?: number;
  isLoading?: boolean;
}

export function LeadsList({ 
  leads, 
  onSelectLead, 
  selectedLeadId,
  isLoading = false 
}: LeadsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-3 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <Card className="p-8 text-center">
        <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-sm text-muted-foreground">리드가 없습니다</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {leads.map((lead, index) => (
        <Card
          key={lead.id}
          className={cn(
            "p-4 cursor-pointer transition-all duration-200 hover:shadow-card-hover",
            selectedLeadId === lead.id && "ring-2 ring-primary/20 bg-accent/30",
            lead.is_unanswered && "border-warning/40"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => onSelectLead(lead)}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium",
              lead.is_unanswered 
                ? "bg-warning/10 text-warning"
                : "bg-primary/10 text-primary"
            )}>
              {lead.user_id?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground truncate">
                  {lead.user_id || `사용자 #${lead.id}`}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(lead.last_message_time), { 
                    addSuffix: true,
                    locale: ko 
                  })}
                </span>
              </div>
              
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {lead.last_question || '메시지 없음'}
              </p>
              
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  <MessageCircle className="mr-1 h-3 w-3" />
                  {lead.question_count}개 질문
                </Badge>
                
                {lead.is_unanswered && (
                  <Badge variant="outline" className="text-xs border-warning/40 text-warning bg-warning/5">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    {lead.unanswered_minutes}분 미응답
                  </Badge>
                )}
                
                {!lead.is_unanswered && lead.answer_count > 0 && (
                  <Badge variant="outline" className="text-xs border-primary/40 text-primary bg-primary/5">
                    <Clock className="mr-1 h-3 w-3" />
                    응답 완료
                  </Badge>
                )}
              </div>
            </div>
            
            <ChevronRight className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
          </div>
        </Card>
      ))}
    </div>
  );
}
