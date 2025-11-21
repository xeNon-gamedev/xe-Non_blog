import React from 'react';
import { User } from 'lucide-react';
import { getMemberProfile } from '@/lib/members';

interface ChatBubbleProps {
  id?: string;
  name?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  avatarUrl?: string;
}

export function ChatBubble({ id, name, children, position, avatarUrl }: ChatBubbleProps) {
  // Resolve member data
  let displayName = name;
  let displayAvatar = avatarUrl;
  let displayPosition = position;

  if (id) {
    const profile = getMemberProfile(id);
    if (profile) {
      displayName = displayName || profile.name;
      displayAvatar = displayAvatar || profile.avatar;
      displayPosition = displayPosition || profile.position;
    }
  }

  // Defaults
  displayName = displayName || 'Unknown';
  displayPosition = displayPosition || 'left';
  
  const isRight = displayPosition === 'right';

  return (
    <div className={`flex w-full mb-6 ${isRight ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] md:max-w-[70%] gap-4 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center overflow-hidden">
            {displayAvatar ? (
              <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <User className="text-gray-400" size={24} />
            )}
          </div>
          <span className="text-xs text-gray-400 font-medium">{displayName}</span>
        </div>

        {/* Bubble */}
        <div 
          className={`
            relative p-4 rounded-2xl text-sm md:text-base leading-relaxed
            ${isRight 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-gray-800 text-gray-200 rounded-tl-none border border-white/10'
            }
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
