import React, {Component} from 'react';
import {InputGroup} from "@blueprintjs/core";

export default class SignUpView extends Component {
    // user_name, email, password
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
        }
    }

    handleUserNameChange = evt => this.setState({userName: evt.target.value});

    render() {
        const { userName } = this.state;

        return (
            <div className="signUpRoot">
                <h1>Sign Up</h1>

                <InputGroup
                    leftIcon="user"
                    large={true}
                    onChange={this.handleUserNameChange}
                    placeholder="Username"
                    value={userName}
                />
            </div>
        );
    }
}
