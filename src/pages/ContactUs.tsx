import { FC, useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Send,
  MapPin,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactUs: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
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
          <span className="text-gray-800 font-medium">Contact Us</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Get in Touch
                  </h1>
                  <p className="text-gray-600 mt-1">
                    We'd love to hear from you
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Have questions about{' '}
                <strong className="text-blue-600">Amar Contact</strong>? Need
                help with your account? Found a bug or have a feature request?
                We're here to help! Reach out to us using any of the methods
                below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email Support
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      For general inquiries and support
                    </p>
                    <a
                      href="mailto:support@amarcontact.com"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      support@amarcontact.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Phone Support
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Available Monday - Friday, 9 AM - 6 PM EST
                    </p>
                    <p className="text-green-600 font-medium">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Office Address
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Visit us at our headquarters
                    </p>
                    <p className="text-purple-600 font-medium">
                      123 Tech Street, Suite 100
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Response Times
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email inquiries:</span>
                  <span className="font-medium text-gray-900">
                    Within 24 hours
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Technical support:</span>
                  <span className="font-medium text-gray-900">
                    Within 12 hours
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bug reports:</span>
                  <span className="font-medium text-gray-900">
                    Within 48 hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="account">Account Issues</option>
                  <option value="billing">Billing Questions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-green-800 font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                We respect your privacy. Your information will only be used to
                respond to your inquiry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
