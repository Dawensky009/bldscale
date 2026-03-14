import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Video, Cpu, Globe, ArrowRight, Layers, Zap, 
  BarChart3, MoveRight, ChevronRight, CheckCircle2,
  Instagram, Twitter, Linkedin, Github, ArrowUp,
  Sparkles, ShoppingBag, Workflow, Database, PlayCircle, Plus,
  Star, Quote, Users, Clock, ShieldCheck, Mail, Phone, MapPin
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
    <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl px-10 py-5">
      <button onClick={() => setPage('home')} className="text-xl font-black tracking-[0.4em] text-white">
        BLD<span className="text-primary">SC</span>
      </button>
      <div className="hidden lg:flex space-x-10 text-[9px] uppercase tracking-[0.5em] font-bold text-gray-500">
        <button onClick={() => setPage('home')} className={`hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}>Home</button>
        <div className="relative group">
           <button className="hover:text-primary transition-colors flex items-center">Services <ChevronRight size={10} className="rotate-90 ml-1" /></button>
           <div className="absolute top-full -left-10 mt-5 w-56 bg-navy-950 border border-white/5 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {['Commercial Video', 'Ads Video', 'Website', 'Automation'].map(s => (
                <button key={s} onClick={() => setPage(s.toLowerCase().replace(' ', '-'))} className="w-full text-left p-3 text-[10px] text-gray-400 hover:text-primary hover:bg-white/5 rounded-xl transition-all uppercase tracking-widest">{s}</button>
              ))}
           </div>
        </div>
        <button onClick={() => setPage('work')} className={`hover:text-primary transition-colors ${currentPage === 'work' ? 'text-primary' : ''}`}>Work</button>
      </div>
      <button onClick={() => setPage('contact')} className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-primary transition-all">
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
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">The Growth Engine</span>
            </div>
            <h1 className="text-6xl md:text-[160px] font-black leading-[0.85] tracking-tighter text-white mb-10">
              WE <span className="text-transparent border-white border-[1px] stroke-white px-4 italic" style={{ WebkitTextStroke: '1px white' }}>SCALE</span> <br />
              YOUR VISION.
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
               <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed border-l border-white/10 pl-8">
                 We engineer high-performance digital ecosystems. From cinematic commercials to automated e-commerce engines, we deliver brand authority.
               </p>
               <div className="flex flex-col justify-end">
                  <button onClick={() => setPage('contact')} className="group flex items-center space-x-6 text-white overflow-hidden">
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
        <div className="lg:col-span-4 relative h-[600px] md:h-[900px] flex items-center">
          <motion.div style={{ y, rotate }} className="w-[150%] h-[80%] relative z-10 -ml-32 lg:-ml-64 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <img src="https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-full object-cover scale-110" alt="Video Set" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Jean Marc", role: "CEO, TechFlow", text: "BLDSCALE completely transformed our product launch. The video was cinematic and the sales automation saved us 20 hours a week.", avatar: "https://i.pravatar.cc/100?u=1" },
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
            <motion.div key={i} whileHover={{ y: -10 }} className="p-12 rounded-[40px] bg-white/5 border border-white/5 relative">
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
             <button onClick={() => setPage('contact')} className="bg-primary text-black font-black py-6 px-16 rounded-2xl hover:bg-white transition-all">GET STARTED</button>
           </motion.div>
        </div>
        <div className="rounded-[40px] overflow-hidden h-[600px] border border-white/5">
           <img src={img} className="w-full h-full object-cover" alt={title} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
         {features.map((f, i) => (
           <div key={i} className="p-12 rounded-[40px] bg-white/5 border border-white/5">
              <CheckCircle2 className="text-primary mb-6" size={32} />
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
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/5"><Mail /></div>
               <div><p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Email</p><p className="text-xl text-white font-bold">hello@bldscale.com</p></div>
            </div>
            <div className="flex items-center space-x-6">
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/5"><Phone /></div>
               <div><p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Phone</p><p className="text-xl text-white font-bold">+509 4000 0000</p></div>
            </div>
         </div>
      </div>
      <div className="p-12 rounded-[40px] bg-white/5 border border-white/5">
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
            <Testimonials />
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
              desc="Cinematic brand stories that build deep emotional trust and position your business as the industry leader."
              img="https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "Storyboarding", text: "We craft the perfect narrative for your brand's unique identity." },
                { name: "4K Production", text: "Elite visual quality that looks stunning on every screen." },
                { name: "Post-Production", text: "Masterful editing and sound design to capture attention." }
              ]}
            />
          </motion.div>
        )}

        {page === 'ads-video' && (
          <motion.div key="ads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ServicePage 
              title="ADS VIDEO" 
              desc="High-performance, short-form content designed to stop the scroll and drive immediate conversions."
              img="https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "Ad Psychology", text: "Videos built on proven triggers to drive rapid sales." },
                { name: "Platform Optimized", text: "Native formats for TikTok, IG Reels, and FB Ads." },
                { name: "Rapid Delivery", text: "Get your campaigns running in less than 72 hours." }
              ]}
            />
          </motion.div>
        )}

        {page === 'website' && (
          <motion.div key="web" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ServicePage 
              title="WEBSITE" 
              desc="Next-gen e-commerce engines and landing pages bult for speed, scalability, and extreme conversion."
              img="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "Elite UX/UI", text: "Bespoke designs that provide a premium user experience." },
                { name: "Speed Optimized", text: "Blazing fast load times for higher search rankings." },
                { name: "Scalable Architecture", text: "Systems that grow as your business expands." }
              ]}
            />
          </motion.div>
        )}

        {page === 'automation' && (
          <motion.div key="auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ServicePage 
              title="AUTOMATION" 
              desc="Intelligent workflows and CRM integrations that handle your business operations while you sleep."
              img="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              setPage={setPage}
              features={[
                { name: "CRM Integration", text: "Automate your lead tracking and customer management." },
                { name: "Sales Bots", text: "24/7 AI-driven assistance for your customers." },
                { name: "Workflow Audit", text: "We identify and fix bottlenecks in your current operations." }
              ]}
            />
          </motion.div>
        )}

        {page === 'work' && (
          <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <section className="pt-40 min-h-screen bg-[#050505] px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                   <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6">Archive</h2>
                   <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none mb-20">SELECTED <br /> PROJECTS.</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="group cursor-pointer">
                           <div className="aspect-[16/10] rounded-[40px] overflow-hidden mb-10 border border-white/5 relative bg-white/5">
                              <img src={`https://images.pexels.com/photos/${i === 1 ? '3183150' : i === 2 ? '190819' : i === 3 ? '4483610' : '3373739'}/pexels-photo-${i === 1 ? '3183150' : i === 2 ? '190819' : i === 3 ? '4483610' : '3373739'}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Work" />
                           </div>
                           <h4 className="text-3xl font-bold text-white group-hover:text-primary transition-colors italic">0{i} / Global Launch</h4>
                        </div>
                      ))}
                   </div>
                </div>
             </section>
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
