import React, { Fragment } from 'react';

// Import Custom Component
import InputText from '../InputText';

// Import image
import check from "../../../images/auth/register-section-2-check.svg";

const StepItem = ({ item, nextStep, isFirst, isLast, currentStep, step, classname, onChange }) => {
    const data = item[1];

    // console.log(data)

    return (
        <div className="step-wrapper">
            <div className={`step ${classname}`}>
                <div className="step-container">
                    {data.img ? (<div className="step-img"></div>) : null}
                    <div className="stepHeader">
                        <p className="stepOn">{data.stepLevel["text-1"]} <span>{data.stepLevel["num-1"]}</span> {data.stepLevel["text-2"]} <span>{data.stepLevel["num-2"]}</span></p>
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
                                        <svg viewBox="0 0 24 24" class="checkmark-group--icon" aria-hidden="true">
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
