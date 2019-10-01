import React, {Component} from 'react';
import FancyButton from "./FancyButton";
import './App.css';

class CustomTextInput extends Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
        // create a ref to store the button DOM element
        this.fancyButton = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.clickFancyButton = this.clickFancyButton.bind(this);
        this.state = {
            value: 'Value',
            buttonStyle: null
        };
        this.fancyStyle = {
            backgroundColor: 'cyan',
            color: 'darkgoldenrod',
            boxShadow: '0 5px #666',
            transform: 'translateY(4px)'
        };
        this.normalStyle = {
            backgroundColor: 'darkcyan',
            color: 'gold',
            boxShadow: '0 9px #999',
            transform: 'translateY(0px)'
        };
    }

    focusTextInput() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.textInput.current.focus();
        console.log(this.textInput.current);
        console.log("Focused Using Ref !!");
    }

    clickFancyButton(style) {
        console.log(this.fancyButton.current.style);

        Object.assign(this.fancyButton.current.style, style);

        if (style === this.fancyStyle) {
            setTimeout(() => this.clickFancyButton(this.normalStyle), 300);
        } else if (style === this.normalStyle) {
            this.fancyButton.current.click();
        }
    }

    //Controlled Component -- React state is 'the source of truth'
    changeHandlerWithState = (event) => {
        this.setState({
            value: event.target.value
        });

        console.log("Using State Value!!");

        if (event.target.value.toUpperCase() === 'CLICK') {
            this.clickFancyButton(this.fancyStyle);
        }
    };

    changeHandlerUsingRef = (event) => {
        this.textInput.current.value = event.target.value;
        console.log("Using Ref Value!!");
    };

    removeFocus = (event) => {
        event.target.blur();
    };

    handleSubmit = (event) => {
        if (this.textInput.current) {
            this.setState({
               value: this.textInput.current.value
            });
            console.log("Value set from Ref!!");
        } else {
            console.log("Value set from State!!");
        }

        event.preventDefault();
    };

    //TODO
    componentDidMount() {

    }

    render() {
        // tell React that we want to associate the <input> ref
        // with the `textInput` that we created in the constructor
        const style = {
            width: '60%',
            margin: '16px auto',
            border: '1px solid #eee',
            boxShadow: '0 2px 3px #ccc',
            padding: '16px',
            textAlign: 'center'
        };

        return (
            <div style={style}>
                <label><h3>State Value : [[{this.state.value}]]</h3></label>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.changeHandlerWithState} //TODO using this.changeHandlerUsingRef, callback function
                        onClick={this.removeFocus}
                        ref={this.textInput} />
                    <span> </span>
                    <FancyButton
                        ref={this.fancyButton}
                        focusHandler={this.focusTextInput}>
                        Focus Text Field
                    </FancyButton>
                    <span> </span>
                    <input style={{height: '50px', width: '200px'}} type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default CustomTextInput;