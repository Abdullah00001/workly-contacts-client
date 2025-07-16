import { FC, useState } from 'react';
import {
  Users,
  Search,
  Tag,
  Copy,
  Upload,
  BarChart3,
  User,
  Shield,
  Activity,
  Sparkles,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import BackToTopButton from '../components/ui/button/BackToTopButton';

const Landing: FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

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

  const faqs = [
    {
      question: 'Is Amar Contact free to use?',
      answer:
        'Yes! Amar Contact is completely free forever with no subscription walls or hidden costs. We believe contact management should be accessible to everyone.',
    },
    {
      question: 'Can I import my existing contacts?',
      answer:
        'Absolutely! You can import contacts from CSV files, making it easy to migrate from other contact management systems or platforms.',
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
        'Yes! Amar Contact is fully responsive and works seamlessly on desktop, tablet, and mobile devices.',
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={handleLogoClick}
              className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Amar Contact
                </h1>
                <p className="text-sm text-gray-500 -mt-1">
                  Contact Management
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                >
                  Sign Up
                </button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3 pt-4">
                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={handleLogin}
                    className="text-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main id="main-content" className="focus:outline-none" tabIndex={-1}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Contacts,
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {' '}
                  Organized
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The most intuitive contact management platform. Create,
                organize, and manage your contacts with powerful features like
                smart search, duplicate detection, and seamless import/export.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSignup}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-lg"
                >
                  Watch Demo
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                ✨ Free forever • No credit card required • 2-minute setup
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Better Contact Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to organize, manage, and stay connected with
                your contacts in one beautiful, easy-to-use platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                >
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started with Amar Contact in just a few simple steps and
                transform how you manage your contacts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Amar Contact?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        100% Free Forever
                      </h3>
                      <p className="text-gray-600">
                        No subscription fees, no hidden costs. Use all features
                        without any limitations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Privacy First
                      </h3>
                      <p className="text-gray-600">
                        Your data is never sold or shared. We respect your
                        privacy and keep your contacts secure.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Ad-Free Experience
                      </h3>
                      <p className="text-gray-600">
                        Focus on what matters without distractions. Clean, fast,
                        and intuitive interface.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Mobile Friendly
                      </h3>
                      <p className="text-gray-600">
                        Works seamlessly on all devices. Manage your contacts
                        anywhere, anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Join Thousands of Users
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Trusted by individuals and teams worldwide for reliable
                    contact management.
                  </p>
                  <button
                    onClick={handleSignup}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                  >
                    Start Managing Contacts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Contact Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have simplified their contact
              management with Amar Contact. Start organizing your contacts
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSignup}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/help')}
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about Amar Contact
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
      <BackToTopButton />
      {/* Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Demo Video</h2>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="p-0">
              <iframe
                src="https://drive.google.com/file/d/1qrP96OMzZSkrD-fjp2VO_JQffxrd48cE/preview"
                width="100%"
                height="500"
                allow="autoplay"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
