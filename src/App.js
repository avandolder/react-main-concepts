import React from 'react';
import logo from './logo.svg';
import './App.css';

class Comment extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.author}</div>
        <div>{this.props.content}</div>
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
}

function toCelsius(temp) {
  return (temp - 32) * 5 / 9;
}

function toFahrenheit(temp) {
  return (temp * 9 / 5) + 32;
}

function tryConvert(temp, conv) {
  const input = parseFloat(temp);
  if (Number.isNaN(input)) {
    return '';
  }

  const output = conv(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TempInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temp: ''};
  }

  handleChange(e) {
    this.setState({temp: e.target.value});
  }

  render() {
    const temp = this.state.temp;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temp in {scaleNames[scale]}:</legend>
        <input
          value={temp}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temp)} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TempInput scale="c" />
        <TempInput scale="f" />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Clock />
        <Comment author="Adam" content="hello" />
        <NameForm />
        <Calculator />
      </div>
    );
  }
}

export default App;
