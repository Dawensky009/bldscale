import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { 
  Play, Video, Cpu, Globe, ArrowRight, Layers, Zap, 
  BarChart3, MoveRight, ChevronRight, CheckCircle2,
  Instagram, Twitter, Linkedin, Github, ArrowUp,
  Sparkles, ShoppingBag, Workflow, Database, PlayCircle, Plus,
  Star, Quote, Users, Clock, ShieldCheck, Mail, Phone, MapPin,
  Bot, FastForward, TrendingUp, Award, Laptop, Eye, Terminal,
  TrendingDown, ThumbsUp, Trophy, Check, Target, X, ChevronLeft, Menu
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Shared Components ---

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const moveCursor = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (outlineRef.current) {
        outlineRef.current.style.left = `${e.clientX}px`;
        outlineRef.current.style.top = `${e.clientY}px`;
        outlineRef.current.style.transform = `translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" style={{ transform: 'translate(-50%, -50%)' }} />
      <div ref={outlineRef} className="cursor-outline hidden lg:block" />
    </>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 md:w-14 md:h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-[90] py-4 md:py-8 px-4 md:px-12">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl md:rounded-2xl px-6 md:px-10 py-4 md:py-5 shadow-2xl relative">
        <a href="#home" className="text-lg md:text-xl font-black tracking-[0.4em] text-white flex items-center">
          BLD<span className="text-primary">SC</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10 text-[9px] uppercase tracking-[0.5em] font-bold text-gray-500">
          <a href="#home" className="hover:text-primary transition-colors">Home</a>
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#work" className="hover:text-primary transition-colors">Portfolio</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#contact" className="hidden sm:block bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-primary transition-all shadow-lg">
            Inquiry
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full mt-4 bg-navy-950 border border-white/5 rounded-2xl p-8 flex flex-col space-y-6 lg:hidden shadow-2xl z-[100]"
            >
              <a href="#home" onClick={() => setIsOpen(false)} className="text-white text-sm font-black uppercase tracking-widest">Home</a>
              <a href="#services" onClick={() => setIsOpen(false)} className="text-white text-sm font-black uppercase tracking-widest">Services</a>
              <a href="#work" onClick={() => setIsOpen(false)} className="text-white text-sm font-black uppercase tracking-widest">Portfolio</a>
              <a href="#testimonials" onClick={() => setIsOpen(false)} className="text-white text-sm font-black uppercase tracking-widest">Testimonials</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="bg-primary text-black text-center py-4 rounded-xl font-black uppercase tracking-widest">Inquiry</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// --- Page Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 15]);

  const [text, setText] = useState("");
  const phrases = ["AI-DRIVEN SCALE ENGINE.", "CINEMATIC BRAND STORIES.", "AUTONOMOUS GROWTH CORE."];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-24 md:pt-20">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 z-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center space-x-4 mb-8 md:mb-10">
               <div className="h-[1px] w-8 md:w-12 bg-primary"></div>
               <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.5em]">The AI-First Agency</span>
            </div>
            
            <div className="min-h-[180px] sm:min-h-[250px] md:min-h-[450px]">
              <h1 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[150px] font-black leading-[0.85] tracking-tighter text-white mb-10 uppercase">
                {text.split(" ").map((word, i) => (
                  <React.Fragment key={i}>
                    {word === "SCALE" || word === "BRAND" || word === "GROWTH" ? (
                      <span className="text-transparent border-white border-[1px] stroke-white px-2 md:px-4 italic" style={{ WebkitTextStroke: '1px white' }}>
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    {" "}
                    {i === 0 && <br className="hidden sm:block" />}
                    {i === 1 && <br className="hidden sm:block" />}
                  </React.Fragment>
                ))}
                <span className="inline-block w-1 md:w-2 lg:w-4 h-8 md:h-16 lg:h-32 bg-primary ml-2 animate-pulse align-middle"></span>
              </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl">
               <p className="text-gray-500 text-base md:text-xl font-light leading-relaxed border-l border-white/10 pl-6 md:pl-8">
                 We architect cinematic AI commercials and autonomous digital ecosystems. Zero friction. 100% Brand Authority. 
               </p>
               <div className="flex flex-col justify-end">
                  <a href="#contact" className="group flex items-center space-x-4 md:space-x-6 text-white overflow-hidden">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                      <MoveRight size={28} className="md:size-32" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                       <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary">Start Growing</span>
                       <span className="text-[8px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest">Limited Slots Available</span>
                    </div>
                  </a>
               </div>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-4 relative h-[400px] sm:h-[600px] md:h-[900px] flex items-center">
          <motion.div style={{ y, rotate }} className="w-[120%] lg:w-[150%] h-[80%] relative z-10 -ml-16 lg:-ml-64 rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/5 shadow-2xl">
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover scale-110 grayscale" alt="Bespoke Architecture" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => (
  <section className="py-12 md:py-20 bg-white/5 border-y border-white/5 overflow-hidden whitespace-nowrap">
    <div className="animate-marquee flex items-center">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex space-x-12 md:space-x-20 items-center px-10">
          <span className="text-xl md:text-3xl font-black text-white/10 uppercase tracking-widest italic">trusted by 50+ elite brands</span>
          <Plus className="text-primary" size={16} />
          <span className="text-xl md:text-3xl font-black text-white/10 uppercase tracking-widest italic">driven by ai neural engines</span>
          <Plus className="text-primary" size={16} />
          <span className="text-xl md:text-3xl font-black text-white/10 uppercase tracking-widest italic">autonomous scale systems</span>
          <Plus className="text-primary" size={16} />
        </div>
      ))}
    </div>
  </section>
);

const ConversionProcess = () => {
  const steps = [
    { title: "Strategic Audit", desc: "We dissect your current sales process to find every leaking dollar.", icon: <Eye /> },
    { title: "AI Neural Assets", desc: "We generate cinematic video ads that stop the scroll instantly.", icon: <Bot /> },
    { title: "Conversion Engine", desc: "We build your high-converting, automated sales infrastructure.", icon: <Zap /> },
    { title: "Aggressive Scale", desc: "Data-driven ad deployment to multiply your revenue 24/7.", icon: <TrendingUp /> }
  ];

  return (
    <section className="py-24 md:py-40 bg-[#050505] px-6 md:px-12 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">The Conversion Formula</h2>
            <h3 className="text-4xl md:text-[120px] lg:text-[140px] font-black text-white tracking-tighter leading-[0.8] md:leading-none">HOW WE <br /> DOMINATE.</h3>
          </div>
          <p className="text-gray-500 max-w-sm font-light text-base md:text-lg border-l border-primary pl-6 md:pl-8">
            Most agencies guess. We engineer. Using neural intelligence to predict and drive human action.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-8 md:p-12 rounded-[30px] md:rounded-[40px] bg-white/5 border border-white/5 group relative overflow-hidden">
              <div className="text-primary mb-8 md:mb-12 transform group-hover:scale-110 transition-transform">
                {React.cloneElement(s.icon, { size: 40 })}
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 uppercase">0{i+1}. {s.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">{s.desc}</p>
              <div className="ai-scan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceModal = ({ isOpen, onClose, service }) => {
  const [index, setIndex] = useState(0);
  const projects = service?.projects || [];

  const next = () => setIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-20"
    >
      <button onClick={onClose} className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-primary transition-colors z-[110]">
        <X size={32} md:size={40} />
      </button>

      <div className="max-w-7xl w-full h-full flex flex-col justify-center relative">
        <div className="mb-6 md:mb-10">
          <h2 className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-2 md:mb-4">Case Study / {service.title}</h2>
          <h3 className="text-2xl md:text-7xl font-black text-white tracking-tighter uppercase">{projects[index]?.name}</h3>
        </div>

        <div className="relative flex-grow flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full rounded-2xl md:rounded-[40px] overflow-hidden border border-white/5 relative"
            >
              <img src={projects[index]?.img} className="w-full h-full object-cover" alt={projects[index]?.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
                 <div className="max-w-xl">
                    <p className="text-gray-300 text-sm md:text-2xl font-light leading-relaxed mb-4 md:mb-6 italic">"{projects[index]?.desc}"</p>
                    <div className="flex items-center space-x-4 md:space-x-6">
                       <div className="bg-primary text-black px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase">Live Link</div>
                       <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2">Project Video <Play size={10} md:size={12} fill="white" /></div>
                    </div>
                 </div>
                 <div className="flex space-x-2 md:space-x-4">
                    <button onClick={prev} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all">
                      <ChevronLeft size={20} md:size={24} />
                    </button>
                    <button onClick={next} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all">
                      <ChevronRight size={20} md:size={24} />
                    </button>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-8 md:mt-12 flex justify-center space-x-2 md:space-x-4">
          {projects.map((_, i) => (
            <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-12 md:w-20 bg-primary' : 'w-6 md:w-10 bg-white/10'}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { 
      title: "Commercial Video", 
      desc: "Hollywood-grade cinematic commercials generated via custom AI neural engines.", 
      img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
      icon: <Video />,
      projects: [
        { name: "Luxe Watch Launch", desc: "A cinematic AI-driven reveal of the 'Horizon' elite timepiece collection.", img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { name: "Global Fashion Week", desc: "Digital assets created for a NY-based fashion powerhouse using neural video generation.", img: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
      ]
    },
    { 
      title: "Hyper-Growth Ads", 
      desc: "Short-form AI content built for maximum ROI on TikTok, IG, and FB.", 
      img: "https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
      icon: <Target />,
      projects: [
        { name: "E-Com Blitz", desc: "Reduced customer acquisition cost by 60% through AI-tested visual hooks.", img: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
      ]
    },
    { 
      title: "Neural E-Com Engine", 
      desc: "High-speed landing pages and stores optimized for 2026 sales psychology.", 
      img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
      icon: <ShoppingBag />,
      projects: [
        { name: "Ciatech Platform", desc: "Microsoft-certified infrastructure bult for extreme global scalability.", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
      ]
    },
    { 
      title: "Autonomous CRM", 
      desc: "Zero manual work. Automated lead nurturing and sales closing sequences.", 
      img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
      icon: <Workflow />,
      projects: [
        { name: "Logistics Core", desc: "AI agents handling customer support and scheduling for a global carrier.", img: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
      ]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-40 bg-[#050505] px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 md:mb-32 text-center">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Our Elite Solutions</h2>
          <h3 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[120px] font-black text-white tracking-tighter uppercase leading-[0.85]">THE GROWTH <br /> SUITE.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }} 
              onClick={() => setSelectedService(s)}
              className="group relative rounded-[30px] md:rounded-[50px] overflow-hidden min-h-[350px] md:min-h-[500px] border border-white/5 shadow-2xl cursor-pointer"
            >
              <img src={s.img} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between">
                <div className="text-primary transform group-hover:rotate-12 transition-transform">
                  {React.cloneElement(s.icon, { size: 32 })}
                </div>
                <div>
                  <h4 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-6 uppercase italic tracking-tighter leading-none">{s.title}</h4>
                  <p className="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-sm">{s.desc}</p>
                  <div className="mt-4 md:mt-8 flex items-center space-x-2 text-primary text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                     <span>View Case Studies</span> <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            isOpen={!!selectedService} 
            onClose={() => setSelectedService(null)} 
            service={selectedService} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const TestimonialsSection = () => {
  const reviews = [
    { name: "Jean Marc", role: "CEO, TechFlow", text: "BLDSCALE completely transformed our product launch. The AI video was cinematic and the sales automation saved us 20 hours a week.", avatar: "https://i.pravatar.cc/100?u=1", stats: "Revenue +45%" },
    { name: "Marie L.", role: "Founder, LuxeHaiti", text: "I've worked with many agencies, but none delivered this level of visual quality so fast. Truly the elite choice.", avatar: "https://i.pravatar.cc/100?u=2", stats: "10k+ New Leads" },
    { name: "Robert Smith", role: "Marketing Director", text: "Their automated e-commerce setup is a game changer. Our conversion rate jumped by 35% in just one month.", avatar: "https://i.pravatar.cc/100?u=3", stats: "3.5x ROAS" }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-40 bg-navy-950 px-6 md:px-12 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center mb-20 md:mb-32">
           <div className="lg:col-span-5">
              <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Client Success</h2>
              <h3 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-none">THE VOICES <br /> OF SCALE.</h3>
           </div>
           <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              <div className="p-8 md:p-10 rounded-2xl md:rounded-[30px] bg-white/5 border border-white/5 shadow-inner">
                 <div className="text-3xl md:text-4xl font-black text-white mb-2 uppercase">98%</div>
                 <p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Retention Rate</p>
              </div>
              <div className="p-8 md:p-10 rounded-2xl md:rounded-[30px] bg-white/5 border border-white/5 shadow-inner">
                 <div className="text-3xl md:text-4xl font-black text-primary mb-2 uppercase">$2M+</div>
                 <p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Revenue Impact</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <motion.div key={i} whileHover={{ y: -15 }} className="p-8 md:p-12 rounded-[30px] md:rounded-[50px] bg-black border border-white/5 relative flex flex-col justify-between h-full shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full"></div>
              <div>
                <div className="flex space-x-1 mb-8 md:mb-10">
                   {[...Array(5)].map((_, star) => <Star key={star} size={12} md:size={14} className="fill-primary text-primary" />)}
                </div>
                <Quote className="text-primary mb-10 opacity-10 absolute top-10 right-10" size={40} md:size={60} />
                <p className="text-gray-300 text-base md:text-xl font-light leading-relaxed mb-10 md:mb-12 italic">"{r.text}"</p>
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-6 md:mb-8">
                  <img src={r.avatar} className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-primary/20" alt={r.name} />
                  <div>
                    <h4 className="text-white font-bold text-base md:text-lg">{r.name}</h4>
                    <p className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-widest">{r.role}</p>
                  </div>
                </div>
                <div className="pt-6 md:pt-8 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center space-x-2 text-primary font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em]">
                      <Check size={12} md:size={14} /> <span>{r.stats}</span>
                   </div>
                   <Trophy size={16} md:size={20} className="text-gray-800" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkArchive = () => (
  <section id="work" className="py-24 md:py-40 bg-[#050505] px-6 md:px-12 border-b border-white/5">
     <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-10">
          <div>
            <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Archive</h2>
            <h3 className="text-4xl md:text-[100px] lg:text-[120px] font-black text-white tracking-tighter leading-[0.8]">SELECTED <br /> PROJECTS.</h3>
          </div>
          <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center group">
             View Full Archive <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-20">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/11] rounded-3xl md:rounded-[60px] overflow-hidden mb-8 md:mb-12 border border-white/5 relative bg-white/5 shadow-2xl">
                   <img src={`https://images.pexels.com/photos/${i === 1 ? '3183150' : i === 2 ? '190819' : i === 3 ? '4483610' : '3373739'}/pexels-photo-${i === 1 ? '3183150' : i === 2 ? '190819' : i === 3 ? '4483610' : '3373739'}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Work" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>
                   <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-black/60 backdrop-blur-md px-4 md:px-6 py-2 rounded-full border border-white/10 text-[8px] md:text-[9px] font-black text-white uppercase tracking-widest">Case Study 0{i}</div>
                </div>
                <div className="flex justify-between items-end px-2 md:px-4">
                  <div>
                    <p className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3">0{i} / 2026</p>
                    <h4 className="text-2xl md:text-5xl font-black text-white group-hover:text-primary transition-colors italic tracking-tighter uppercase">{i === 1 ? 'Global Scale' : i === 2 ? 'Luxe Narrative' : i === 3 ? 'E-Com Core' : 'Growth Asset'}</h4>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all">
                    <ArrowRight size={20} md:size={24} className="-rotate-45" />
                  </div>
                </div>
             </div>
           ))}
        </div>
     </div>
  </section>
);

