import { FC, useState } from 'react';
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
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpCenter: FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

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
            "Visit amar-contacts.vercel.app and click Sign Up. You'll need to provide a name, email, and password.",
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
            'Amar Contact automatically detects potential duplicates based on similar names, emails, or phone numbers.',
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
            'Go to the Import section, upload a CSV file, match your CSV columns to Amar Contact fields, then review and confirm import.',
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
          question: 'Will Amar Contact support chat?',
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
            'Yes! Amar Contact is fully responsive and works beautifully on phones, tablets, and desktops.',
        },
        {
          question: 'Is it free? Will there be a paid plan?',
          answer:
            'Amar Contact is currently free with no ads. We may add premium features in the future, but core features will remain free.',
        },
        {
          question: 'Is it open-source?',
          answer:
            'Yes. Source code may be available on GitHub. Contributions and feedback are welcome.',
        },
        {
          question: 'Is Amar Contact reliable?',
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
    <>
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">Help Center</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Page Header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-lg">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600 mt-1">
                Everything you need to know about Amar Contact
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to the{' '}
              <strong className="text-blue-600">
                Amar Contact Help Center
              </strong>
              ! Below you'll find detailed explanations of every feature
              available in Amar Contact to help you get the most out of your
              experience.
            </p>
            <p className="text-gray-600 mt-3">
              If you have questions or need help, you can always reach us at{' '}
              <a
                href="mailto:support@amarcontact.com"
                className="text-blue-600 hover:underline font-medium"
              >
                support@amarcontact.com
              </a>
            </p>
          </div>

          {/* Help Sections */}
          <div className="space-y-6">
            {helpSections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections.includes(section.id);

              return (
                <div
                  key={section.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${getIconColorClasses(section.color)}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-4 space-y-4">
                      {section.items.map((item, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 ${getColorClasses(section.color)}`}
                        >
                          <h3 className="font-semibold mb-2 flex items-start">
                            <span className="text-sm mr-2 mt-1">Q:</span>
                            {item.question}
                          </h3>
                          <p className="text-gray-700 ml-6">
                            <span className="text-sm font-medium mr-2">A:</span>
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                Need More Help?
              </h2>
              <p className="text-gray-700 mb-4">
                If your question isn't answered here, contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>
                    Email:{' '}
                    <a
                      href="mailto:support@amarcontact.com"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      support@amarcontact.com
                    </a>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                  <span>
                    Website:{' '}
                    <a
                      href="https://amar-contacts.vercel.app"
                      className="text-blue-600 hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://amar-contacts.vercel.app
                    </a>
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                We'll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              <strong>Last updated:</strong> July 13, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
