import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { User, Bot, X, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LeadDetail as LeadDetailType } from '@/lib/api';
import { cn } from '@/lib/utils';

interface LeadDetailProps {
  detail: LeadDetailType | null;
  isLoading?: boolean;
  onClose?: () => void;
}

export function LeadDetail({ detail, isLoading = false, onClose }: LeadDetailProps) {
  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="h-5 w-32 bg-muted rounded animate-pulse" />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={cn("flex gap-3", i % 2 === 0 ? "justify-end" : "")}>
              <div className={cn(
                "h-16 rounded-lg bg-muted animate-pulse",
                i % 2 === 0 ? "w-2/3" : "w-3/4"
              )} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!detail) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center p-8">
          <Bot className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">
            리드를 선택하여 대화 내용을 확인하세요
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
            {detail.conversation.user_id?.slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {detail.conversation.user_id || `사용자 #${detail.conversation.id}`}
            </h3>
            <p className="text-xs text-muted-foreground">
              {format(new Date(detail.conversation.created_at), 'PPP', { locale: ko })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {detail.is_unanswered && (
            <Badge variant="outline" className="border-warning/40 text-warning bg-warning/5">
              <AlertTriangle className="mr-1 h-3 w-3" />
              {detail.unanswered_minutes}분 미응답
            </Badge>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {detail.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
                message.role === 'user' 
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary/10 text-primary"
              )}>
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              
              <div className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5",
                message.role === 'user'
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              )}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={cn(
                  "mt-1 text-xs",
                  message.role === 'user' 
                    ? "text-primary-foreground/70" 
                    : "text-muted-foreground"
                )}>
                  {format(new Date(message.created_at), 'p', { locale: ko })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
