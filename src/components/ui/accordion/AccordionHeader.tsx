import React, { FC, MouseEvent } from 'react';

type AccordionHeaderProps = {
    children: React.ReactNode,
    classname: string,
    onclick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void
}

const AccordionHeader: FC<AccordionHeaderProps> = ({ children, classname, onclick }): JSX.Element => {
    return (
        <div className={classname} onClick={(e) => onclick(e)}>{children}</div>
    )
}

export default AccordionHeader
