import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AlertsList } from '@/components/alerts/AlertsList';
import { LeadDetail } from '@/components/leads/LeadDetail';
import { ErrorState } from '@/components/common/ErrorState';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUnansweredAlerts, useLeadDetail } from '@/hooks/useApi';
import { UnansweredAlert } from '@/lib/api';
import { Bell, AlertTriangle } from 'lucide-react';

export default function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState<UnansweredAlert | null>(null);
  const [threshold, setThreshold] = useState<number>(15);

  const { 
    data: alertsData, 
    isLoading: alertsLoading,
    error: alertsError,
    refetch: refetchAlerts
  } = useUnansweredAlerts(threshold);

  const { 
    data: leadDetail, 
    isLoading: detailLoading 
  } = useLeadDetail(selectedAlert?.id ?? null);

  const handleSelectAlert = (alert: UnansweredAlert) => {
    setSelectedAlert(alert);
  };

  const handleCloseDetail = () => {
    setSelectedAlert(null);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-theme(spacing.12))] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">알림</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              미응답 문의를 확인하고 빠르게 대응하세요
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">미응답 기준:</span>
            <Select 
              value={String(threshold)} 
              onValueChange={(v) => setThreshold(Number(v))}
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5분 이상</SelectItem>
                <SelectItem value="15">15분 이상</SelectItem>
                <SelectItem value="30">30분 이상</SelectItem>
                <SelectItem value="60">1시간 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alert Summary */}
        <Card className="p-4 mb-6 border-warning/30 bg-warning/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
              <Bell className="h-6 w-6 text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {threshold}분 이상 미응답 문의
              </p>
              <p className="text-2xl font-bold text-warning">
                {alertsLoading ? '-' : alertsData?.count ?? 0}건
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => refetchAlerts()}
            >
              새로고침
            </Button>
          </div>
        </Card>

        {/* Content */}
        {alertsError ? (
          <ErrorState onRetry={() => refetchAlerts()} />
        ) : (
          <div className="flex-1 grid gap-6 lg:grid-cols-5 min-h-0">
            {/* Alerts List */}
            <div className="lg:col-span-2 overflow-auto scrollbar-thin">
              <AlertsList 
                alerts={alertsData?.alerts ?? []}
                isLoading={alertsLoading}
                onSelectAlert={handleSelectAlert}
              />
            </div>

            {/* Lead Detail */}
            <div className="lg:col-span-3 hidden lg:block h-full">
              <LeadDetail 
                detail={leadDetail ?? null}
                isLoading={detailLoading}
                onClose={handleCloseDetail}
              />
            </div>
          </div>
        )}

        {/* Mobile Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={handleCloseDetail}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-xl">
              <LeadDetail 
                detail={leadDetail ?? null}
                isLoading={detailLoading}
                onClose={handleCloseDetail}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
