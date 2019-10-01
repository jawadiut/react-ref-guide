import React from 'react';
import logProps from './logProps';

const FancyButton = React.forwardRef((props, ref) => {
        return (
            <button ref={ref} type="button" className="FancyButton" onClick={props.focusHandler}>
                {props.children}
            </button>
        );
    });

export default logProps(FancyButton);