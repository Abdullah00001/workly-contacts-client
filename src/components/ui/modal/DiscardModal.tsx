import { FC } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { IDiscardModal } from '../../../interfaces/contacts.interface';

const DiscardModal: FC<IDiscardModal> = ({
  handleResetState,
  setIsDiscardModalOpen,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Discard Changes
            </h2>
          </div>
          <button
            onClick={() => setIsDiscardModalOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">
            Are you sure you want to discard your changes? This action cannot be
            undone and all unsaved progress will be lost.
          </p>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 pt-0">
          <button
            onClick={() => setIsDiscardModalOpen(false)}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleResetState}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscardModal;
