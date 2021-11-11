import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditableText, H1, Button, Card, Elevation } from "@blueprintjs/core";

import './counter.css'

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = props.counter
    }
    
    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }

    handleUpdate = () => {
        this.props.updateCounter(this.state)
    }

    handleIncrement = (e) => {
        let {id, name, count} = this.state;
        e.preventDefault()
        count++;
        this.setState({
            count
        }, () => {
            this.props.updateCounter({ id, name, count })
        })
    }

    handleDelete = (e) => {
        const {id} = this.state;
        
        e.preventDefault()

        this.props.deleteCounter({id})
    }

    handleDecrement = (e) => {
        let { id, name, count } = this.state;
        e.preventDefault()
        count--;
        this.setState({
            count
        }, () => {
            this.props.updateCounter({ id, name, count })
        })
    }

    render() {
        let {name, count} = this.state;

        return (
            <Card interactive={true} elevation={Elevation.TWO} className="counter">
                <Button
                    icon="cross"
                    intent="danger"
                    className="deleteButton"
                    onClick={this.handleDelete} />

                <H1 className="center">
                    <EditableText
                        intent={"primary"}
                        maxLength={255}
                        value={name}
                        selectAllOnFocus={true}
                        onChange={(value) => this.handleChange("name", value)}
                        onConfirm={this.handleUpdate} />
                </H1>
                <div className="counterActions">
                    <Button
                        icon="remove"
                        intent="warning"
                        className="counterButton"
                        onClick={this.handleDecrement} />

                    <span className="counterValue">{count}</span>

                    <Button
                        icon="add"
                        intent="success"
                        className="counterButton"
                        onClick={this.handleIncrement} />


                </div>
            </Card>
        )
    }
}

Counter.propTypes = {
    counter: PropTypes.object.isRequired
};