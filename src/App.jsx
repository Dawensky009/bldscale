import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Video, Cpu, Globe, ArrowRight, Layers, Zap, 
  BarChart3, MoveRight, ChevronRight, CheckCircle2,
  Instagram, Twitter, Linkedin, Github, ArrowUp,
  MousePointer2, Sparkles, ShoppingBag, Terminal,
  Workflow, Database, Box, PlayCircle
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
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 transition-transform"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => (
  <nav className="fixed w-full z-[90] py-8 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto flex justify-between items-center glass-panel rounded-full px-10 py-5">
      <div className="text-2xl font-black tracking-[0.3em] text-white">
        BLD<span className="text-primary">SCALE</span>
      </div>
      <div className="hidden lg:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
        <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
        <a href="#showcase" className="hover:text-primary transition-colors">Showcase</a>
        <a href="#agency" className="hover:text-primary transition-colors">The Agency</a>
        <a href="#pricing" className="hover:text-primary transition-colors">Investment</a>
      </div>
      <button className="bg-primary text-black text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white transition-all shadow-lg shadow-primary/20">
        Inquire
      </button>
    </div>
  </nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden bg-navy-950">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
         <img 
          src="https://images.pexels.com/photos/7070/space-desktop-galaxy-astronomy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          className="w-full h-full object-cover opacity-20"
          alt="Deep Space"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/80 to-navy-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-10 backdrop-blur-md">
            <Sparkles className="text-primary" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">The Future of Brand Authority</span>
          </div>
          
          <h1 className="text-6xl md:text-[160px] font-black leading-[0.8] tracking-tighter text-white mb-12">
            ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary italic">DOMINANCE.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-16">
            We architect high-performance digital ecosystems. From cinematic visuals to autonomous e-commerce engines, we build what competitors can't touch.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="gradient-border text-white font-black py-6 px-14 rounded-full flex items-center group overflow-hidden bg-navy-950">
              <span className="relative z-10">RESERVE YOUR SLOT</span>
              <MoveRight className="ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
            <div className="flex -space-x-3 items-center">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-navy-950 bg-gray-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=bld${i}`} alt="user" />
                 </div>
               ))}
               <span className="ml-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Joined by 50+ Elite Brands</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-600 gap-4">
        <span className="text-[8px] uppercase tracking-[0.5em] font-black">Scroll to explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
};

const TrustSection = () => (
  <section className="py-20 bg-navy-950 border-y border-white/5 overflow-hidden whitespace-nowrap">
    <div className="animate-marquee flex">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex space-x-20 items-center px-10">
          <span className="text-2xl font-black text-white/20 uppercase tracking-tighter">Hyper-Growth</span>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-2xl font-black text-white/20 uppercase tracking-tighter">Visual Authority</span>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-2xl font-black text-white/20 uppercase tracking-tighter">Autonomous Systems</span>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-2xl font-black text-white/20 uppercase tracking-tighter">Elite Conversion</span>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
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
    <section id="solutions" className="py-40 bg-navy-950 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Our Solutions</h2>
          <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none">THE TOOLS OF <br /> EXPANSION.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className={`${s.size} relative rounded-[60px] overflow-hidden min-h-[500px] group border border-white/5 shadow-2xl`}
            >
              <img src={s.img} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div className="text-primary transform group-hover:rotate-12 transition-transform">
                  {s.icon}
                </div>
                <div>
                   <h4 className="text-4xl font-black text-white mb-6 leading-tight">{s.title}</h4>
                   <p className="text-gray-300 text-lg font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     {s.desc}
                   </p>
                </div>
              </div>
              <div className="ai-scan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseGrid = () => {
  const projects = [
    { type: 'Website', title: 'Ciatech Agency', category: 'Professional Services', img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { type: 'Media', title: 'Elite Watch Launch', category: 'Luxury Product', img: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { type: 'Automation', title: 'Global Logistics', category: 'Enterprise SaaS', img: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { type: 'Media', title: 'Cosmetic Narrative', category: 'Beauty E-com', img: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
  ];

  return (
    <section id="showcase" className="py-40 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
          <div>
            <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Selected Work</h2>
            <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none">GLOBAL <br /> PROJECTS.</h3>
          </div>
          <p className="text-gray-500 max-w-xs font-bold text-sm border-l-2 border-primary pl-8">
            We don't publish everything. Privacy is the ultimate luxury. Here is a fraction of our capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/11] rounded-[60px] overflow-hidden mb-12 border border-white/5 relative bg-white/5">
                <img 
                  src={p.img} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  alt={p.title}
                />
                <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                  {p.type}
                </div>
              </div>
              <div className="flex justify-between items-end px-4">
                <div>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3">{p.category}</p>
                  <h4 className="text-5xl font-black text-white group-hover:text-primary transition-colors">{p.title}</h4>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all">
                  <ArrowRight size={24} className="-rotate-45" />
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
  <section className="py-40 bg-navy-950 px-6 md:px-12">
    <div className="max-w-7xl mx-auto glass-panel p-20 md:p-32 rounded-[80px] text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] -mr-48 -mt-48 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[150px] -ml-48 -mb-48 rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h2 className="text-5xl md:text-9xl font-black text-white tracking-tighter mb-12 leading-none">READY TO <br /> OUT-SCALE?</h2>
        <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto font-light mb-16">
          We only take 2 new clients per month to ensure elite standards. 
          Applications for Q3 are now open.
        </p>
        <button className="bg-white text-black font-black py-8 px-16 rounded-full text-xl hover:bg-primary transition-all shadow-2xl">
          APPLY FOR CONSULTATION
        </button>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-navy-950 pt-40 pb-12 border-t border-white/5 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
        <div className="lg:col-span-6">
          <div className="text-4xl font-black tracking-[0.3em] text-white mb-10">BLDSCALE</div>
          <p className="text-gray-500 text-xl max-w-sm leading-relaxed mb-12">
            The private growth office for elite brands. 
            Port-au-Prince • New York • Dubai.
          </p>
          <div className="flex space-x-10 text-gray-500">
            <Instagram size={28} className="hover:text-primary cursor-pointer transition-colors" />
            <Twitter size={28} className="hover:text-primary cursor-pointer transition-colors" />
            <Linkedin size={28} className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-16">
          <div>
            <h5 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Network</h5>
            <ul className="space-y-6 text-gray-500 text-sm font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-primary transition-colors">Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Showcase</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Agency</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10">Legal</h5>
            <ul className="space-y-6 text-gray-500 text-sm font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-[8px] text-gray-800 font-black uppercase tracking-[0.5em] border-t border-white/5 pt-12">
        <p>© 2026 BLDSCALE ENGINE — THE APEX OF DIGITAL GROWTH</p>
        <p className="mt-4 md:mt-0 italic">Designed with Excellence by Daky_400$/day</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="bg-navy-950 selection:bg-primary selection:text-black cursor-none scroll-smooth">
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
