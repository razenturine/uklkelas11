import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, MapPin, X } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import { MOCK_CAFES } from '../lib/mock';
import { CustomCursor } from '../Components/GlobalComponents';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [time, setTime] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  // Hardcode user as null for the landing page for now since we mock auth
  // In a real app we'd pass user as a prop via Inertia.
  const user = null;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }) + " WIB");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-terracotta selection:text-alabaster bg-alabaster overflow-hidden">
      <CustomCursor />
      {/* FIXED TOP LEFT LOGO */}
      <div className="fixed top-6 left-6 font-clash font-black text-3xl tracking-tighter mix-blend-difference text-alabaster z-50 pointer-events-none">
        NGOPI.
      </div>

      {/* TOP RIGHT NAV */}
      <nav className="fixed top-6 right-6 flex justify-end z-50 pointer-events-none w-full max-w-md">
        <div className="font-mono text-xs tracking-widest uppercase flex flex-col items-end gap-2 pointer-events-auto bg-alabaster/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 border md:border-none border-borderline md:mix-blend-difference md:text-alabaster shadow-sm md:shadow-none">
          <span className="hidden md:inline-block border border-alabaster px-3 py-1 font-bold">{time}</span>
          {user ? (
            <Link href="/dashboard" className="hover:text-terracotta transition-colors font-bold border border-current px-4 py-2 bg-espresso md:bg-transparent text-alabaster md:hover:text-terracotta md:hover:bg-transparent hover:bg-terracotta hover:border-terracotta">[ DASHBOARD ]</Link>
          ) : (
            <Link href="/login" className="hover:text-terracotta transition-colors font-bold border border-current px-4 py-2 bg-espresso text-alabaster md:bg-transparent hover:bg-terracotta hover:text-espresso md:hover:bg-transparent md:hover:text-terracotta">[ MASUK / DAFTAR ]</Link>
          )}
        </div>
      </nav>

      {/* HERO SECTION - CONTROLLED PROPORTIONS */}
      <section className="relative min-h-[90vh] flex flex-col justify-center border-b border-borderline px-6 md:px-12 bg-alabaster pt-32 pb-24">
        <div className="absolute top-0 right-0 w-full md:w-[60vw] h-full border-l border-borderline overflow-hidden grayscale">
          <motion.img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
            alt="Skena" 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Harmonious Text overlay */}
        <div className="relative z-10 w-full md:max-w-4xl pointer-events-none mix-blend-difference text-alabaster">
          <h1 className="font-clash text-[clamp(4rem,10vw,10rem)] font-black uppercase tracking-tighter leading-[0.85] mt-12 md:mt-0 flex flex-col">
            {['Info', 'Ngopi', 'Hari', 'Ini.'].map((word, i) => (
              <div key={i} className="overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="block"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </h1>
        </div>
        
        <div className="absolute bottom-8 left-6 md:left-12 z-20 font-mono text-xs uppercase max-w-sm border-l-4 border-terracotta pl-4 mix-blend-difference text-alabaster bg-black/20 backdrop-blur-md p-4 font-bold leading-relaxed">
          Validasi ruang nugas berkedok healing. Asupan kafein pantau langsung dari radar skena Surabaya & sekitarnya.
        </div>
      </section>

      {/* DIREKTORI GRID - CONTROLLED WHITESPACE */}
      <section className="py-24 px-6 md:px-12 bg-alabaster">
        <div className="mb-12 border-b-2 border-espresso pb-4">
          <h2 className="font-mono text-sm tracking-widest uppercase font-bold text-espresso flex items-center gap-3">
            <span className="w-3 h-3 bg-terracotta inline-block"></span> DIREKTORI SKENA LOKAL
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CAFES.map((cafe) => (
            <div 
              key={cafe.id} 
              onClick={() => setActiveModal(cafe)}
              className="p-8 border border-borderline hover:bg-espresso hover:text-alabaster transition-colors group relative cursor-pointer shadow-sm"
            >
              <MapPin className="mb-10 opacity-20 group-hover:opacity-100 group-hover:text-terracotta transition-opacity" size={40} />
              <h3 className="font-clash text-3xl font-black mb-3 uppercase leading-none">{cafe.name}</h3>
              <p className="font-mono text-xs font-bold mb-10 opacity-80 text-terracotta">{cafe.area}</p>
              <div className="flex justify-between items-end font-mono text-[10px] font-bold border-t border-borderline/30 group-hover:border-alabaster/30 pt-4">
                <span className="uppercase">{cafe.vibe}</span>
                <ArrowUpRight className="group-hover:text-terracotta" size={16}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="min-h-[60vh] flex flex-col md:flex-row border-t border-borderline bg-alabaster">
        <div className="w-full md:w-1/2 border-r border-borderline grayscale hover:grayscale-0 transition-all duration-[2s]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.20960533591!2d112.6438069!3d-7.275612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1717316712345!5m2!1sen!2sid" 
            width="100%" height="100%" style={{ border: 0, minHeight: '40vh' }} allowFullScreen="" loading="lazy">
          </iframe>
        </div>
        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-espresso text-alabaster">
          <div className="font-mono text-xs font-bold uppercase flex justify-between border-b border-borderline/30 pb-4">
            <p className="opacity-60">COORD: -7.2504, 112.7688</p>
            <p className="text-terracotta animate-pulse">SYS_STATUS: ONLINE</p>
          </div>
          <div className="my-16 lg:my-24">
            <h1 className="font-clash text-[clamp(4rem,8vw,8rem)] leading-[0.8] font-black tracking-tighter mix-blend-exclusion">NGOPI.</h1>
          </div>
          <div className="flex justify-between border-t border-borderline/30 pt-6 font-mono text-xs font-bold uppercase">
            <Link href="/admin" className="hover:text-terracotta transition-colors">[ PUSAT KONTROL ]</Link>
            <span className="opacity-60">© 2026</span>
          </div>
        </div>
      </footer>

      {/* CAFE MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-espresso/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 lg:p-6" onClick={() => setActiveModal(null)}>
          <div className="bg-alabaster w-full max-w-3xl border border-espresso flex flex-col shadow-[8px_8px_0_0_#D66838]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-espresso bg-espresso text-alabaster">
              <span className="font-mono text-xs uppercase font-bold">SYS_DATA // {activeModal.id}</span>
              <button onClick={() => setActiveModal(null)} className="hover:text-terracotta transition-colors"><X size={20}/></button>
            </div>
            <div className="p-8 md:p-12">
              <h2 className="font-clash text-[clamp(2.5rem,5vw,4rem)] font-black uppercase mb-4 tracking-tighter leading-none">{activeModal.name}</h2>
              <p className="font-mono text-terracotta font-bold uppercase text-sm mb-10 border-l-4 border-terracotta pl-3">{activeModal.area}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm mb-10">
                <div className="border border-borderline p-6 bg-alabaster shadow-sm">
                  <span className="opacity-60 block mb-2 text-[10px] font-bold uppercase">BEANS</span>
                  <span className="text-lg font-bold">{activeModal.beans}</span>
                </div>
                <div className="border border-borderline p-6 bg-alabaster shadow-sm">
                  <span className="opacity-60 block mb-2 text-[10px] font-bold uppercase">VIBE</span>
                  <span className="text-lg font-bold">{activeModal.vibe}</span>
                </div>
                <div className="border border-espresso p-6 col-span-1 md:col-span-2 flex justify-between bg-sage text-alabaster items-center mt-2 shadow-[4px_4px_0_0_#160F0B]">
                  <span className="font-bold text-sm">SKENA RATING</span>
                  <span className="text-3xl font-black">{activeModal.rating} <span className="text-sm opacity-60">/ 5.0</span></span>
                </div>
              </div>
              
              {/* Maps Interaction */}
              <button 
                onClick={() => window.open(`https://maps.google.com/?q=${activeModal.name} ${activeModal.area}`, '_blank')}
                className="w-full py-5 border border-espresso bg-transparent text-espresso hover:bg-espresso hover:text-alabaster transition-colors font-clash font-black uppercase text-xl"
              >
                [ BUKA DI MAPS ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
