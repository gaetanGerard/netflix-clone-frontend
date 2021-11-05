import React from 'react'

const AccordionBody = ({ classname, body }) => {
    return (
        <div className={classname}>
            <p>{body['content-1']}</p>
            {body['content-2'] ? (<p>{body['content-2']}</p>) : null }
            {body['link'] ? (<a href="TO BE DEFINE">{body['link']}</a>) : null }
        </div>
    )
}

export default AccordionBody
