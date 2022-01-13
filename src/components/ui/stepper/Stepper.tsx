import React, { useState, useRef, useEffect, FC } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from "react-router-dom";

// Import utils
import { REGISTER_NEW_USER } from '../../../utils/mutation';

// Import Custom Components
import StepItem from "./StepItem";

type UserData = {
    userEmail: string | null,
    password: string | null,
    specialOffers: boolean | null
    subscriptionPlan: string | null
}

type StepperProps = {
    steps: Object,
    onChange: (e: any) => void,
    userData: UserData,
    setSubscriptionPlan: (string) => void
}

const Stepper: FC<StepperProps> = ({ steps, onChange, userData, setSubscriptionPlan }: StepperProps): JSX.Element => {
    const navigate = useNavigate();
    let [currentStep, setCurrentStep] = useState<number>(1);
    const [stepLength] = useState<number>(Object.entries(steps).length);
    const stepperSelector = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {moveStepper();}, [currentStep])

    const [register, { data, loading, error }] = useMutation(REGISTER_NEW_USER);


    const nextStep = () => {
        const nextStep = currentStep + 1;
        if(currentStep <= stepLength - 1) {
            setCurrentStep(nextStep);
        }
        if(currentStep === stepLength) {
            register({ variables: { email: userData.userEmail, password: userData.password, specialOffers: userData.specialOffers, subscriptionPlan: userData.subscriptionPlan } })
        }
    }

    const moveStepper = () => {
        if(stepperSelector.current) {
            const stepper = stepperSelector.current;
            const stepWidth = stepper.offsetWidth / stepLength;
            stepper.style.transform = `translateX(-${stepWidth * (currentStep - 1)}px)`;
        }
    }

    useEffect(() => {
        if(!loading && data) {
            navigate('/home');
            localStorage.setItem('token', data.registerUser.token);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, data])

    return (
        <div className="stepper stepper-wrapper">
            <div className="stepper-selector" ref={stepperSelector}>
                {Object.entries(steps).map((item, i) => (
                    <StepItem item={item} key={`stepper-${i++}`} setSubscriptionPlan={setSubscriptionPlan} onChange={onChange} classname={`stepItem-${i++}`} isFirst={i === 0} isLast={i === stepLength} step={i} currentStep={currentStep} nextStep={nextStep} />
                ))}
            </div>
        </div>
    )
}

export default Stepper
