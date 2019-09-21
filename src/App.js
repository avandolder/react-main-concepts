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
  }

  handleChange(e) {
    this.props.onTempChange(e.target.value);
  }

  render() {
    const temp = this.props.temp;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temp in {scaleNames[scale]}:</legend>
        <input
          value={temp}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temp: '', scale: 'c'};
  }

  handleCelsiusChange(temp) {
    this.setState({scale: 'c', temp});
  }

  handleFahrenheitChange(temp) {
    this.setState({scale: 'f', temp});
  }

  render() {
    const scale = this.state.scale;
    const temp = this.state.temp;
    const celsius = scale === 'f' ? tryConvert(temp, toCelsius) : temp;
    const fahrenheit = scale === 'c' ? tryConvert(temp, toFahrenheit) : temp;

    return (
      <div>
        <TempInput
          scale="c"
          temp={celsius}
          onTempChange={this.handleCelsiusChange} />
        <TempInput
          scale="f"
          temp={fahrenheit}
          onTempChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

class FilterableProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {filterText: '', isStockOnly: false};
  }

  render() {
    return (
      <div className="filterable-product-list">
        <SearchBar
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly} />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly} />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" value={this.props.filterText || 'Search...'} />
        <br />
        <label>
          <input type="checkbox" value={this.props.isStockOnly} />
          Only show products in stock
        </label>
      </form>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const regex = new RegExp(this.props.filterText, 'i');
    const filteredProducts = this.props.products.filter(({name}) => regex.test(name));
    const productsByCategory = filteredProducts.reduce((acc, p) => {
      if (acc.has(p.category)) {
        acc.get(p.category).push(p);
      } else {
        acc.set(p.category, [p]);
      }
      return acc;
    }, new Map());
        
    return (
      <div>
        <div className="product-name"><b>Name</b></div>
        <div className="product-price"><b>Price</b></div>
        <ul className="product-table-list">
          {[...productsByCategory.entries()].reduce((acc, [cat, ps]) => {
            acc.push(<ProductCategoryRow category={cat} key={cat} />);
            return acc.concat(ps.map((p) => <ProductRow product={p} key={p.name} />));
          }, [])}
        </ul>
      </div>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <li className="product-category">{this.props.category}</li>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const outOfStock = !this.props.product.stocked;

    return (
      <li>
        <div className={'product-name ' + (outOfStock ? 'product-out-of-stock' : '')}>
          {this.props.product.name}
        </div>
        <div className="product-price">
          {this.props.product.price}
        </div>
      </li>
    );
  }
}

class App extends React.Component {
  render() {
    const products = [
      {category: "X", price: "$1.99", stocked: false, name: "a"},
      {category: "X", price: "$1.99", stocked: true, name: "b"},
      {category: "Y", price: "$1.99", stocked: true, name: "c"},
    ];
    
    return (
      <div>
        <Clock />
        <Comment author="Adam" content="hello" />
        <NameForm />
        <Calculator />
        <FilterableProductList products={products} />
      </div>
    );
  }
}

export default App;
