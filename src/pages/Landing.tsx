import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  BarChart3, 
  Bell, 
  Users, 
  Zap, 
  Shield,
  ArrowRight,
  Bot,
  TrendingUp,
  Clock
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: '실시간 대화 모니터링',
      description: '고객과의 모든 대화를 실시간으로 추적하고 관리하세요',
    },
    {
      icon: BarChart3,
      title: '스마트 분석',
      description: '인기 질문, 통신사, 모델별 통계를 한눈에 확인하세요',
    },
    {
      icon: Bell,
      title: '미응답 알림',
      description: '놓친 문의가 없도록 즉각적인 알림을 받으세요',
    },
    {
      icon: Users,
      title: '리드 관리',
      description: '잠재 고객을 체계적으로 관리하고 전환율을 높이세요',
    },
  ];

  const stats = [
    { value: '99.9%', label: '응답률', icon: Zap },
    { value: '< 3초', label: '평균 응답 시간', icon: Clock },
    { value: '24/7', label: '무중단 운영', icon: Shield },
    { value: '+150%', label: '문의 처리량 증가', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl scale-150" />
              <div className="relative bg-gradient-to-br from-primary to-primary/80 p-6 rounded-3xl shadow-2xl">
                <Bot className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Zap className="w-4 h-4" />
            AI 기반 RAG 챗봇 솔루션
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            고객 문의를
            <br />
            <span className="text-primary">스마트하게</span> 관리하세요
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            RAG 기술로 구동되는 AI 챗봇과 
            <br className="hidden md:block" />
            직관적인 대시보드로 고객 경험을 혁신하세요
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              onClick={() => navigate('/dashboard')}
            >
              대시보드 시작하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl border-2"
              onClick={() => navigate('/analytics')}
            >
              분석 보기
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              강력한 기능
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              고객 문의 관리에 필요한 모든 도구를 한 곳에서
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl" />
            <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16">
              <Bot className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                AI 챗봇 대시보드로 고객 응대 효율을 극대화하세요
              </p>
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 rounded-xl shadow-lg shadow-primary/25"
                onClick={() => navigate('/dashboard')}
              >
                대시보드로 이동
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <span className="font-medium">RAG Chatbot Dashboard</span>
          </p>
          <p className="text-sm mt-2">
            © 2026 All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
