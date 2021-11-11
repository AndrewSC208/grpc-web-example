import React, {Component} from 'react';
import {Counter} from '../../common/counter';
import {Button} from "@blueprintjs/core";

// So the question that I have to have to ask myself is how do I want to 
// handle state? Since I am rendering a bunch of components do I want each component
// to have it's own state so that it knows how to render it's own form fields, or do I
// want to somehow pass a portion of the state down from the view? I don't want to hit the 
// store each time a change is made, I only want to update the store on a few differnet action
// (onConfirm, counterIncrement, counterDecrement).

// onConfirm => changes the name value
// onCounterCounterChange => consolidate the change in

// so I am going to make the counter a stateFull class component, that updates the input field with
// local state, then when I need to hit the network I will use functions that are passed down from 
// the parent. This should work, and I think will be faily optomized. I need do a bit of research 
// on this given that it's been a while since I have done form rendering with react. Once again
// that is why this project has been great for me since I am doing actually full stack work. :)

export default class CounterView extends Component {
  componentDidMount() {
    this.props.readCounter();
  }

  handleCounterCreate = (e) => {
    e.preventDefault()
    this.props.createCounter()
  }

  renderCounterList = (collection) => 
    Object.keys(collection).map((key) => 
      <Counter 
        counter={collection[key]} 
        key={key} 
        updateCounter={this.props.updateCounter} 
        deleteCounter={this.props.deleteCounter} />)

  render() {
    const {collection} = this.props.counter;
    return (
      // todo -> add a grid system blueprint does not come with one so it would be a good idea
      // to create one or import one to use
      <div>
        {/* TODO -> move this to the toolbar and only display it when on the counter section */}
        <Button 
          onClick={this.handleCounterCreate}
          className="createCounterBtn"
          intent="primary"
          text="Create Counter" />
        {this.renderCounterList(collection)}
      </div>

    );
  }
}
