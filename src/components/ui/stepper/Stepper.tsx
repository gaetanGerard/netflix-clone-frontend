import React, { useState, useRef, useEffect, FC } from 'react';

// Import Custom Components
import StepItem from "./StepItem";

type StepperProps = {
    steps: Object,
    onChange: (e: any) => void,
}

const Stepper: FC<StepperProps> = ({ steps, onChange }: StepperProps): JSX.Element => {
    let [currentStep, setCurrentStep] = useState<number>(1);
    const [stepLength] = useState<number>(Object.entries(steps).length);
    const stepperSelector = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {moveStepper();}, [currentStep])

    // Next step will have to recover data from step 1 (userEmail, password, specialOffers)
    // and recover plan on step 2
    const nextStep = () => {
        const nextStep = currentStep + 1;
        if(currentStep <= stepLength - 1) {
            setCurrentStep(nextStep);
        }
    }

    const moveStepper = () => {
        if(stepperSelector.current) {
            const stepper = stepperSelector.current;
            const stepWidth = stepper.offsetWidth / stepLength;
            stepper.style.transform = `translateX(-${stepWidth * (currentStep - 1)}px)`;
        }
    }

    return (
        <div className="stepper stepper-wrapper">
            <div className="stepper-selector" ref={stepperSelector}>
                {Object.entries(steps).map((item, i) => (
                    <StepItem item={item} key={`stepper-${i++}`} onChange={onChange} classname={`stepItem-${i++}`} isFirst={i === 0} isLast={i === stepLength} step={i} currentStep={currentStep} nextStep={nextStep} />
                ))}
            </div>
        </div>
    )
}

export default Stepper
