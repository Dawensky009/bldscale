import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { 
  Play, Video, Cpu, Globe, ArrowRight, Layers, Zap, 
  BarChart3, MoveRight, ChevronRight, CheckCircle2,
  Instagram, Twitter, Linkedin, Github, ArrowUp,
  Sparkles, ShoppingBag, Workflow, Database, PlayCircle, Plus,
  Star, Quote, Users, Clock, ShieldCheck, Mail, Phone, MapPin,
  Bot, FastForward, TrendingUp, Award, Laptop, Eye
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Shared Components ---

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

const Navbar = ({ setPage, currentPage }) => (
  <nav className="fixed w-full z-[90] py-8 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl px-10 py-5 shadow-2xl">
      <button onClick={() => setPage('home')} className="text-xl font-black tracking-[0.4em] text-white flex items-center">
        BLD<span className="text-primary">SC</span>
      </button>
      <div className="hidden lg:flex space-x-10 text-[9px] uppercase tracking-[0.5em] font-bold text-gray-500">
        <button onClick={() => setPage('home')} className={`hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}>Home</button>
        <div className="relative group">
           <button className="hover:text-primary transition-colors flex items-center">Services <ChevronRight size={10} className="rotate-90 ml-1" /></button>
           <div className="absolute top-full -left-10 mt-5 w-56 bg-navy-950 border border-white/5 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl">
              {['Commercial Video', 'Ads Video', 'Website', 'Automation'].map(s => (
                <button key={s} onClick={() => setPage(s.toLowerCase().replace(' ', '-'))} className="w-full text-left p-3 text-[10px] text-gray-400 hover:text-primary hover:bg-white/5 rounded-xl transition-all uppercase tracking-widest">{s}</button>
              ))}
           </div>
        </div>
        <button onClick={() => setPage('work')} className={`hover:text-primary transition-colors ${currentPage === 'work' ? 'text-primary' : ''}`}>Work</button>
        <button onClick={() => setPage('team')} className={`hover:text-primary transition-colors ${currentPage === 'team' ? 'text-primary' : ''}`}>Staff</button>
      </div>
      <button onClick={() => setPage('contact')} className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-primary transition-all shadow-lg">
        Inquiry
      </button>
    </div>
  </nav>
);

// --- Page Sections ---

const Hero = ({ setPage }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 15]);

  return (
    <section className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-20">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 z-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center space-x-4 mb-10">
               <div className="h-[1px] w-12 bg-primary"></div>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">The AI-First Agency</span>
            </div>
            <h1 className="text-6xl md:text-[160px] font-black leading-[0.85] tracking-tighter text-white mb-10">
              AI-DRIVEN <br />
              <span className="text-transparent border-white border-[1px] stroke-white px-4 italic" style={{ WebkitTextStroke: '1px white' }}>SCALE</span> <br />
              ENGINE.
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
               <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed border-l border-white/10 pl-8">
                 We engineer cinematic AI commercials and automated digital ecosystems that put your brand on hyper-growth mode. 
               </p>
               <div className="flex flex-col justify-end">
                  <button onClick={() => setPage('contact')} className="group flex items-center space-x-6 text-white overflow-hidden">
                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                      <MoveRight size={32} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                       <span className="text-xs font-black uppercase tracking-widest text-primary">Join the Future</span>
                       <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Reserve Your Slot</span>
                    </div>
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-4 relative h-[600px] md:h-[900px] flex items-center">
          <motion.div style={{ y, rotate }} className="w-[150%] h-[80%] relative z-10 -ml-32 lg:-ml-64 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover scale-110" alt="AI Visuals" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { title: "Analysis", desc: "We deep-dive into your data to identify growth bottlenecks.", icon: <BarChart3 size={48} /> },
    { title: "AI Generation", desc: "Our neural engines craft your high-end cinematic commercials.", icon: <Bot size={48} /> },
    { title: "System Build", desc: "We architect your automated e-commerce or landing engine.", icon: <Terminal size={48} /> },
    { title: "Hyper Scale", desc: "Aggressive ad deployment and data-driven optimization.", icon: <TrendingUp size={48} /> }
  ];

  return (
    <section className="py-40 bg-navy-950 px-6 md:px-12 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">How We Work</h2>
          <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter">THE BLUEPRINT.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              <div className="text-primary mb-10 transform group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h4 className="text-2xl font-bold text-white mb-6">0{i+1}. {s.title}</h4>
              <p className="text-gray-500 font-light leading-relaxed">{s.desc}</p>
              <div className="absolute -bottom-10 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Jean Marc", role: "CEO, TechFlow", text: "BLDSCALE completely transformed our product launch. The AI video was cinematic and the sales automation saved us 20 hours a week.", avatar: "https://i.pravatar.cc/100?u=1" },
    { name: "Marie L.", role: "Founder, LuxeHaiti", text: "I've worked with many agencies, but none delivered this level of visual quality so fast. Truly the elite choice.", avatar: "https://i.pravatar.cc/100?u=2" },
    { name: "Robert Smith", role: "Marketing Director", text: "Their automated e-commerce setup is a game changer. Our conversion rate jumped by 35% in just one month.", avatar: "https://i.pravatar.cc/100?u=3" }
  ];

  return (
    <section className="py-40 bg-[#050505] px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Client Feedback</h2>
          <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tighter">TRUSTED BY ELITES.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((r, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-12 rounded-[40px] bg-white/5 border border-white/5 relative shadow-xl">
              <Quote className="text-primary mb-8 opacity-20" size={40} />
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 italic">"{r.text}"</p>
              <div className="flex items-center space-x-4">
                <img src={r.avatar} className="w-12 h-12 rounded-full border border-primary/30" alt={r.name} />
                <div>
                  <h4 className="text-white font-bold">{r.name}</h4>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const staff = [
    { name: "Dawensky T.", role: "Founder & Chief Architect", img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Daky", role: "AI Creative Lead", img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Marcus Vane", role: "E-Commerce Specialist", img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  return (
    <section id="staff" className="py-40 bg-[#050505] px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">The Staff</h2>
          <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter">MINDS OF <br /> SCALE.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {staff.map((m, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden mb-8 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                <img src={m.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={m.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <h4 className="text-3xl font-bold text-white mb-2">{m.name}</h4>
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.5em]">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Page Views ---

const ServicePage = ({ title, desc, features, img, setPage }) => (
  <section className="pt-40 min-h-screen bg-[#050505] px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
        <div>
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Service</h2>
             <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10">{title}</h3>
             <p className="text-gray-400 text-xl font-light leading-relaxed mb-12">{desc}</p>
             <button onClick={() => setPage('contact')} className="bg-primary text-black font-black py-6 px-16 rounded-2xl hover:bg-white transition-all shadow-xl shadow-primary/20">GET STARTED</button>
           </motion.div>
        </div>
        <div className="rounded-[40px] overflow-hidden h-[600px] border border-white/5 shadow-2xl">
           <img src={img} className="w-full h-full object-cover" alt={title} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
         {features.map((f, i) => (
           <div key={i} className="p-12 rounded-[40px] bg-white/5 border border-white/5 shadow-lg group hover:border-primary/20 transition-all">
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform inline-block">
                {f.icon || <CheckCircle2 size={32} />}
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">{f.name}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{f.text}</p>
           </div>
         ))}
      </div>
    </div>
  </section>
);

const ContactPage = () => (
  <section className="pt-40 min-h-screen bg-[#050505] px-6 md:px-12 pb-20">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
         <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Contact Us</h2>
         <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10">START <br /> SCALING.</h3>
         <div className="space-y-12 mt-20">
            <div className="flex items-center space-x-6">
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/5 shadow-inner"><Mail /></div>
               <div><p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Email</p><p className="text-xl text-white font-bold">hello@bldscale.com</p></div>
            </div>
            <div className="flex items-center space-x-6">
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/5 shadow-inner"><Phone /></div>
               <div><p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Phone</p><p className="text-xl text-white font-bold">+509 4000 0000</p></div>
            </div>
         </div>
      </div>
      <div className="p-12 rounded-[40px] bg-white/5 border border-white/5 shadow-2xl">
         <form className="space-y-8" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <input type="text" placeholder="Name" className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary" />
               <input type="email" placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary" />
            </div>
            <select className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary appearance-none">
               <option>Commercial Video</option>
               <option>Ads Video</option>
               <option>Website Development</option>
               <option>Automation</option>
            </select>
            <textarea placeholder="Tell us about your project" className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary h-40"></textarea>
            <button className="w-full bg-primary text-black font-black py-6 rounded-2xl hover:bg-white transition-all shadow-xl shadow-primary/20">SUBMIT APPLICATION</button>
         </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#050505] pt-40 pb-12 border-t border-white/5 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto text-center">
      <div className="text-4xl font-black tracking-[0.4em] text-white mb-10">BLDSCALE</div>
      <div className="flex justify-center space-x-10 mb-20 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
         <a href="#" className="hover:text-primary">Instagram</a>
         <a href="#" className="hover:text-primary">LinkedIn</a>
         <a href="#" className="hover:text-primary">Twitter</a>
      </div>
      <div className="text-[8px] text-gray-800 font-black uppercase tracking-[0.5em] pt-12 border-t border-white/5">
        © 2026 BLDSCALE — ARCHITECTED IN EXCELLENCE | Designed by Daky_400$/day
      </div>
    </div>
  </footer>
);

function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    console.log("App mounted on page:", page);
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="bg-[#050505] selection:bg-primary selection:text-black cursor-none scroll-smooth">
      <CustomCursor />
      <ScrollToTop />
      <Navbar setPage={setPage} currentPage={page} />
      
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero setPage={setPage} />
            <section className="py-24 bg-white/5 border-y border-white/5 flex justify-center items-center space-x-20 overflow-hidden">
               <div className="flex space-x-20 animate-marquee whitespace-nowrap">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-4xl font-black text-white/5 uppercase italic tracking-widest">AI-FIRST MEDIA • AUTOMATION • GROWTH •</span>
                  ))}
               </div>
            </section>
            <ProcessSection />
            <Testimonials />
            <TeamSection />
            <section className="py-40 bg-navy-950 border-y border-white/5 overflow-hidden whitespace-nowrap">
              <div className="animate-marquee flex">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex space-x-20 items-center px-10">
                    <span className="text-3xl font-black text-white/10 uppercase tracking-tighter italic">hyper-growth</span>
                    <Plus className="text-primary" />
                    <span className="text-3xl font-black text-white/10 uppercase tracking-tighter italic">visual authority</span>
                    <Plus className="text-primary" />
                    <span className="text-3xl font-black text-white/10 uppercase tracking-tighter italic">autonomous systems</span>
                    <Plus className="text-primary" />
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {page === 'commercial-video' && (
          <motion.div key="commercial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ServicePage 
              title="COMMERCIAL VIDEO" 
              desc="We produce high-end commercials using advanced AI neural engines to craft cinematic brand stories that build deep emotional trust."
              img="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "AI Neural Storyboards", text: "We use AI to visualize the perfect narrative before shooting a single frame.", icon: <Bot size={32} /> },
                { name: "Cinematic AI Generation", text: "Elite visual quality generated and enhanced by high-performance AI models.", icon: <Sparkles size={32} /> },
                { name: "Emotional Narrative", text: "Crafting stories that resonate deeply with your audience's subconscious.", icon: <Eye size={32} /> }
              ]}
            />
          </motion.div>
        )}

        {page === 'ads-video' && (
          <motion.div key="ads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ServicePage 
              title="ADS VIDEO" 
              desc="Performance-driven content designed by AI psychology tools to stop the scroll and drive immediate hyper-conversions."
              img="https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "AI Conversion Hooks", text: "Using AI to test and generate the most powerful 3-second hooks.", icon: <Zap size={32} /> },
                { name: "Hyper-Native Formats", text: "Optimized for TikTok, IG Reels, and YouTube Shorts via automated workflows.", icon: <Laptop size={32} /> },
                { name: "Rapid Scale Delivery", text: "From concept to ad manager in record time with AI assistance.", icon: <FastForward size={32} /> }
              ]}
            />
          </motion.div>
        )}

        {page === 'website' && (
          <motion.div key="web" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ServicePage 
              title="WEBSITE" 
              desc="Bespoke e-commerce engines and neural-optimized landing pages built for extreme speed and global scalability."
              img="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "Neural UX/UI", text: "Design systems optimized by AI for maximum user engagement.", icon: <Cpu size={32} /> },
                { name: "Scalable Core", text: "Architecture that handles millions of visitors without a single glitch.", icon: <Layers size={32} /> },
                { name: "Global SEO Engine", text: "Built-in AI tools to dominate search rankings worldwide.", icon: <Globe size={32} /> }
              ]}
            />
          </motion.div>
        )}

        {page === 'automation' && (
          <motion.div key="auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ServicePage 
              title="AUTOMATION" 
              desc="Full-scale autonomous workflows that handle your sales, support, and marketing operations using AI agents."
              img="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "AI Sales Agents", text: "Automated bots that handle inquiries and close deals 24/7.", icon: <Users size={32} /> },
                { name: "Workflow Neural", text: "Complex business logic handled by autonomous AI sequences.", icon: <Workflow size={32} /> },
                { name: "CRM Auto-Pilot", text: "Zero manual entry. Your data manages itself intelligently.", icon: <Database size={32} /> }
              ]}
            />
          </motion.div>
        )}

        {page === 'work' && (
          <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <section className="pt-40 min-h-screen bg-[#050505] px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                   <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Archive</h2>
                   <h3 className="text-5xl md:text-[140px] font-black text-white tracking-tighter leading-[0.8] mb-20">SELECTED <br /> PROJECTS.</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="group cursor-pointer">
                           <div className="aspect-[16/10] rounded-[60px] overflow-hidden mb-10 border border-white/5 relative bg-white/5 shadow-2xl">
                              <img src={`https://images.pexels.com/photos/${i === 1 ? '3183150' : i === 2 ? '190819' : i === 3 ? '4483610' : '3373739'}/pexels-photo-${i === 1 ? '3183150' : i === 2 ? '190819' : i === 3 ? '4483610' : '3373739'}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Work" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                           </div>
                           <h4 className="text-3xl font-bold text-white group-hover:text-primary transition-colors italic">0{i} / Global Scale Project</h4>
                        </div>
                      ))}
                   </div>
                </div>
             </section>
          </motion.div>
        )}

        {page === 'team' && (
          <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <TeamSection />
          </motion.div>
        )}

        {page === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ContactPage />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
