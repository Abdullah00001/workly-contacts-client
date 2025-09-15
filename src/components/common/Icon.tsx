import type { FC } from 'react';

export type TIconProps = {
  name: string;
  variant?: 'outlined' | 'sharp' | 'rounded' | 'filled';
  className?: string;
  size?: number | string;
  type?: 'symbols' | 'icons'; // New prop to specify icon type
};

const Icon: FC<TIconProps> = ({
  name,
  variant = 'outlined',
  className = '',
  size = 24,
  type = 'symbols', // Default to symbols
}) => {
  // Handle Material Symbols
  if (type === 'symbols') {
    const variantClass = {
      outlined: 'material-symbols-outlined',
      sharp: 'material-symbols-sharp',
      rounded: 'material-symbols-rounded',
      filled: 'material-symbols-outlined', // Use outlined class for filled (controlled by FILL setting)
    }[variant];

    const iconStyle = {
      fontSize: typeof size === 'number' ? `${size}px` : size,
      fontVariationSettings:
        variant === 'filled'
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    } as React.CSSProperties;

    return (
      <span className={`${variantClass} ${className}`} style={iconStyle}>
        {name}
      </span>
    );
  }

  // Handle Material Icons
  if (type === 'icons') {
    const variantClass = {
      outlined: 'material-icons-outlined',
      sharp: 'material-icons-sharp',
      rounded: 'material-icons-round',
      filled: 'material-icons', // Regular material-icons is the filled version
    }[variant];

    const iconStyle = {
      fontSize: typeof size === 'number' ? `${size}px` : size,
    } as React.CSSProperties;

    return (
      <span className={`${variantClass} ${className}`} style={iconStyle}>
        {name}
      </span>
    );
  }

  return null;
};

export default Icon;