import { useNotificationStore } from '@mfa/framework';
import { Play } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export function ContentSection() {
  const { addNotification } = useNotificationStore();
  
  const contents = [
    {
      id: 1,
      title: '최원일의 라이프',
      season: '시즌1',
      episode: '1화',
      thumbnail: 'https://images.unsplash.com/photo-1489599147144-e0d3dfb930fc?w=300&h=400&fit=crop',
      isVOnly: false
    },
    {
      id: 2,
      title: '우영씨 모십시다',
      season: '2기',
      episode: '7화',
      thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
      isVOnly: true
    },
    {
      id: 3,
      title: '최강야구',
      season: '2화',
      episode: '',
      thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=300&h=400&fit=crop',
      isVOnly: false
    },
    {
      id: 4,
      title: '짱구는 못말려',
      season: '시즌23',
      episode: '5화',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      isVOnly: false
    },
    {
      id: 5,
      title: '자우림 시즌2',
      season: '시즌2',
      episode: '1화',
      thumbnail: 'https://images.unsplash.com/photo-1618946168171-e80b2a741a98?w=300&h=400&fit=crop',
      isVOnly: true
    },
    {
      id: 6,
      title: '자우림 시즌2',
      season: '시즌2',
      episode: '1화',
      thumbnail: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=300&h=400&fit=crop',
      isVOnly: true
    },
    {
      id: 7,
      title: '술트루스 의사쌤',
      season: '시즌1',
      episode: '4화',
      thumbnail: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=400&fit=crop',
      isVOnly: false
    },
    {
      id: 8,
      title: '오오오! 마이 베이비',
      season: '시즌21',
      episode: '13화',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      isVOnly: false
    }
  ];

  return (
    <section className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-xl font-bold mb-6">Luke님이 시청하는 콘텐츠</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {contents.map((content) => (
            <div 
              key={content.id} 
              className="group cursor-pointer"
              onClick={() => {
                addNotification({
                  type: 'info',
                  title: content.title,
                  message: `${content.season} ${content.episode || ''} 재생을 시작합니다`
                });
              }}
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                <ImageWithFallback
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Play fill="white" className="text-white" size={24} />
                  </div>
                </div>

                {/* V ONLY badge */}
                {content.isVOnly && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                      V ONLY
                    </span>
                  </div>
                )}

                {/* Episode info badge */}
                <div className="absolute bottom-2 left-2">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {content.season} {content.episode && `• ${content.episode}`}
                  </span>
                </div>
              </div>
              
              <div className="text-white text-sm truncate">
                {content.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}