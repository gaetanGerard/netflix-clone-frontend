import React, { FC } from 'react';

// Import Custom Components
import AccordionItem from './AccordionItem';

// Import Styles
import "../../../styles/accordion.scss";

type ItemProps = {
    title: string,
    body: BodyProps
}

type BodyProps = {
    content1: string,
    content2?: string,
    link: string
}

type AccordionProps = {
    accordion: ItemProps[]
}

const Accordion: FC<AccordionProps> = ({ accordion }): JSX.Element => {
    return (
        <div className="accordion-container">
            {accordion.map((item, i) => (
                <AccordionItem key={`accordionItem-${i++}`} item={item} />
            ))}
        </div>
    )
}

export default Accordion