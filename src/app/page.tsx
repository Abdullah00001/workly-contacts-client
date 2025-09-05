import BackToTopButton from '@/components/common/BackToTopButton';
import CommonFooter from '@/components/common/CommonFooter';
import { Button } from '@/components/ui/button';
import CtaSection from '@/features/home/components/CtaSection';
import DemoButton from '@/features/home/components/DemoButton';
import FaqSection from '@/features/home/components/FaqSection';
import FeatureSection from '@/features/home/components/FeatureSection';
import Header from '@/features/home/components/Header';
import HowItsWork from '@/features/home/components/HowItsWork';
import WhyChooseUs from '@/features/home/components/WhyChooseUs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workly Contacts',
  description:
    'Organize, manage, and sync your contacts with Workly Contacts. Enjoy smart search, duplicate detection, and easy import/export for seamless contact management.',
  keywords: [
    'Workly Contacts',
    'contact management app',
    'CRM for individuals',
    'smart contacts',
    'contact organizer',
    'import export contacts',
    'duplicate detection',
  ],
  openGraph: {
    title: 'Workly Contacts | Smart Contact Management',
    description:
      'Keep your contacts organized and accessible with Workly Contacts — intuitive contact management with advanced features for individuals and teams.',
    url: 'https://contacts.workly.ink/',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workly Contacts | Smart Contact Management',
    description:
      'The easiest way to organize, manage, and sync your contacts online. Workly Contacts makes contact management simple and secure.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content" className="focus:outline-none" tabIndex={-1}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
                Your Contacts,
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {' '}
                  Organized
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed text-pretty">
                The most intuitive contact management platform. Create,
                organize, and manage your contacts with powerful features like
                smart search, duplicate detection, and seamless import/export.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 h-auto"
                >
                  <Link href={'/auth/signup'}>
                    <div className="flex items-center justify-center">
                      <span>Get Started Free</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </Link>
                </Button>

                <DemoButton />
              </div>
              <p className="text-sm text-gray-500 mt-4">
                ✨ Free forever • No credit card required • 2-minute setup
              </p>
            </div>
          </div>
        </section>
        <FeatureSection />
        <HowItsWork />
        <WhyChooseUs />
        <CtaSection />
        <FaqSection />
      </main>
      <CommonFooter />
      <BackToTopButton />
    </div>
  );
}
