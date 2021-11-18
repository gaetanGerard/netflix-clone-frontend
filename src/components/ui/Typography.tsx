import React, { ReactNode } from 'react';

type TypoProps = {
    HTMLElement: any,
    classname?: string,
    children: ReactNode
}

const Typography = (props: TypoProps): JSX.Element => {

    const Component = props.HTMLElement ? props.HTMLElement : "p";

    return (
        <Component className={`typography-${props.HTMLElement} ${props.classname}`}>{props.children}</Component>
    )
}

export default Typography
