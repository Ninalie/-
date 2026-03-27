import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Trash2, Plus, RefreshCw, Heart, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { LocationItem } from '../../pages/PlanningPage';

interface SelectionPanelProps {
  selectedItems: LocationItem[];
  moreRecommendations: LocationItem[];
  onAdd: (item: LocationItem) => void;
  onRemove: (id: string) => void;
  onHover: (id: string | null) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

interface LocationCardProps {
  item: LocationItem;
  onAction: (id: string) => void;
  actionType: 'add' | 'remove';
  onHover: (id: string | null) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ item, onAction, actionType, onHover }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex h-28"
    >
      <div className="relative w-32 flex-shrink-0 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-1.5 left-1.5">
          <div className="px-1.5 py-0.5 bg-primary/90 backdrop-blur-md rounded-md text-[8px] font-bold text-white uppercase tracking-wider shadow-sm">
            {item.type === 'charge' ? '充电' : item.type === 'dining' ? '餐饮' : item.type === 'attraction' ? '景点' : '住宿'}
          </div>
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{item.name}</h4>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAction(item.id);
              }}
              className={`p-1.5 rounded-full flex-shrink-0 transition-all shadow-sm ${
                actionType === 'remove' 
                  ? 'bg-black/5 text-muted-foreground hover:bg-red-500 hover:text-white' 
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {actionType === 'remove' ? <Trash2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
          
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-bold text-foreground">{item.rating.toFixed(1)}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-2 h-2 ${i <= Math.floor(item.rating) ? 'text-green-500 fill-current' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-[9px] text-muted-foreground">({item.reviews})</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="truncate pr-2">{item.description}</span>
          <button className="p-1 text-foreground/40 hover:text-red-500 transition-colors">
            <Heart className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const SelectionPanel = ({ 
  selectedItems, 
  moreRecommendations, 
  onAdd, 
  onRemove, 
  onHover,
  activeFilter,
  onFilterChange
}: SelectionPanelProps) => {
  const [activeTab, setActiveTab] = useState<'waypoints' | 'recommendations'>('waypoints');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filters = ['全部', '充电', '餐饮', '景点', '住宿地点'];

  const filteredRecommendations = moreRecommendations.filter(item => {
    const matchesFilter = activeFilter === '全部' || 
      (activeFilter === '充电' && item.type === 'charge') ||
      (activeFilter === '餐饮' && item.type === 'dining') ||
      (activeFilter === '景点' && item.type === 'attraction') ||
      (activeFilter === '住宿地点' && item.type === 'accommodation');
    
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white border-r border-black/5 shadow-[4px_0_20px_rgba(0,0,0,0.02)]">
      {/* Tabs Header */}
      <div className="flex border-b border-black/5">
        <button
          onClick={() => setActiveTab('waypoints')}
          className={`flex-1 py-4 text-xs font-bold transition-all relative ${
            activeTab === 'waypoints' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          路书途径点 ({selectedItems.length})
          {activeTab === 'waypoints' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 py-4 text-xs font-bold transition-all relative ${
            activeTab === 'recommendations' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          更多推荐
          {activeTab === 'recommendations' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Search & Filters (Only for recommendations) */}
      {activeTab === 'recommendations' && (
        <div className="p-6 border-b border-black/5 space-y-4 bg-black/[0.01]">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="搜索景点、餐厅、充电站..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-sm font-medium outline-none border border-black/5 focus:border-primary/20 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${
                  activeFilter === f 
                    ? 'bg-black text-white border-black shadow-md' 
                    : 'bg-white border-black/5 text-foreground/60 hover:bg-black/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'waypoints' ? (
            <motion.div
              key="waypoints"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {selectedItems.length > 0 ? (
                selectedItems.map(item => (
                  <LocationCard 
                    key={item.id} 
                    item={item} 
                    onAction={onRemove}
                    actionType="remove"
                    onHover={onHover}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-black/5 rounded-[32px]">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">暂无途径点</p>
                    <p className="text-xs text-muted-foreground">从推荐中添加您感兴趣的地点</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">智能推荐</h4>
                  <button className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline">
                    <RefreshCw className="w-3 h-3" />
                    换一批
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {filteredRecommendations.map(item => (
                    <LocationCard 
                      key={item.id} 
                      item={item} 
                      onAction={(id) => {
                        const isAlreadySelected = selectedItems.find(i => i.id === id);
                        if (isAlreadySelected) {
                          onRemove(id);
                        } else {
                          onAdd(item);
                        }
                      }}
                      actionType={selectedItems.find(i => i.id === item.id) ? 'remove' : 'add'}
                      onHover={onHover}
                    />
                  ))}
                  
                  {filteredRecommendations.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed border-black/5 rounded-3xl">
                      <p className="text-xs font-medium">未找到相关推荐</p>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">我的收藏</h4>
                  <button className="text-[10px] font-bold text-primary hover:underline">查看全部</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {moreRecommendations.slice(0, 2).map((loc) => (
                    <div key={loc.id} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                      <img 
                        src={loc.image} 
                        alt={loc.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-[10px] font-bold text-white truncate">{loc.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
