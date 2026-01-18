import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Bot,
  ArrowRight,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  Send
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  // Mock chat messages
  const chatMessages = [
    { role: 'user', content: 'SKT 번호이동 갤럭시 S24 울트라 할부원금 알려줘', time: '14:32' },
    { role: 'assistant', content: 'SKT 번호이동으로 갤럭시 S24 울트라를 구매하시면 할부원금은 1,200,000원입니다. 256GB 모델은 1,350,000원입니다.', time: '14:32' },
    { role: 'user', content: 'KT 기변은 얼마야?', time: '14:33' },
    { role: 'assistant', content: 'KT 기기변경 시 갤럭시 S24 울트라 할부원금은 1,150,000원입니다. 공시지원금 적용 시 더 저렴하게 구매 가능합니다.', time: '14:33' },
  ];

  // Mock dashboard stats
  const stats = [
    { label: '오늘 문의', value: '127', change: '+23%', icon: MessageSquare },
    { label: '평균 응답', value: '2.3초', change: '-15%', icon: Clock },
    { label: '활성 리드', value: '48', change: '+12%', icon: Users },
    { label: '전환율', value: '34%', change: '+8%', icon: TrendingUp },
  ];

  // Mock time distribution data
  const timeData = [
    { hour: '09', value: 15 },
    { hour: '10', value: 25 },
    { hour: '11', value: 45 },
    { hour: '12', value: 30 },
    { hour: '13', value: 20 },
    { hour: '14', value: 55 },
    { hour: '15', value: 70 },
    { hour: '16', value: 60 },
    { hour: '17', value: 40 },
  ];

  const maxValue = Math.max(...timeData.map(d => d.value));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">My Agent</span>
          </div>
          <Button onClick={() => navigate('/dashboard')} className="rounded-xl">
            대시보드 시작
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">

        {/* Dashboard + Chat Preview */}
        <div className="grid lg:grid-cols-5 gap-4 md:gap-6">
          {/* Dashboard Side (Left - 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-primary'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">시간대별 문의량</h3>
                <div className="flex gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">오늘</span>
                  <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">이번 주</span>
                </div>
              </div>
              <div className="flex items-end gap-2 h-32">
                {timeData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-primary/20 rounded-t-md relative overflow-hidden transition-all hover:bg-primary/30"
                      style={{ height: `${(data.value / maxValue) * 100}%` }}
                    >
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md"
                        style={{ height: '100%' }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.hour}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leads Preview */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">최근 리드</h3>
                <span className="text-xs text-primary cursor-pointer hover:underline">전체 보기</span>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'user_A3K9', question: 'SKT 번호이동 갤럭시 S24 울트라', status: '완료', time: '2분 전' },
                  { id: 'user_B7X2', question: 'KT 기변 아이폰 15 프로 가격', status: '대기', time: '5분 전' },
                  { id: 'user_C1M5', question: 'LGU+ 갤럭시 Z 플립 5 할부', status: '완료', time: '8분 전' },
                ].map((lead, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{lead.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          lead.status === '완료' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{lead.question}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{lead.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Side (Right - 2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col shadow-xl">
              {/* Chat Header */}
              <div className="bg-primary p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">AI 상담 챗봇</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-primary-foreground/80">온라인</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 bg-secondary/30 overflow-y-auto min-h-[400px]">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <span className="text-xs text-muted-foreground">AI 상담사</span>
                        </div>
                      )}
                      <div 
                        className={`p-3 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-br-md' 
                            : 'bg-card border border-border text-foreground rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      <span className={`text-xs text-muted-foreground mt-1 block ${msg.role === 'user' ? 'text-right' : ''}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-card border border-border p-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    readOnly
                  />
                  <Button size="icon" className="rounded-xl h-11 w-11">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="rounded-xl px-8 py-6 text-lg shadow-lg shadow-primary/25"
            onClick={() => navigate('/dashboard')}
          >
            대시보드 시작하기
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <span>My Agent</span>
          <span className="text-muted-foreground/50">© 2026</span>
        </p>
      </footer>
    </div>
  );
};

export default Landing;
