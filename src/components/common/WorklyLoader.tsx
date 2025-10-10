'use client';
import { useEffect, useState, type FC } from 'react';

type PresetSize = 'small' | 'medium' | 'large';

interface WorklyLoaderProps {
  size?: PresetSize | string;
  fullscreen?: boolean;
  text?: string;
  containerClassName?: string;
  loaderClassName?: string;
  outerCircleClassName?: string;
  middleCircleClassName?: string;
  innerCircleClassName?: string;
  textClassName?: string;
}

const WorklyLoader: FC<WorklyLoaderProps> = ({
  size = 'medium',
  fullscreen = true,
  text = 'Loading contacts',
  containerClassName = '',
  loaderClassName = '',
  outerCircleClassName = '',
  middleCircleClassName = '',
  innerCircleClassName = '',
  textClassName = '',
}) => {
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Preset sizes
  const presetSizes: Record<PresetSize, string> = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const presetTextSizes: Record<PresetSize, string> = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Determine if size is a preset or custom
  const isPreset = (size: string): size is PresetSize =>
    ['small', 'medium', 'large'].includes(size);

  const loaderSizeClass = isPreset(size) ? presetSizes[size] : '';
  const defaultTextSize = isPreset(size) ? presetTextSizes[size] : 'text-base';

  // Custom size styling (for px, rem, em, etc.)
  const customSizeStyle = !isPreset(size) ? { width: size, height: size } : {};

  // Default container class
  const defaultContainerClass = fullscreen
    ? 'fixed inset-0 flex items-center justify-center bg-white z-50'
    : 'flex items-center justify-center w-full h-full';

  return (
    <div className="text-center">
      {/* Loader Animation */}
      <div
        className={loaderClassName || `relative mx-auto ${loaderSizeClass}`}
        style={!loaderClassName ? customSizeStyle : {}}
      >
        {/* Outer Circle - Blue */}
        <div
          className={
            outerCircleClassName ||
            'absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin'
          }
        />

        {/* Middle Circle - Green */}
        <div
          className={
            middleCircleClassName ||
            'absolute top-[12.5%] left-[12.5%] w-[75%] h-[75%] rounded-full border-4 border-transparent border-t-green-600 animate-spin'
          }
          style={{ animationDelay: '-0.3s' }}
        />

        {/* Inner Circle - Yellow */}
        <div
          className={
            innerCircleClassName ||
            'absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full border-4 border-transparent border-t-yellow-500 animate-spin'
          }
          style={{ animationDelay: '-0.15s' }}
        />
      </div>

      {/* Loading Text */}
      {text && (
        <div
          className={
            textClassName ||
            `mt-6 ${defaultTextSize} text-gray-700 font-normal tracking-wide`
          }
        >
          {text}
          <span className="inline-block w-8 text-left">{dots}</span>
        </div>
      )}
    </div>
  );
};

export default WorklyLoader;
