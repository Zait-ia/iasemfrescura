import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Check,
  ChevronDown,
  ArrowRight,
  Zap,
  Sparkles,
  MessageSquare,
  Terminal,
  Globe,
  Users,
  Layout,
  Calendar,
  Clock,
} from 'lucide-react';
import { StarsBackground } from './StarsBackground';

const JourneyMilestone = ({ icon: Icon, title, time, schedule, description, details, side = 'left', active, onClick, caseExtra }: any) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 md:mb-40 ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: side === 'left' ? -20 : 20 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`w-full md:w-[46%] ${side === 'right' ? 'md:text-left' : 'md:text-right'} group z-20 order-2 md:order-none px-4 md:px-0`}
      >
        <div
          onClick={onClick}
          className={`cursor-pointer p-6 md:p-8 rounded-[32px] transition-all duration-500 border relative ${
            active
              ? 'bg-white border-brand-accent shadow-2xl shadow-brand-accent/15 scale-[1.02]'
              : 'bg-white/60 backdrop-blur-sm border-[#070D0D]/10 hover:border-brand-accent/40 shadow-sm'
          }`}
        >
          <div className={`flex items-center gap-3 mb-2 ${side === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
            <span className="text-brand-accent font-semibold text-lg md:text-xl tracking-tight">{time}</span>
            <div className={`p-2.5 rounded-xl transition-transform duration-500 ${active ? 'bg-brand-accent text-white scale-110 shadow-lg' : 'bg-brand-tag text-brand-accent'}`}>
              <Icon size={24} />
            </div>
          </div>
          {schedule && (
            <div className="inline-flex items-center gap-1.5 bg-brand-tag/50 border border-brand-accent/20 px-3 py-1 rounded-full mb-3">
              <Clock size={11} className="text-brand-accent" />
              <span className="text-[11px] text-brand-accent font-semibold tracking-tight">{schedule}</span>
            </div>
          )}
          <h4 className="text-2xl md:text-3xl font-semibold text-[#070D0D] mb-2 leading-tight tracking-tight">{title}</h4>
          <p className="text-[#070D0D]/60 text-sm md:text-base leading-relaxed">{description}</p>

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-[#070D0D]/10 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {details.map((d: any, i: number) => (
                      <div key={i} className="flex flex-col gap-1 p-3 rounded-xl bg-[#070D0D]/5 border border-[#070D0D]/5 text-left">
                         <div className="flex items-center gap-2 text-brand-accent">
                            <d.icon size={14} />
                            <span className="text-[13px] font-black uppercase tracking-wider">{d.label}</span>
                         </div>
                         <p className="text-[15px] text-[#070D0D]/50 leading-tight">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                  {caseExtra && (
                    <div className="bg-brand-accent/5 p-4 rounded-2xl border border-brand-accent/15">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap size={12} className="text-brand-accent animate-pulse" />
                        <span className="text-[15px] font-black text-brand-accent uppercase tracking-[0.2em] block">Case gravado</span>
                      </div>
                      <p className="text-[14px] font-medium text-[#070D0D]/80 italic leading-relaxed">"{caseExtra}"</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!active && (
             <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-20 md:hidden">
                <ChevronDown size={20} className="text-[#070D0D]" />
             </div>
          )}
        </div>
      </motion.div>

      {/* Point on Path */}
      <div className="md:absolute left-1/2 md:-translate-x-1/2 flex items-center justify-center my-4 md:my-0 order-1 md:order-none z-30">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-[#FFF7EC] relative z-10 transition-colors duration-500 flex items-center justify-center shadow-lg ${active ? 'bg-brand-accent text-white' : 'bg-[#070D0D]/10 text-[#070D0D]/20'}`}
        >
           {active ? <Zap size={16} fill="currentColor" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
        </motion.div>
        {active && (
          <motion.div
            layoutId="active-glow"
            className="absolute w-16 h-16 md:w-24 md:h-24 bg-brand-accent/15 rounded-full blur-2xl"
          />
        )}
      </div>

      {/* Empty space for the other side on desktop */}
      <div className="hidden md:block w-[46%]" />
    </div>
  );
};

