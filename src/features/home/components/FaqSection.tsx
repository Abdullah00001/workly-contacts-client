'use client';
import { FC, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection: FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
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
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Everything you need to know about Workly Contacts
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <Collapsible
                open={openFAQ === index}
                onOpenChange={() => toggleFAQ(index)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-transparent cursor-pointer h-auto"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
