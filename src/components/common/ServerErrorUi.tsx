import type { FC } from 'react';
import { Button } from '../ui/button';

const ServerErrorUi: FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <video
          className="bg-transparent w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/Error_500.mp4" type="video/mp4" />
        </video>
        <div className="w-full sm:w-[600px]">
          <h2 className="text-2xl text-center sm:text-3xl font-semibold text-foreground">
            Internal Server Error
          </h2>
          <p className="text-lg text-center text-muted-foreground leading-relaxed">
            Oops! Something went wrong on our end. Our servers encountered an
            unexpected error and couldn't complete your request.
          </p>
          <div className="pt-4 flex items-center justify-center">
            <Button
              onClick={handleRefresh}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorUi;
