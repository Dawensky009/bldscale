import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Video, Cpu, Globe, ArrowRight, Layers, Zap, 
  BarChart3, MoveRight, ChevronRight, CheckCircle2,
  Instagram, Twitter, Linkedin, Github, ArrowUp,
  MousePointer2, Sparkles, ShoppingBag, Terminal,
  Workflow, Database, Box, PlayCircle, Plus
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// --- Components ---

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  useEffect(() => {
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
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => (
  <nav className="fixed w-full z-[90] py-8 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl px-10 py-5">
      <div className="text-xl font-black tracking-[0.4em] text-white">
        BLD<span className="text-primary">SC</span>
      </div>
      <div className="hidden lg:flex space-x-12 text-[9px] uppercase tracking-[0.5em] font-bold text-gray-500">
        <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
        <a href="#showcase" className="hover:text-primary transition-colors">Showcase</a>
        <a href="#agency" className="hover:text-primary transition-colors">Agency</a>
      </div>
      <div className="flex items-center space-x-8">
         <span className="hidden md:block text-[8px] font-black text-primary uppercase tracking-[0.3em]">Status: Accepting Clients</span>
         <button className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-primary transition-all">
           Inquiry
         </button>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 15]);

  return (
    <section className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-20">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Editorial Typography */}
        <div className="lg:col-span-8 z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center space-x-4 mb-10">
               <div className="h-[1px] w-12 bg-primary"></div>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">The Growth Engine</span>
            </div>
            
            <h1 className="text-6xl md:text-[160px] font-black leading-[0.85] tracking-tighter text-white mb-10">
              WE <span className="text-transparent border-white border-[1px] stroke-white px-4 italic" style={{ WebkitTextStroke: '1px white' }}>SCALE</span> <br />
              YOUR VISION.
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
               <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed border-l border-white/10 pl-8">
                 We engineer high-performance digital ecosystems. From cinematic visuals to autonomous e-commerce engines, we build what competitors can't touch.
               </p>
               <div className="flex flex-col justify-end">
                  <button className="group flex items-center space-x-6 text-white overflow-hidden">
                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                      <MoveRight size={32} />
                    </div>
                    <div className="flex flex-col items-start">
                       <span className="text-xs font-black uppercase tracking-widest text-primary">Start Scaling</span>
                       <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Reserve Your Slot</span>
                    </div>
                  </button>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Oversized Offset Image */}
        <div className="lg:col-span-4 relative h-[600px] md:h-[900px] flex items-center">
          <motion.div 
            style={{ y, rotate }}
            className="w-[150%] h-[80%] relative z-10 -ml-32 lg:-ml-64 rounded-3xl overflow-hidden border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            <img 
              src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              className="w-full h-full object-cover scale-110"
              alt="Engineering"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent"></div>
          </motion.div>
          
          <div className="absolute top-0 right-0 p-12 z-20 hidden lg:block">
             <div className="flex flex-col items-end space-y-20">
                <div className="text-right">
                   <div className="text-primary text-6xl font-black italic tracking-tighter">01.</div>
                   <div className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Global Strategy</div>
                </div>
                <div className="text-right">
                   <div className="text-white text-6xl font-black italic tracking-tighter opacity-10">02.</div>
                   <div className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mt-2 opacity-10">Visual Domination</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505] z-0 pointer-events-none">
         <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 -ml-64"></div>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 blur-[150px] rounded-full -mr-96 -mt-96"></div>
      </div>
    </section>
  );
};

const TrustSection = () => (
  <section className="py-20 bg-[#050505] border-y border-white/5 overflow-hidden whitespace-nowrap">
    <div className="animate-marquee flex">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex space-x-20 items-center px-10">
          <span className="text-2xl font-black text-white/10 uppercase tracking-tighter">Hyper-Growth</span>
          <Plus className="text-primary" size={16} />
          <span className="text-2xl font-black text-white/10 uppercase tracking-tighter">Visual Authority</span>
          <Plus className="text-primary" size={16} />
          <span className="text-2xl font-black text-white/10 uppercase tracking-tighter">Autonomous Systems</span>
          <Plus className="text-primary" size={16} />
          <span className="text-2xl font-black text-white/10 uppercase tracking-tighter">Elite Conversion</span>
          <Plus className="text-primary" size={16} />
        </div>
      ))}
    </div>
  </section>
);

