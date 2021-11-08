import React from 'react';

// Import Styles
import "../../styles/inputText.scss";

const InputText = ({fieldName, label, errorMsg, onChangeUserEmail}) => {

    const setActive = (el, active) => {
        const formField = el.target.parentNode.parentNode
        if (active) {
          formField.classList.add('form-field--is-active')
        } else {
          formField.classList.remove('form-field--is-active')
          if(el.target.value === '') {
            formField.classList.remove('form-field--is-filled')
          } else {
            formField.classList.add('form-field--is-filled')
          }
        }
      }


    return (
        <div className="form-container">
            <div className="form-field">
                <div className="form-field-control">
                    <label htmlFor={fieldName} className="form-field-label">{label}</label>
                    <input id={fieldName} type="text" className="form-field-input" onChange={e => onChangeUserEmail(e)} onBlur={el => setActive(el, false)} onFocus={el => setActive(el, true)} />
                </div>
            </div>
            <p className="helperText helperText-hide">{errorMsg}</p>
        </div>

    )
}

export default InputText
