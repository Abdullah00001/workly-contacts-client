'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  // Don't show indicator on success step (step 5)
  if (currentStep === 5) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: '#3F3FF3',
          }}
        />
      </div>
    </div>
  );
}
