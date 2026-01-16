import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PeriodSelector } from '@/components/dashboard/PeriodSelector';
import { TimeDistributionChart } from '@/components/dashboard/TimeDistributionChart';
import { PopularQuestionsCard } from '@/components/analytics/PopularQuestionsCard';
import { CarrierChart } from '@/components/analytics/CarrierChart';
import { ModelsChart } from '@/components/analytics/ModelsChart';
import { ErrorState } from '@/components/common/ErrorState';
import { 
  useTimeDistribution, 
  usePopularQuestions, 
  usePopularCarriers, 
  usePopularModels 
} from '@/hooks/useApi';

export default function Analytics() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const { 
    data: timeDistribution, 
    isLoading: timeLoading,
    error: timeError,
    refetch: refetchTime
  } = useTimeDistribution(period);

  const { 
    data: questions, 
    isLoading: questionsLoading 
  } = usePopularQuestions(10);

  const { 
    data: carriers, 
    isLoading: carriersLoading 
  } = usePopularCarriers(10, period);

  const { 
    data: models, 
    isLoading: modelsLoading 
  } = usePopularModels(10, period);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">분석</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              문의 패턴과 트렌드를 분석하세요
            </p>
          </div>
          <PeriodSelector value={period} onChange={setPeriod} />
        </div>

        {/* Time Distribution */}
        {timeError ? (
          <ErrorState onRetry={() => refetchTime()} />
        ) : (
          <TimeDistributionChart 
            data={timeDistribution?.distribution ?? []}
            isLoading={timeLoading}
            title="시간대별 문의 분포"
          />
        )}

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CarrierChart 
            carriers={carriers?.carriers ?? []}
            isLoading={carriersLoading}
          />
          <ModelsChart 
            models={models?.models ?? []}
            isLoading={modelsLoading}
          />
        </div>

        {/* Popular Questions */}
        <PopularQuestionsCard 
          questions={questions?.questions ?? []}
          isLoading={questionsLoading}
        />
      </div>
    </DashboardLayout>
  );
}
