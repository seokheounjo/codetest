import { useEffect, useState } from 'react';
import { Badge } from '../types';
import { Trophy, X } from 'lucide-react';

interface BadgeNotificationProps {
  badges: Badge[];
  onClose: () => void;
}

export default function BadgeNotification({ badges, onClose }: BadgeNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };
  
  if (badges.length === 0) return null;
  
  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl p-5 max-w-sm border border-yellow-200 relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
        
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5 text-yellow-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="mb-3 text-gray-900 font-semibold">
              🎉 새 배지 획득!
            </h3>
            
            {badges.map((badge) => (
              <div key={badge.code} className="mb-3 last:mb-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-gray-900 font-medium text-sm">
                    {badge.title}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
