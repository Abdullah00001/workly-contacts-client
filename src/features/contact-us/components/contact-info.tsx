import { MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ContactInfo() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="bg-blue-100 p-3 rounded-xl w-fit">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                Get in Touch
              </CardTitle>
              <p className="text-muted-foreground">
                We{`'`}d love to hear from you
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Have questions about{' '}
            <strong className="text-blue-600">Workly Contacts</strong>? Need
            help with your account? Found a bug or have a feature request? We
            {`'`}re here to help! Reach out to us using any of the methods
            below.
          </p>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900">
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="bg-blue-100 p-2 rounded-lg w-fit">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Email Support
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                For general inquiries and support
              </p>
              <a
                href="mailto:support@amarcontact.com"
                className="text-blue-600 hover:underline font-medium text-sm sm:text-base break-all"
              >
                support@workly.ink
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="bg-green-100 p-2 rounded-lg w-fit">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Phone Support
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                Available Monday - Friday, 9 AM - 6 PM EST
              </p>
              <p className="text-green-600 font-medium text-sm sm:text-base">
                +1 (555) 123-4567
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="bg-purple-100 p-2 rounded-lg w-fit">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Office Address
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                Visit us at our headquarters
              </p>
              <p className="text-purple-600 font-medium text-sm sm:text-base">
                123 Tech Street, Suite 100
                <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Time */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
              Response Times
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600">Email inquiries:</span>
            <span className="font-medium text-gray-900">Within 24 hours</span>
          </div>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600">Technical support:</span>
            <span className="font-medium text-gray-900">Within 12 hours</span>
          </div>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-gray-600">Bug reports:</span>
            <span className="font-medium text-gray-900">Within 48 hours</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
