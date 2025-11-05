'use client';

import { ArrowLeft, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ContactNotFound = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full bg-background px-4 overflow-hidden">
      <div className="max-w-md w-full text-center overflow-hidden">
        {/* 404 */}
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>

        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-3">Contact Not Found</h2>

        {/* Description */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          We couldn{`'`}t find the contact you{`'`}re looking for. It may have
          been deleted, moved, or the link might be incorrect.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <Button
            className="cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <Users className="w-4 h-4 mr-2" />
            View All Contacts
          </Button>
        </div>

        {/* Help text */}
        <p className="mt-8 text-sm text-muted-foreground">
          Need help?{' '}
          <a
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactNotFound;
