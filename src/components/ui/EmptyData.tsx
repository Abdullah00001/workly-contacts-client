import React from 'react';
import { User, Plus } from 'lucide-react';

interface EmptyStateProps {
  type: 'contacts' | 'favorites' | 'trash';
  onCreateContact?: () => void;
}

const EmptyData: React.FC<EmptyStateProps> = ({ type, onCreateContact }) => {
  const getContent = () => {
    switch (type) {
      case 'contacts':
        return {
          icon: (
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-300"
              >
                {/* Vase */}
                <path
                  d="M35 85 L85 85 L80 105 L40 105 Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M30 85 L90 85" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M45 105 L75 105"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                {/* Stems */}
                <path d="M60 85 L60 45" stroke="currentColor" strokeWidth="2" />
                <path d="M50 85 L50 55" stroke="currentColor" strokeWidth="2" />
                <path d="M70 85 L70 50" stroke="currentColor" strokeWidth="2" />

                {/* Leaves */}
                <path
                  d="M55 65 Q45 60 50 55"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M65 70 Q75 65 70 60"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M52 60 Q42 55 47 50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Contact flowers */}
                <circle
                  cx="60"
                  cy="35"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="60" cy="35" r="3" fill="currentColor" />
                <circle
                  cx="50"
                  cy="45"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="50" cy="45" r="2" fill="currentColor" />
                <circle
                  cx="70"
                  cy="40"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="70" cy="40" r="2.5" fill="currentColor" />

                {/* Additional decorative elements */}
                <circle
                  cx="40"
                  cy="25"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="30"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M35 30 Q30 25 35 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M85 25 Q90 20 85 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          ),
          title: 'No contacts yet',
          description:
            'Start building your network by adding your first contact',
          actions: (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onCreateContact}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus size={20} />
                Create contact
              </button>
            </div>
          ),
        };

      case 'favorites':
        return {
          icon: (
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-pink-300"
              >
                {/* Large heart in center */}
                <path
                  d="M60 85 C60 85 35 65 35 45 C35 35 42 30 50 30 C55 30 60 35 60 35 C60 35 65 30 70 30 C78 30 85 35 85 45 C85 65 60 85 60 85 Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />

                {/* Smaller hearts around */}
                <path
                  d="M25 35 C25 35 15 25 15 18 C15 14 18 12 21 12 C23 12 25 14 25 14 C25 14 27 12 29 12 C32 12 35 14 35 18 C35 25 25 35 25 35 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />

                <path
                  d="M95 40 C95 40 85 30 85 23 C85 19 88 17 91 17 C93 17 95 19 95 19 C95 19 97 17 99 17 C102 17 105 19 105 23 C105 30 95 40 95 40 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />

                <path
                  d="M85 75 C85 75 78 68 78 63 C78 60 80 58 82 58 C84 58 85 60 85 60 C85 60 86 58 88 58 C90 58 92 60 92 63 C92 68 85 75 85 75 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* Decorative elements */}
                <circle cx="30" cy="60" r="2" fill="currentColor" />
                <circle cx="90" cy="65" r="2" fill="currentColor" />
                <circle cx="20" cy="75" r="1.5" fill="currentColor" />
                <circle cx="100" cy="25" r="1.5" fill="currentColor" />

                {/* Sparkles */}
                <path d="M40 20 L42 25 L40 30 L38 25 Z" fill="currentColor" />
                <path d="M80 15 L82 20 L80 25 L78 20 Z" fill="currentColor" />
                <path d="M25 50 L27 55 L25 60 L23 55 Z" fill="currentColor" />
              </svg>
            </div>
          ),
          title: 'No favorites yet',
          description: 'Mark contacts as favorites to keep them close at hand',
          actions: (
            <button
              onClick={onCreateContact}
              className="flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              <Plus size={20} />
              Add first contact
            </button>
          ),
        };

      case 'trash':
        return {
          icon: (
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-300"
              >
                {/* Trash can */}
                <path
                  d="M35 40 L85 40 L80 95 L40 95 Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />

                {/* Trash lid */}
                <path
                  d="M30 40 L90 40"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />

                {/* Handle */}
                <path
                  d="M50 40 L50 35 C50 30 55 25 60 25 C65 25 70 30 70 35 L70 40"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Vertical lines on trash can */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="85"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="60"
                  y1="50"
                  x2="60"
                  y2="85"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="70"
                  y1="50"
                  x2="70"
                  y2="85"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                {/* Floating papers/debris */}
                <rect
                  x="20"
                  y="25"
                  width="8"
                  height="6"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="92"
                  y="35"
                  width="6"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="15"
                  y="60"
                  width="7"
                  height="5"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="98"
                  y="70"
                  width="5"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* Dust particles */}
                <circle cx="25" cy="50" r="1" fill="currentColor" />
                <circle cx="95" cy="55" r="1" fill="currentColor" />
                <circle cx="18" cy="80" r="1" fill="currentColor" />
                <circle cx="102" cy="45" r="1" fill="currentColor" />
                <circle cx="12" cy="35" r="0.5" fill="currentColor" />
                <circle cx="108" cy="85" r="0.5" fill="currentColor" />
              </svg>
            </div>
          ),
          title: 'Trash is empty',
          description:
            'Deleted contacts will appear here before being permanently removed',
          actions: (
            <button
              onClick={onCreateContact}
              className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <Plus size={20} />
              Create new contact
            </button>
          ),
        };

      default:
        return {
          icon: <User size={80} className="text-gray-300" />,
          title: 'No items found',
          description: 'Nothing to display here',
          actions: null,
        };
    }
  };

  const content = getContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="mb-8 animate-pulse">{content.icon}</div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        {content.title}
      </h2>

      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {content.description}
      </p>

      {content.actions && (
        <div className="animate-fadeIn">{content.actions}</div>
      )}
    </div>
  );
};

export default EmptyData;
