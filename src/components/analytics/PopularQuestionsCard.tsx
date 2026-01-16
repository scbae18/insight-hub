import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MessageSquare, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PopularQuestion } from '@/lib/api';

interface PopularQuestionsCardProps {
  questions: PopularQuestion[];
  isLoading?: boolean;
}

export function PopularQuestionsCard({ questions, isLoading = false }: PopularQuestionsCardProps) {
  if (isLoading) {
    return (
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">인기 질문</h3>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/50">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-3 w-24 bg-muted rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">인기 질문</h3>
      </div>
      
      {questions.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-2 text-sm text-muted-foreground">데이터가 없습니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, index) => (
            <div 
              key={index} 
              className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-foreground line-clamp-2 flex-1">
                  {q.question}
                </p>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {q.count}회
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                마지막 질문: {formatDistanceToNow(new Date(q.last_asked), { 
                  addSuffix: true, 
                  locale: ko 
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
