/* eslint-disable @typescript-eslint/no-redeclare */
import React, { Fragment, ChangeEvent } from 'react';

// Import Custom Component
import InputText from '../InputText';

// Import image
// import check from "../../../images/auth/register-section-2-check.svg";

type StepLevelProps = {
    text1: string,
    num1: number,
    text2: string,
    num2: number
}

type UserInputProps = {
    label: string,
    errorMsg: string
}

type UserorPasswordInputProps = {
    userInput: UserInputProps,
    passwordInput: UserInputProps
}

type StepItem = {
    img: boolean,
    stepLevel: StepLevelProps,
    title: string,
    text: string,
    subtitle1: string,
    subtitle2: string,
    list: string[],
    stepBtn: string
    input: UserorPasswordInputProps
    checkbox: string
}

type StepItemProps = {
    item: [string, StepItem],
    nextStep: () => void,
    isFirst: boolean,
    isLast: boolean,
    currentStep: number,
    step: number,
    classname: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const StepItem = ({ item, nextStep, isFirst, isLast, currentStep, step, classname, onChange }: StepItemProps): JSX.Element => {
    const data = item[1];

    return (
        <div className="step-wrapper">
            <div className={`step ${classname}`}>
                <div className="step-container">
                    {data.img ? (<div className="step-img"></div>) : null}
                    <div className="stepHeader">
                        <p className="stepOn">{data.stepLevel["text1"]} <span>{data.stepLevel["num1"]}</span> {data.stepLevel["text2"]} <span>{data.stepLevel["num2"]}</span></p>
                        <h2>{data.title}</h2>
                    </div>
                    <div className="stepBody">
                        {data.text ? (<p>{data.text}</p>) : null}
                        {data.subtitle1 ? (<h3>{data.subtitle1}</h3>) : null}
                        {data.subtitle2 ? (<h3>{data.subtitle2}</h3>) : null}
                        <div className="simpleForm">
                            {data.input ? (
                                <Fragment>
                                    <InputText fieldName="login-email" type="text" name="userEmail"   onChange={onChange} label={data.input.userInput.label} errorMsg={data.input.userInput.errorMsg} />
                                    <InputText fieldName="login-password" type="password" name="password"   onChange={onChange} label={data.input.passwordInput.label} errorMsg={data.input.passwordInput.errorMsg} />
                                </Fragment>) : null}
                            {data.checkbox ? (
                            <div className="checkbox">
                                <input type="checkbox"  name="specialOffers" onChange={e => onChange(e)} />
                                <label htmlFor="specialOffers">{data.checkbox}</label>
                            </div>) : null}
                        </div>
                        {data.list ? (
                            <ul className="register-list">
                                {data.list.map((item, i) => (
                                    <li key={`register-step-2-list-${i++}`}>
                                        <svg viewBox="0 0 24 24" className="checkmark-group--icon" aria-hidden="true">
                                            <path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path>
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                    <button onClick={nextStep} className={`btn ${isLast ? "complete-btn" : "next-btn"}`}>{data.stepBtn}</button>
                </div>
            </div>
        </div>
    )
}

export default StepItem
