import React, { useState, useRef, useEffect, FC } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from "react-router-dom";
import { client } from '../../../index';

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
    setSubscriptionPlan: (string) => void,
}

const Stepper: FC<StepperProps> = ({ steps, onChange, userData, setSubscriptionPlan }: StepperProps): JSX.Element => {
    const navigate = useNavigate();
    let [currentStep, setCurrentStep] = useState<number>(1);
    let [userInputError, setUserInputError] = useState<any | null>(null);
    const [stepLength] = useState<number>(Object.entries(steps).length);
    const [disabled, setDisabled] = useState<boolean>(false);
    const stepperSelector = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {moveStepper();}, [currentStep])

    const [register, { data, loading, error, reset }] = useMutation(REGISTER_NEW_USER, { errorPolicy: 'all' });


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

    const resetStepper = () => {
        reset();
        localStorage.removeItem("token");
        client.resetStore();
        setCurrentStep(2);
        setUserInputError(null);
    }

    useEffect(() => {
        if(error) {
            setUserInputError(error.graphQLErrors[0].extensions.userInputError);
        }
        if(!loading && data && !error) {
            navigate('/profiles/manage');
            localStorage.setItem('token', data.registerUser.token);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, data, error, userInputError])

    useEffect(() => {
        if(currentStep === 2 && userData.userEmail === null && userData.password === null) {
            setDisabled(true);
        } else {
            setDisabled(false)
        }
    }, [disabled, userData.userEmail, userData.password, currentStep])


    if(userInputError) {
        return (
            <div className="stepError">
                <h2>Error : wrong user Input</h2>
                {userInputError.wrongEmailFormat ? (<p>{userInputError.wrongEmailFormat}</p>) : null}
                {userInputError.passwordLengthError ? (<p>{userInputError.passwordLengthError}</p>) : null}
                {userInputError.userAlreadyExist ? (<p>{userInputError.userAlreadyExist}</p>) : null}
                <button onClick={resetStepper} className={`btn next-btn`}>Back</button>
            </div>
        )
    }
    return (
        <div className="stepper stepper-wrapper">
            <div className="stepper-selector" ref={stepperSelector}>
                {Object.entries(steps).map((item, i) => (
                    <StepItem item={item} key={`stepper-${i++}`} disabled={disabled} setSubscriptionPlan={setSubscriptionPlan} onChange={onChange} classname={`stepItem-${i++}`} isFirst={i === 0} isLast={i === stepLength} step={i} currentStep={currentStep} nextStep={nextStep} />
                ))}
            </div>
        </div>
    )
}

export default Stepper
