import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { CustomCursor } from '../Components/GlobalComponents';

export default function AuthPage({ type }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    // Simulate setting local state/cookie or redirecting based on mock logic
    // Since we don't have a real backend yet, we just redirect.
    if (username.toLowerCase() === 'admin') {
      router.visit('/admin');
    } else {
      router.visit('/dashboard');
    }
  };

  const handleGuest = () => {
    router.visit('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-alabaster selection:bg-espresso selection:text-alabaster">
      <CustomCursor />
      
      {/* 50vw Image - Editorial Grayscale */}
      <div className="hidden md:block w-1/2 relative border-r border-borderline">
        <img 
          src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2000&auto=format&fit=crop" 
          alt="Auth Editorial" 
          className="object-cover w-full h-full grayscale mix-blend-multiply"
        />
        <div className="absolute top-6 left-6 font-mono text-xs font-bold uppercase bg-alabaster p-2 border border-borderline shadow-[4px_4px_0_0_#160F0B]">
          SYS_AUTH_NODE // {type.toUpperCase()}
        </div>
      </div>
      
      {/* 50vw Form - Brutalist but Controlled */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative bg-alabaster">
        <Link href="/" className="absolute top-6 right-6 font-mono text-xs font-bold uppercase border border-borderline px-6 py-2 hover:bg-espresso hover:text-alabaster transition-colors shadow-sm">
          [ KEMBALI ]
        </Link>

        <div className="w-full max-w-md flex flex-col">
          <h1 className="font-clash text-[clamp(3rem,5vw,4rem)] font-black uppercase tracking-tighter mb-10 leading-[0.95]">
            {type === 'login' ? 'Validasi Identitas.' : 'Daftar Radar.'}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mb-10">
            <input 
              type="text" 
              placeholder="USERNAME SKENA" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 font-mono text-xl font-bold uppercase transition-colors"
            />
            {type === 'register' && (
              <input 
                type="text" 
                placeholder="INVITE CODE" 
                className="w-full bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 font-mono text-xl font-bold uppercase transition-colors"
              />
            )}
            <input 
              type="password" 
              placeholder="PASSWORD" 
              className="w-full bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 font-mono text-xl font-bold uppercase transition-colors"
            />
            <button type="submit" className="w-full bg-espresso text-alabaster py-5 font-clash text-2xl font-black uppercase hover:bg-terracotta hover:text-espresso border-2 border-espresso transition-all mt-4 shadow-[6px_6px_0_0_#D66838] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              [ SUBMIT ]
            </button>
          </form>

          <div className="flex flex-col gap-4 font-mono text-xs uppercase font-bold border-t border-borderline pt-6">
            <button type="button" onClick={handleGuest} className="text-left opacity-60 hover:opacity-100 hover:text-terracotta transition-colors flex items-center gap-3">
              <span className="text-terracotta">{'>'}</span> Masuk sebagai Guest (Read-Only)
            </button>
            {type === 'login' ? (
              <Link href="/register" className="text-left opacity-60 hover:opacity-100 transition-colors flex items-center gap-3">
                <span className="text-terracotta">{'>'}</span> Belum punya akses? Daftar disini.
              </Link>
            ) : (
              <Link href="/login" className="text-left opacity-60 hover:opacity-100 transition-colors flex items-center gap-3">
                <span className="text-terracotta">{'>'}</span> Sudah ada akses? Login disini.
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
