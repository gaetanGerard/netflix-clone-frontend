import React from 'react'

const Typography = ({HTMLElement, children, classname}) => {

    const Component = HTMLElement ? HTMLElement : "p";

    return (
        <Component className={`typography-${HTMLElement} ${classname}`}>{children}</Component>
    )
}

export default Typography
