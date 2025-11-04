'use client';
import { type FC, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const FaqSection: FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const faqs = [
    {
      question: 'Is Workly Contacts free to use?',
      answer:
        'Yes! Workly Contacts is completely free forever with no subscription walls or hidden costs. We believe contact management should be accessible to everyone.',
    },
    {
      question: 'Can I import my existing contacts?',
      answer:
        'You can import contacts from CSV files, making it easy to migrate from other contact management systems or platforms.',
    },
    {
      question: 'How secure is my data?',
      answer:
        'Your data security is our priority. We use industry-standard encryption, secure password handling, and never sell or share your personal information with third parties.',
    },
    {
      question: 'Can I backup my contacts?',
      answer:
        'Yes, you can export your contacts to CSV format anytime for backup purposes or to migrate to other platforms.',
    },
    {
      question: 'Does it work on mobile devices?',
      answer:
        'Yes! Workly Contacts is fully responsive and works seamlessly on desktop, tablet, and mobile devices.',
    },
    {
      question: 'What about duplicate contacts?',
      answer:
        'Our smart duplicate detection automatically identifies potential duplicates, and you can merge them with field-by-field control to maintain data accuracy.',
    },
  ];
  const toggleFAQ = (index: number | null) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  return (
    <section
      id="faq"
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 w-full">
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Everything you need to know about Workly Contacts. Can{`'`}t find
            your answer? Contact our support team.
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openFAQ === index}
              onOpenChange={() => toggleFAQ(index)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 text-left flex items-center justify-between rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-pointer h-auto min-h-12 sm:min-h-14 group"
                  variant="ghost"
                >
                  <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 group-hover:text-gray-950 transition-colors leading-snug break-words">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-2 sm:ml-3 lg:ml-4">
                    {openFAQ === index ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200" />
                    )}
                  </div>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed border-b border-gray-200 bg-gray-50 rounded-b-lg animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <p>{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 rounded-lg bg-blue-50 border border-blue-100 text-center">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
            Can{`'`}t find the answer you{`'`}re looking for? Please{' '}
            <a
              href="#contact"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              contact our team
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
