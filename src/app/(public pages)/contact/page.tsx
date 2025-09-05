import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ContactInfo } from '@/features/contact-us/components/contact-info';
import { ContactForm } from '@/features/contact-us/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | Workly Contacts',
  description:
    'Get in touch with the Workly Contacts team. Reach out for support, inquiries, or feedback about our contact management platform.',
  keywords: [
    'Workly Contacts support',
    'contact Workly',
    'get in touch',
    'customer service',
    'contact management help',
    'feedback',
    'Workly Contacts team',
  ],
  openGraph: {
    title: 'Contact Us',
    description:
      'Have questions or need support? Contact the Workly Contacts team for assistance and inquiries.',
    url: 'https://contacts.workly.ink/contact',
    siteName: 'Workly Contacts',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Workly Contacts',
    description:
      'Need help or want to share feedback? Reach out to the Workly Contacts team through our Contact Us page.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link
            href="/"
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">Contact Us</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* Left Column - Contact Info */}
          <ContactInfo />

          {/* Right Column - Contact Form */}
          <div className="order-first lg:order-last">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
