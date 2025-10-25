import localFont from 'next/font/local';

export const googleSans = localFont({
  src: [
    {
      path: '../../public/fonts/GoogleSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-google-sans',
  display: 'swap',
});

export const googleSansText = localFont({
  src: [
    {
      path: '../../public/fonts/GoogleSansText-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSansText-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSansText-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-google-sans-text',
  display: 'swap',
});

export const productSans = localFont({
  src: [
    {
      path: '../../public/fonts/ProductSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-product-sans',
  display: 'swap',
});
