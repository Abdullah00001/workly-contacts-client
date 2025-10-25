import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const CtaSection: FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
          Ready to Transform Your Contact Management?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
          Join thousands of users who have simplified their contact management
          with Workly Contacts. Start organizing your contacts today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white cursor-pointer text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto"
          >
            <Link href={'/auth/signup'}>
              <div className="flex items-center justify-center">
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 cursor-pointer border-white text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-white hover:text-black text-lg px-8 py-4 h-auto"
          >
            <Link href={'/help'}>Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