const SolutionsBento = () => {
  const solutions = [
    { 
      title: "Cinematic Media Production", 
      desc: "Stop scrolls with Hollywood-grade visuals tailored for elite product launches and brand narratives.", 
      icon: <PlayCircle size={48} />, 
      size: "md:col-span-2", 
      img: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    { 
      title: "Autonomous E-Commerce", 
      desc: "High-converting storefronts integrated with intelligent automation for hands-off scaling.", 
      icon: <ShoppingBag size={48} />, 
      size: "md:col-span-1",
      img: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    { 
      title: "Ecosystem Architecture", 
      desc: "We don't just build sites; we engineer full digital infrastructure for the modern era.", 
      icon: <Workflow size={48} />, 
      size: "md:col-span-1",
      img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    { 
      title: "Data Intelligence", 
      desc: "Advanced analytics and predictive modeling to eliminate guesswork in your marketing spend.", 
      icon: <Database size={48} />, 
      size: "md:col-span-2",
      img: "https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section id="solutions" className="py-40 bg-[#050505] px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Capabilities</h2>
            <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.9]">ELITE <br /> SOLUTIONS.</h3>
          </div>
          <p className="text-gray-600 max-w-sm font-medium mb-4 leading-relaxed">
             We specialize in the high-stakes intersection of visual artistry and autonomous engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`${s.size} relative rounded-[40px] overflow-hidden h-[500px] group border border-white/5`}
            >
              <img src={s.img} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div className="text-primary transform group-hover:rotate-12 transition-transform">
                  {s.icon}
                </div>
                <div>
                   <h4 className="text-3xl font-black text-white mb-6 leading-tight">{s.title}</h4>
                   <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     {s.desc}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseGrid = () => {
  const projects = [
    { type: 'Platform', title: 'Ciatech Agency', category: 'Growth Architecture', img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { type: 'Media', title: 'Horizon Luxury', category: 'Cinematic Narrative', img: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
  ];

  return (
    <section id="showcase" className="py-40 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
          <div>
            <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Archive</h2>
            <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none">RECENT <br /> WORKS.</h3>
          </div>
          <button className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-primary pb-2 hover:opacity-50 transition-all">
             View Full Portfolio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-[40px] overflow-hidden mb-12 border border-white/5 relative bg-white/5">
                <img 
                  src={p.img} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  alt={p.title}
                />
              </div>
              <div className="flex justify-between items-end px-4">
                <div>
                  <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-3">{p.category}</p>
                  <h4 className="text-4xl font-black text-white group-hover:text-primary transition-colors">{p.title}</h4>
                </div>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight size={20} className="-rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-40 bg-[#050505] px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto border border-white/5 p-20 md:p-32 rounded-[60px] text-center relative overflow-hidden bg-white/5">
      <div className="relative z-10">
        <h2 className="text-5xl md:text-9xl font-black text-white tracking-tighter mb-12 leading-none italic">ARE YOU <br /> NEXT?</h2>
        <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto font-light mb-16">
          Exclusivity is our core value. We only partner with 2 brands per cycle to ensure extreme focus.
        </p>
        <button className="bg-primary text-black font-black py-8 px-16 rounded-2xl text-xl hover:bg-white transition-all shadow-2xl">
          APPLY FOR PARTNERSHIP
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#050505] pt-40 pb-12 border-t border-white/5 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-40 gap-20">
        <div className="lg:w-1/2">
          <div className="text-3xl font-black tracking-[0.4em] text-white mb-10">BLDSCALE</div>
          <p className="text-gray-600 text-xl max-w-sm leading-relaxed">
            The private growth office for elite brands. 
            Port-au-Prince • New York • Dubai.
          </p>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-16">
          <div>
            <h5 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Network</h5>
            <ul className="space-y-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-primary transition-colors">Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Archive</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Social</h5>
            <div className="flex flex-col space-y-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-primary cursor-pointer">Instagram</a>
              <a href="#" className="hover:text-primary cursor-pointer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-[8px] text-gray-800 font-black uppercase tracking-[0.5em] pt-12">
        <p>© 2026 BLDSCALE — ARCHITECTED IN EXCELLENCE</p>
        <p className="mt-4 md:mt-0 italic">Designed by Daky_400$/day</p>
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
      <Hero />
      <TrustSection />
      <SolutionsBento />
      <ShowcaseGrid />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
