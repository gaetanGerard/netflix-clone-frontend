import React, { FC } from 'react';

type BodyProps = {
    content1: string,
    content2?: string,
    link?: string
}

type AccordionBodyProps = {
    classname: string,
    body: BodyProps
}

const AccordionBody: FC<AccordionBodyProps> = ({ classname, body }): JSX.Element => {
    return (
        <div className={classname}>
            <p>{body['content1']}</p>
            {body['content2'] ? (<p>{body['content2']}</p>) : null }
            {body['link'] ? (<a href="/discover" target="_blank">{body['link']}</a>) : null }
        </div>
    )
}

export default AccordionBody
