import { ReactNode, useState } from 'react';

const useMultiStepForm = (forms: ReactNode[] = []) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const numberOfSteps = forms.length;

  const next = () => {
    setStepIndex((prev) => (prev < numberOfSteps - 1 ? prev + 1 : prev));
  };

  const previous = () => {
    setStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goTo = (index: number) => {
    setStepIndex(index);
  };

  const isLastStep = stepIndex === numberOfSteps - 1;
  const isFirstStep = stepIndex === 0;

  return {
    form: forms[stepIndex],
    formIndex: stepIndex,
    next,
    previous,
    goTo,
    count: numberOfSteps,
    isLastStep,
    isFirstStep,
  };
};

export default useMultiStepForm;
