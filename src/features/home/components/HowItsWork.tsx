import { Sparkles, Tag, User, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { FC } from 'react';

const HowItsWork: FC = () => {
  const steps = [
    {
      step: '1',
      title: 'Create Your Account',
      description:
        'Sign up for free and set up your profile with avatar and personal information.',
      icon: User,
    },
    {
      step: '2',
      title: 'Add Your Contacts',
      description:
        'Import from CSV or manually add contacts with photos, notes, and custom labels.',
      icon: Users,
    },
    {
      step: '3',
      title: 'Organize & Manage',
      description:
        'Use smart search, filters, and labels to organize your contacts efficiently.',
      icon: Tag,
    },
    {
      step: '4',
      title: 'Stay Connected',
      description:
        'Track birthdays, manage duplicates, and keep your contact list clean and updated.',
      icon: Sparkles,
    },
  ];
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto text-pretty px-2">
            Get started with Workly Contacts in just a few simple steps and
            transform how you manage your contacts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
              {/* Connection line for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 transform -translate-y-1/2 z-10"></div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItsWork;
