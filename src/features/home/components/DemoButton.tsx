'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

const DemoButton = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  return (
    <>
      <Button
        onClick={() => setShowDemoModal(true)}
        variant="outline"
        size="lg"
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto"
      >
        Watch Demo
      </Button>
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Demo Video</h2>
              <Button
                onClick={() => setShowDemoModal(false)}
                variant="ghost"
                size="icon"
              >
                <X className="w-6 h-6" />
                <span className="sr-only">Close modal</span>
              </Button>
            </div>

            <div className="p-0 w-full">
              <div
                className="relative w-full"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  src="https://drive.google.com/file/d/1qrP96OMzZSkrD-fjp2VO_JQffxrd48cE/preview"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay"
                  title="Workly Contacts Demo Video"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoButton;
