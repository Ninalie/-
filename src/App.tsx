import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { FeaturedCases } from './components/FeaturedCases';
import { StoriesSection } from './components/StoriesSection';
import { PlanningPage } from './pages/PlanningPage';
import { AllRoadbooksPage } from './pages/AllRoadbooksPage';
import { RoadbookDetailPage } from './pages/RoadbookDetailPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { GuluLogo } from './components/GuluLogo';
import ScrollToTop from './components/ScrollToTop';
import { Trees, ChevronDown, Clock, MapPin, ArrowRight, Navigation, ChevronLeft, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);

  const isDetailPage = location.pathname.startsWith('/roadbook/') || location.pathname.startsWith('/story/');
  const isRoadbookDetail = location.pathname.startsWith('/roadbook/');

  const recentRoadbooks = [
    { id: '1', title: '大理丽江深度游', date: '2026-03-25', route: '广州 - 云南' },
    { id: '2', title: '顺德美食特种兵', date: '2026-03-20', route: '广州 - 佛山' },
    { id: '3', title: '川西小环线', date: '2026-04-15', route: '成都 - 康定' },
    { id: '4', title: '海南环岛自驾', date: '2026-02-10', route: '海口 - 三亚' },
    { id: '5', title: '莫干山周末小憩', date: '2026-03-10', route: '上海 - 湖州' },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-black/5">
      {/* Left: Logo or Back Button */}
      <div className="flex items-center gap-4 min-w-[200px]">
        {isDetailPage ? (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors flex items-center gap-2 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-bold">返回</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center p-1 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <GuluLogo className="w-full h-full text-white" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="font-display text-xl font-bold tracking-tight text-foreground">咕噜路书</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">GuluDrive</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Middle: Detail Actions */}
      <div className="hidden md:flex items-center gap-4">
        {isDetailPage && (
          <div className="flex items-center gap-3">
            {isRoadbookDetail && (
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 border text-sm font-bold ${isFavorited ? 'bg-red-50 text-red-500 border-red-100' : 'hover:bg-black/5 text-foreground/60 border-black/5'}`}
              >
                <Bookmark className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? '已收藏' : '收藏'}
              </button>
            )}
            <button className="px-4 py-1.5 hover:bg-black/5 text-foreground/60 border border-black/5 rounded-full transition-colors flex items-center gap-2 text-sm font-bold">
              <Share2 className="w-4 h-4" />
              分享
            </button>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6 min-w-[200px] justify-end">
        <div className="hidden sm:flex items-center gap-2">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="User Avatar" 
            className="w-8 h-8 rounded-full border border-black/5 object-cover"
          />
          <span className="text-sm font-medium text-foreground/80">Nina</span>
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button 
            onClick={() => navigate('/all-roadbooks')}
            className="bg-white border border-black/10 text-foreground/80 px-6 py-2 rounded-full text-sm font-bold hover:bg-black/5 transition-all flex items-center gap-2 shadow-sm"
          >
            我的路书
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-[100]"
              >
                <div className="p-4 border-b border-black/5 bg-black/[0.02]">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">最近生成</h3>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {recentRoadbooks.map((rb) => (
                    <button
                      key={rb.id}
                      onClick={() => {
                        navigate('/planning');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full p-4 hover:bg-black/5 flex flex-col gap-1 text-left transition-colors border-b border-black/5 last:border-0"
                    >
                      <span className="text-sm font-bold text-foreground line-clamp-1">{rb.title}</span>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rb.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{rb.route}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    navigate('/all-roadbooks');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full p-4 bg-primary/5 text-primary text-xs font-bold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                >
                  查看全部路书
                  <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          新建路书
        </button>
      </div>
    </nav>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <FeaturedCases />
    <StoriesSection />
  </>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/all-roadbooks" element={<AllRoadbooksPage />} />
          <Route path="/roadbook/:id" element={<RoadbookDetailPage />} />
          <Route path="/story/:id" element={<StoryDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}
