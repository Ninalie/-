import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Share2, 
  Quote, 
  Star,
  User,
  Navigation
} from 'lucide-react';

const stories = [
  {
    id: '1',
    user: '陈默',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&h=800&fit=crop',
    content: '带上我家二哈去大理，结果它在洱海边跟一只海鸥吵了一下午，最后还试图跳进水里抓鱼。幸好路书里推荐了那家宠物友好餐厅，老板还专门给它做了个鸡肉蛋糕，总算消探了。',
    location: '大理洱海',
    likes: 1250,
    comments: 84,
    date: '2026.03.20',
    fullContent: `带上我家二哈去大理，结果它在洱海边跟一只海鸥吵了一下午，最后还试图跳进水里抓鱼。幸好路书里推荐了那家宠物友好餐厅，老板还专门给它做了个鸡肉蛋糕，总算消探了。

这次自驾之旅最让我惊喜的是“咕噜路书”推荐的宠物友好路线。以前带宠物出门总是担心餐厅和酒店不让进，但这次完全没问题。

在大理的这几天，我们住在洱海边的一家民宿，每天早上推开窗就能看到苍山洱海。二哈在草地上跑得可欢了，虽然它还是改不了追海鸥的毛病，但看到它那么开心，我觉得这趟自驾值了。`
  },
  {
    id: '2',
    user: '林悦',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
    content: '在川西自驾的时候，导航提示前方有“野生动物出没”，我以为是牛羊，结果是一群在路边排队等投喂的土拨鼠。它们甚至还试图爬上我的小鹏车顶，简直是现实版的“疯狂动物城”。',
    location: '折多山',
    likes: 3400,
    comments: 210,
    date: '2026.03.15',
    fullContent: `在川西自驾的时候，导航提示前方有“野生动物出没”，我以为是牛羊，结果是一群在路边排队等投喂的土拨鼠。它们甚至还试图爬上我的小鹏车顶，简直是现实版的“疯狂动物城”。

川西的景色真的是百看不厌。虽然海拔很高，但电车的动力响应非常直接，超车毫无压力。而且折多山顶居然还有快充站，这在以前是想都不敢想的。

最难忘的还是那些土拨鼠，它们一点都不怕人，甚至还会对着镜头摆姿势。这种与大自然亲密接触的感觉，是城市生活无法给予的。`
  }
];

export const StoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const story = stories.find(s => s.id === id) || stories[0];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Main Image */}
      <div className="w-full h-[50vh] relative overflow-hidden">
        <img 
          src={story.image} 
          alt={story.location}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-6 right-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
              <img src={story.avatar} alt={story.user} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-white">
              <span className="text-lg font-bold">{story.user}</span>
              <span className="text-xs opacity-70">{story.date} · {story.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="relative mb-12">
          <Quote className="absolute -top-6 -left-8 w-16 h-16 text-primary/5 -z-10" />
          <div className="prose prose-lg max-w-none">
            {story.fullContent.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-lg text-foreground/80 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-8 border-y border-black/5 mb-12">
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
              <Heart className="w-6 h-6" />
              <span className="font-bold">{story.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="font-bold">{story.comments}</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Related Roadbook CTA */}
        <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold">查看同款路书</h4>
              <p className="text-sm text-muted-foreground">一键开启 {story.location} 智驾之旅</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/roadbook/1')}
            className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            立即规划
          </button>
        </div>
      </div>
    </div>
  );
};
