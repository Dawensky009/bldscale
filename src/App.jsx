import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { 
  Play, Video, Cpu, Globe, ArrowRight, Layers, Zap, 
  BarChart3, MoveRight, ChevronRight, CheckCircle2,
  Instagram, Twitter, Linkedin, Github, ArrowUp,
  Sparkles, ShoppingBag, Workflow, Database, PlayCircle, Plus,
  Star, Quote, Users, Clock, ShieldCheck, Mail, Phone, MapPin,
  Bot, FastForward, TrendingUp, Award, Laptop, Eye, Terminal
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

const Navbar = () => (
  <nav className="fixed w-full z-[90] py-8 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl px-10 py-5 shadow-2xl">
      <a href="#home" className="text-xl font-black tracking-[0.4em] text-white flex items-center">
        BLD<span className="text-primary">SC</span>
      </a>
      <div className="hidden lg:flex space-x-10 text-[9px] uppercase tracking-[0.5em] font-bold text-gray-500">
        <a href="#home" className="hover:text-primary transition-colors">Home</a>
        <a href="#services" className="hover:text-primary transition-colors">Services</a>
        <a href="#work" className="hover:text-primary transition-colors">Work</a>
        <a href="#staff" className="hover:text-primary transition-colors">Staff</a>
      </div>
      <a href="#contact" className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-primary transition-all shadow-lg">
        Inquiry
      </a>
    </div>
  </nav>
);

// --- Page Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 15]);

  const [text, setText] = useState("");
  const fullText = "AI-DRIVEN SCALE ENGINE.";
  const [index, setIndex] = useState(0);
  const audioRef = useRef(new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_732a39460a.mp3"));

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.2;
          audioRef.current.play().catch(() => {});
        }
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-20">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 z-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center space-x-4 mb-10">
               <div className="h-[1px] w-12 bg-primary"></div>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">The AI-First Agency</span>
            </div>
            
            <div className="min-h-[250px] md:min-h-[450px]">
              <h1 className="text-6xl md:text-[130px] lg:text-[160px] font-black leading-[0.85] tracking-tighter text-white mb-10">
                {text.split(" ").map((word, i) => (
                  <React.Fragment key={i}>
                    {word === "SCALE" ? (
                      <span className="text-transparent border-white border-[1px] stroke-white px-4 italic" style={{ WebkitTextStroke: '1px white' }}>
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    {" "}
                    {i === 0 && <br />}
                    {i === 1 && <br />}
                  </React.Fragment>
                ))}
                <span className="inline-block w-2 h-16 md:w-4 md:h-32 bg-primary ml-2 animate-pulse align-middle"></span>
              </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
               <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed border-l border-white/10 pl-8">
                 We engineer cinematic AI commercials and automated digital ecosystems that put your brand on hyper-growth mode. 
               </p>
               <div className="flex flex-col justify-end">
                  <a href="#contact" className="group flex items-center space-x-6 text-white overflow-hidden">
                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                      <MoveRight size={32} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                       <span className="text-xs font-black uppercase tracking-widest text-primary">Join the Future</span>
                       <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Reserve Your Slot</span>
                    </div>
                  </a>
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

const ServicesSection = () => {
  const services = [
    { title: "Commercial Video", desc: "High-end AI-generated cinematic brand stories.", img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Ads Video", desc: "Short-form AI content built for hyper-conversions.", img: "https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Elite Website", desc: "Neural-optimized e-commerce engines and landing pages.", img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Full Automation", desc: "Autonomous AI workflows for sales and support.", img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
  ];

  return (
    <section id="services" className="py-40 bg-[#050505] px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">What We Do</h2>
          <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter">ELITE SUITE.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group relative rounded-[40px] overflow-hidden aspect-[16/9] border border-white/5 shadow-2xl">
              <img src={s.img} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h4 className="text-4xl font-black text-white mb-4 italic tracking-tighter uppercase">{s.title}</h4>
                <p className="text-gray-400 font-light max-w-sm">{s.desc}</p>
              </div>
            </motion.div>
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
    <section className="py-40 bg-[#050505] px-6 md:px-12 border-t border-white/5">
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

const WorkSection = () => (
  <section id="work" className="py-40 bg-[#050505] px-6 md:px-12 border-t border-white/5">
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
);

const TeamSection = () => {
  const staff = [
    { name: "Dawensky T.", role: "Founder & Chief Architect", img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Daky", role: "AI Creative Lead", img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Marcus Vane", role: "E-Commerce Specialist", img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  return (
    <section id="staff" className="py-40 bg-[#050505] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32">
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">The Staff</h2>
          <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter">MINDS OF <br /> SCALE.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {staff.map((m, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden mb-8 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 relative shadow-2xl">
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

const ContactSection = () => (
  <section id="contact" className="py-40 bg-[#050505] px-6 md:px-12 border-t border-white/5">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
         <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Contact Us</h2>
         <h3 className="text-5xl md:text-[140px] font-black text-white tracking-tighter leading-[0.8] mb-10">START <br /> SCALING.</h3>
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
  useEffect(() => {
    console.log("App mounted");
  }, []);

  return (
    <div className="bg-[#050505] selection:bg-primary selection:text-black cursor-none scroll-smooth">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      
      <main>
        <Hero />
        <section className="py-24 bg-white/5 border-y border-white/5 flex justify-center items-center space-x-20 overflow-hidden">
           <div className="flex space-x-20 animate-marquee whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="text-4xl font-black text-white/5 uppercase italic tracking-widest">AI-FIRST MEDIA • AUTOMATION • GROWTH •</span>
              ))}
           </div>
        </section>
        <ProcessSection />
        <ServicesSection />
        <Testimonials />
        <WorkSection />
        <TeamSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
