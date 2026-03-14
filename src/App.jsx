import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Video, Cpu, Globe, ArrowRight, Layers, Zap, 
  BarChart3, MoveRight, ChevronRight, CheckCircle2,
  Instagram, Twitter, Linkedin, Github
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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

const Navbar = () => (
  <nav className="fixed w-full z-50 py-6 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex justify-between items-center glass-panel rounded-full px-8 py-4">
      <div className="text-xl font-black tracking-[0.2em] text-white">
        BLD<span className="text-primary">SCALE</span>
      </div>
      <div className="hidden md:flex space-x-8 text-[10px] uppercase tracking-widest font-bold text-gray-400">
        <a href="#services" className="hover:text-primary transition-colors">Services</a>
        <a href="#work" className="hover:text-primary transition-colors">Work</a>
        <a href="#about" className="hover:text-primary transition-colors">Agency</a>
      </div>
      <button className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full hover:bg-primary transition-all">
        Contact
      </button>
    </div>
  </nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Next-Gen Media Engine</span>
          </div>
          
          <h1 className="text-6xl md:text-[140px] font-black leading-[0.85] tracking-tighter text-white mb-10">
            SCALE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary italic">VISUALS.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Nou itilize Entèlijans Atifisyèl pou bati videyo ak sit web ki rann mak ou parèt enposib pou inyore. 
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="gradient-border text-white font-black py-5 px-12 rounded-full flex items-center group overflow-hidden">
              START SCALING <MoveRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="flex items-center space-x-3 text-white font-bold group">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Play size={20} fill="currentColor" />
              </div>
              <span className="text-sm uppercase tracking-widest">Showreel 2026</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Visual background elements */}
      <motion.div style={{ y }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] opacity-20 z-0 pointer-events-none">
        <div className="text-[25vw] font-black text-white/5 leading-none select-none">BLDSCALE</div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-navy-950 to-transparent"></div>
    </section>
  );
};

const ServiceBento = () => {
  const services = [
    { 
      title: "AI Video Production", 
      desc: "Kreyasyon videyo pwodwi ak reklam nivo Hollywood ak pouvwa AI.", 
      icon: <Video size={40} />, 
      size: "md:col-span-2", 
      tag: "Dynamic" 
    },
    { 
      title: "Scale Web Systems", 
      desc: "Sit web ki bati pou vann e ki ka sipòte kwasans ou san limit.", 
      icon: <Layers size={40} />, 
      size: "md:col-span-1", 
      tag: "Architecture" 
    },
    { 
      title: "AI Automation", 
      desc: "Otomatize lavant ak sèvis kliyan ou pou w ka konsantre sou sa k enpòtan.", 
      icon: <Zap size={40} />, 
      size: "md:col-span-1", 
      tag: "Speed" 
    },
    { 
      title: "Growth Analytics", 
      desc: "Nou itilize done pou nou di w egzakteman kote pou w mete kòb ou.", 
      icon: <BarChart3 size={40} />, 
      size: "md:col-span-2", 
      tag: "Data Driven" 
    }
  ];

  return (
    <section id="services" className="py-32 bg-navy-950 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Our Capabilities</h2>
            <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter">ELITE <br /> SOLUTIONS.</h3>
          </div>
          <p className="text-gray-500 max-w-sm font-medium mb-4">
            Nou pa jis yon ajans. Nou se motè kwasans ou nan yon mond kote AI ap domine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`${s.size} glass-panel p-10 rounded-[40px] group relative overflow-hidden flex flex-col justify-between h-[400px] cursor-pointer`}
            >
              <div className="ai-scan opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="text-primary group-hover:scale-110 transition-transform">{s.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{s.tag}</span>
                </div>
                <h4 className="text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{s.title}</h4>
                <p className="text-gray-400 font-light leading-relaxed">{s.desc}</p>
              </div>
              <div className="z-10 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <span>Learn More</span> <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => (
  <section id="work" className="py-32 bg-navy-950 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex justify-between items-center mb-24">
        <h3 className="text-5xl font-black text-white tracking-tighter">LAKAY <br /> SHOWCASE.</h3>
        <div className="text-right">
          <div className="text-4xl font-black text-primary">05+</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global Launches</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[1, 2].map(i => (
          <div key={i} className="group relative">
            <div className="aspect-video rounded-[40px] overflow-hidden border border-white/5 bg-white/5">
              <img 
                src={i === 1 ? "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                alt="Work"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent opacity-60"></div>
            </div>
            <div className="mt-8 flex justify-between items-end">
              <div>
                <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {i === 1 ? 'AI Product Launch' : 'E-Commerce Scaling'}
                </h4>
                <p className="text-gray-500 text-sm mt-2">Strategy / Media / Web</p>
              </div>
              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <ArrowRight className="-rotate-45" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-24 bg-navy-950 border-t border-white/5 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
        <div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-10 italic">LET'S <br /> BUILD.</h2>
          <p className="text-gray-500 text-lg max-w-sm mb-12">
            Pa sispann grandi. Pa sispann bati. BLDSCALE la pou l fè vizyon ou vin reyalite.
          </p>
          <div className="flex space-x-6 text-gray-500">
            <Instagram className="hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="hover:text-primary cursor-pointer transition-colors" />
            <Linkedin className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="bg-white/5 p-12 rounded-[40px] border border-white/5">
          <h4 className="text-2xl font-bold text-white mb-8">Quick Inquiry</h4>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors text-white" />
              <input type="email" placeholder="Email" className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors text-white" />
            </div>
            <textarea placeholder="Tell us about your project" rows="4" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors text-white"></textarea>
            <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-primary transition-all">
              Send Message
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-700 font-bold uppercase tracking-[0.3em]">
        <p>© 2026 BLDSCALE ENGINE — HAITI</p>
        <p className="mt-4 md:mt-0 italic">Architected by Daky_400$/day</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="bg-navy-950 selection:bg-primary selection:text-black cursor-none scroll-smooth">
      <CustomCursor />
      <Navbar />
      <Hero />
      <ServiceBento />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;
