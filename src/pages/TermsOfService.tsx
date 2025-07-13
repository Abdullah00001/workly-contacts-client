import { FC } from 'react';
import { ArrowLeft, FileText, Mail, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: FC = () => {
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
          <span className="text-gray-800 font-medium">Terms of Service</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-gray-800">
          {/* Page Header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Terms of Service
              </h1>
              <p className="text-gray-600 mt-1">
                Rules and guidelines for using our platform
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              Welcome to <strong className="text-blue-600">Amar Contact</strong>
              . These Terms of Service ("Terms") govern your use of our website,
              applications, and services ("Service"). By accessing or using Amar
              Contact, you agree to be bound by these Terms.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-gray-700 font-medium">
                If you do not agree to these Terms, please do not use the
                Service.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Acceptance of Terms
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    By using Amar Contact, you confirm that you:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        Are at least 13 years old (or the age of digital consent
                        in your country)
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        Have read, understood, and agreed to these Terms and our
                        Privacy Policy
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
                  Description of Service
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    <strong className="text-blue-600">Amar Contact</strong> is a
                    contact management platform that allows users to:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Add, edit, and delete personal contacts</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Organize contacts with labels</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Search, sort, and merge duplicates</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Import and export contacts</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Access their profile and account settings</div>
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-4 text-sm">
                    Some features may be marked as beta or experimental.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  User Responsibilities
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">As a user, you agree:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>To provide accurate and up-to-date information</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To keep your login credentials secure and confidential
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To not use the platform for illegal, harmful, or abusive
                        purposes
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        To not attempt to reverse-engineer, hack, or overload
                        the system
                      </div>
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-4 font-medium">
                    You are responsible for all actions taken under your
                    account.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Account & Data
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        You may delete your account at any time, which will
                        permanently remove your contacts and associated data
                        from our system (within 30 days).
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        We may remove inactive or abusive accounts with notice.
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        We do not sell your personal data. See our Privacy
                        Policy for details.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  Acceptable Use
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">You may not:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Use Amar Contact to spam or harass others</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Upload malicious files or scripts</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>Attempt to bypass system protections</div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        Use automated bots to create fake accounts or abuse
                        features
                      </div>
                    </li>
                  </ul>
                  <p className="text-red-700 mt-4 font-medium">
                    Violation of these rules may result in immediate suspension
                    or ban.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    6
                  </span>
                  Intellectual Property
                </h2>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    All content, design, and source code of Amar Contact (except
                    user-generated content) is owned by the developers of the
                    platform. You may not reproduce or redistribute any part of
                    the Service without permission.
                  </p>
                  <p className="text-gray-600 text-sm">
                    If the project is open-source, usage is governed by its
                    respective license (e.g., MIT).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    7
                  </span>
                  Availability & Changes
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    We strive to keep the service available and stable, but:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        We may occasionally suspend service for maintenance
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        We reserve the right to modify or discontinue features
                        without notice
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                      <div>
                        We are not liable for any data loss or service
                        interruptions
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    8
                  </span>
                  Termination
                </h2>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-6">
                  We reserve the right to suspend or terminate your account if
                  you violate these Terms or abuse the platform. You may also
                  delete your account at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    9
                  </span>
                  Disclaimer of Warranties
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-gray-700">
                    Amar Contact is provided "as is" and "as available" without
                    warranties of any kind, either express or implied. We do not
                    guarantee the platform will always be error-free or secure.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    10
                  </span>
                  Limitation of Liability
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-gray-700">
                    We are not liable for any indirect, incidental, or
                    consequential damages resulting from your use of the
                    platform. This includes data loss, account suspension, or
                    third-party misuse.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    11
                  </span>
                  Changes to These Terms
                </h2>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-6">
                  We may update these Terms at any time. When we do, we will
                  update the date at the top and notify users where appropriate.
                  Continued use of the Service means you accept the updated
                  Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    12
                  </span>
                  Contact
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    If you have questions about these Terms, please contact us
                    at:
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
                      <Globe className="w-5 h-5 text-blue-600" />
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

export default TermsOfService;
