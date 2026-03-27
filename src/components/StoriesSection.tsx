import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, Heart, MessageCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stories = [
  {
    id: '1',
    user: '陈默',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&h=600&fit=crop',
    content: '带上我家二哈去大理，结果它在洱海边跟一只海鸥吵了一下午，最后还试图跳进水里抓鱼。幸好路书里推荐了那家宠物友好餐厅，老板还专门给它做了个鸡肉蛋糕，总算消停了。',
    location: '大理洱海',
    likes: 1250,
    comments: 84
  },
  {
    id: '2',
    user: '林悦',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    content: '在川西自驾的时候，导航提示前方有“野生动物出没”，我以为是牛羊，结果是一群在路边排队等投喂的土拨鼠。它们甚至还试图爬上我的小鹏车顶，简直是现实版的“疯狂动物城”。',
    location: '折多山',
    likes: 3400,
    comments: 210
  },
  {
    id: '3',
    user: '王嘉尔',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop',
    content: '按照路书去了一个超级小众的露营地，结果半夜发现帐篷外面有动静，拉开拉链一看，是一只小狐狸在偷吃我的零食。它甚至还对着我歪头杀，那一刻我觉得这趟自驾值了！',
    location: '莫干山',
    likes: 2100,
    comments: 156
  },
  {
    id: '4',
    user: '苏晴',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    content: '在海南环岛的时候，因为路书规划得太详细，我全程都在“躺平”模式。甚至连充电站都在风景最好的地方，一边充电一边喝椰子水看日落，这才是真正的自驾度假。',
    location: '三亚',
    likes: 1800,
    comments: 92
  }
];

export const StoriesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full py-24 px-6 bg-[#F9F9F9] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-sm tracking-widest uppercase mb-3"
          >
            路书故事
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            听听车友们怎么说
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl text-lg leading-relaxed"
          >
            每一个路书背后都是一段鲜活的记忆。在这里，分享你的自驾趣闻，发现更多未知的精彩。
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory">
            {stories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/story/${story.id}`)}
                className="flex-shrink-0 w-[350px] md:w-[450px] bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-xl shadow-black/5 snap-center hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.location}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{story.location}</span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/10 group-hover:scale-110 transition-transform">
                      <img 
                        src={story.avatar} 
                        alt={story.user} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-foreground">{story.user}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">资深探险家</span>
                    </div>
                    <Quote className="w-8 h-8 text-primary/10 ml-auto" />
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                    "{story.content}"
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-black/5">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        {story.likes}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        {story.comments}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Gradient Fades */}
          <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-[#F9F9F9] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#F9F9F9] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
