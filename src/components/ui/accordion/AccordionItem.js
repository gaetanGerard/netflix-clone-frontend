import React, { useState } from 'react';

// Import Custom Components
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

// Import icones
import cross from "../../../images/icones/cross.svg";

const AccordionItem = ({ item }) => {
    const [open, setOpen] = useState(false);

    const toggleAccordion = (e) => {
        e.preventDefault();
        setOpen(!open)
    }
    return (
        <div className="accordion-item">
            <AccordionHeader classname={`accordion-item-header ${open ? 'open' : ''}`}onclick={toggleAccordion}>{item.title}<img src={cross} alt="cross icons" /></AccordionHeader>
            <AccordionBody classname={`accordion-item-body ${open ? 'body-open' : ''}`} body={item.body} />
        </div>
    )
}

export default AccordionItem
