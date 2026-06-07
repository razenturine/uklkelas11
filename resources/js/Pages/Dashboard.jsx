import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Terminal, Users, Settings, LogOut, ShieldAlert, AlertTriangle, Activity, X } from 'lucide-react';
import { MOCK_MESSAGES, MOCK_RADAR_LOGS, MOCK_FORUM, useAuth } from '../Components/Shared';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  
  // If no user context, redirect to login (basic client-side protection for mock)
  useEffect(() => {
    if (!user) {
      router.visit('/login');
    }
  }, [user]);

  const isGuest = user?.role === 'guest';

  // Global Profile State
  const [profile, setProfile] = useState({
    name: user?.name || 'Unknown',
    status: isGuest ? 'Menyimak' : 'Nyari Colokan',
    bio: isGuest ? 'Guest user viewing radar.' : 'Nugas berkedok healing. Penikmat V60.',
    ig: isGuest ? '-' : '@' + (user?.name || 'user').toLowerCase(),
    discord: isGuest ? '-' : (user?.name || 'user').toLowerCase() + '#1337'
  });

  // UI States
  const [activeTab, setActiveTab] = useState('radar');
  const [chats, setChats] = useState(MOCK_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [chatLimitReached, setChatLimitReached] = useState(false);
  const [telemetryUser, setTelemetryUser] = useState(null);
  
  // Fake Coordinate Mock
  const [coords, setCoords] = useState("-7.2504, 112.7688");

  useEffect(() => {
    const timer = setInterval(() => {
      const jitter1 = (Math.random() * 0.001 - 0.0005).toFixed(4);
      const jitter2 = (Math.random() * 0.001 - 0.0005).toFixed(4);
      setCoords(`-7.${2504 + parseFloat(jitter1 * 1000)}, 112.${7688 + parseFloat(jitter2 * 1000)}`);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (isGuest || !chatInput.trim() || chatLimitReached) return;

    const newChat = {
      id: Date.now(),
      time: new Date().toLocaleTimeString('id-ID', { hour12: false }),
      user: profile.name,
      loc: 'RADAR_UTAMA',
      text: chatInput
    };

    const newChats = [...chats, newChat];
    setChats(newChats);
    setChatInput('');

    if (newChats.length >= 8) {
      setChatLimitReached(true);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (isGuest) {
      alert('[ SYS: GUEST TIDAK BISA UPDATE PROFIL ]');
      return;
    }
    const formData = new FormData(e.target);
    setProfile({
      name: formData.get('name'),
      status: formData.get('status'),
      bio: formData.get('bio'),
      ig: formData.get('ig'),
      discord: formData.get('discord')
    });
    alert('[ SYS: PENGATURAN LAMBUNG DISIMPAN ]');
  };

  if (!user) return null; // Wait for redirect

  return (
    <div className="h-screen w-full flex overflow-hidden bg-alabaster selection:bg-espresso selection:text-alabaster text-espresso">
      <Head title="Dashboard Skena" />
      {/* LEFT SIDEBAR (CONTROLLED) */}
      <aside className="w-[280px] min-w-[280px] shrink-0 border-r border-borderline flex flex-col h-full z-10 relative bg-alabaster">
        <div className="p-5 border-b border-borderline bg-espresso text-alabaster flex justify-between items-center">
          <Link href="/" className="font-clash font-black text-2xl hover:text-[var(--color-terracotta)] leading-none">NGOPI.</Link>
          <span className="font-mono text-[10px] border border-alabaster/30 px-2 py-1 font-bold">SYS_USER</span>
        </div>

        <div className="p-6 border-b border-borderline flex flex-col items-center text-center">
          <div className="w-20 h-20 border border-borderline bg-[var(--color-sage)] text-alabaster flex items-center justify-center font-clash text-4xl font-black uppercase mb-4 relative shadow-[4px_4px_0_0_#160F0B]">
            {profile.name.charAt(0)}
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 border border-borderline ${isGuest ? 'bg-borderline' : 'bg-[var(--color-terracotta)] animate-pulse'}`}></div>
          </div>
          <h2 className="font-clash text-xl font-black uppercase mb-1 truncate w-full px-2">{profile.name}</h2>
          <p className="font-mono text-[10px] text-[var(--color-terracotta)] mb-4 uppercase font-bold bg-[var(--color-terracotta)]/10 px-2 py-1 truncate w-full">[{profile.status}]</p>
          <p className="font-mono text-[10px] opacity-80 px-2 mb-4 line-clamp-2 leading-relaxed">{profile.bio}</p>
          <div className="bg-borderline/30 p-2 font-mono text-[10px] uppercase w-full flex justify-between font-bold border border-borderline/50">
            <span>LOC</span>
            <span>{coords}</span>
          </div>
        </div>

        {/* Social Hub */}
        <div className="grid grid-cols-2 font-mono text-[10px] font-bold text-center border-b border-borderline shrink-0">
          <div className="p-3 border-r border-borderline hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer truncate">
            IG: {profile.ig}
          </div>
          <div className="p-3 hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer truncate">
            DC: {profile.discord}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 flex flex-col p-4 gap-2 font-mono text-xs uppercase font-bold overflow-y-auto">
          {[
            { id: 'radar', icon: <Terminal size={16}/>, label: 'Radar Skena' },
            { id: 'forum', icon: <Users size={16}/>, label: 'Forum Komunitas' },
            { id: 'settings', icon: <Settings size={16}/>, label: 'Pengaturan Lambung' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 p-4 border border-borderline transition-all ${
                activeTab === tab.id ? 'bg-espresso text-alabaster border-espresso shadow-sm' : 'hover:bg-borderline/30'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          
          <button
            onClick={() => { setUser(null); router.visit('/login'); }}
            className="mt-auto flex items-center justify-center gap-3 p-4 border border-borderline text-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)] hover:text-alabaster transition-colors"
          >
            <LogOut size={16}/> LOGOUT
          </button>
        </nav>

        {/* Ticker Tape Bottom */}
        <div className="h-8 shrink-0 border-t border-borderline overflow-hidden bg-espresso text-alabaster flex items-center font-mono text-[10px] uppercase">
          <div className="whitespace-nowrap animate-marquee flex font-bold w-[200%]">
            <span className="mx-4 text-[var(--color-terracotta)]">[SYS_LOG] 192.168.1.1 CONNECTED</span>
            <span className="mx-4">[RADAR] NEW NODE DETECTED IN SBY_BARAT</span>
            <span className="mx-4 text-[var(--color-terracotta)]">[WARN] SERVER LOAD 89%</span>
            <span className="mx-4">[SYS_LOG] ANOMALY DETECTED IN KOPITAGRAM</span>
            <span className="mx-4">[RADAR] PING 12ms</span>
            <span className="mx-4 text-[var(--color-sage)]">[AUTH] GUEST ACCESS LOGGED</span>
            {/* DUPLICATE FOR SEAMLESS MARQUEE */}
            <span className="mx-4 text-[var(--color-terracotta)]">[SYS_LOG] 192.168.1.1 CONNECTED</span>
            <span className="mx-4">[RADAR] NEW NODE DETECTED IN SBY_BARAT</span>
            <span className="mx-4 text-[var(--color-terracotta)]">[WARN] SERVER LOAD 89%</span>
            <span className="mx-4">[SYS_LOG] ANOMALY DETECTED IN KOPITAGRAM</span>
            <span className="mx-4">[RADAR] PING 12ms</span>
            <span className="mx-4 text-[var(--color-sage)]">[AUTH] GUEST ACCESS LOGGED</span>
          </div>
        </div>
      </aside>

      {/* RIGHT WORKSPACE (CONTROLLED LAYOUT) */}
      <main className="flex-1 h-full flex flex-col bg-alabaster relative z-0 min-w-0">
        
        {/* RADAR SKENA */}
        {activeTab === 'radar' && (
          <div className="flex flex-col h-full p-6 lg:p-8 gap-6 overflow-hidden">
            
            {/* Header Area */}
            <div className="flex justify-between items-end border-b-2 border-espresso pb-4 shrink-0">
              <div>
                <h2 className="font-clash text-[clamp(2rem,3vw,3rem)] font-black uppercase leading-none">Terminal Radar</h2>
                <p className="font-mono text-xs opacity-60 mt-2 font-bold uppercase tracking-widest border-l-2 border-[var(--color-terracotta)] pl-3">LIVE FEED // SBY_CENTRAL // MAX_LIMIT: 8</p>
              </div>
              <Activity className="text-[var(--color-terracotta)] animate-pulse" size={32} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-0">
              
              {/* Left Column: Chat Feed (Col Span 8) */}
              <div className="xl:col-span-8 flex flex-col gap-6 h-full min-h-0">
                {/* Mock Activity Grid Container */}
                <div className="h-16 border border-borderline bg-espresso flex items-center justify-center p-2 shrink-0 shadow-[4px_4px_0_0_#160F0B]">
                  <div className="grid grid-cols-12 md:grid-cols-24 gap-1 w-full opacity-60 h-full">
                     {Array.from({length: 48}).map((_, i) => (
                       <div key={i} className={`h-full border border-borderline/20 ${
                         Math.random() > 0.8 ? 'bg-[var(--color-terracotta)]/80 animate-pulse' : 
                         Math.random() > 0.7 ? 'bg-[var(--color-sage)]/80 animate-pulse' : 'bg-transparent'
                       }`} />
                     ))}
                  </div>
                </div>

                {/* Chat Feed Container */}
                <div className="flex-1 border border-borderline bg-white flex flex-col relative min-h-0 shadow-[4px_4px_0_0_#160F0B]">
                  <div className="p-3 border-b border-borderline bg-borderline/30 font-mono text-[10px] font-bold uppercase flex justify-between shrink-0">
                    <span>// COMM_LINK</span>
                    <span>SECURE_CHANNEL</span>
                  </div>
                  
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-xs flex flex-col gap-3">
                    {chats.map((msg) => (
                      <div key={msg.id} className="flex flex-wrap md:flex-nowrap gap-3 p-3 bg-alabaster/50 border border-borderline hover:border-espresso transition-all">
                        <span className="text-[var(--color-terracotta)] font-bold shrink-0">[{msg.time}]</span>
                        <span 
                          className="font-bold cursor-pointer hover:underline underline-offset-4 shrink-0 text-espresso"
                          onClick={() => setTelemetryUser(msg.user)}
                        >
                          @{msg.user}
                        </span>
                        <span className="opacity-50 font-bold shrink-0">// [{msg.loc}] :</span>
                        <span className="font-medium text-espresso">{msg.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input / Guest Lock */}
                  <div className="shrink-0 border-t border-borderline">
                     {isGuest ? (
                       <div className="p-6 bg-alabaster/80 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                         <ShieldAlert size={28} className="mb-3 text-[var(--color-terracotta)]" />
                         <p className="font-clash text-2xl font-black uppercase">Guest Restricted</p>
                         <p className="font-mono text-[10px] uppercase mt-2 font-bold opacity-80">Login Untuk Interaksi Radar.</p>
                       </div>
                     ) : chatLimitReached ? (
                        <div className="bg-[var(--color-terracotta)] text-alabaster p-4 font-mono text-xs uppercase font-bold flex items-center gap-3">
                          <AlertTriangle size={20} />
                          [ SYS_WARNING: BATAS CHAT TERCAPAI. ]
                        </div>
                     ) : (
                       <form onSubmit={handleChatSubmit} className="flex bg-alabaster">
                         <span className="font-mono text-[var(--color-terracotta)] p-4 font-bold text-sm bg-borderline/20">{'>'}</span>
                         <input 
                           type="text" 
                           value={chatInput}
                           onChange={(e) => setChatInput(e.target.value)}
                           placeholder="Ketik asupan info skena hari ini..." 
                           className="flex-1 border-none focus:border-none focus:ring-0 text-xs px-4 bg-transparent uppercase font-mono font-bold"
                         />
                         <button type="submit" className="font-mono text-xs font-bold border-l border-borderline px-6 hover:bg-espresso hover:text-alabaster transition-colors uppercase bg-borderline/20 hover:bg-espresso text-espresso">
                           [ SEND ]
                         </button>
                       </form>
                     )}
                  </div>
                </div>
              </div>

              {/* Right Column: Telemetry (Col Span 4) */}
              <div className="xl:col-span-4 flex flex-col gap-6 h-full min-h-0">
                 <div className="flex-1 border border-borderline bg-alabaster flex flex-col shadow-[4px_4px_0_0_#160F0B] min-h-0">
                    <div className="p-3 border-b border-borderline bg-espresso text-alabaster font-mono text-[10px] font-bold uppercase flex justify-between shrink-0">
                      <span>// LIVE_RADAR_LOG</span>
                      <span className="text-[var(--color-terracotta)] animate-pulse">REC</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-[10px] font-bold uppercase text-espresso flex flex-col gap-3">
                      {MOCK_RADAR_LOGS.map((log, i) => (
                        <div key={i} className="border-b border-borderline/50 pb-2 flex gap-2">
                          <span className="text-[var(--color-terracotta)] shrink-0">{'>'}</span> 
                          <span className="break-words">{log}</span>
                        </div>
                      ))}
                      <div className="animate-pulse text-[var(--color-terracotta)] mt-2 bg-[var(--color-terracotta)]/10 p-2 inline-block border border-[var(--color-terracotta)]/30 w-fit text-center">_WAITING_FOR_SIGNAL...</div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        )}

        {/* WORKSPACE B: FORUM KOMUNITAS */}
        {activeTab === 'forum' && (
          <div className="flex flex-col h-full p-6 lg:p-8 gap-6 overflow-hidden">
             <div className="flex justify-between items-end border-b-2 border-espresso pb-4 shrink-0">
              <div>
                <h2 className="font-clash text-[clamp(2rem,3vw,3rem)] font-black uppercase leading-none">Data Ledger Forum</h2>
                <p className="font-mono text-xs opacity-60 mt-2 font-bold uppercase tracking-widest border-l-2 border-[var(--color-terracotta)] pl-3">Diskusi lambung dan colokan. // ACTIVE_THREADS: 3</p>
              </div>
              <button disabled={isGuest} className={`font-mono text-xs font-bold px-6 py-3 border transition-all ${isGuest ? 'opacity-30 border-borderline cursor-not-allowed' : 'bg-espresso text-alabaster border-espresso hover:bg-[var(--color-terracotta)] shadow-[4px_4px_0_0_#D66838]'}`}>
                [ BUKA TOPIK ]
              </button>
            </div>
            
            <div className="flex-1 overflow-auto border border-borderline bg-white shadow-[4px_4px_0_0_#160F0B] min-h-0 p-6">
              <table className="w-full font-mono text-xs text-left border-collapse border border-borderline bg-white">
                <thead className="bg-espresso text-alabaster border-b border-borderline">
                  <tr>
                    <th className="p-4 font-bold uppercase border-r border-borderline/30 tracking-widest">[ TOPIK ]</th>
                    <th className="p-4 font-bold uppercase border-r border-borderline/30 tracking-widest w-1/4">[ AUTHOR ]</th>
                    <th className="p-4 font-bold uppercase tracking-widest w-24">[ REPLIES ]</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_FORUM.map(thread => (
                    <tr key={thread.id} className="border-b border-borderline hover:bg-borderline/20 transition-colors cursor-pointer group">
                      <td className="p-4 uppercase border-r border-borderline font-medium leading-relaxed">{thread.topic}</td>
                      <td className="p-4 border-r border-borderline font-bold text-[var(--color-sage)]">@{thread.author}</td>
                      <td className="p-4 font-bold text-[var(--color-terracotta)] text-center">{thread.replies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORKSPACE C: PENGATURAN LAMBUNG */}
        {activeTab === 'settings' && (
          <div className="flex flex-col h-full p-6 lg:p-8 gap-6 overflow-hidden">
            <div className="flex justify-between items-end border-b-2 border-espresso pb-4 shrink-0">
              <div>
                <h2 className="font-clash text-[clamp(2rem,3vw,3rem)] font-black uppercase leading-none">Pengaturan Lambung</h2>
                <p className="font-mono text-xs opacity-60 mt-2 font-bold uppercase tracking-widest border-l-2 border-[var(--color-terracotta)] pl-3">Konfigurasi telemetri profil lokal.</p>
              </div>
            </div>

            <div className="flex-1 overflow-auto border border-borderline bg-white shadow-[4px_4px_0_0_#160F0B] min-h-0">
              {isGuest ? (
                 <div className="p-12 flex flex-col items-center justify-center text-center opacity-40 h-full">
                   <Settings size={64} className="mb-6" />
                   <h3 className="font-clash text-3xl font-black uppercase">Akses Ditolak</h3>
                   <p className="font-mono text-xs font-bold uppercase mt-3">Guest tidak memiliki konfigurasi profil.</p>
                 </div>
              ) : (
                <form onSubmit={handleProfileUpdate} className="p-8 lg:p-12 max-w-3xl flex flex-col gap-10 font-mono text-sm mx-auto">
                  <div className="flex flex-col gap-3">
                    <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">DISPLAY NAME</label>
                    <input name="name" defaultValue={profile.name} required className="bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 text-lg font-bold transition-colors uppercase text-espresso" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">STATUS SKENA</label>
                    <input name="status" defaultValue={profile.status} required className="bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 text-lg font-bold transition-colors uppercase text-espresso" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">BIO</label>
                    <input name="bio" defaultValue={profile.bio} required className="bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 text-lg font-bold transition-colors uppercase text-espresso" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">INSTAGRAM LINK</label>
                      <input name="ig" defaultValue={profile.ig} required className="bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 text-lg font-bold transition-colors uppercase text-espresso" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">DISCORD ID</label>
                      <input name="discord" defaultValue={profile.discord} required className="bg-transparent border-b-2 border-borderline focus:border-espresso outline-none py-3 text-lg font-bold transition-colors uppercase text-espresso" />
                    </div>
                  </div>
                  <button type="submit" className="border-2 border-espresso bg-transparent py-5 hover:bg-espresso hover:text-alabaster transition-all mt-6 font-clash text-2xl font-black uppercase shadow-[6px_6px_0_0_#160F0B] hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-espresso">
                    [ SIMPAN PERUBAHAN ]
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* TELEMETRI MODAL (CONTROLLED) */}
      {telemetryUser && (
        <div className="fixed inset-0 bg-espresso/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-6" onClick={() => setTelemetryUser(null)}>
          <div className="bg-alabaster w-full max-w-md border border-espresso flex flex-col shadow-[8px_8px_0_0_#D66838]" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-espresso bg-[var(--color-sage)] text-alabaster flex justify-between items-center font-mono text-[10px] font-bold uppercase tracking-widest">
              <span>TELEMETRI_USER // {telemetryUser}</span>
              <button onClick={() => setTelemetryUser(null)} className="hover:text-[var(--color-terracotta)]"><X size={18}/></button>
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-espresso text-alabaster flex items-center justify-center font-clash text-4xl font-black mb-6 border border-borderline shadow-[4px_4px_0_0_#D66838]">
                {telemetryUser.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-clash text-2xl font-black uppercase mb-8 text-espresso truncate w-full px-4">@{telemetryUser}</h3>
              <div className="w-full flex flex-col gap-4 font-mono text-xs font-bold text-espresso">
                <button className="w-full py-4 border border-espresso hover:bg-[var(--color-terracotta)] hover:text-alabaster hover:border-[var(--color-terracotta)] transition-colors uppercase">
                  [ DM IG ↗ ]
                </button>
                <button className="w-full py-4 border border-espresso hover:bg-espresso hover:text-alabaster transition-colors uppercase">
                  [ ADD DISCORD ↗ ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
