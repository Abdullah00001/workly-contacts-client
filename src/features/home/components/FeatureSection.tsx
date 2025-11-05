import type { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Activity,
  BarChart3,
  Copy,
  Search,
  Shield,
  Tag,
  Upload,
  User,
  Users,
} from 'lucide-react';

const FeatureSection: FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Contact Management',
      description:
        'Create, edit, delete and view contacts with ease. Upload avatars, add birthdays, emails, phone numbers, and personal notes.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Search,
      title: 'Smart Search & Filters',
      description:
        'Search contacts by name, email, or label. Automatically searchable full name with advanced filtering options.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Tag,
      title: 'Labels & Organization',
      description:
        'Create custom labels, assign multiple labels per contact, and filter contacts by label for better organization.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Copy,
      title: 'Duplicate Management',
      description:
        'Automatically detect duplicate contacts and merge them with field-by-field control for clean contact lists.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Upload,
      title: 'Import & Export',
      description:
        'Import contacts from CSV files and export your contacts for backup or migration to other platforms.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: BarChart3,
      title: 'Dashboard Overview',
      description:
        'See total contacts, labels, upcoming birthdays, and recent activities at a glance from your dashboard.',
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: User,
      title: 'Account & Profile',
      description:
        'Manage your user account, update profile information, and view login history with full control.',
      color: 'bg-cyan-100 text-cyan-600',
    },
    {
      icon: Shield,
      title: 'Security Features',
      description:
        'Secure password handling, forgot password flow, and session protection with auto logout on token expiry.',
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: Activity,
      title: 'Activity Logs',
      description:
        'Track your actions with detailed history of edits, deletions, merges, and session login history.',
      color: 'bg-pink-100 text-pink-600',
    },
  ];
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Powerful Features for Better Contact Management
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Everything you need to organize, manage, and stay connected with
            your contacts in one beautiful, easy-to-use platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
