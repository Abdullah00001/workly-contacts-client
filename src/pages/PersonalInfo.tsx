import { FC } from 'react';
import { Sparkles } from 'lucide-react';

const PersonalInfo: FC = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-6 p-6 rounded-2xl shadow-md border backdrop-blur-md bg-black/30 dark:bg-white/10 max-w-xl mx-auto">
          <div className="flex justify-center">
            <Sparkles className="h-12 w-12 text-primary animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 bg-clip-text text-transparent animate-pulse">
            Profile Coming Soon
          </h1>

          <p className="text-muted-foreground text-sm md:text-base">
            We're working on your profile page. Stay tuned for awesome features!
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
