import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeadsList } from '@/components/leads/LeadsList';
import { LeadDetail } from '@/components/leads/LeadDetail';
import { ErrorState } from '@/components/common/ErrorState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLeads, useLeadDetail } from '@/hooks/useApi';
import { Lead } from '@/lib/api';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Leads() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'updated_at' | 'created_at' | 'last_message_time'>('updated_at');
  const limit = 20;

  const { 
    data: leadsData, 
    isLoading: leadsLoading, 
    error: leadsError,
    refetch: refetchLeads 
  } = useLeads({
    limit,
    offset: (page - 1) * limit,
    sortBy,
    sortOrder: 'DESC',
  });

  const { 
    data: leadDetail, 
    isLoading: detailLoading 
  } = useLeadDetail(selectedLead?.id ?? null);

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleCloseLead = () => {
    setSelectedLead(null);
  };

  const totalPages = Math.ceil((leadsData?.count ?? 0) / limit) || 1;

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-theme(spacing.12))] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">리드 관리</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              고객 문의 내역을 확인하고 관리하세요
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="검색..." 
                className="pl-9 w-48"
              />
            </div>
            
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated_at">최근 수정</SelectItem>
                <SelectItem value="created_at">생성 순</SelectItem>
                <SelectItem value="last_message_time">최근 메시지</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        {leadsError ? (
          <ErrorState onRetry={() => refetchLeads()} />
        ) : (
          <div className="flex-1 grid gap-6 lg:grid-cols-5 min-h-0">
            {/* Leads List */}
            <div className="lg:col-span-2 flex flex-col min-h-0">
              <div className="flex-1 overflow-auto scrollbar-thin">
                <LeadsList 
                  leads={leadsData?.leads ?? []}
                  onSelectLead={handleSelectLead}
                  selectedLeadId={selectedLead?.id}
                  isLoading={leadsLoading}
                />
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <p className="text-sm text-muted-foreground">
                  총 {leadsData?.count ?? 0}개
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Lead Detail */}
            <div className="lg:col-span-3 hidden lg:block h-full">
              <LeadDetail 
                detail={leadDetail ?? null}
                isLoading={detailLoading}
                onClose={handleCloseLead}
              />
            </div>
          </div>
        )}

        {/* Mobile Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={handleCloseLead}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-xl">
              <LeadDetail 
                detail={leadDetail ?? null}
                isLoading={detailLoading}
                onClose={handleCloseLead}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
