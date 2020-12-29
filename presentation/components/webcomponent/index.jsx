import React from 'react'
import Mustache from 'mustache'

export default function WebComponent({ template, ...props } ) {
    const html = Mustache.render(template, props)
    return <div 
        className="web-component" 
        dangerouslySetInnerHTML={{__html:html}}>
    </div>
}