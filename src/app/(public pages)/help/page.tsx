import type { Metadata } from 'next';
import {
  ArrowLeft,
  HelpCircle,
  Users,
  Search,
  Tag,
  Copy,
  Download,
  BarChart3,
  Activity,
  Shield,
  Settings,
  Mail,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help Center',
  description:
    'Find answers and get support for all your Workly Contacts questions. Learn how to manage contacts, troubleshoot issues, and make the most of Workly Contacts features.',
  keywords: [
    'Workly Contacts help',
    'contact management support',
    'CRM help center',
    'FAQ Workly Contacts',
    'troubleshoot contacts app',
    'contact management guide',
  ],
  openGraph: {
    title: 'Help Center | Workly Contacts',
    description:
      'Visit the Workly Contacts Help Center for FAQs, guides, and support on managing your contacts efficiently and securely.',
    url: 'https://contacts.workly.ink/help',
    siteName: 'Workly Contacts',
    type: 'website',
    images: [
      {
        url: 'https://contacts.workly.ink/og-help.png',
        width: 1200,
        height: 630,
        alt: 'Workly Contacts Help Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help Center | Workly Contacts',
    description:
      'Get help with Workly Contacts features, troubleshooting, and managing your contacts effectively.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Help() {
  const helpSections = [
    {
      id: 'account',
      title: 'Account Management',
      icon: Shield,
      color: 'blue',
      items: [
        {
          question: 'How do I create an account?',
          answer:
            "Visit contacts.workly.ink and click Sign Up. You'll need to provide a name, email, and password.",
        },
        {
          question: 'What if I forget my password?',
          answer:
            "Use the Forgot Password link on the login page. You'll go through a secure multi-step recovery process via email.",
        },
        {
          question: 'Is my account secure?',
          answer:
            'Yes. We use secure password hashing, encrypted HTTPS connections, and authentication best practices. Session management and logout are handled safely.',
        },
        {
          question: 'What can I do in my account settings?',
          answer:
            'You can change your name and avatar, view your last login and password change date, and delete your account permanently if needed.',
        },
      ],
    },
    {
      id: 'contacts',
      title: 'Contact Management',
      icon: Users,
      color: 'green',
      items: [
        {
          question: 'How do I add a contact?',
          answer:
            'Click Add Contact, fill out fields like name, email, phone number, birthday, avatar, and notes. Save it to your list instantly.',
        },
        {
          question: 'Can I edit or delete a contact?',
          answer:
            "Yes. Use the edit icon to update a contact's info or the delete button to remove it.",
        },
        {
          question: 'What types of data can I save for each contact?',
          answer:
            'You can save First Name & Last Name, Email Address, Phone Number, Birthday, Notes, and Profile Image/Avatar.',
        },
      ],
    },
    {
      id: 'search',
      title: 'Smart Search & Filters',
      icon: Search,
      color: 'purple',
      items: [
        {
          question: 'How does search work?',
          answer:
            'You can search contacts using names, emails, and labels. Even partial names work thanks to full-text search and combined firstName + lastName logic.',
        },
        {
          question: 'Can I filter contacts?',
          answer:
            'Yes, you can filter contacts by Labels (e.g., "Friends", "Work") and Upcoming birthdays.',
        },
      ],
    },
    {
      id: 'labels',
      title: 'Labels & Organization',
      icon: Tag,
      color: 'orange',
      items: [
        {
          question: 'What are labels?',
          answer:
            'Labels are customizable tags you can assign to contacts (like folders or groups).',
        },
        {
          question: 'How do I create and use labels?',
          answer:
            'Go to Labels and create new ones, assign them when creating or editing contacts, then filter contacts by label from the dashboard.',
        },
        {
          question: 'Can I edit or delete a label?',
          answer:
            'Yes. Labels are fully manageable — rename, recolor (planned), or delete them anytime.',
        },
      ],
    },
    {
      id: 'duplicates',
      title: 'Duplicate Detection & Merge',
      icon: Copy,
      color: 'red',
      items: [
        {
          question: 'What is the Merge Duplicates feature?',
          answer:
            'Workly Contact automatically detects potential duplicates based on similar names, emails, or phone numbers.',
        },
        {
          question: 'How does the merge work?',
          answer:
            "You'll be shown both contacts side-by-side and can select which fields to keep. Then the contacts are merged safely into one.",
        },
      ],
    },
    {
      id: 'import-export',
      title: 'Import & Export',
      icon: Download,
      color: 'indigo',
      items: [
        {
          question: 'How do I import contacts from another app or file?',
          answer:
            'Go to the Import section, upload a CSV file, match your CSV columns to Workly Contact fields, then review and confirm import.',
        },
        {
          question: 'How do I export my contacts?',
          answer:
            'Go to Export, choose CSV format, and download all your saved contacts for backup or migration.',
        },
      ],
    },
    {
      id: 'dashboard',
      title: 'Dashboard Overview',
      icon: BarChart3,
      color: 'teal',
      items: [
        {
          question: 'What does the Dashboard show?',
          answer:
            'The dashboard shows total contacts and labels, recent login history, upcoming birthdays, and recently added or modified contacts. It gives a quick snapshot of your contact activity and account.',
        },
      ],
    },
    {
      id: 'activity',
      title: 'Activity Logs',
      icon: Activity,
      color: 'pink',
      items: [
        {
          question: 'What activity is logged?',
          answer:
            'You can view recent actions such as login history, contact edits, merges, deletions, and password change history. (Full activity log is in beta or planned.)',
        },
      ],
    },
    {
      id: 'future',
      title: 'Future Features',
      icon: Settings,
      color: 'gray',
      items: [
        {
          question: 'Will Workly Contact support chat?',
          answer:
            'Yes. In version 2, we plan to add real-time chat with other users (via Socket.io), sharing of contact entries within messages, and a private, secure messaging system.',
        },
        {
          question: 'Will there be Dark Mode?',
          answer: 'Yes, dark mode is planned for v2+.',
        },
        {
          question: 'Multi-language support?',
          answer:
            "Also planned! You'll be able to switch languages in the future.",
        },
        {
          question: 'Can I manage notifications?',
          answer:
            'Notification preferences and reminders (e.g., birthday alerts) are coming soon.',
        },
        {
          question: 'What about backup & sync?',
          answer:
            'Manual CSV export is already available. Cloud backup (e.g., Google Drive/Dropbox) and Google Contacts sync via OAuth are on the roadmap.',
        },
      ],
    },
    {
      id: 'common',
      title: 'Common Questions',
      icon: HelpCircle,
      color: 'yellow',
      items: [
        {
          question: 'Is it mobile-friendly?',
          answer:
            'Yes! Workly Contact is fully responsive and works beautifully on phones, tablets, and desktops.',
        },
        {
          question: 'Is it free? Will there be a paid plan?',
          answer:
            'Workly Contact is currently free with no ads. We may add premium features in the future, but core features will remain free.',
        },
        {
          question: 'Is it open-source?',
          answer:
            'Yes. Source code may be available on GitHub. Contributions and feedback are welcome.',
        },
        {
          question: 'Is Workly Contact reliable?',
          answer:
            "We've written unit tests for core functionality. Integration and E2E testing are in the pipeline to ensure better stability over time.",
        },
      ],
    },
  ];
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      gray: 'bg-gray-50 border-gray-200 text-gray-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };
  const getIconColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      teal: 'bg-teal-100 text-teal-600',
      pink: 'bg-pink-100 text-pink-600',
      gray: 'bg-gray-100 text-gray-600',
      yellow: 'bg-yellow-100 text-yellow-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };
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
          <span className="text-gray-800 font-medium">Help Center</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-lg w-fit">
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Help Center
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Everything you need to know about Workly Contact
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-8">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Welcome to the{' '}
              <strong className="text-blue-600">
                Workly Contact Help Center
              </strong>
              ! Below you{`'`}ll find detailed explanations of every feature
              available in Workly Contact to help you get the most out of your
              experience.
            </p>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              If you have questions or need help, you can always reach us at{' '}
              <a
                href="mailto:support@workly.ink"
                className="text-blue-600 hover:underline font-medium break-all"
              >
                support@workly.ink
              </a>
            </p>
          </div>

          {/* Help Sections - All expanded for SSG */}
          <div className="space-y-6">
            {helpSections.map((section) => {
              const Icon = section.icon;

              return (
                <div
                  key={section.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="px-4 sm:px-6 py-4 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${getIconColorClasses(section.color)}`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="px-4 sm:px-6 pb-4 space-y-4">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-3 sm:p-4 ${getColorClasses(section.color)}`}
                      >
                        <h3 className="font-semibold mb-2 flex items-start text-sm sm:text-base">
                          <span className="text-xs sm:text-sm mr-2 mt-1 flex-shrink-0">
                            Q:
                          </span>
                          <span className="text-balance">{item.question}</span>
                        </h3>
                        <div className="text-gray-700 ml-4 sm:ml-6 text-sm sm:text-base">
                          <span className="text-xs sm:text-sm font-medium mr-2 flex-shrink-0">
                            A:
                          </span>
                          <span className="text-pretty">{item.answer}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 flex-shrink-0" />
                <span>Need More Help?</span>
              </h2>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                If your question isn{`'`}t answered here, contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-start sm:items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div className="text-sm sm:text-base">
                    <span className="block sm:inline">Email: </span>
                    <a
                      href="mailto:support@workly.ink"
                      className="text-blue-600 hover:underline font-medium break-all"
                    >
                      support@workly.ink
                    </a>
                  </div>
                </div>
                <div className="flex items-start sm:items-center space-x-3">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div className="text-sm sm:text-base">
                    <span className="block sm:inline">Website: </span>
                    <a
                      href="https://contacts.workly.ink"
                      className="text-blue-600 hover:underline font-medium break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://contacts.workly.ink
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm sm:text-base">
                We{`'`}ll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              <strong>Last updated:</strong> July 13, 2025
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
