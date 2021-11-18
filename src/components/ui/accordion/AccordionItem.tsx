import React, { useState, FC } from 'react';

// Import Custom Components
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

// Import icones
import cross from "../../../images/icones/cross.svg";

type ItemProps = {
    title: string,
    body: BodyProps
}

type BodyProps = {
    content1: string,
    content2?: string,
    link: string
}

type AccordionItemProps = {
    item: ItemProps
}

const AccordionItem: FC<AccordionItemProps> = ({ item }): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const toggleAccordion = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setOpen(!open)
    }
    return (
        <div className="accordion-item">
            <AccordionHeader classname={`accordion-item-header ${open ? 'open' : ''}`} onclick={toggleAccordion}>{item.title}<img src={cross} alt="cross icons" /></AccordionHeader>
            <AccordionBody classname={`accordion-item-body ${open ? 'body-open' : ''}`} body={item.body} />
        </div>
    )
}

export default AccordionItem
