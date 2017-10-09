import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

// 1. what state is there?
//    - pressing button updates screen to button
// 2. when does it change?

class Calculator extends React.Component {
  state = {
    displayValue: '0',
    value1: 0,
    value2: 0
  }

  // state changer
  inputDigit(digit) {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue === '0' ? String(digit) : displayValue + digit
    })
  }
  
  add(digit) {
    const { displayValue } = this.state
    const { value1 } = this.state
    const { value2 } = this.state
    this.setState({
      value1: value1 === 0 ? parseInt(digit) : value1 + parseInt(displayValue),
      displayValue: '0'
    })
  }
  
  equal(digit) {
    const { displayValue } = this.state
    const { value1 } = this.state
    const { value2 } = this.state
    
    this.setState({
      value2: value1 + parseInt(displayValue),
      displayValue: value2,
    })

  }

  reset() {
    const { displayValue } = this.state
    const { value1 } = this.state
    const { value2 } = this.state
    
    this.setState({
      displayValue: '0',
      value1: 0,
      value2: 0
    })
  }

  render(){
    const { displayValue } = this.state
    const { value1 } = this.state
    const { value2 } = this.state

    return (
      <div>
        <div className="divStyle">
          {displayValue}
        </div>

        <button onClick={() => this.inputDigit(0)}>0</button>
        <button onClick={() => this.inputDigit(1)}>1</button>
        <button onClick={() => this.inputDigit(2)}>2</button>
        <button onClick={() => this.inputDigit(3)}>3</button>
        <button onClick={() => this.inputDigit(4)}>4</button>
        <button onClick={() => this.inputDigit(5)}>5</button>
        <button onClick={() => this.inputDigit(6)}>6</button>
        <button onClick={() => this.inputDigit(7)}>7</button>
        <button onClick={() => this.inputDigit(8)}>8</button>
        <button onClick={() => this.inputDigit(9)}>9</button>
        <button onClick={() => this.reset()}>reset</button>
        <button onClick={() => this.add(displayValue)}>+</button>
        <button onClick={() => this.equal(displayValue)}>=</button>
        
        <p>displayValue: {displayValue}</p>
        <p>value1: {value1}</p>
        <p>value2: {value2}</p>
      
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
       <Calculator />
      </div>
    );
  }
}

export default App;
