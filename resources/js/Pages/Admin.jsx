import React from 'react';
import { Link } from '@inertiajs/react';
import { ShieldAlert, MapPin } from 'lucide-react';
import { MOCK_CAFES } from '../lib/mock';
import { CustomCursor } from '../Components/GlobalComponents';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-espresso text-borderline p-6 lg:p-12 selection:bg-alabaster selection:text-espresso flex flex-col">
      <CustomCursor />
      <header className="mb-12 border-b border-borderline/30 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-clash text-[clamp(3rem,6vw,6rem)] font-black uppercase text-alabaster tracking-tighter leading-none">Kontrol Panel</h1>
          <h2 className="font-mono text-terracotta text-sm uppercase tracking-widest mt-4 font-bold border-l-2 border-terracotta pl-3">// PUSAT SKENA (GOD MODE)</h2>
        </div>
        <Link href="/dashboard" className="font-mono text-xs font-bold border border-borderline/30 px-8 py-4 hover:bg-alabaster hover:text-espresso transition-colors uppercase shadow-[4px_4px_0_0_#3E5146]">
          [ KEMBALI KE BASE ]
        </Link>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-1">
        {/* USERS TABLE */}
        <div className="border border-borderline/30 flex flex-col bg-borderline/5">
          <div className="bg-borderline/10 p-5 border-b border-borderline/30 font-mono text-[10px] flex items-center gap-3 text-alabaster font-bold uppercase tracking-widest">
            <ShieldAlert size={16} className="text-terracotta" /> [ DATA PENGGUNA AKTIF ]
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full font-mono text-xs text-left">
              <thead className="text-borderline/50 border-b border-borderline/30 bg-black/40">
                <tr>
                  <th className="p-5 font-bold uppercase tracking-wider">ID</th>
                  <th className="p-5 font-bold uppercase border-l border-borderline/30 tracking-wider">STATUS</th>
                  <th className="p-5 font-bold uppercase border-l border-borderline/30 tracking-wider text-center">REPORTS</th>
                  <th className="p-5 font-bold uppercase border-l border-borderline/30 tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {['angsty_latte', 'macbook_warrior', 'broke_student'].map((usr, i) => (
                  <tr key={usr} className="border-b border-borderline/30 hover:bg-borderline/10 transition-colors">
                    <td className="p-5 font-bold uppercase truncate max-w-[120px]">{usr}</td>
                    <td className="p-5 border-l border-borderline/30 text-sage font-bold">ONLINE</td>
                    <td className="p-5 border-l border-borderline/30 font-bold text-center">{i}</td>
                    <td className="p-5 border-l border-borderline/30">
                      <button className="text-terracotta hover:text-alabaster font-bold transition-colors uppercase">[ BAN_USER ]</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SPACES TABLE */}
        <div className="border border-borderline/30 flex flex-col bg-borderline/5">
          <div className="bg-borderline/10 p-5 border-b border-borderline/30 font-mono text-[10px] flex items-center gap-3 text-alabaster font-bold uppercase tracking-widest">
            <MapPin size={16} className="text-sage" /> [ DIREKTORI SPACES ]
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full font-mono text-xs text-left">
              <thead className="text-borderline/50 border-b border-borderline/30 bg-black/40">
                <tr>
                  <th className="p-5 font-bold uppercase tracking-wider">CAFE NAME</th>
                  <th className="p-5 font-bold uppercase border-l border-borderline/30 tracking-wider">CITY AREA</th>
                  <th className="p-5 font-bold uppercase border-l border-borderline/30 tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CAFES.map((cafe) => (
                  <tr key={cafe.id} className="border-b border-borderline/30 hover:bg-borderline/10 transition-colors">
                    <td className="p-5 font-bold uppercase text-terracotta truncate max-w-[150px]">{cafe.name}</td>
                    <td className="p-5 border-l border-borderline/30 uppercase font-bold">{cafe.area}</td>
                    <td className="p-5 border-l border-borderline/30">
                      <button className="hover:text-alabaster font-bold transition-colors uppercase">[ EDIT_NODE ]</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
