import React from 'react'

const AccordionHeader = ({ children, classname, onclick }) => {
    return (
        <div className={classname} onClick={e => onclick(e)}>{children}</div>
    )
}

export default AccordionHeader
