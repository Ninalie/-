import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PlanningHeader } from '../components/planning/PlanningHeader';
import { SelectionPanel } from '../components/planning/SelectionPanel';
import { MapPanel } from '../components/planning/MapPanel';
import { ItineraryPanel } from '../components/planning/ItineraryPanel';

export interface LocationItem {
  id: string;
  type: 'charge' | 'dining' | 'attraction' | 'accommodation';
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price?: string;
  image: string;
  lat: number;
  lng: number;
}

export const PlanningPage = () => {
  const [selectedItems, setSelectedItems] = useState<LocationItem[]>([]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('全部');

  // Mock initial recommendations for Yunnan trip
  const initialRecommendations: LocationItem[] = [
    {
      id: '1',
      type: 'dining',
      name: '大理段氏私房菜',
      description: '白族特色, 酸辣鱼',
      rating: 4.8,
      reviews: 3200,
      price: '$$$',
      image: 'https://picsum.photos/seed/dali-food/400/300',
      lat: 25.6985,
      lng: 100.1635
    },
    {
      id: '2',
      type: 'attraction',
      name: '洱海公园',
      description: '湖光山色, 骑行圣地',
      rating: 4.9,
      reviews: 8500,
      image: 'https://picsum.photos/seed/erhai/400/300',
      lat: 25.6065,
      lng: 100.2675
    },
    {
      id: '3',
      type: 'charge',
      name: '小鹏超充站 (大理古城)',
      description: 'S4超快充, 24小时营业',
      rating: 4.9,
      reviews: 120,
      image: 'https://picsum.photos/seed/dali-charge/400/300',
      lat: 25.6950,
      lng: 100.1600
    },
    {
      id: '9',
      type: 'attraction',
      name: '丽江古城',
      description: '世界文化遗产, 纳西风情',
      rating: 4.7,
      reviews: 12000,
      image: 'https://picsum.photos/seed/lijiang/400/300',
      lat: 26.8721,
      lng: 100.2339
    },
    {
      id: '10',
      type: 'accommodation',
      name: '松赞绿谷山居',
      description: '藏式精品, 极致景观',
      rating: 5.0,
      reviews: 800,
      price: '$$$$',
      image: 'https://picsum.photos/seed/songzan/400/300',
      lat: 27.8275,
      lng: 99.7065
    }
  ];

  const moreRecommendations: LocationItem[] = [
    {
      id: '4',
      type: 'dining',
      name: '丽江腊排骨火锅',
      description: '纳西特色, 味道醇厚',
      rating: 4.6,
      reviews: 1800,
      price: '$$',
      image: 'https://picsum.photos/seed/lijiang-food/400/300',
      lat: 26.8750,
      lng: 100.2350
    },
    {
      id: '5',
      type: 'dining',
      name: '喜洲粑粑',
      description: '非遗美食, 酥脆可口',
      rating: 4.9,
      reviews: 5000,
      price: '$',
      image: 'https://picsum.photos/seed/xizhou/400/300',
      lat: 25.8500,
      lng: 100.1300
    },
    {
      id: '6',
      type: 'attraction',
      name: '玉龙雪山',
      description: '纳西神山, 冰川公园',
      rating: 4.8,
      reviews: 15000,
      image: 'https://picsum.photos/seed/yulong/400/300',
      lat: 27.0985,
      lng: 100.2015
    },
    {
      id: '7',
      type: 'charge',
      name: '小鹏超充站 (丽江金茂)',
      description: 'S4超快充, 停车免费',
      rating: 4.9,
      reviews: 150,
      image: 'https://picsum.photos/seed/lijiang-charge/400/300',
      lat: 26.8800,
      lng: 100.2400
    },
    {
      id: '8',
      type: 'accommodation',
      name: '大理既下山酒店',
      description: '设计师酒店, 洱海一线',
      rating: 4.9,
      reviews: 1200,
      price: '$$$$',
      image: 'https://picsum.photos/seed/jixia/400/300',
      lat: 25.7000,
      lng: 100.1700
    },
    {
      id: '11',
      type: 'attraction',
      name: '香格里拉普达措',
      description: '国家公园, 原始森林',
      rating: 4.7,
      reviews: 6000,
      image: 'https://picsum.photos/seed/pudacuo/400/300',
      lat: 27.8300,
      lng: 99.9500
    }
  ];

  useEffect(() => {
    // Set some initial selected items
    setSelectedItems(initialRecommendations);
  }, []);

  const handleAddItem = (item: LocationItem) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReorder = (newItems: LocationItem[]) => {
    setSelectedItems(newItems);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#F5F5F5]">
      <PlanningHeader />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-80 lg:w-[380px] flex-shrink-0 border-r border-black/5 bg-white overflow-hidden flex flex-col">
          <SelectionPanel 
            selectedItems={selectedItems}
            moreRecommendations={moreRecommendations}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
            onHover={setHoveredItemId}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Middle Panel - Map */}
        <div className="flex-1 min-w-0 relative bg-gray-200">
          <MapPanel 
            items={selectedItems}
            hoveredItemId={hoveredItemId}
            onHover={setHoveredItemId}
            activeFilter={activeFilter}
          />
        </div>

        {/* Right Panel */}
        <div className="w-80 lg:w-[380px] flex-shrink-0 border-l border-black/5 bg-white overflow-hidden flex flex-col">
          <ItineraryPanel 
            items={selectedItems}
            onReorder={handleReorder}
          />
        </div>
      </div>
    </div>
  );
};
