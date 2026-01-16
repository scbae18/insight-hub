import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = '오류가 발생했습니다',
  message = '데이터를 불러오는 중 문제가 발생했습니다.',
  onRetry 
}: ErrorStateProps) {
  return (
    <Card className="p-8 text-center border-destructive/20 bg-destructive/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mx-auto">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{message}</p>
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
          onClick={onRetry}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          다시 시도
        </Button>
      )}
    </Card>
  );
}
