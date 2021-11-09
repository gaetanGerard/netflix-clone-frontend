import React from 'react';

const Button = ({ btnType, classname, children, onclick, disabled }) => {
    return (
        <button type={btnType} className={classname} disabled={disabled} onClick={onclick}>
            {children}
        </button>
    )
}

export default Button