import React, { useEffect, useState, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import { Terminal, Users, Settings, LogOut, ShieldAlert, AlertTriangle, Activity, X, ChevronRight, Bell, MessageSquare, CheckCircle } from 'lucide-react';
import { MOCK_MESSAGES, MOCK_RADAR_LOGS } from '../lib/mock';
import { CustomCursor } from '../Components/GlobalComponents';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  // Mock User
  const user = { name: 'macbook_warrior_99', role: 'admin' };
  const isGuest = user?.role === 'guest';
  const isAdmin = user?.role === 'admin';

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
  
  // Dev Toggle & Reputation States
  const [reputationTier, setReputationTier] = useState('WARGA');
  const [showRepTooltip, setShowRepTooltip] = useState(false);
  
  const tierData = {
    'NUB': { hours: 5, target: 11, next: 'WARGA' },
    'WARGA': { hours: 32, target: 51, next: 'SEPUH' },
    'SEPUH': { hours: 80, target: 100, next: 'ELITE' },
    'ELITE': { hours: 142, target: 142, next: 'MAX' },
  };
  const currentTier = tierData[reputationTier];
  const progressPercent = currentTier.next === 'MAX' ? 100 : Math.min(100, (currentTier.hours / currentTier.target) * 100);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };
  
  // Forum States
  const INITIAL_MOCK_FORUM = [
    { id: 1, topic: 'VALIDASI COLOKAN DI KENJERAN', author: 'broke_student', replies: 0 },
    { id: 2, topic: 'Review Volks Coffee (Skena Alert)', author: 'angsty_latte', replies: 3 },
  ];
  const [forumData, setForumData] = useState(INITIAL_MOCK_FORUM);
  const [activeThread, setActiveThread] = useState(null);
  const [activeThreadReplies, setActiveThreadReplies] = useState([]);
  const [highlightedReplyId, setHighlightedReplyId] = useState(null);
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [replyInput, setReplyInput] = useState('');

  // Notifications State & Deep Linking
  const [showNotifications, setShowNotifications] = useState(false);
  const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'RADAR', text: 'Your DM limit is approaching.', action: 'dm' },
    { id: 2, type: 'SYSTEM', text: '@angsty_latte tagged you in a thread.', action: 'forum', targetId: 2, replyId: 201 },
  ];

  const handleNotificationClick = (n) => {
    setActiveTab(n.action);
    setShowNotifications(false);
    if (n.action === 'forum' && n.targetId) {
      const t = forumData.find(thread => thread.id === n.targetId);
      if (t) {
        setActiveThread(t);
        // Load mock replies specifically for the deep link
        setActiveThreadReplies([
          { id: 200, author: 'skena_boy', text: 'Overextracted bang, tapi seating outdoornya ok.' },
          { id: 201, author: 'angsty_latte', text: 'Menurutku lumayan, @macbook_warrior harus kesini besok bawa terminal.' }
        ]);
        if (n.replyId) {
          setHighlightedReplyId(n.replyId);
          setTimeout(() => setHighlightedReplyId(null), 8000);
        }
      }
    }
  };

  // Tagging State
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  const MOCK_USERS = ['admin', 'angsty_latte', 'broke_student'];

  // Social Handshake DM State
  const [activeDmUser, setActiveDmUser] = useState(null);
  const [dmHistories, setDmHistories] = useState({
    'angsty_latte': [{ id: 1, user: 'angsty_latte', text: 'Bang, colokan di Volks kosong?' }],
    'admin': [{ id: 1, user: 'admin', text: 'Tolong pantau server SBY Barat.' }],
    'skena_boy': [{ id: 1, user: 'skena_boy', text: 'Kopi susu disini overextracted.' }]
  });
  const [dmInput, setDmInput] = useState('');
  const [transferStatus, setTransferStatus] = useState('idle');

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

  const handleInputChange = (val, setter) => {
    setter(val);
    const match = val.match(/@(\w*)$/);
    if (match) {
      setMentionFilter(match[1].toLowerCase());
      setShowMentionMenu(true);
    } else {
      setShowMentionMenu(false);
    }
  };
  const handleMentionSelect = (username, currentVal, setter) => {
    const newVal = currentVal.replace(/@\w*$/, `@${username} `);
    setter(newVal);
    setShowMentionMenu(false);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (isGuest || !chatInput.trim() || chatLimitReached) return;
    const newChat = { id: Date.now(), time: new Date().toLocaleTimeString('id-ID', { hour12: false }), user: profile.name, loc: 'RADAR_UTAMA', text: chatInput };
    const newChats = [...chats, newChat];
    setChats(newChats);
    setChatInput('');
    setShowMentionMenu(false);
    if (newChats.length >= 8) setChatLimitReached(true);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (isGuest) return alert('[ SYS: GUEST TIDAK BISA UPDATE PROFIL ]');
    const formData = new FormData(e.target);
    setProfile({
      name: formData.get('name'), status: formData.get('status'), bio: formData.get('bio'), ig: formData.get('ig'), discord: formData.get('discord')
    });
    alert('[ SYS: PENGATURAN LAMBUNG DISIMPAN ]');
  };

  const handleNewTopicSubmit = (e) => {
    e.preventDefault();
    if (!newTopicInput.trim()) return;
    const newTopic = { id: Date.now(), topic: newTopicInput, author: profile.name, replies: 0 };
    setForumData([newTopic, ...forumData]);
    setNewTopicInput('');
    setIsNewTopicModalOpen(false);
  };

  const openThread = (thread) => {
    setActiveThread(thread);
    setActiveThreadReplies(Array.from({length: thread.replies > 0 ? Math.min(thread.replies, 5) : 0}).map((_, i) => ({
      id: i, author: `reply_node_${i+1}`, text: 'Aman bang, kemarin baru aja dari sana. Colokan lumayan banyak tapi mending bawa terminal.'
    })));
  };

  const handleReplySubmit = () => {
    if(!replyInput.trim()) return;
    const newReplies = [...activeThreadReplies, { id: Date.now(), author: profile.name, text: replyInput }];
    setActiveThreadReplies(newReplies);
    setForumData(prev => prev.map(t => t.id === activeThread.id ? { ...t, replies: newReplies.length } : t));
    setActiveThread({ ...activeThread, replies: newReplies.length });
    setReplyInput('');
    setShowMentionMenu(false);
  };

  const handleDmSubmit = (e) => {
    e.preventDefault();
    if (!dmInput.trim() || !activeDmUser) return;
    const currentMsgs = dmHistories[activeDmUser] || [];
    if (currentMsgs.length >= 5) return;
    const newMsgs = [...currentMsgs, { id: Date.now(), user: profile.name, text: dmInput }];
    setDmHistories({ ...dmHistories, [activeDmUser]: newMsgs });
    setDmInput('');
  };

  const handleHandshake = () => {
    setTransferStatus('requesting');
    setTimeout(() => setTransferStatus('accepted'), 2000);
  };

  // Render Username Helper
  const UserIdentity = ({ name }) => {
    const isMockAdmin = name === 'admin' || (name === profile.name && isAdmin);
    return (
      <span 
        className="font-bold cursor-pointer hover:underline underline-offset-4 shrink-0 text-[#222222] inline-flex items-center gap-1 group break-all leading-none"
        onClick={(e) => { e.stopPropagation(); setTelemetryUser(name); }}
      >
        @{name} {isMockAdmin && <span className="bg-[#FF5000] text-[#F7F7F5] px-1 text-[8px] uppercase tracking-widest leading-none py-0.5 rounded-sm ring-1 ring-[#FF5000] ring-offset-1 ring-offset-[#F7F7F5] shadow-[0_0_10px_rgba(255,80,0,0.5)]">[GOD_MODE]</span>}
      </span>
    );
  };

  const AvatarWrapper = ({ name, children, className="" }) => {
    const isMockAdmin = name === 'admin' || (name === profile.name && isAdmin);
    return (
      <div 
        className={`shrink-0 cursor-pointer ${isMockAdmin ? 'ring-2 ring-[#FF5000] ring-offset-2 ring-offset-[#F7F7F5] shadow-[0_0_15px_rgba(255,80,0,0.5)]' : ''} ${className}`}
        onClick={() => setTelemetryUser(name)}
      >
        {children}
      </div>
    );
  };

  // Reusable Pro Input Classes
  const PRO_INPUT_CLASSES = "w-full bg-transparent border-b-2 border-[#222222]/20 focus:border-[#222222] outline-none ring-0 focus:ring-0 transition-all text-[#222222] font-mono text-sm caret-[#FF5000] placeholder-[#222222]/30 py-3";

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#F7F7F5] selection:bg-[#222222] selection:text-[#F7F7F5]">
      <CustomCursor />
      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; }
      `}</style>
      
      {/* LEFT SIDEBAR */}
      <aside className="w-[280px] min-w-[280px] shrink-0 border-r-2 border-[#222222] flex flex-col h-screen overflow-y-auto z-[100] relative bg-[#F7F7F5]">
        {/* Sticky Logo Header */}
        <div className="sticky top-0 z-50 p-5 border-b-2 border-[#222222] bg-[#222222] text-[#F7F7F5] flex justify-between items-center shadow-[0_4px_0_0_#222222]">
          <Link href="/" className="font-clash font-black text-2xl hover:text-[#FF5000] leading-none">NGOPI.</Link>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative hover:text-[#FF5000] transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF5000] animate-ping"></span>
            </button>
            <span className="font-mono text-[10px] border border-[#F7F7F5]/30 px-2 py-1 font-bold flex items-center gap-2">
              SYS_USER
              <span className="w-2 h-2 rounded-full bg-[#FF5000] animate-pulse inline-block"></span>
            </span>
          </div>

          {/* Notifications Popover */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-64 bg-[#F7F7F5] border-2 border-[#222222] shadow-[4px_4px_0_0_#222222] text-[#222222] z-[9999]"
              >
                <div className="p-2 border-b border-[#222222] bg-[#4A6650] text-[#F7F7F5] font-mono text-[10px] font-bold uppercase tracking-widest">
                  ALERTS_RECEIVED
                </div>
                <div className="flex flex-col">
                  {MOCK_NOTIFICATIONS.map(n => (
                    <button key={n.id} onClick={() => handleNotificationClick(n)} className="w-full text-left p-3 border-b border-[#222222]/20 text-xs font-mono font-medium hover:bg-[#222222]/10 transition-colors">
                      <span className="text-[#FF5000] font-bold uppercase block text-[10px] mb-1">[{n.type}]</span>
                      {n.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 border-b-2 border-[#222222] flex flex-col items-center text-center">
          <AvatarWrapper name={profile.name} className="w-20 h-20 border-2 border-[#222222] bg-[#4A6650] text-[#F7F7F5] flex items-center justify-center font-clash text-4xl font-black uppercase mb-4 relative shadow-[4px_4px_0_0_#222222]">
            {profile.name.charAt(0)}
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 border border-[#222222] ${isGuest ? 'bg-[#222222]/50' : 'bg-[#FF5000] animate-pulse'}`}></div>
          </AvatarWrapper>
          <h2 className="font-clash text-lg lg:text-xl font-black uppercase mb-1 break-all leading-tight w-full px-2 flex flex-col justify-center items-center gap-2">
            {profile.name}
            {isAdmin && <ShieldAlert size={14} className="text-[#FF5000] shrink-0" />}
          </h2>
          <p className="font-mono text-[10px] text-[#FF5000] mb-4 uppercase font-bold bg-[#FF5000]/10 px-2 py-1 break-all w-full">[{profile.status}]</p>
          <p className="font-mono text-[10px] opacity-80 px-2 mb-4 line-clamp-2 leading-relaxed max-w-prose">{profile.bio}</p>
          <div className="bg-[#222222]/5 p-2 font-mono text-[10px] uppercase w-full flex justify-between font-bold border border-[#222222]/20">
            <span>LOC</span>
            <span>{coords}</span>
          </div>
        </div>

        {/* Social Hub */}
        <div className="grid grid-cols-2 font-mono text-[10px] font-bold text-center border-b-2 border-[#222222] shrink-0">
          <div className="p-3 border-r-2 border-[#222222] hover:bg-[#222222] hover:text-[#F7F7F5] transition-colors cursor-pointer break-all leading-none">
            IG: {profile.ig}
          </div>
          <div className="p-3 hover:bg-[#222222] hover:text-[#F7F7F5] transition-colors cursor-pointer break-all leading-none">
            DC: {profile.discord}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 flex flex-col p-4 gap-2 font-mono text-xs uppercase font-bold min-h-0">
          {[
            { id: 'radar', icon: <Terminal size={16}/>, label: 'Radar Skena' },
            { id: 'forum', icon: <Users size={16}/>, label: 'Forum Komunitas' },
            { id: 'dm', icon: <MessageSquare size={16}/>, label: 'Private DMs' },
            { id: 'settings', icon: <Settings size={16}/>, label: 'Pengaturan Lambung' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 p-4 border-2 border-[#222222] transition-all ${
                activeTab === tab.id ? 'bg-[#222222] text-[#F7F7F5] shadow-[4px_4px_0_0_#FF5000]' : 'hover:bg-[#222222]/5'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          
          <button
            onClick={() => { router.visit('/login'); }}
            className="mt-auto flex items-center justify-center gap-3 p-4 border-2 border-[#222222] text-[#FF5000] hover:bg-[#FF5000] hover:text-[#222222] transition-colors shadow-[4px_4px_0_0_#222222]"
          >
            <LogOut size={16}/> LOGOUT
          </button>
        </nav>
      </aside>

      {/* RIGHT WORKSPACE */}
      <main className="flex-1 h-screen overflow-y-auto flex flex-col bg-[#F7F7F5] relative z-0 min-w-0">
        
        {/* RADAR SKENA */}
        {activeTab === 'radar' && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col h-full p-6 lg:p-8 gap-6 overflow-hidden">
            <motion.div variants={itemVariants} className="flex justify-between items-end border-b-2 border-[#222222] pb-4 shrink-0">
              <div>
                <h2 className="font-clash text-[clamp(2rem,3vw,3rem)] font-black uppercase leading-none">Terminal Radar</h2>
                <p className="font-mono text-xs opacity-60 mt-2 font-bold uppercase tracking-widest border-l-2 border-[#FF5000] pl-3">LIVE FEED // SBY_CENTRAL // MAX_LIMIT: 8</p>
              </div>
              <Activity className="text-[#FF5000] animate-pulse" size={32} />
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-0">
              <div className="xl:col-span-8 flex flex-col gap-6 h-full min-h-0">
                <motion.div variants={itemVariants} className="h-16 border-2 border-[#222222] bg-[#222222] flex items-center justify-center p-2 shrink-0 shadow-[4px_4px_0_0_#222222]">
                  <div className="grid grid-cols-12 md:grid-cols-24 gap-1 w-full opacity-60 h-full">
                     {Array.from({length: 48}).map((_, i) => (
                       <div key={i} className={`h-full border border-[#F7F7F5]/20 ${
                         Math.random() > 0.8 ? 'bg-[#FF5000]/80 animate-pulse' : 
                         Math.random() > 0.7 ? 'bg-[#4A6650]/80 animate-pulse' : 'bg-transparent'
                       }`} />
                     ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex-1 border-2 border-[#222222] bg-white flex flex-col relative min-h-0 shadow-[4px_4px_0_0_#222222]">
                  <div className="p-3 border-b-2 border-[#222222] bg-[#222222]/5 font-mono text-[10px] font-bold uppercase flex justify-between shrink-0">
                    <span>// COMM_LINK</span>
                    <span>SECURE_CHANNEL</span>
                  </div>
                  
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-xs flex flex-col gap-3">
                    {chats.map((msg) => (
                      <div key={msg.id} className="flex flex-wrap md:flex-nowrap items-center gap-3 p-3 bg-[#F7F7F5]/50 border-2 border-[#222222]/20 hover:border-[#222222] transition-all">
                        <span className="text-[#FF5000] font-bold shrink-0">[{msg.time}]</span>
                        <UserIdentity name={msg.user} />
                        <span className="opacity-50 font-bold shrink-0">// [{msg.loc}] :</span>
                        <span className="font-medium text-[#222222] max-w-prose">{msg.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="shrink-0 border-t-2 border-[#222222] relative">
                     {/* TAGGING POPOVER */}
                     {showMentionMenu && (
                       <div className="absolute bottom-[calc(100%+8px)] left-0 w-64 bg-[#222222] border-4 border-[#FF5000] shadow-[8px_8px_0_0_#222222] z-50">
                         <div className="p-3 bg-[#FF5000] text-[#222222] font-mono text-xs uppercase font-black flex items-center gap-2">
                           <Activity size={14} className="animate-pulse" /> [ RADAR_NODES ]
                         </div>
                         <div className="flex flex-col bg-[#F7F7F5] p-2 gap-1">
                           {MOCK_USERS.filter(u => u.toLowerCase().includes(mentionFilter)).map(u => (
                             <button key={u} onClick={() => handleMentionSelect(u, chatInput, setChatInput)} className="w-full text-left p-3 font-mono text-xs bg-[#F7F7F5] hover:bg-[#222222] hover:text-[#F7F7F5] border border-[#222222]/20 uppercase font-bold text-[#222222] transition-colors flex items-center gap-2">
                               <span className="text-[#FF5000]">@</span>{u}
                             </button>
                           ))}
                         </div>
                       </div>
                     )}

                     {isGuest ? (
                       <div className="p-6 bg-[#F7F7F5]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                         <ShieldAlert size={28} className="mb-3 text-[#FF5000]" />
                         <p className="font-clash text-2xl font-black uppercase">Guest Restricted</p>
                         <p className="font-mono text-[10px] uppercase mt-2 font-bold opacity-80">Login Untuk Interaksi Radar.</p>
                       </div>
                     ) : chatLimitReached ? (
                        <div className="bg-[#FF5000] text-[#F7F7F5] p-4 font-mono text-xs uppercase font-bold flex items-center gap-3">
                          <AlertTriangle size={20} />
                          [ SYS_WARNING: BATAS CHAT TERCAPAI. ]
                        </div>
                     ) : (
                       <form onSubmit={handleChatSubmit} className="flex bg-[#F7F7F5]">
                         <span className="font-mono text-[#FF5000] p-4 font-bold text-sm bg-[#222222]/5">{'>'}</span>
                         <input 
                           type="text" 
                           value={chatInput}
                           onChange={(e) => handleInputChange(e.target.value, setChatInput)}
                           placeholder="Ketik asupan info skena hari ini... (Ketik @ untuk tag)" 
                           className="flex-1 border-none focus:border-none focus:ring-0 text-xs px-4 bg-transparent uppercase font-mono font-bold caret-[#FF5000]"
                         />
                         <button type="submit" className="font-mono text-xs font-bold border-l-2 border-[#222222] px-6 hover:bg-[#222222] hover:text-[#F7F7F5] transition-colors uppercase bg-[#222222]/5">
                           [ SEND ]
                         </button>
                       </form>
                     )}
                  </div>
                </motion.div>
              </div>

              <div className="xl:col-span-4 flex flex-col gap-6 h-full min-h-0">
                 <motion.div variants={itemVariants} className="flex-1 border-2 border-[#222222] bg-[#F7F7F5] flex flex-col shadow-[4px_4px_0_0_#222222] min-h-0">
                    <div className="p-3 border-b-2 border-[#222222] bg-[#222222] text-[#F7F7F5] font-mono text-[10px] font-bold uppercase flex justify-between shrink-0">
                      <span>// LIVE_RADAR_LOG</span>
                      <span className="text-[#FF5000] animate-pulse">REC</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-[10px] font-bold uppercase text-[#222222] flex flex-col gap-3">
                      {MOCK_RADAR_LOGS.map((log, i) => (
                        <div key={i} className="border-b border-[#222222]/20 pb-2 flex gap-2">
                          <span className="text-[#FF5000] shrink-0">{'>'}</span> 
                          <span className="break-all leading-tight">{log}</span>
                        </div>
                      ))}
                      <div className="animate-pulse text-[#FF5000] mt-2 bg-[#FF5000]/10 p-2 inline-block border border-[#FF5000]/30 w-fit text-center">_WAITING_FOR_SIGNAL...</div>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* WORKSPACE B: FORUM KOMUNITAS */}
        {activeTab === 'forum' && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col h-full p-6 lg:p-8 gap-6 overflow-hidden relative">
            {activeThread ? (
              /* THREAD DETAIL VIEW */
              <motion.div variants={itemVariants} className="flex flex-col h-full overflow-hidden">
                <div className="flex justify-between items-end border-b-2 border-[#222222] pb-4 shrink-0 mb-6">
                  <div>
                    <button 
                      onClick={() => setActiveThread(null)}
                      className="font-mono text-xs text-[#FF5000] font-bold uppercase hover:text-[#222222] transition-colors mb-2 block"
                    >
                      ← KEMBALI KE LEDGER
                    </button>
                    <h2 className="font-clash text-[clamp(1.5rem,2.5vw,2.5rem)] font-black uppercase leading-tight break-all max-w-4xl">{activeThread.topic}</h2>
                    <p className="font-mono text-xs opacity-60 mt-2 font-bold uppercase tracking-widest border-l-2 border-[#FF5000] pl-3 flex items-center gap-2">
                      Author: <UserIdentity name={activeThread.author} /> // Replies: {activeThreadReplies.length}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto bg-white border-2 border-[#222222] shadow-[4px_4px_0_0_#222222] p-6 lg:p-10 flex flex-col gap-8">
                  {/* Original Post */}
                  <div className="border-2 border-[#222222] bg-[#F7F7F5] p-6 relative">
                    <div className="absolute top-0 left-0 bg-[#222222] text-[#F7F7F5] font-mono text-[10px] font-bold uppercase px-3 py-1 flex gap-2 items-center">
                      ORIGINAL_POST <UserIdentity name={activeThread.author} />
                    </div>
                    <p className="mt-6 font-sans text-sm font-medium leading-relaxed max-w-prose">
                      Laporan dari lapangan. Tempat ini {activeThread.topic.toLowerCase()} Tolong verifikasi suhu lain yang udah mampir kesini. Valid kah info ini?
                    </p>
                  </div>

                  {/* Mock Replies */}
                  <div className="flex flex-col gap-4 border-l-4 border-[#222222] pl-6">
                    {activeThreadReplies.map((reply) => (
                      <div key={reply.id} className={`p-4 border-2 transition-all ${highlightedReplyId === reply.id ? 'bg-[#FF5000]/10 border-[#FF5000] ring-2 ring-[#FF5000] shadow-[4px_4px_0_0_#FF5000]' : 'bg-[#222222]/5 border-[#222222]/20'}`}>
                        <div className="font-mono text-xs font-bold text-[#FF5000] mb-2 uppercase flex items-center gap-2">
                          <UserIdentity name={reply.author} />
                        </div>
                        <p className="font-sans text-xs max-w-prose">{reply.text}</p>
                      </div>
                    ))}
                    {activeThreadReplies.length === 0 && (
                      <div className="font-mono text-xs uppercase opacity-50 p-4 border-2 border-dashed border-[#222222]/50">Belum ada balasan dari node lain.</div>
                    )}
                  </div>
                  
                  {/* Reply Input */}
                  <div className="mt-auto pt-6 border-t-2 border-[#222222] relative">
                     {/* TAGGING POPOVER */}
                     {showMentionMenu && (
                       <div className="absolute bottom-[calc(100%+8px)] left-0 w-64 bg-[#222222] border-4 border-[#FF5000] shadow-[8px_8px_0_0_#222222] z-50">
                         <div className="p-3 bg-[#FF5000] text-[#222222] font-mono text-xs uppercase font-black flex items-center gap-2">
                           <Activity size={14} className="animate-pulse" /> [ RADAR_NODES ]
                         </div>
                         <div className="flex flex-col bg-[#F7F7F5] p-2 gap-1">
                           {MOCK_USERS.filter(u => u.toLowerCase().includes(mentionFilter)).map(u => (
                             <button key={u} onClick={() => handleMentionSelect(u, replyInput, setReplyInput)} className="w-full text-left p-3 font-mono text-xs bg-[#F7F7F5] hover:bg-[#222222] hover:text-[#F7F7F5] border border-[#222222]/20 uppercase font-bold text-[#222222] transition-colors flex items-center gap-2">
                               <span className="text-[#FF5000]">@</span>{u}
                             </button>
                           ))}
                         </div>
                       </div>
                     )}
                     <textarea 
                       value={replyInput}
                       onChange={(e) => handleInputChange(e.target.value, setReplyInput)}
                       className="w-full bg-transparent border-b-2 border-[#222222]/20 focus:border-[#222222] outline-none py-3 text-sm font-mono caret-[#FF5000] uppercase min-h-[100px] resize-none"
                       placeholder="TAMBAHKAN BALASAN KE LEDGER... (Ketik @ untuk tag)"
                     ></textarea>
                     <button onClick={handleReplySubmit} className="bg-[#222222] text-[#F7F7F5] font-mono text-xs font-bold uppercase px-6 py-3 mt-4 hover:bg-[#FF5000] transition-colors shadow-[4px_4px_0_0_#FF5000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 border-2 border-[#222222]">
                       [ SUBMIT REPLY ]
                     </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* FORUM LEDGER VIEW */
              <motion.div variants={itemVariants} className="flex flex-col h-full overflow-hidden">
                <div className="flex justify-between items-end border-b-2 border-[#222222] pb-4 shrink-0">
                  <div>
                    <h2 className="font-clash text-[clamp(2rem,3vw,3rem)] font-black uppercase leading-none">Data Ledger Forum</h2>
                    <p className="font-mono text-xs opacity-60 mt-2 font-bold uppercase tracking-widest border-l-2 border-[#FF5000] pl-3">Diskusi lambung dan colokan. // ACTIVE_THREADS: {forumData.length}</p>
                  </div>
                  <button 
                    disabled={isGuest} 
                    onClick={() => setIsNewTopicModalOpen(true)}
                    className={`font-mono text-xs font-bold px-6 py-3 border-2 transition-all ${isGuest ? 'opacity-30 border-[#222222]/30 cursor-not-allowed' : 'bg-[#222222] text-[#F7F7F5] border-[#222222] hover:bg-[#FF5000] shadow-[4px_4px_0_0_#FF5000]'}`}
                  >
                    [ + BUKA TOPIK BARU ]
                  </button>
                </div>
                
                <div className="flex-1 overflow-auto border-2 border-[#222222] bg-white shadow-[4px_4px_0_0_#222222] min-h-0 mt-6 p-6">
                  <table className="w-full font-mono text-xs text-left border-collapse border border-[#222222]/20 bg-white">
                    <thead className="bg-[#222222] text-[#F7F7F5] border-b-2 border-[#222222]">
                      <tr>
                        <th className="p-4 font-bold uppercase border-r border-[#222222]/50 tracking-widest">[ TOPIK ]</th>
                        <th className="p-4 font-bold uppercase border-r border-[#222222]/50 tracking-widest w-1/4">[ AUTHOR ]</th>
                        <th className="p-4 font-bold uppercase tracking-widest w-24 text-center">[ REPLIES ]</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forumData.map((thread) => (
                        <tr 
                          key={thread.id} 
                          onClick={() => openThread(thread)}
                          className="border-b border-[#222222]/20 hover:bg-[#222222]/5 hover:text-[#222222] transition-colors cursor-pointer group"
                        >
                          <td className="p-4 uppercase border-r border-[#222222]/20 font-medium leading-relaxed group-hover:text-[#FF5000] break-all max-w-prose">{thread.topic}</td>
                          <td className="p-4 border-r border-[#222222]/20 font-bold" onClick={(e) => e.stopPropagation()}>
                            <UserIdentity name={thread.author} />
                          </td>
                          <td className="p-4 font-bold text-[#FF5000] text-center">{thread.replies}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            
            {/* NEW TOPIC MODAL */}
            {isNewTopicModalOpen && !isGuest && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                 <div className="bg-white border-4 border-[#222222] shadow-[8px_8px_0_0_#FF5000] w-full max-w-2xl p-8 relative">
                   <button onClick={() => setIsNewTopicModalOpen(false)} className="absolute top-4 right-4 hover:text-[#FF5000] transition-colors"><X size={24}/></button>
                   <h3 className="font-clash text-3xl font-black uppercase mb-6 text-[#222222]">BUAT TOPIK BARU</h3>
                   <form onSubmit={handleNewTopicSubmit} className="flex flex-col gap-6">
                     <div className="flex flex-col gap-2">
                       <label className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">JUDUL TOPIK</label>
                       <input 
                         type="text" 
                         value={newTopicInput}
                         onChange={(e) => setNewTopicInput(e.target.value)}
                         className={PRO_INPUT_CLASSES}
                         placeholder="CONTOH: VALIDASI COLOKAN DI KENJERAN"
                         autoFocus
                         required
                       />
                     </div>
                     <button type="submit" className="bg-[#222222] border-2 border-[#222222] text-[#F7F7F5] py-4 font-mono font-bold uppercase hover:bg-[#FF5000] hover:text-[#222222] transition-colors">
                       [ INJECT KE LEDGER ]
                     </button>
                   </form>
                 </div>
              </div>
            )}
          </motion.div>
        )}

        {/* WORKSPACE D: PRIVATE DMS & SOCIAL HANDSHAKE */}
        {activeTab === 'dm' && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col h-full p-6 lg:p-8 gap-6 overflow-hidden">
            <motion.div variants={itemVariants} className="flex justify-between items-end border-b-2 border-[#222222] pb-4 shrink-0">
              <div>
                <h2 className="font-clash text-[clamp(2rem,3vw,3rem)] font-black uppercase leading-none">Private Comms</h2>
                <p className="font-mono text-xs opacity-60 mt-2 font-bold uppercase tracking-widest border-l-2 border-[#FF5000] pl-3">SECURE ENCLAVE // LIMIT: 5 MSGS</p>
              </div>
              <ShieldAlert className="text-[#FF5000]" size={32} />
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
               {/* INBOX LIST PANE */}
               <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col border-2 border-[#222222] bg-white shadow-[4px_4px_0_0_#222222] min-h-0">
                 <div className="p-4 border-b-2 border-[#222222] bg-[#222222] text-[#F7F7F5] font-mono text-[10px] font-bold uppercase tracking-widest shrink-0">
                   [ INBOX_NODES ]
                 </div>
                 <div className="flex-1 overflow-y-auto flex flex-col">
                   {Object.keys(dmHistories).map(user => (
                     <button 
                       key={user} 
                       onClick={() => { setActiveDmUser(user); setTransferStatus('idle'); }} 
                       className={`p-4 border-b border-[#222222]/20 text-left font-mono text-xs font-bold uppercase transition-colors flex items-center gap-3 ${activeDmUser === user ? 'bg-[#FF5000] text-[#222222]' : 'hover:bg-[#222222]/10 text-[#222222]'}`}
                     >
                       <div className={`w-2 h-2 rounded-full border border-[#222222] ${activeDmUser === user ? 'bg-[#F7F7F5] animate-pulse' : 'bg-[#4A6650]'}`}></div>
                       @{user}
                     </button>
                   ))}
                 </div>
               </motion.div>

               {/* ACTIVE CHAT PANE */}
               <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col border-2 border-[#222222] bg-white shadow-[4px_4px_0_0_#222222] min-h-0">
                 {activeDmUser ? (
                    <>
                       <div className="p-4 border-b-2 border-[#222222] bg-[#222222] text-[#F7F7F5] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shrink-0">
                          <Activity size={14}/> CONNECTION: <UserIdentity name={activeDmUser} />
                       </div>

                       <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 font-mono text-xs font-medium">
                          {(dmHistories[activeDmUser] || []).map(m => (
                            <div key={m.id} className={`max-w-[80%] p-4 border-2 border-[#222222]/20 ${m.user === profile.name ? 'self-end bg-[#4A6650] text-[#F7F7F5] border-[#4A6650]' : 'self-start bg-[#F7F7F5]'} max-w-prose`}>
                               <div className="text-[10px] font-bold opacity-60 mb-1 uppercase">@{m.user}</div>
                               {m.text}
                            </div>
                          ))}
                          {(dmHistories[activeDmUser] || []).length === 0 && (
                            <div className="m-auto text-center font-mono text-xs uppercase opacity-50 font-bold border-2 border-dashed border-[#222222]/50 p-6">
                              BEGIN SECURE TRANSMISSION
                            </div>
                          )}
                       </div>

                       {/* INPUT AREA OR SOCIAL HANDSHAKE LOCKOUT */}
                       <div className="shrink-0 border-t-2 border-[#222222] bg-[#F7F7F5]">
                         {(dmHistories[activeDmUser] || []).length >= 5 ? (
                            <div className="p-8 bg-[#222222] border-t-4 border-[#FF5000] relative overflow-hidden group">
                               <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity bg-[radial-gradient(circle,rgba(255,80,0,0.5)_1px,transparent_1px)] bg-[size:4px_4px]"></div>
                               <div className="absolute -inset-1 bg-[#FF5000] opacity-5 blur-sm animate-pulse pointer-events-none"></div>
                               <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                  <AlertTriangle size={64} className="text-[#FF5000] animate-bounce drop-shadow-[0_0_10px_#FF5000]" />
                                  <h3 className="font-clash text-4xl md:text-5xl font-black uppercase text-[#FF5000] tracking-tighter leading-none animate-pulse mix-blend-screen">[ SOCIAL TRANSFER AGREEMENT ]</h3>
                                  <p className="font-mono text-xs md:text-sm font-bold uppercase text-[#222222] bg-[#FF5000] p-4 border-2 border-[#222222] shadow-[4px_4px_0_0_#222222] max-w-prose">
                                    !! SYSTEM OVERRIDE: 5 MESSAGE LIMIT REACHED !!<br/>
                                    COMMUNICATION LOCKED. INITIATE TRANSFER PROTOCOL TO PROCEED.
                                  </p>
                                  
                                  {transferStatus === 'idle' && (
                                    <div className="flex flex-wrap justify-center gap-4 mt-6 w-full">
                                       <button onClick={handleHandshake} className="bg-[#F7F7F5] text-[#222222] font-mono text-sm font-black uppercase px-8 py-5 hover:bg-[#FF5000] hover:text-[#222222] transition-all shadow-[6px_6px_0_0_#222222] hover:shadow-[2px_2px_0_0_#222222] hover:translate-x-1 hover:translate-y-1 flex-1 min-w-[250px] border-4 border-[#222222]">
                                         [ REQ TRANSFER TO DISCORD ]
                                       </button>
                                       <button onClick={handleHandshake} className="bg-[#222222] border-4 border-[#FF5000] text-[#FF5000] font-mono text-sm font-black uppercase px-8 py-5 hover:bg-[#FF5000] hover:text-[#222222] transition-all shadow-[6px_6px_0_0_#FF5000] hover:shadow-[2px_2px_0_0_#FF5000] hover:translate-x-1 hover:translate-y-1 flex-1 min-w-[250px]">
                                         [ REQ TRANSFER TO IG ]
                                       </button>
                                    </div>
                                  )}

                                  {transferStatus === 'requesting' && (
                                    <div className="font-mono text-lg font-black uppercase text-[#222222] bg-[#FF5000] animate-pulse flex items-center justify-center gap-3 mt-8 border-4 border-[#222222] p-6 w-full max-w-lg shadow-[8px_8px_0_0_rgba(255,255,255,0.2)]">
                                      <Activity size={28} className="animate-spin"/> NEGOTIATING HANDSHAKE WITH @{activeDmUser}...
                                    </div>
                                  )}

                                  {transferStatus === 'accepted' && (
                                    <div className="bg-[#4A6650] text-[#F7F7F5] font-mono text-lg font-black uppercase p-6 flex flex-col md:flex-row items-center gap-4 mt-8 border-4 border-[#222222] shadow-[8px_8px_0_0_#222222] w-full max-w-lg justify-center text-center">
                                      <CheckCircle size={36} className="shrink-0 animate-bounce"/> 
                                      <span>TRANSFER ACCEPTED:<br/><button onClick={() => window.open('https://discord.com', '_blank')} className="mt-2 bg-[#222222] text-[#F7F7F5] px-6 py-3 border-2 border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#222222] transition-colors">ESTABLISH SECURE LINK ↗</button></span>
                                    </div>
                                  )}
                               </div>
                            </div>
                         ) : (
                            <form onSubmit={handleDmSubmit} className="flex h-16">
                              <input 
                                type="text" 
                                value={dmInput}
                                onChange={(e) => setDmInput(e.target.value)}
                                placeholder={`Message @${activeDmUser}... (${5 - (dmHistories[activeDmUser] || []).length} remaining)`} 
                                className="flex-1 border-none focus:ring-0 text-xs px-6 bg-transparent uppercase font-mono font-bold caret-[#FF5000]"
                              />
                              <button type="submit" className="font-mono text-xs font-bold border-l-2 border-[#222222] px-8 hover:bg-[#222222] hover:text-[#F7F7F5] transition-colors uppercase bg-[#222222]/5 shrink-0">
                                [ SEND DM ]
                              </button>
                            </form>
                         )}
                       </div>
                    </>
                 ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#F7F7F5]/50 opacity-50">
                       <MessageSquare size={64} className="mb-4 text-[#222222]" />
                       <h3 className="font-clash text-2xl font-black uppercase text-[#222222]">NO NODE SELECTED</h3>
                       <p className="font-mono text-xs font-bold uppercase mt-2">Select a user from the Inbox list to initiate secure comms.</p>
                    </div>
                 )}
               </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* WORKSPACE C: PENGATURAN LAMBUNG (AESTHETIC OVERHAUL) */}
        {activeTab === 'settings' && (
          <motion.div 
            className="flex flex-col min-h-full bg-[#F7F7F5] relative z-10 justify-start"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Structural Cover Banner - Constrained exactly to h-48. Sits strictly at the top. */}
            <motion.div variants={itemVariants} className="w-full h-48 shrink-0 bg-[#222222] relative border-b-4 border-[#FF5000] overflow-hidden flex items-center">
               {/* Massive Background Marquee */}
               <div className="absolute inset-0 flex items-center opacity-40 pointer-events-none select-none">
                 <div className="animate-marquee whitespace-nowrap flex font-clash font-black text-[6rem] md:text-[8rem] uppercase leading-none tracking-tighter text-[#F7F7F5] w-[200%]">
                   <span className="mx-8 text-transparent" style={{ WebkitTextStroke: '2px #F7F7F5' }}>[ NGOPI // MODERN URBAN CULTURE // SURABAYA ]</span>
                   <span className="mx-8 text-transparent" style={{ WebkitTextStroke: '2px #F7F7F5' }}>[ NGOPI // MODERN URBAN CULTURE // SURABAYA ]</span>
                 </div>
               </div>

               {/* Decorative Tech Accents */}
               <div className="absolute top-4 left-4 font-mono text-[10px] text-[#F7F7F5]/60 uppercase tracking-widest border border-[#F7F7F5]/20 p-2">
                 SYS_PROFILE_MATRIX
               </div>
               <div className="absolute bottom-4 right-4 flex items-center gap-2">
                 <span className="w-3 h-3 bg-[#FF5000] rounded-full animate-pulse shadow-[0_0_10px_#FF5000]"></span>
                 <span className="font-mono text-[10px] font-bold text-[#F7F7F5] uppercase">NODE_ACTIVE</span>
               </div>
            </motion.div>

            {/* Content structurally flows perfectly flush beneath banner using precise math grid. NO negative margins. NO pt-24. */}
            <div className="p-6 lg:p-8 relative z-10 w-full flex-1">
               <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative">
                 
                 {/* Left Column: Avatar & Skena Stats */}
                 <motion.div variants={itemVariants} className="md:col-span-4 xl:col-span-4 flex flex-col gap-6 w-full relative z-20">
                    <div className="bg-[#F7F7F5] border-4 border-[#222222] p-6 shadow-[6px_6px_0_0_#222222] flex flex-col items-center">
                       {/* Avatar UI */}
                       <AvatarWrapper name={profile.name} className="w-32 h-32 md:w-48 md:h-48 border-4 border-[#222222] bg-[#4A6650] text-[#F7F7F5] flex items-center justify-center font-clash text-7xl font-black uppercase relative group overflow-hidden">
                         <span className="group-hover:opacity-10 transition-opacity">{profile.name.charAt(0)}</span>
                         <div className="absolute inset-0 bg-[#222222]/80 text-[#FF5000] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs font-bold uppercase">
                           <Activity size={24} className="mb-2" />
                           [ UPLOAD ]
                         </div>
                       </AvatarWrapper>
                       
                       <h2 className="font-clash text-[clamp(1.5rem,2vw,2rem)] font-black uppercase mt-6 text-center break-all leading-none w-full flex flex-col items-center gap-2">
                         {profile.name}
                         {isAdmin && <span className="bg-[#FF5000] text-[#F7F7F5] text-[10px] font-mono tracking-widest px-2 py-1 leading-none shadow-[2px_2px_0_0_#222222] border-2 border-[#222222] mt-2">[GOD_MODE]</span>}
                       </h2>
                       <div className="bg-[#FF5000]/10 text-[#FF5000] font-mono text-[10px] font-bold uppercase px-4 py-2 mt-4 border-2 border-[#FF5000] break-all leading-none text-center w-full">
                         ROLE: {user.role}
                       </div>
                    </div>

                    {/* Skena Stats Box */}
                    <div className="bg-[#222222] text-[#F7F7F5] p-6 border-4 border-[#222222] shadow-[6px_6px_0_0_#FF5000] relative">
                      <div className="font-mono text-[10px] uppercase font-bold text-[#FF5000] border-b border-[#F7F7F5]/30 pb-3 mb-4 flex items-center gap-2">
                        <Activity size={14} className="shrink-0" /> <span>SKENA STATS_</span>
                      </div>
                      <div className="flex flex-col gap-4 font-mono text-[10px] md:text-xs">
                        <div className="flex justify-between items-end border-b border-[#F7F7F5]/20 pb-2 gap-2">
                          <span className="opacity-60 uppercase shrink-0">Jam Nongkrong</span>
                          <span className="font-bold text-base md:text-lg text-right truncate">{currentTier.hours}H</span>
                        </div>
                        
                        {/* Interactive Reputation Row */}
                        <div 
                          className="flex justify-between items-end border-b border-[#F7F7F5]/20 pb-2 gap-2 cursor-pointer group relative"
                          onMouseEnter={() => setShowRepTooltip(true)}
                          onMouseLeave={() => setShowRepTooltip(false)}
                        >
                          <span className="opacity-60 uppercase shrink-0">Reputasi</span>
                          <span className="font-bold text-base md:text-lg text-[#222222] bg-[#4A6650] px-2 shrink-0 group-hover:bg-[#FF5000] transition-colors">{reputationTier}</span>
                          
                          {/* Hover Tooltip Popover */}
                          <AnimatePresence>
                            {showRepTooltip && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-2 w-full bg-[#F7F7F5] border-4 border-[#222222] shadow-[4px_4px_0_0_#FF5000] p-4 text-[#222222] z-[99]"
                              >
                                <div className="flex justify-between font-bold text-xs uppercase mb-2">
                                  <span>TIER: {reputationTier}</span>
                                  {currentTier.next !== 'MAX' && <span className="text-[#FF5000]">{currentTier.target - currentTier.hours}H TO {currentTier.next}</span>}
                                </div>
                                <div className="w-full h-2 bg-[#222222]/20 overflow-hidden border border-[#222222]">
                                  <div className="h-full bg-[#FF5000] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
                                </div>
                                {currentTier.next === 'MAX' && <div className="text-[10px] mt-2 font-bold opacity-60">MAXIMUM DRIP ACHIEVED</div>}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <div className="flex justify-between items-end gap-2">
                          <span className="opacity-60 uppercase shrink-0">Domisili</span>
                          <span className="font-bold text-base md:text-lg text-right truncate">SBY</span>
                        </div>
                      </div>
                    </div>
                 </motion.div>

                 {/* Right Column: Settings Form */}
                 <motion.div variants={itemVariants} className="md:col-span-8 xl:col-span-8 bg-white border-4 border-[#222222] p-6 lg:p-10 shadow-[6px_6px_0_0_#222222] w-full relative">
                    
                    {/* DEV STATE TOGGLE */}
                    <div className="mb-8 border-2 border-[#FF5000]/30 bg-[#FF5000]/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="font-mono text-xs uppercase font-bold text-[#FF5000] flex items-center gap-2">
                        <Settings size={14} /> [ DEV_OVERRIDE ] REPUTATION TIER
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-[10px] font-bold">
                        {['NUB', 'WARGA', 'SEPUH', 'ELITE'].map(tier => (
                          <button 
                            key={tier}
                            onClick={() => setReputationTier(tier)}
                            className={`px-3 py-1 border-2 transition-colors uppercase ${reputationTier === tier ? 'bg-[#FF5000] text-[#222222] border-[#FF5000]' : 'border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-[#F7F7F5]'}`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-b-4 border-[#222222] pb-6 mb-8">
                      <h2 className="font-clash text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-none break-words">Pengaturan Lambung</h2>
                      <p className="font-mono text-[10px] md:text-xs opacity-60 mt-3 font-bold uppercase tracking-widest border-l-4 border-[#FF5000] pl-3">Ubah Konfigurasi Node Profil Anda.</p>
                    </div>

                    {isGuest ? (
                       <div className="p-12 flex flex-col items-center justify-center text-center opacity-40">
                         <Settings size={64} className="mb-6 text-[#222222]" />
                         <h3 className="font-clash text-3xl font-black uppercase text-[#222222]">Akses Ditolak</h3>
                         <p className="font-mono text-xs font-bold uppercase mt-3 text-[#222222]">Guest tidak memiliki konfigurasi profil.</p>
                       </div>
                    ) : (
                      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-8 font-mono text-sm w-full max-w-prose">
                        <div className="flex flex-col gap-3">
                          <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">DISPLAY NAME</label>
                          <input name="name" defaultValue={profile.name} required className={PRO_INPUT_CLASSES} />
                        </div>
                        <div className="flex flex-col gap-3">
                          <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">STATUS SKENA</label>
                          <input name="status" defaultValue={profile.status} required className={PRO_INPUT_CLASSES} />
                        </div>
                        <div className="flex flex-col gap-3">
                          <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">BIO</label>
                          <textarea name="bio" defaultValue={profile.bio} required className={`${PRO_INPUT_CLASSES} resize-none h-24`}></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col gap-3">
                            <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">INSTAGRAM LINK</label>
                            <input name="ig" defaultValue={profile.ig} required className={PRO_INPUT_CLASSES} />
                          </div>
                          <div className="flex flex-col gap-3">
                            <label className="uppercase font-bold opacity-60 tracking-widest text-[10px]">DISCORD ID</label>
                            <input name="discord" defaultValue={profile.discord} required className={PRO_INPUT_CLASSES} />
                          </div>
                        </div>
                        <button type="submit" className="border-4 border-[#222222] bg-[#222222] text-[#F7F7F5] py-5 hover:bg-[#FF5000] hover:border-[#FF5000] hover:text-[#222222] transition-all mt-6 font-clash text-2xl font-black uppercase shadow-[6px_6px_0_0_#FF5000] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                          [ SIMPAN PERUBAHAN ]
                        </button>
                      </form>
                    )}
                 </motion.div>

               </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* TELEMETRI MODAL */}
      {telemetryUser && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-[9999] flex items-center justify-center p-6" onClick={() => setTelemetryUser(null)}>
          <div className="bg-[#F7F7F5] w-full max-w-2xl border-4 border-[#222222] flex flex-col shadow-[8px_8px_0_0_#FF5000]" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b-4 border-[#222222] bg-[#222222] text-[#F7F7F5] flex justify-between items-center font-mono text-[10px] font-bold uppercase tracking-widest">
              <span>DOSSIER // {telemetryUser}</span>
              <button onClick={() => setTelemetryUser(null)} className="hover:text-[#FF5000] transition-colors"><X size={18}/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12">
               {/* Visual Profile */}
               <div className="md:col-span-5 p-8 border-b-2 md:border-b-0 md:border-r-4 border-[#222222] flex flex-col items-center text-center bg-white">
                  <AvatarWrapper name={telemetryUser} className="w-32 h-32 bg-[#4A6650] text-[#F7F7F5] flex items-center justify-center font-clash text-5xl font-black mb-6 border-4 border-[#222222] shadow-[6px_6px_0_0_#FF5000]">
                    {telemetryUser.charAt(0).toUpperCase()}
                  </AvatarWrapper>
                  <h3 className="font-clash text-2xl font-black uppercase mb-2 text-[#222222] break-all leading-none w-full flex flex-col items-center justify-center gap-2">
                    @{telemetryUser} 
                    {(telemetryUser === 'admin' || (telemetryUser === profile.name && isAdmin)) && <ShieldAlert size={18} className="text-[#FF5000] shrink-0 mt-2" />}
                  </h3>
                  <div className="text-[#FF5000] font-mono text-[10px] font-bold uppercase border-2 border-[#FF5000] px-3 py-1 bg-[#FF5000]/10 mt-3 break-all leading-none">
                    {telemetryUser === 'admin' ? 'ELITE NODE' : 'STANDARD NODE'}
                  </div>
               </div>

               {/* Dossier Data */}
               <div className="md:col-span-7 p-8 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs font-bold uppercase border-b-2 border-[#222222] pb-2 mb-4 text-[#222222]">
                      [ SYSTEM IDENTIFICATION ]
                    </div>
                    <div className="flex flex-col gap-4 font-mono text-xs">
                      <div className="flex flex-col gap-1">
                        <span className="opacity-50 font-bold">STATUS / BIO</span>
                        <span className="text-[#222222] font-medium max-w-prose">{telemetryUser === 'admin' ? 'Memantau server.' : 'Mencari colokan di SBY Barat...'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="opacity-50 font-bold">JOINED</span>
                          <span className="text-[#222222] font-bold">2026</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="opacity-50 font-bold">TOTAL THREADS</span>
                          <span className="text-[#222222] font-bold">{Math.floor(Math.random() * 20) + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        setDmHistories(prev => prev[telemetryUser] ? prev : { ...prev, [telemetryUser]: [] });
                        setActiveDmUser(telemetryUser);
                        setActiveTab('dm');
                        setTelemetryUser(null);
                      }} 
                      className="w-full py-5 bg-[#FF5000] text-[#222222] border-4 border-[#222222] font-clash text-xl font-black uppercase tracking-widest hover:bg-[#222222] hover:text-[#FF5000] transition-colors shadow-[6px_6px_0_0_#222222] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                    >
                      [ SEND DIRECT MESSAGE ]
                    </button>
                    
                    <div className="flex gap-3">
                      <button onClick={() => window.open('https://instagram.com', '_blank')} className="flex-1 py-3 border-2 border-[#222222] hover:bg-[#222222] hover:text-[#F7F7F5] transition-colors uppercase font-mono text-[10px] font-bold">
                        IG ↗
                      </button>
                      <button onClick={() => window.open('https://discord.com', '_blank')} className="flex-1 py-3 border-2 border-[#222222] hover:bg-[#222222] hover:text-[#F7F7F5] transition-colors uppercase font-mono text-[10px] font-bold">
                        DISCORD ↗
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