const PathNode = ({ icon: Icon, title, side = 'left', top, visible = true }: any) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        style={{ top: `${top}%` }}
        className={`absolute flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#070D0D]/40 ${side === 'left' ? 'flex-row-reverse right-[53%]' : 'left-[57%]'} whitespace-nowrap hidden md:flex pointer-events-none z-10`}
      >
        <div className="p-2 bg-[#070D0D]/10 rounded-lg border border-[#070D0D]/10 transition-colors">
          <Icon size={16} className="text-brand-accent" />
        </div>
        <span>{title}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [chatPhase, setChatPhase] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const words = [  "além do Chat", "de verdade", "por completo"];

  const containerRef = useRef<HTMLDivElement>(null);
  const urgencyBarRef = useRef<HTMLDivElement>(null);
  const [urgencyBarHeight, setUrgencyBarHeight] = useState(40);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const measure = () => {
      if (urgencyBarRef.current) {
        setUrgencyBarHeight(urgencyBarRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const durations = [4000, 1200, 4000, 1200, 4500];
    let phase = 0;
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      phase = (phase + 1) % durations.length;
      setChatPhase(phase);
      tid = setTimeout(tick, durations[phase]);
    };
    tid = setTimeout(tick, durations[0]);
    return () => clearTimeout(tid);
  }, []);

  const depoimentoRows = [
    [
      { src: '/depoimentos/depoimento_1.png', rotation: -3 },
      { src: '/depoimentos/depoimento_2.png', rotation: 2 },
      { src: '/depoimentos/depoimento_3.png', rotation: -1 },
    ],
    [
      { src: '/depoimentos/depoimento_4.png', rotation: 3 },
      { src: '/depoimentos/depoimento_5.png', rotation: -2 },
      { src: '/depoimentos/depoimento_1.png', rotation: 1 },
    ],
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#042F34] relative selection:bg-brand-tag text-brand-text">
      {/* Urgency Bar */}
      <div className="urgency-bar" ref={urgencyBarRef}>
        <div className="urgency-bar__inner">
          <div className="urgency-bar__badge">
            GRAVAÇÃO DISPONÍVEL
          </div>
        </div>
      </div>

      {/* Artistic Flair Dots Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen bg-dots z-0"></div>

      {/* Claude Floaters */}
      <div className="claude-floaters">
        <div className="claude-symbol" style={{ top: '8%', right: '5%', '--dur': '8s', '--delay': '0s', '--spin': '20s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <div className="claude-symbol" style={{ top: '60%', right: '5%', '--dur': '12s', '--delay': '2s', '--spin': '35s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-10 h-10 md:w-16 md:h-16" />
        </div>
        <div className="claude-symbol" style={{ bottom: '10%', right: '20%', '--dur': '10s', '--delay': '4s', '--spin': '45s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-6 h-6 md:w-10 md:h-10" />
        </div>
        <div className="claude-symbol" style={{ top: '25%', left: '5%', '--dur': '9s', '--delay': '1s', '--spin': '30s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-12 h-12 md:w-20 md:h-20" />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled ? 'bg-[#070D0D]/90 backdrop-blur-md border-white/5 shadow-lg py-4' : 'bg-transparent py-6'
        }`}
        style={{ top: `${urgencyBarHeight}px` }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <img src="/claude_logo.png" alt="Claude" className="w-8 h-8 rounded-lg brightness-110" />
             <a href="#" className="text-lg sm:text-2xl text-[#DA7756] font-semibold tracking-tight whitespace-nowrap">
              Claude Sem Frescura
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-brand-text opacity-70">
            <a href="#workshop" className="hover:text-brand-accent transition-colors">O Workshop</a>
            <a href="#mentores" className="hover:text-brand-accent transition-colors">Mentores</a>
            <a href="#programacao" className="hover:text-brand-accent transition-colors">Programação</a>
            <a href="#preco" className="hover:text-brand-accent transition-colors">Preço</a>
          </div>

          <a
            href="https://pay.kiwify.com.br/DmP7zA1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-accent hover:bg-brand-accent-hover text-white px-3 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg shadow-brand-accent/20 active:scale-95 whitespace-nowrap"
          >
            Garantir Acesso
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative pt-32 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-[#0A0F0F]  min-h-screen flex items-center bg-linear-to-br from-[#070D0D] via-[#3E2723]/20 to-[#420D19]/30">
          <StarsBackground className="absolute inset-0 w-full h-full pointer-events-none" starColor="#FFF7EC" starCount={600} />
          <div className="max-w-9xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="z-20"
            >
              <div className="flex flex-col items-center md:items-start gap-4 mb-8">
                <div className="bg-[#FFF7EC] px-5 py-2.5 rounded-full inline-flex items-center shadow-md shadow-black/20">
                  <img src="/claude_logo_complete.png" alt="Claude" className="h-7 md:h-8" />
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="inline-block bg-brand-tag text-brand-accent text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase border border-brand-accent/20">
                    Workshop Gravado 100% Prático
                  </span>
                  <span className="inline-block bg-brand-tag text-brand-accent text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase border border-brand-accent/20">
                    Acesso imediato
                  </span>
                </div>
              </div>
              <h1 className="font-semibold text-5xl sm:text-6xl lg:text-8xl text-brand-text leading-[0.9] mb-2 tracking-tighter text-center md:text-left">
              Domine o Claude<br />
                <span className="relative inline-block overflow-hidden h-[1.1em] align-top w-full sm:w-auto sm:min-w-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeWordIndex}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute text-[#042F34] font-semibold w-full text-center md:text-left left-0 text-[#B5F2DB]"
                    >
                      {words[activeWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              <p className="text-brand-text text-base font-normal sm:text-base md:text-lg mb-12 max-w-lg leading-relaxed  text-center md:text-left mx-auto md:mx-0">
                Chat. Cowork. Code.<br></br><br></br>
                Em 6 horas, você aprende as 3 camadas do Claude que 95% dos usuários nem sabem que existem.
              </p>

              <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-4 sm:gap-5 mb-14 px-4 sm:px-0">
                <a
                  href="https://pay.kiwify.com.br/DmP7zA1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-2xl shadow-brand-accent/30 hover:scale-105 active:scale-95 w-full sm:w-auto md:w-full xl:w-auto"
                >
                  Quero meu acesso <ArrowRight size={20} />
                </a>
                <a
                  href="#programacao"
                  className="border border-white/10 hover:border-brand-accent/50 text-white px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold flex items-center justify-center transition-all bg-white/5 backdrop-blur-md w-full sm:w-auto md:w-full xl:w-auto"
                >
                  Ver programação
                </a>
              </div>

              {/* Social proof */}
              <div className="flex flex-col items-center md:items-start gap-2 mt-5">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5 shrink-0">
                    {[
                      { l: 'D', bg: '#E91E8C' },
                      { l: 'I', bg: '#FF6B2B' },
                      { l: 'N', bg: '#7C3AED' },
                      { l: 'A', bg: '#0891B2' },
                    ].map((a, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-[#070D0D] flex items-center justify-center text-white text-[11px] font-bold"
                        style={{ backgroundColor: a.bg }}
                      >
                        {a.l}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#070D0D] bg-brand-accent flex items-center justify-center text-white text-[11px] font-bold">
                      +
                    </div>
                  </div>
                  <p className="text-sm text-brand-text/80 leading-snug">
                    <span className="font-bold text-brand-text">+ de 1.000 pessoas</span> na comunidade IA Sem Frescura
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              className="relative z-20"
            >
              <div className="laptop">
                <div className="laptop__bezel">
                  <div className="laptop__camera"></div>
                  <div className="laptop__screen">
                    <div className="laptop__topbar">
                      <div className="laptop__dot laptop__dot--red"></div>
                      <div className="laptop__dot laptop__dot--yellow"></div>
                      <div className="laptop__dot laptop__dot--green"></div>
                      <div className="laptop__url">claude.ai</div>
                    </div>

                    <div className="laptop__content">
                      <div className="claude-ui__header">
                        <img className="claude-ui__logo" src="/claude_logo.png" alt="Claude logo" />
                        <div>
                          <div className="claude-ui__title font-semibold">Claude</div>
                          <div className="claude-ui__subtitle uppercase tracking-widest font-bold opacity-60">Seu assistente de IA</div>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {/* Phase 0: Carousel */}
                        {chatPhase === 0 && (
                          <motion.div key="conv-carousel" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}>
                            <div className="claude-ui__msg claude-ui__msg--user">
                              Crie um carrossel dinâmico para meu Instagram sobre IA para negócios.
                            </div>
                            <div className="claude-ui__msg claude-ui__msg--claude">
                              Aqui estão os slides do seu carrossel:
                            </div>
                            <div className="claude-ui__carousel">
                              <div className="claude-ui__carousel-track">
                                {["🎯 Hook", "😤 Problema", "✅ Solução", "🚀 CTA", "🎯 Hook", "😤 Problema", "✅ Solução", "🚀 CTA"].map((label, i) => (
                                  <div key={i} className="w-[80px] h-[100px] bg-brand-tag/30 rounded-md border border-white/10 flex items-center justify-center p-2 text-center text-[9px] uppercase font-bold text-brand-accent tracking-tighter shrink-0">
                                    {label}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Phase 1 & 3: User typing */}
                        {(chatPhase === 1 || chatPhase === 3) && (
                          <motion.div key="typing" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}>
                            <div className="claude-ui__msg claude-ui__msg--user self-end flex gap-1 items-center">
                              {[0, 1, 2].map(i => (
                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFF7EC]/60"
                                  style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite` }} />
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Phase 2: Video scripts */}
                        {chatPhase === 2 && (
                          <motion.div key="conv-scripts" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}>
                            <div className="claude-ui__msg claude-ui__msg--user">
                              Gere 3 roteiros de vídeo curtos sobre produtividade com IA.
                            </div>
                            <div className="claude-ui__msg claude-ui__msg--claude flex flex-col gap-1.5">
                              {[
                                "📽 Como economizar 2h/dia com IA",
                                "📽 5 prompts que mudaram meu negócio",
                                "📽 Do zero ao expert em IA: 7 dias"
                              ].map((script, i) => (
                                <div key={i} className="text-[11px] font-medium">{script}</div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Phase 4: Google Drive analysis */}
                        {chatPhase === 4 && (
                          <motion.div key="conv-drive" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}>
                            <div className="claude-ui__msg claude-ui__msg--user">
                              Analise a documentação dos clientes no Drive e traga uma análise de proposta.
                            </div>
                            <div className="claude-ui__msg claude-ui__msg--claude flex items-start gap-2.5">
                              <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" fill="#00ac47"/>
                                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                              </svg>
                              <div>
                                <div className="text-[11px] font-semibold text-[#e8e8e8] mb-1">Acessando Google Drive...</div>
                                <div className="text-[10px] text-[#888] flex items-center gap-1.5">
                                  <span className="w-3 h-3 border border-[#555] border-t-brand-accent rounded-full animate-spin shrink-0" />
                                  Analisando documentos dos clientes
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="laptop__bottom"></div>
                <div className="laptop__base"></div>
                <div className="laptop__shadow"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* "O Que Você Vai Construir" Section */}
        <section id="workshop" className="py-24 bg-[#0A0F0F] relative overflow-hidden">
          <StarsBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-60" starColor="#FFF7EC" starCount={600} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 bg-brand-tag text-brand-accent text-xs font-bold tracking-widest rounded-full mb-4 border border-brand-accent/20 uppercase">
                ASSISTINDO À GRAVAÇÃO
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">Você sai com isso pronto:</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  id: "01",
                  title: "Claude Chat dominado",
                  desc: "Projetos, artefatos, plugins, memória. Tudo que o chat oferece e você ainda não usa."
                },
                {
                  id: "02",
                  title: "Cowork configurado",
                  desc: "O Claude operando no seu computador: processando arquivos, automatizando tarefas, executando por você."
                },
                {
                  id: "03",
                  title: "Code funcionando",
                  desc: "Sua primeira aplicação construída do terminal. Skills instaladas, estrutura rodando."
                },
                {
                  id: "04",
                  title: "Tokens sob controle",
                  desc: "As técnicas que fazem seu plano render a semana inteira, não acabar na terça."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group glass3d p-10 rounded-3xl relative overflow-hidden transition-all border border-white/10"
                >
                  {/* single direct child so .glass3d > * z-index rule applies here */}
                  <div className="relative">
                    <span className="text-3xl md:text-5xl text-[#B5F2DB] absolute top-0 right-0 font-bold transition-colors pointer-events-none select-none">
                      {item.id}
                    </span>
                    <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight pr-10 md:pr-0">{item.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programação (Journey Path) */}
        <section id="programacao" className="py-32 bg-[#FFF7EC] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-accent/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10" ref={containerRef}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-[#042F34] text-[#B5F2DB] text-[10px] font-bold tracking-[0.3em] rounded-full mb-6 border border-brand-accent/20 uppercase">
                A JORNADA
              </span>
              <h2 className="text-5xl md:text-7xl font-semibold text-[#070D0D] mb-6 leading-tight tracking-tighter">Um caminho desenhado<br />para o seu domínio</h2>
              <p className="text-[#070D0D]/50 max-w-xl mx-auto text-lg mb-8">
                Não é apenas uma aula, é uma evolução guiada. Clique nos módulos para ver os detalhes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 bg-[#042F34] border border-brand-accent/25 px-5 py-2.5 rounded-full shadow-sm">
                  <Calendar size={15} className="text-[#B5F2DB]" />
                  <span className="text-sm font-semibold text-[#B5F2DB] tracking-tight">Gravado em 6 de Junho, 2026</span>
                </div>
              </div>
            </motion.div>

            {/* Milestones and Nodes */}
            <div className="relative">
              {/* Floating Icons along path */}
              <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
                {[
                  { top: '8%', left: '50.5%', Icon: Zap, size: 16, delay: 0 },
                  { top: '22%', left: '49.5%', Icon: Sparkles, size: 20, delay: 1.5 },
                  { top: '35%', left: '50.2%', Icon: Zap, size: 14, delay: 0.5 },
                  { top: '50%', left: '49.8%', Icon: MessageSquare, size: 18, delay: 2 },
                  { top: '65%', left: '50.3%', Icon: Zap, size: 22, delay: 1 },
                  { top: '80%', left: '49.7%', Icon: Terminal, size: 16, delay: 2.5 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item.delay
                    }}
                    style={{ top: item.top, left: item.left }}
                    className="absolute -translate-x-1/2"
                  >
                    <item.Icon size={item.size} className="text-brand-accent" />
                  </motion.div>
                ))}
              </div>

              {/* Desktop SVG Path */}
              <svg
                className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full pointer-events-none hidden md:block"
                viewBox="0 0 100 1000"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M50,0 Q65,100 50,200 T50,400 T50,600 T50,800 T50,950"
                  stroke="rgba(7,13,13,0.05)"
                  strokeWidth="0.1"
                />
                <motion.path
                  d="M50,0 Q65,100 50,200 T50,400 T50,600 T50,800 T50,950"
                  stroke="var(--color-brand-accent)"
                  strokeWidth="0.2"
                  style={{ pathLength }}
                />
              </svg>

              {/* Mobile Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#070D0D]/10 md:hidden" />

              {/* Sub-milestones (Visible when no main module is expanded) */}
              <PathNode top={2} side="right" icon={MessageSquare} title="Projetos Internos" visible={activeMilestone === null} />

              <PathNode top={28} side="left" icon={Check} title="Agentes rodando no automático" visible={activeMilestone === null} />
              {/* <PathNode top={30} side="right" icon={Zap} title="Sync Local" visible={activeMilestone === null} /> */}

              {/* <PathNode top={53} side="left" icon={Terminal} title="Deep Knowledge" visible={activeMilestone === null} /> */}
              <PathNode top={58} side="right" icon={Globe} title="Rodar no Terminal" visible={activeMilestone === null} />

              <PathNode top={78} side="left" icon={Sparkles} title="Economia de Tokens" visible={activeMilestone === null} />
              <PathNode top={83} side="right" icon={Zap} title="Savings" visible={activeMilestone === null} />

              {/* Milestones */}
              <div className="relative flex flex-col pt-10">
                <JourneyMilestone
                  time="Módulo 1: Claude Chat"
                  icon={MessageSquare}
                  title="Você pergunta. Ele responde."
                  description="Dominando a plataforma inteira: Projetos, artefatos e plugins. Pare de usar apenas 10% do potencial do Claude."
                  details={[
                    { label: "Projetos", desc: "Suba arquivos e instruções que o Claude consulta em toda conversa", icon: Layout },
                    { label: "Artefatos", desc: "Gere dashboards, relatórios e ferramentas interativas direto no chat", icon: Zap },
                    { label: "Plugins (MCP)", desc: "Puxe dados do Drive, leia emails do Gmail e organize o Calendar", icon: Globe },
                    { label: "Memória", desc: "Configure uma vez e o Claude mantém seu contexto entre sessões", icon: MessageSquare }
                  ]}
                  caseExtra="Projeto configurado + plugin conectado + artefato funcional com seus dados."
                  side="left"
                  active={activeMilestone === 0}
                  onClick={() => setActiveMilestone(activeMilestone === 0 ? null : 0)}
                />

                <JourneyMilestone
                  time="Módulo 2: Claude Cowork"
                  icon={Users}
                  title="Você pede. O Claude executa."
                  description="O Claude sai do navegador e entra no seu computador. Acesso a arquivos locais e tarefas sem supervisão manual."
                  details={[
                   { label: "Setup", desc: "Configure o Cowork com acesso às pastas e ferramentas do seu trabalho", icon: Zap },
                  { label: "Processamento", desc: "Cruze dados de múltiplas planilhas e gere relatórios consolidados automaticamente", icon: Layout },
                  { label: "Tarefas autônomas", desc: "O Claude executa sequências de ações no seu computador enquanto você faz outra coisa", icon: Check },
                  { label: "Rotinas sob demanda", desc: "Crie comandos que disparam fluxos inteiros de pesquisa, síntese e entrega com uma instrução", icon: ArrowRight }
                  ]}
                  caseExtra="Automação real que substitui um processo manual da sua rotina."
                  side="right"
                  active={activeMilestone === 1}
                  onClick={() => setActiveMilestone(activeMilestone === 1 ? null : 1)}
                />

                <JourneyMilestone
                  time="Módulo 3: Claude Code"
                  icon={Terminal}
                  title="Você planeja. Ele constrói."
                  description="Criação de aplicações, scripts e sistemas direto do terminal. Não precisa ser programador, precisa saber pedir."
                  details={[
                   { label: "Terminal", desc: "Instale, configure e rode seu primeiro projeto funcional do zero", icon: Terminal },
                  { label: "Skills", desc: "Crie regras que padronizam entregas: tom de voz, formato, estrutura de código", icon: Zap },
                  { label: "Aplicações", desc: "Construa dashboards, landing pages e ferramentas internas com um prompt", icon: Layout },
                  { label: "Integrações", desc: "Conecte Supabase, Notion, Google Sheets e APIs pra sistemas que atualizam sozinhos", icon: Globe }
                  ]}
                  caseExtra="Ferramenta funcional construída do zero no terminal."
                  side="left"
                  active={activeMilestone === 2}
                  onClick={() => setActiveMilestone(activeMilestone === 2 ? null : 2)}
                />

                <JourneyMilestone
                  time="Bônus: Economia de Tokens"
                  icon={Zap}
                  title="O módulo que se paga sozinho"
                  description="Como dominar o consumo de tokens e fazer sua assinatura render 5x mais com as estratégias certas."
                  details={[
                    { label: "Consumo", desc: "O que realmente gasta seus créditos", icon: Check },
                    { label: "Compactação", desc: "Formatos e estruturas que economizam", icon: Layout },
                    { label: "Sessão", desc: "Quando abrir nova conversa ou continuar", icon: MessageSquare },
                    { label: "Camadas", desc: "Chat vs Cowork vs Code: quando usar", icon: Zap }
                  ]}
                  caseExtra="Estratégia de economia instalada e configurada na hora."
                  side="right"
                  active={activeMilestone === 3}
                  onClick={() => setActiveMilestone(activeMilestone === 3 ? null : 3)}
                />
              </div>
            </div>

            {/* Final Journey Note */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mt-2 text-center p-12 glass3d rounded-[48px] border border-brand-accent/20 relative"
            >
              <div className="w-64 absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-accent text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                O Resultado Final
              </div>
              <h3 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">Você não vai só assistir. Vai colocar em prática.</h3>
              <p className="text-brand-text/60 max-w-2xl mx-auto text-lg leading-relaxed">
                Ao final desta jornada, você não apenas terá assistido a uma aula. Você terá construído, automatizado e economizado.</p>
            </motion.div>
          </div>
        </section>

        {/* Mentors Section */}
        <section id="mentores" className="py-24 md:py-32 bg-[#0A0F0F] relative overflow-hidden">
          <StarsBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-50" starColor="#FFF7EC" starCount={600} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
             <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="text-center mb-16 md:20"
              >
                <span className="inline-block px-4 py-1.5 bg-brand-tag text-brand-accent text-[10px] font-bold tracking-[0.2em] rounded-full mb-6 border border-brand-accent/20 uppercase">
                  QUEM VAI TE ENSINAR
                </span>
                <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight">Seus mentores nessa imersão</h2>
                <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
                  Experiência real com aplicações e construções de produtos de IA que escalam.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {/* Michel */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 p-2 rounded-[32px] overflow-hidden group hover:border-brand-accent/30 transition-all duration-500"
                >
                  <div className="bg-[#111] p-8 md:p-10 rounded-[28px] h-full flex flex-col lg:flex-row gap-8 md:gap-10 items-center lg:items-start transition-all group-hover:bg-[#151515]">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-accent/20 group-hover:border-brand-accent transition-colors">
                      <img src="/michel.png" alt="Michel Hilgemberg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">Michel Hilgemberg</h3>
                      <div className="w-12 h-1 bg-brand-accent/30 mb-6 group-hover:w-20 transition-all mx-auto lg:mx-0"></div>
                      <ul className="space-y-4 text-left">
                        {[
                          "Engenheiro Mecânico pela UFPR (1° lugar da turma)",
                          "Pós graduado em IA pela FIAP",
                          "Intercâmbio na RWTH, Alemanha",
                          "AI Assistant no Fraunhofer IPT (Instituto Alemão)"
                        ].map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/80 leading-snug font-medium">
                            <Check size={18} className="text-brand-accent shrink-0 mt-0.5" />
                            <span className="text-sm">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Lucas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 p-2 rounded-[32px] overflow-hidden group hover:border-brand-accent/30 transition-all duration-500"
                >
                  <div className="bg-[#111] p-8 md:p-10 rounded-[28px] h-full flex flex-col lg:flex-row gap-8 md:gap-10 items-center lg:items-start transition-all group-hover:bg-[#151515]">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-accent/20 group-hover:border-brand-accent transition-colors">
                      <img src="/lucas.png" alt="Lucas Xiang Yu" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">Lucas Xiang Yu</h3>
                      <div className="w-12 h-1 bg-brand-accent/30 mb-6 group-hover:w-20 transition-all mx-auto lg:mx-0"></div>
                      <ul className="space-y-4 text-left">
                        {[
                          "Engenheiro Mecânico pela UFPR (3° lugar da turma)",
                          "Intercâmbio na RWTH, Alemanha",
                          "Manufacturing Assistant no Fraunhofer IPT (Instituto Alemão)",
                          "Co-founder Dinno.chat"
                        ].map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/80 leading-snug font-medium">
                            <Check size={18} className="text-brand-accent shrink-0 mt-0.5" />
                            <span className="text-sm">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="py-20 bg-[#FFF7EC] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center"
            >
              <span className="inline-block px-3 py-1 bg-[#042F34] text-[#B5F2DB] text-xs font-bold tracking-widest rounded-full mb-4 border border-brand-accent/20 uppercase">
                DEPOIMENTOS
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#070D0D] mb-3 tracking-tight">O que estão falando</h2>
              <p className="text-[#070D0D] text-lg">Prints direto do WhatsApp, sem edição, sem roteiro.</p>
            </motion.div>
          </div>

          <div className="space-y-2">
            {depoimentoRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="overflow-hidden py-12"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
                  maskImage:
                    'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
                  WebkitMaskComposite: 'source-in',
                  maskComposite: 'intersect',
                }}
              >
                <div className={`flex gap-6 px-2 items-center ${rowIndex === 0 ? 'testimonials-track-left' : 'testimonials-track-right'}`}>
                  {[...row, ...row].map((item, i) => (
                    <div
                      key={i}
                      className="shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
                      style={{ transform: `rotate(${item.rotation}deg)` }}
                    >
                      <img
                        src={item.src}
                        alt="Depoimento"
                        className="w-[300px] sm:w-[340px] h-auto block"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="preco" className="py-24 bg-[#0A0F0F] relative overflow-hidden">
          <StarsBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-40" starColor="#FFF7EC" starCount={600} />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <h2 className="text-5xl md:text-6xl font-semibold mb-16 text-white tracking-tight">Garanta seu acesso</h2>

              <div className="flex items-stretch gap-6 max-w-md mx-auto mb-10">

                {/* Card Workshop */}
                <div className="flex-1 w-full bg-white text-[#070D0D] p-8 rounded-3xl relative shadow-xl shadow-black/30 border border-white/10 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#070D0D] border border-[#070D0D]/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-lg whitespace-nowrap">
                    Workshop Gravado
                  </span>

                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4 mb-3">
                    <span className="text-4xl font-bold text-brand-accent">R$ 97,90</span>
                  </div>

                  <hr className="mb-6 mt-4 border-[#070D0D]/10" />

                  <ul className="text-left space-y-3 text-sm flex-1">
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> 6h de treinamento gravado
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> Gravação por 12 meses
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> Materiais e templates
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> Cases práticos com I.A
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> Automações construídas passo a passo
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> Projetos funcionais prontos
                    </li>
                  </ul>

                  <div className="mt-auto pt-8">
                    <a href="https://pay.kiwify.com.br/DmP7zA1" target="_blank" rel="noopener noreferrer" className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 active:scale-95">
                      Quero meu acesso <ArrowRight size={18} />
                    </a>
                    <p className="mt-3 text-[11px] text-[#070D0D]/35 text-center">Pagamento seguro · Garantia de 7 dias</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-[#070D0D]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-white text-center mb-16 tracking-tight">Perguntas frequentes</h2>

            <div className="space-y-4">
              {[
                { q: "Preciso saber programar?", a: "Não. O módulo de Code ensina do zero, desde instalar o terminal até rodar seu primeiro projeto. Quem já programa vai aproveitar os módulos avançados de Skills e integrações." },
                { q: "Funciona para qualquer tipo de negócio?", a: "Sim. Os recursos do Claude (Chat, Cowork e Code) se aplicam a qualquer área. No workshop, usamos exemplos de gestão, conteúdo, vendas, operações e análise de dados." },
                { q: "Qual plano do Claude preciso ter?", a: "O plano gratuito funciona para acompanhar o módulo de Chat. Para Cowork e Code, o plano Pro é recomendado. No módulo de tokens, ensinamos como fazer o Pro render a semana inteira." },
                { q: "E se eu não gostar?", a: "Garantia total de 7 dias. Sem perguntas, sem burocracia." },
                { q: "Eu já uso o Claude no chat todo dia. Vai ter conteúdo pra mim?", a: "Com certeza. O módulo de Chat cobre recursos avançados que a maioria não usa: Projects, artefatos interativos, plugins com Google Drive e Gmail. E os módulos de Cowork e Code são território novo pra 95% dos usuários." }
              ].map((item, i) => (
                <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-lg font-semibold text-white pr-4">{item.q}</span>
                    <ChevronDown className="text-brand-accent transition-transform group-open:rotate-180" size={20} />
                  </summary>
                  <div className="px-6 pb-6 text-white/50 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-[#FFF7EC]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               className="bg-gradient-to-br from-brand-accent to-brand-accent-hover p-12 md:p-20 rounded-[40px] text-center text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none noise-overlay"></div>

              <div className="relative z-10 px-4">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6 leading-tight tracking-tighter">Claude Sem Frescura.<br />Resultado de verdade.</h2>
                <p className="text-white/80 text-lg sm:text-xl font-medium mb-12 max-w-xl mx-auto">
                  Acesso imediato. No seu ritmo. Uma mudança real no seu negócio.
                </p>
                <a href="https://pay.kiwify.com.br/DmP7zA1" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-brand-accent hover:bg-neutral-100 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xl sm:text-2xl font-bold transition-all shadow-2xl active:scale-95 w-full sm:w-auto text-center">
                  Quero meu acesso →
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-[#070D0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
          <div>
            © 2026 Claude Sem Frescura
          </div>
          <div className="flex gap-8 lowercase opacity-50 font-medium font-sans">
            <span>contato@iasemfrescura.com</span>
            <span>termos de uso</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
