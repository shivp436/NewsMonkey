import React, { Component } from 'react';
import Loading from '../assets/Bouncing_ball.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-5'>
        <img src={Loading} alt='Loading' />
      </div>
    );
  }
}
