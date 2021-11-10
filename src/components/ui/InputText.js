import React from 'react';

// Import Styles
import "../../styles/inputText.scss";

const InputText = ({fieldName, label, errorMsg, onChange, type, name, classname}) => {

    const setActive = (el, active) => {
        const formField = el.target.parentNode.parentNode
        if (active) {
          formField.classList.add('form-field--is-active')
          if(el.target.value === '') {
            formField.parentNode.children[1].classList.remove('helperText-hide');
            formField.parentNode.children[1].classList.add('helperText-show');
            formField.parentNode.children[0].classList.add('form-field--is-empty')
          }
        } else {
          formField.classList.remove('form-field--is-active')
          formField.parentNode.children[1].classList.add('helperText-hide');
          formField.parentNode.children[1].classList.remove('helperText-show');
          formField.parentNode.children[0].classList.remove('form-field--is-empty')
          if(el.target.value === '') {
            formField.classList.remove('form-field--is-filled')
            formField.parentNode.children[1].classList.remove('helperText-hide');
            formField.parentNode.children[1].classList.add('helperText-show');
            formField.parentNode.children[0].classList.add('form-field--is-empty')
          } else {
            formField.classList.add('form-field--is-filled')
            formField.parentNode.children[1].classList.add('helperText-hide');
            formField.parentNode.children[1].classList.remove('helperText-show');
            formField.parentNode.children[0].classList.remove('form-field--is-empty')
          }
        }
      }


    return (
        <div className="form-container">
            <div className="form-field">
                <div className="form-field-control">
                    <label htmlFor={fieldName} className="form-field-label">{label}</label>
                    <input id={fieldName} type={type ? type : "text"} name={name} className={`form-field-input ${classname ? classname : ""}`} onChange={e => onChange(e)} onBlur={el => setActive(el, false)} onFocus={el => setActive(el, true)} />
                </div>
            </div>
            <p className="helperText helperText-hide">{errorMsg}</p>
        </div>

    )
}

export default InputText
