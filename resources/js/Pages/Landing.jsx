import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapPin, ArrowUpRight, X } from 'lucide-react';
import { MOCK_CAFES, useAuth } from '../Components/Shared';

export default function Landing() {
  const [time, setTime] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }) + " WIB");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-terracotta selection:text-alabaster bg-alabaster overflow-hidden">
      <Head title="Info Ngopi Hari Ini" />
      {/* TOP NAV */}
      <nav className="fixed top-0 w-full flex justify-between items-center p-6 bg-alabaster/0 z-50 mix-blend-difference text-alabaster pointer-events-none">
        <div className="font-clash font-black text-3xl tracking-tighter">NGOPI.</div>
        <div className="font-mono text-xs tracking-widest uppercase flex items-center gap-6 pointer-events-auto">
          <span className="hidden md:inline-block border border-alabaster px-3 py-1 font-bold">{time}</span>
          {user ? (
            <Link href="/dashboard" className="hover:text-[var(--color-terracotta)] transition-colors font-bold border border-alabaster px-3 py-1">[ DASHBOARD ]</Link>
          ) : (
            <Link href="/login" className="hover:text-[var(--color-terracotta)] transition-colors font-bold border border-alabaster px-3 py-1">[ MASUK / DAFTAR ]</Link>
          )}
        </div>
      </nav>

      {/* HERO SECTION - CONTROLLED PROPORTIONS */}
      <section className="relative min-h-[90vh] flex flex-col justify-center border-b border-borderline px-6 md:px-12 bg-alabaster">
        <div className="absolute top-0 right-0 w-full md:w-[60vw] h-full border-l border-borderline overflow-hidden grayscale">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
            alt="Skena" 
            className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-[15s]"
          />
        </div>
        
        {/* Harmonious Text overlay */}
        <div className="relative z-10 w-full md:max-w-4xl pointer-events-none mix-blend-difference text-alabaster">
          <h1 className="font-clash text-[clamp(4rem,10vw,10rem)] font-black uppercase tracking-tighter leading-[0.95] mt-20 md:mt-0">
            Info<br/>Ngopi<br/>Hari<br/>Ini.
          </h1>
        </div>
        
        <div className="absolute bottom-8 left-6 md:left-12 z-20 font-mono text-xs uppercase max-w-sm border-l-4 border-terracotta pl-4 mix-blend-difference text-alabaster bg-black/20 backdrop-blur-md p-4 font-bold leading-relaxed">
          Validasi ruang nugas berkedok healing. Asupan kafein pantau langsung dari radar skena Surabaya & sekitarnya.
        </div>
      </section>

      {/* DIRECTORY GRID - CONTROLLED WHITESPACE */}
      <section className="py-24 px-6 md:px-12 bg-alabaster">
        <div className="mb-12 border-b-2 border-espresso pb-4">
          <h2 className="font-mono text-sm tracking-widest uppercase font-bold text-espresso flex items-center gap-3">
            <span className="w-3 h-3 bg-[var(--color-terracotta)] inline-block"></span> DIREKTORI SKENA LOKAL
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CAFES.map((cafe) => (
            <div 
              key={cafe.id} 
              onClick={() => setActiveModal(cafe)}
              className="p-8 border border-borderline hover:bg-espresso hover:text-alabaster transition-colors group relative cursor-pointer shadow-sm"
            >
              <MapPin className="mb-10 opacity-20 group-hover:opacity-100 group-hover:text-[var(--color-terracotta)] transition-opacity" size={40} />
              <h3 className="font-clash text-3xl font-black mb-3 uppercase leading-none">{cafe.name}</h3>
              <p className="font-mono text-xs font-bold mb-10 opacity-80 text-[var(--color-terracotta)]">{cafe.area}</p>
              <div className="flex justify-between items-end font-mono text-[10px] font-bold border-t border-borderline/30 group-hover:border-alabaster/30 pt-4">
                <span className="uppercase">{cafe.vibe}</span>
                <ArrowUpRight className="group-hover:text-[var(--color-terracotta)]" size={16}/>
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
            <p className="text-[var(--color-terracotta)] animate-pulse">SYS_STATUS: ONLINE</p>
          </div>
          <div className="my-16 lg:my-24">
            <h1 className="font-clash text-[clamp(4rem,8vw,8rem)] leading-[0.8] font-black tracking-tighter mix-blend-exclusion">NGOPI.</h1>
          </div>
          <div className="flex justify-between border-t border-borderline/30 pt-6 font-mono text-xs font-bold uppercase">
            <Link href="/admin" className="hover:text-[var(--color-terracotta)] transition-colors">[ PUSAT KONTROL ]</Link>
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
              <button onClick={() => setActiveModal(null)} className="hover:text-[var(--color-terracotta)] transition-colors"><X size={20}/></button>
            </div>
            <div className="p-8 md:p-12 text-espresso">
              <h2 className="font-clash text-[clamp(2.5rem,5vw,4rem)] font-black uppercase mb-4 tracking-tighter leading-none">{activeModal.name}</h2>
              <p className="font-mono text-[var(--color-terracotta)] font-bold uppercase text-sm mb-10 border-l-4 border-terracotta pl-3">{activeModal.area}</p>
              
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
              
              <button className="w-full py-5 border border-espresso bg-transparent text-espresso hover:bg-espresso hover:text-alabaster transition-colors font-clash font-black uppercase text-xl">
                [ BUKA DI MAPS ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
