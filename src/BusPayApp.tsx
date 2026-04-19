import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  History as HistoryIcon, 
  Gift, 
  Wallet, 
  ScanLine, 
  Bus, 
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  Award,
  Moon,
  ArrowRight,
  X,
  CreditCard
} from 'lucide-react';

export default function BusPayMiniApp() {
  const [currentView, setCurrentView] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let timer: any;
    if (currentView === 'success') {
      timer = setInterval(() => setCurrentTime(new Date()), 1000);
    }
    return () => clearInterval(timer);
  }, [currentView]);

  useEffect(() => {
    let timer: any;
    if (currentView === 'scan_simulated') {
      timer = setTimeout(() => {
        setCurrentView('confirm_payment');
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [currentView]);

  const isActive = (view: string) => currentView === view;

  return (
    <div className="bg-slate-200 min-h-screen font-sans flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md h-[850px] max-h-[90vh] bg-stone-50 rounded-[40px] overflow-hidden shadow-2xl relative ring-8 ring-white/60 flex flex-col">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide bg-stone-50">
          <AnimatePresence mode="wait">
            {currentView === 'home' && <HomeView key="home" onScan={() => setCurrentView('scan_simulated')} />}
            {currentView === 'scan_simulated' && <ScanView key="scan" />}
            {currentView === 'confirm_payment' && <ConfirmPaymentView key="confirm" onConfirm={() => setCurrentView('success')} onCancel={() => setCurrentView('home')} />}
            {currentView === 'success' && <SuccessView key="success" time={currentTime} onDone={() => setCurrentView('home')} />}
            {currentView === 'history' && <HistoryView key="history" />}
            {currentView === 'rewards' && <RewardsView key="rewards" />}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        {['home', 'history', 'rewards'].includes(currentView) && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-8 py-5 flex justify-between items-center z-50 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]"
          >
            <NavItem 
              icon={<Home size={24} strokeWidth={isActive('home') ? 2.5 : 2} />} 
              label="Home" 
              isActive={isActive('home')} 
              onClick={() => setCurrentView('home')} 
            />
            <NavItem 
              icon={<HistoryIcon size={24} strokeWidth={isActive('history') ? 2.5 : 2} />} 
              label="History" 
              isActive={isActive('history')} 
              onClick={() => setCurrentView('history')} 
            />
            <NavItem 
              icon={<Gift size={24} strokeWidth={isActive('rewards') ? 2.5 : 2} />} 
              label="Rewards" 
              isActive={isActive('rewards')} 
              onClick={() => setCurrentView('rewards')} 
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-colors duration-300 w-20 ${
        isActive ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <motion.div
        whileTap={{ scale: 0.85 }}
        animate={{ y: isActive ? -2 : 0 }}
        className="relative"
      >
        {icon}
        {isActive && (
          <motion.div 
            layoutId="nav-indicator"
            className="absolute -bottom-2 left-1/2 w-1 h-1 bg-emerald-600 rounded-full"
            style={{ x: '-50%' }}
          />
        )}
      </motion.div>
      <span className={`text-[11px] tracking-wide font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>{label}</span>
    </button>
  );
}

// 1. HOME SCREEN
function HomeView({ onScan }: { onScan: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-6 pb-32 pt-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Good morning, JAY! ☀️</h1>
          <p className="text-sm font-semibold text-slate-500">Sunny today, 32°C</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=JAY&backgroundColor=e2e8f0" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Wallet Card */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="bg-white border text-center border-slate-100 rounded-3xl p-7 shadow-sm mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-stone-100 rounded-full opacity-60"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Wallet className="text-slate-500" size={20} />
            <span className="font-bold text-slate-600 text-sm">BusPay Balance</span>
          </div>
          <button className="bg-emerald-50 hover:bg-emerald-100 transition text-emerald-700 text-xs font-black px-4 py-2 rounded-full shadow-sm border border-emerald-100">
            Top-up
          </button>
        </div>
        <div className="text-left relative z-10">
          <h2 className="text-[42px] font-black tracking-tight text-slate-800 leading-none mb-2">12.50<span className="text-xl text-slate-400 font-bold ml-1 tracking-normal">cUSD</span></h2>
          <p className="text-slate-400 font-semibold tracking-wide">~ 310,000 VND</p>
        </div>
      </motion.div>

      {/* Primary Action Button */}
      <div className="flex flex-col justify-center items-center py-10 my-4 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-56 h-56 bg-emerald-600/10 rounded-full"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScan}
          className="relative z-10 w-48 h-48 bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-xl shadow-emerald-600/30 flex flex-col items-center justify-center text-white border-[6px] border-white group overflow-hidden transition-colors"
        >
          <motion.div className="relative z-10 flex flex-col items-center">
            <ScanLine size={48} strokeWidth={1.5} className="mb-3" />
            <span className="font-black tracking-widest text-sm uppercase">Scan to Pay</span>
          </motion.div>
        </motion.button>
      </div>


    </motion.div>
  );
}

// 2. SCAN SIMULATED SCREEN
function ScanView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-slate-900"></div>
      
      <p className="text-white/70 font-semibold tracking-widest uppercase text-sm mb-12 z-10">Scan QR Code on Bus</p>

      <div className="relative z-10 w-64 h-64 border-2 border-white/20 rounded-3xl overflow-hidden">
        {/* Finder Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-3xl"></div>

        {/* Scanning Line Animation */}
        <motion.div 
          animate={{ y: [0, 250, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_3px_rgba(52,211,153,0.6)]"
        />
      </div>

      <p className="text-white/50 font-medium text-sm mt-12 z-10 flex items-center gap-2">
        <ScanLine size={16} /> Scanning automatically...
      </p>
    </motion.div>
  );
}

// 3. CONFIRM PAYMENT VIEW
function ConfirmPaymentView({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex flex-col justify-end"
    >
      <div className="absolute inset-0" onClick={onCancel}></div>
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white border-t border-slate-200 rounded-t-[40px] p-8 pb-12 relative z-10 shadow-2xl"
      >
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
        
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-black text-slate-800">Confirm Payment</h2>
          <button onClick={onCancel} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-stone-50 border border-slate-100 p-5 rounded-2xl mb-8 flex items-center gap-4 shadow-inner">
          <div className="w-14 h-14 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <Bus size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Bus 150 <span className="text-sm font-medium text-slate-500 ml-1">#51B-123.45</span></h3>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Cho Lon - Suoi Tien</p>
          </div>
        </div>

        <div className="flex justify-between items-end border-b border-slate-100 pb-6 mb-8 mt-2 px-2">
          <span className="text-slate-500 font-bold">Total Fare</span>
          <div className="text-right">
            <div className="text-3xl font-black text-emerald-600 leading-none">0.28 <span className="text-lg text-slate-500">cUSD</span></div>
            <div className="text-sm text-slate-400 font-bold mt-1">~ 7,000 VND</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 transition-colors"
        >
          Confirm Transaction <ArrowRight size={20} strokeWidth={3} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// 4. SUCCESS VIEW
function SuccessView({ time, onDone }: { time: Date, onDone: () => void }) {
  const timeString = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-emerald-500 z-50 flex flex-col p-8 items-center text-center"
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 150, delay: 0.1 }}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-emerald-700/30"
        >
          <CheckCircle2 size={72} strokeWidth={2.5} className="text-emerald-500" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-white text-[32px] font-black leading-tight mb-4 tracking-tight uppercase">Payment<br/>Successful</div>
          <div className="text-emerald-100 text-2xl font-black bg-emerald-600/50 inline-block px-8 py-3 rounded-full mt-2 border border-emerald-400/30 shadow-inner">
            - 0.28 cUSD
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full mt-auto relative z-10"
      >
        <div className="bg-emerald-600/30 border border-emerald-400/30 rounded-2xl p-6 mb-8 backdrop-blur-md shadow-inner">
          <p className="text-emerald-50 font-medium mb-1 uppercase text-xs tracking-wider">Transaction Session</p>
          <div className="text-white text-5xl font-mono font-black tracking-widest">{timeString}</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDone}
          className="w-full bg-white text-emerald-700 hover:bg-emerald-50 text-xl font-black py-5 rounded-2xl shadow-xl transition-colors"
        >
          Done
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// 5. HISTORY VIEW
function HistoryView() {
  const mockHistory = [
    { id: 1, date: "Today", time: "07:30 AM", route: "Bus 150", dest: "HUFLIT Uni", amount: "-0.28 cUSD", isMetro: false },
    { id: 2, date: "Yesterday", time: "17:15 PM", route: "Bus 150", dest: "Home", amount: "-0.28 cUSD", isMetro: false },
    { id: 3, date: "Friday", time: "14:00 PM", route: "Metro Line 1", dest: "Suoi Tien", amount: "-0.50 cUSD", isMetro: true },
    { id: 4, date: "Thursday", time: "08:15 AM", route: "Bus 53", dest: "Hang Xanh", amount: "-0.28 cUSD", isMetro: false },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6 pb-32 pt-8"
    >
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">History</h1>
          <p className="text-sm font-semibold text-slate-500">Your recent rides.</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockHistory.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={item.id}
            className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                {item.date}, {item.time}
              </span>
              <span className="font-black text-slate-700">{item.amount}</span>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                {item.isMetro ? <TrendingUp size={22} className="text-indigo-400" /> : <Bus size={22} className="text-emerald-500" />}
              </div>
              <div>
                <h4 className="text-slate-800 font-bold mb-1 text-lg">{item.route}</h4>
                <div className="flex items-center text-slate-500 text-xs font-semibold gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  To {item.dest}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// 6. REWARDS VIEW
function RewardsView() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6 pb-32 pt-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Rewards</h1>
        <p className="text-sm font-semibold text-slate-500">Earn points on every ride.</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-50 rounded-full opacity-60"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100 shadow-sm">
              <Award className="text-amber-500" size={28} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg">Weekly Goal</h3>
              <p className="text-xs font-bold text-slate-400">7/10 rides completed</p>
            </div>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="relative z-10">
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-3 border border-slate-200/50 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="bg-amber-400 h-full rounded-full"
            />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            <span className="text-amber-500 font-bold">3 more rides</span> for a free ticket!
          </p>
        </div>
      </div>

      <h3 className="text-slate-800 font-black text-lg mb-4 mt-2 px-1">Your Badges</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Badge 1 */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <Bus className="text-blue-400" size={32} />
          </div>
          <h4 className="font-black text-slate-700 text-sm mb-1">Gold Rider</h4>
          <p className="text-[10px] font-bold text-slate-400">Completed 50 rides</p>
        </motion.div>

        {/* Badge 2 */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
            <Moon className="text-indigo-400" size={32} />
          </div>
          <h4 className="font-black text-slate-700 text-sm mb-1">Night Owl</h4>
          <p className="text-[10px] font-bold text-slate-400">3/10 completed</p>
        </motion.div>
      </div>

    </motion.div>
  );
}
