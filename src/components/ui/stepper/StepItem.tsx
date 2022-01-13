/* eslint-disable @typescript-eslint/no-redeclare */
import React, { Fragment, ChangeEvent, useState } from 'react';

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
    setSubscriptionPlan: (string) => void
}

const StepItem = ({ item, nextStep, isFirst, isLast, currentStep, step, classname, onChange, setSubscriptionPlan }: StepItemProps): JSX.Element => {
    const data = item[1];
    const [activeColumn, setActiveColumn] = useState<string | null>(null);

    const selectedColumn = (name) => {
        setActiveColumn(name);
        setSubscriptionPlan(name);
    }

    return (
        <div className="step-wrapper">
            <div className={`step ${classname}`}>
                <div className="step-container">
                    {data.img ? (<div className="step-img"></div>) : null}
                    <div className="stepHeader">
                        <p className="stepOn">{data.stepLevel["text1"]} <span>{data.stepLevel["num1"]}</span> {data.stepLevel["text2"]} <span>{data.stepLevel["num2"]}</span></p>
                        <h2>{data.title}</h2>
                        {data["header-list"] ? (
                            <ul className="register-list">
                                {data["header-list"].map((item, i) => (
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
                        {data["subscription-plan"] ? (
                            <div className="subscription-container">
                                <div className="row row-header">
                                    <div className="column"></div>
                                    {data["subscription-plan"].map((col, i) => (<div className={`column column-header ${activeColumn === col.name ? "active" : ""}`} onClick={e => selectedColumn(col.name)} key={`row-header-${i++}`}><span>{col.name}</span></div>))}
                                </div>
                                <div className="row row-with-border">
                                    <div className="column column-label">{data["subscription-row-label"][0]}</div>
                                    {data["subscription-plan"].map((col, i) => (<div className={`column ${activeColumn === col.name ? "active" : ""}`} onClick={e => selectedColumn(col.name)} key={`row-pricing-${i++}`}>{col.pricing}</div>))}
                                </div>
                                <div className="row row-with-border">
                                    <div className="column column-label">{data["subscription-row-label"][1]}</div>
                                    {data["subscription-plan"].map((col, i) => (<div className={`column ${activeColumn === col.name ? "active" : ""}`} onClick={e => selectedColumn(col.name)} key={`row-videoQuality-${i++}`}>{col.videoQuality}</div>))}
                                </div>
                                <div className="row row-with-border">
                                    <div className="column column-label">{data["subscription-row-label"][2]}</div>
                                    {data["subscription-plan"].map((col, i) => (<div className={`column ${activeColumn === col.name ? "active" : ""}`} onClick={e => selectedColumn(col.name)} key={`row-Resolution-${i++}`}>{col.Resolution}</div>))}
                                </div>
                                <div className="row">
                                    <div className="column column-label">{data["subscription-row-label"][3]}</div>
                                    {data["subscription-plan"].map((col, i) => (
                                    <div className={`column ${activeColumn === col.name ? "active" : ""}`} onClick={e => selectedColumn(col.name)} key={`row-allDevice-${i++}`}>
                                        <svg viewBox="0 0 24 24" className="checkmark-group--icon" aria-hidden="true">
                                            <path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path>
                                        </svg>
                                    </div>))}
                                </div>
                            </div>
                        ) : null}
                        {data["disclaimer"] ? (
                            <div className="small-container">
                                <p>{data["disclaimer"].text1} <a href="/">{data["disclaimer"]["link-1"].text}</a></p>
                                <p>{data["disclaimer"].text2}</p>
                            </div>
                        ) : null}
                    </div>
                    <button onClick={nextStep} className={`btn ${isLast ? "complete-btn" : "next-btn"}`}>{data.stepBtn}</button>
                </div>
            </div>
        </div>
    )
}

export default StepItem
