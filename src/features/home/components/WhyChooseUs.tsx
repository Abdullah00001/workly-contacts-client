import type { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Shield, Sparkles, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const WhyChooseUs: FC = () => {
  return (
    <section id="why-choose" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-balance">
              Why Choose Workly Contacts?
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    100% Free Forever
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    No subscription fees, no hidden costs. Use all features
                    without any limitations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Privacy First
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Your data is never sold or shared. We respect your privacy
                    and keep your contacts secure.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Ad-Free Experience
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Focus on what matters without distractions. Clean, fast, and
                    intuitive interface.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Mobile Friendly
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Works seamlessly on all devices. Manage your contacts
                    anywhere, anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Join Thousands of Users
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Trusted by individuals and teams worldwide for reliable contact
                management.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link href={'/auth/signup'}>Start Managing Contacts</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
