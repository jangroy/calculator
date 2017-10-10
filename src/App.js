import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// 1. what state is there?
//    - pressing button updates screen to button
// 2. when does it change?

class AutoShrinkingText extends React.Component {
  state = {
    scale: 1
  }
  componentDidUpdate() {
    const node = this.node
    const {offsetWidth} = node
    const parentWidth = node.offsetParent.offsetWidth
    const scale = offsetWidth / parentWidth

    if (scale > 1) {
      this.setState({
        scale: 1 / scale
      })
    } else if (this.state.scale !== 1){
      this.setState({
        scale: 1
      })
    }
  }

  render() {
    const { scale } = this.state

    return <div 
    {...this.props} 
    style={{ transform: 'scale(${scale}, ${scale})'}}
    ref={node => this.node = node}/> 
  }
}

class Calculator extends React.Component {
  state = {
    displayValue: '0',
    value: null,
    waitingForOperand: false,
    operator: null,
    percentBtn: false
  }

  // state changer
  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }

  inputDot() {
    const { displayValue, waitingForOperand } = this.state
    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }

  toggleSign() {
    const { displayValue } = this.state
    
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

  inputPercent() {
    const { displayValue, percentBtn } = this.state
    const value = parseFloat(displayValue)

    if (percentBtn == false) {
      this.setState({
        percentBtn: true,
        displayValue: String(value / 100)
      })
    } else {
      this.setState({
        percentBtn: false,
        displayValue: String(value * 100)
      })
     }
  }
  
  performOperation(nextOperator) {
    const { displayValue, operator, value } = this.state
    const nextValue = parseFloat(displayValue)
    
    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue
    }
    if(value == null) {
      // no previous value, hit an operator key.
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const currentValue = value || 0 
      const computedValue = operations[operator](currentValue, nextValue)

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator   
    })
  }

  reset() {
    const { value } = this.state
    
    this.setState({
      displayValue: '0',
      value: null,
      waitingForOperand: false,
      operator: null,
      percentBtn: false,
      
    })
  }

  render(){
    const { displayValue } = this.state

    return (
      <div className="calculator">
        <AutoShrinkingText className="calculator-display">{displayValue}</AutoShrinkingText>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div>
              <button className="keys func" onClick={() => this.reset()}>AC</button>
              <button className="keys func" onClick={() => this.toggleSign()}>±</button>
              <button className="keys func" onClick={() => this.inputPercent()}>%</button>
              <button className="keys orange" onClick={() => this.performOperation('/')}>÷</button>
            </div>
            <div>
              <button className="keys" onClick={() => this.inputDigit(7)}>7</button>
              <button className="keys" onClick={() => this.inputDigit(8)}>8</button>
              <button className="keys" onClick={() => this.inputDigit(9)}>9</button>
              <button className="keys orange" onClick={() => this.performOperation('*')}>x</button>
              <button className="keys" onClick={() => this.inputDigit(4)}>4</button>
              <button className="keys" onClick={() => this.inputDigit(5)}>5</button>
              <button className="keys" onClick={() => this.inputDigit(6)}>6</button>
              <button className="keys orange" onClick={() => this.performOperation('-')}>-</button>
              <button className="keys" onClick={() => this.inputDigit(1)}>1</button>
              <button className="keys" onClick={() => this.inputDigit(2)}>2</button>
              <button className="keys" onClick={() => this.inputDigit(3)}>3</button>
              <button className="keys orange" onClick={() => this.performOperation('+')}>+</button>
              <button className="keys zero-key" onClick={() => this.inputDigit(0)}>0</button>
              <button className="keys" onClick={() => this.inputDot()}>.</button>
              <button className="keys orange" onClick={() => this.performOperation('=')}>=</button>
            </div>
          </div>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
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
