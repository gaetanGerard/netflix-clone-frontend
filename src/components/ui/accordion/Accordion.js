import React from 'react';

// Import Custom Components
import AccordionItem from './AccordionItem';

// Import Styles
import "../../../styles/accordion.scss";

const Accordion = ({ accordion }) => {
    return (
        <div className="accordion-container">
            {accordion.map((item, i) => (
                <AccordionItem key={`accordionItem-${i++}`} item={item} id={i++} />
            ))}
        </div>
    )
}

export default Accordion