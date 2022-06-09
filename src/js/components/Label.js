import React from 'react';

const Label = (props) => {
    let { id, className, onClick, tooltip, placeBefore, children, text, htmlFor } = props;

    let classes = (className || "").trim().split(/\s+/);
    let textSpan = <span>{text}</span>;

    return (
        <label
            id={id}
            className={classes.join(" ")}
            htmlFor={htmlFor}
            onClick={onClick}
            title={tooltip}
            >
                {placeBefore && textSpan}
                {children}
                {!placeBefore && textSpan}
        </label>
     );
}
export default Label;