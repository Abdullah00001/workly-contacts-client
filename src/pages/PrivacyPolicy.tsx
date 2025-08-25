import { FC } from 'react';
import { ArrowLeft, Shield, Users, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: FC = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-medium">Privacy Policy</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-gray-800">
          {/* Page Header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-600 mt-1">
                How we protect and handle your data
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              Welcome to{' '}
              <strong className="text-blue-600">Workly Contacts</strong>. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform. By accessing
              or using Workly Contacts, you agree to the terms of this Privacy
              Policy.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Information We Collect
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Personal Information:</strong> Includes your
                        name, email address, avatar, birthday, and contact
                        details.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Contact Data:</strong> All the contacts you
                        create including their names, emails, phone numbers,
                        birthdays, and notes.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Authentication Logs:</strong> Includes login
                        time, last login, device information, and IP address.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Usage Data:</strong> Actions you perform on the
                        platform such as importing, exporting, editing, or
                        merging contacts.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Technical Data:</strong> Your browser type,
                        operating system, device type, and performance
                        analytics.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  How We Use Your Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To provide and maintain the core contact management
                        features.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To personalize your experience by offering smart
                        suggestions and sorting features.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To improve our platform's functionality, performance,
                        and user experience.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To troubleshoot issues, track errors, and ensure system
                        security.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To send you service-related notices such as password
                        change alerts.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Data Sharing & Disclosure
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <p className="mb-4 text-gray-700">
                    We do not sell, rent, or trade your personal data. Your data
                    is never shared with third parties without your consent,
                    except in the following circumstances:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To comply with legal obligations or valid government
                        requests.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To protect our rights, security, and infrastructure.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To service providers who help us host, secure, and
                        operate the platform (e.g., cloud storage).
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Continue with remaining sections in similar style... */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Third-Party Services
                </h2>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-6">
                  Workly Contacts may integrate third-party tools such as
                  analytics providers (e.g., Google Analytics), image upload/CDN
                  services, or optional login/authentication providers. These
                  services may collect data in accordance with their own privacy
                  policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  Data Retention
                </h2>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-6">
                  We retain your personal data and contact information for as
                  long as your account is active or as needed to provide
                  services. If you delete your account, we will permanently
                  delete your data within 30 days, unless retention is required
                  by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    6
                  </span>
                  Data Security
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-gray-700">
                    We implement industry-standard security measures including
                    HTTPS, encryption-at-rest, password hashing, and secure
                    authentication mechanisms. However, no system is 100%
                    secure; we encourage you to use strong passwords and enable
                    device protection.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    7
                  </span>
                  Cookies & Tracking Technologies
                </h2>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-6">
                  We may use cookies and similar technologies to store session
                  data, enhance performance, and remember preferences. You can
                  manage or disable cookies via your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    8
                  </span>
                  Your Rights
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Access:</strong> You can view all the data
                        associated with your account.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Update:</strong> You can update or correct your
                        information from your profile page.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Delete:</strong> You may delete individual
                        contacts or your entire account at any time.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Export:</strong> You can export your contact
                        data via our Export feature.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Continue with remaining sections... */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    9
                  </span>
                  User Responsibilities
                </h2>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-6">
                  You are responsible for maintaining the confidentiality of
                  your account credentials. Please do not share your login
                  information. If you suspect unauthorized access, contact
                  support immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    10
                  </span>
                  Children's Privacy
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-gray-700">
                    Workly Contacts is not intended for children under 13. We do
                    not knowingly collect personal data from children. If we
                    discover such data has been submitted, we will delete it
                    promptly.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    11
                  </span>
                  Changes to This Policy
                </h2>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-6">
                  We may update this Privacy Policy from time to time to reflect
                  changes in technology, law, or features. We'll notify users of
                  material changes via the platform or email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    12
                  </span>
                  Contact Us
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    If you have any questions, concerns, or feedback regarding
                    this Privacy Policy, feel free to contact us at:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
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
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>
                        Website:{' '}
                        <a
                          href="https://contacts.workly.ink"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          contacts.workly.ink
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                <strong>Last updated:</strong> July 13, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
