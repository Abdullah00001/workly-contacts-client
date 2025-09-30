'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const textInterval = setInterval(() => {
      const texts = [
        'Initializing...',
        'Loading components...',
        'Connecting to services...',
        'Preparing your experience...',
        'Almost ready...',
      ];
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Geometric Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-border/20 rotate-45 loading-float" />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 border border-primary/20 rotate-12 loading-float"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-primary/10 rounded-full loading-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border-2 border-accent/30 rounded-full loading-spinner" />

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Logo/Brand Area */}
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary rounded-xl flex items-center justify-center loading-pulse">
              <div className="w-8 h-8 border-2 border-primary-foreground border-t-transparent rounded-full loading-spinner" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
              Loading Your Experience
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-lg mx-auto">
              We{`'`}re preparing something amazing for you. This will only take a
              moment.
            </p>
          </div>

          {/* Progress Section */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{loadingText}</span>
                  <span className="text-foreground font-mono">
                    {Math.round(progress)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Loading Dots */}
            <div className="loading-dots flex items-center justify-center space-x-2">
              <span className="w-3 h-3 bg-primary rounded-full" />
              <span className="w-3 h-3 bg-primary rounded-full" />
              <span className="w-3 h-3 bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
