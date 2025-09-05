'use client';

import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  const steps = [
    { number: 1, label: 'Email' },
    { number: 2, label: 'Verify' },
    { number: 3, label: 'Code' },
    { number: 4, label: 'Reset' },
  ];

  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8">
      <div className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300
                  ${
                    step.number < currentStep
                      ? 'bg-[#3F3FF3] text-white'
                      : step.number === currentStep
                        ? 'bg-[#3F3FF3] text-white ring-4 ring-[#3F3FF3]/20'
                        : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {step.number < currentStep ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`
                  text-xs mt-1 font-medium transition-colors duration-300
                  ${step.number <= currentStep ? 'text-[#3F3FF3]' : 'text-gray-400'}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  w-8 sm:w-12 h-0.5 mx-2 transition-colors duration-300
                  ${step.number < currentStep ? 'bg-[#3F3FF3]' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
