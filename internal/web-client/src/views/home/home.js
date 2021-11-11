import React, {Component} from 'react';
import {Title} from '../../common/title';

export default class HomeView extends Component {
  render() {
    return (
      <div>
        <Title text="Home" />
        
        <p>Click on the counter to go to the counter page</p>
      </div>
    );
  }
}