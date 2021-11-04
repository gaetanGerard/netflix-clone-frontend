import React from 'react';

const Button = ({btnType, classname, children, onclick, btnIcon}) => {
    return (
        <button type={btnType} className={classname} onClick={onclick}>
            {children}
        </button>
    )
}

export default Button