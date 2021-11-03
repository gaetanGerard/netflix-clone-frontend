import React from 'react';

const Button = ({btnType, classname, btnText, onclick}) => {
    return (
        <button type={btnType} className={classname} onClick={onclick}>
            {btnText}
        </button>
    )
}

export default Button