const StaffSection = () => {
  const staff = [
    { name: "Dawensky T.", role: "Founder & Chief Architect", img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Daky", role: "AI Creative Lead", img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Marcus Vane", role: "E-Commerce Specialist", img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  return (
    <section id="staff" className="py-24 md:py-40 bg-[#050505] px-6 md:px-12 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 md:mb-32">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">The Staff</h2>
          <h3 className="text-4xl md:text-9xl font-black text-white tracking-tighter uppercase">MINDS OF <br /> SCALE.</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {staff.map((m, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group text-center md:text-left">
              <div className="aspect-[4/5] rounded-3xl md:rounded-[50px] overflow-hidden mb-6 md:mb-10 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 relative shadow-2xl">
                <img src={m.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={m.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 italic tracking-tighter uppercase">{m.name}</h4>
              <p className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => (
  <section id="contact" className="py-24 md:py-40 bg-[#050505] px-6 md:px-12 border-t border-white/5">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
      <div className="lg:col-span-5">
         <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Partner With Us</h2>
         <h3 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[120px] font-black text-white tracking-tighter leading-[0.8] mb-12 uppercase">LET'S <br /> BUILD.</h3>
         <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-12 md:mb-20 max-w-sm">
            We only take 2 new partners per cycle to ensure elite results. Apply today for a growth consultation.
         </p>
         <div className="space-y-8 md:space-y-12">
            <div className="flex items-center space-x-6 md:space-x-8">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center text-primary border border-white/5 shadow-inner"><Mail size={20} md:size={24} /></div>
               <div><p className="text-[8px] md:text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Direct Email</p><p className="text-lg md:text-2xl text-white font-black italic tracking-tighter uppercase">hello@bldscale.com</p></div>
            </div>
            <div className="flex items-center space-x-6 md:space-x-8">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center text-primary border border-white/5 shadow-inner"><Phone size={20} md:size={24} /></div>
               <div><p className="text-[8px] md:text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Global Line</p><p className="text-lg md:text-2xl text-white font-black italic tracking-tighter uppercase">+509 4000 0000</p></div>
            </div>
         </div>
      </div>
      <div className="lg:col-span-7 p-8 md:p-16 rounded-[40px] md:rounded-[60px] bg-white/5 border border-white/5 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
         <form className="space-y-8 md:space-y-10 relative z-10" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
               <div className="space-y-3">
                  <label className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Company Name</label>
                  <input type="text" placeholder="Lux Media" className="w-full bg-transparent border-b border-white/10 py-4 md:py-5 text-white outline-none focus:border-primary transition-all text-base md:text-lg font-light" />
               </div>
               <div className="space-y-3">
                  <label className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Work Email</label>
                  <input type="email" placeholder="ceo@company.com" className="w-full bg-transparent border-b border-white/10 py-4 md:py-5 text-white outline-none focus:border-primary transition-all text-base md:text-lg font-light" />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Primary Objective</label>
               <select className="w-full bg-transparent border-b border-white/10 py-4 md:py-5 text-white outline-none focus:border-primary appearance-none text-base md:text-lg font-light">
                  <option className="bg-black">Full Scale Transformation</option>
                  <option className="bg-black">AI Video Production</option>
                  <option className="bg-black">E-Com Core Engine</option>
                  <option className="bg-black">Automation Ecosystem</option>
               </select>
            </div>
            <div className="space-y-3">
               <label className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Project Details</label>
               <textarea placeholder="Briefly describe your current bottlenecks..." className="w-full bg-transparent border-b border-white/10 py-4 md:py-5 text-white outline-none focus:border-primary h-24 md:h-32 resize-none text-base md:text-lg font-light"></textarea>
            </div>
            <button className="w-full bg-primary text-black font-black py-6 md:py-8 rounded-2xl md:rounded-[30px] text-[10px] md:text-xs uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl shadow-primary/20 flex items-center justify-center group">
               SUBMIT FOR AUDIT <MoveRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </button>
         </form>
      </div>
    </div>
  </section>
);

const FinalFooter = () => (
  <footer className="bg-[#050505] pt-24 md:pt-40 pb-12 border-t border-white/5 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto text-center">
      <div className="text-4xl md:text-6xl lg:text-[120px] font-black tracking-[0.5em] text-white mb-8 md:mb-12 uppercase">BLDSCALE</div>
      <div className="flex justify-center space-x-8 md:space-x-12 mb-16 md:mb-24 text-[8px] md:text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
         <a href="#" className="hover:text-primary transition-all">Instagram</a>
         <a href="#" className="hover:text-primary transition-all">LinkedIn</a>
         <a href="#" className="hover:text-primary transition-all">Twitter</a>
         <a href="#" className="hover:text-primary transition-all">Behance</a>
      </div>
      <div className="text-[7px] md:text-[9px] text-gray-800 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© 2026 BLDSCALE — THE APEX OF DIGITAL ARCHITECTURE</p>
        <p className="italic">Architected with Excellence by Daky_400$/day</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="bg-[#050505] selection:bg-primary selection:text-black cursor-none scroll-smooth">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      
      <main>
        <Hero />
        <SocialProof />
        <ConversionProcess />
        <ServicesGrid />
        <TestimonialsSection />
        <WorkArchive />
        <StaffSection />
        <ContactForm />
      </main>

      <FinalFooter />
    </div>
  );
}

export default App;
