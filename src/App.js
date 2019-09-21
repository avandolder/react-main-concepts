import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function Comment({author, content}) {
  return (
    <div>
      <div>{author}</div>
      <div>{content}</div>
    </div>
  );
}

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTimeout(
      () => setDate(new Date()),
      1000,
    );
  });

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function handleSubmit(event, value) {
  alert('A name was submitted: ' + value);
  event.preventDefault();
}

function NameForm() {
  const [value, setValue] = useState('');

  return (
    <form onSubmit={e => handleSubmit(e, value)}>
      <label>
        Name:
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
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

function TempInput({scale, temp, onTempChange}) {
  return (
    <fieldset>
      <legend>Enter temp in {scaleNames[scale]}:</legend>
      <input
        value={temp}
        onChange={e => onTempChange(e.target.value)} />
    </fieldset>
  );
}

function Calculator() {
  const [scale, setScale] = useState('c');
  const [temp, setTemp] = useState('');
  const celsius = scale === 'f' ? tryConvert(temp, toCelsius) : temp;
  const fahrenheit = scale === 'c' ? tryConvert(temp, toFahrenheit) : temp;

  return (
    <div>
      <TempInput
        scale="c"
        temp={celsius}
        onTempChange={(temp) => {setScale('c'); setTemp(temp);}} />
      <TempInput
        scale="f"
        temp={fahrenheit}
        onTempChange={(temp) => {setScale('f'); setTemp(temp);}} />
      <BoilingVerdict
        celsius={parseFloat(celsius)} />
    </div>
  );
}

function FilterableProductList({products}) {
  const [filterText, setFilterText] = useState('');
  const [isStockOnly, setIsStockOnly] = useState(false);

  return (
    <div className="filterable-product-list">
      <SearchBar
        filterText={filterText}
        isStockOnly={isStockOnly}
        setFilterText={setFilterText}
        setIsStockOnly={setIsStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        isStockOnly={isStockOnly} />
    </div>
  );
}

function SearchBar({filterText, isStockOnly, setFilterText, setIsStockOnly}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={e => setFilterText(e.target.value)} />
      <br />
      <label>
        <input
          type="checkbox"
          checked={isStockOnly}
          onChange={e => setIsStockOnly(e.target.checked)} />
        Only show products in stock
      </label>
    </form>
  );
}

function ProductTable(props) {
  const regex = new RegExp(props.filterText, 'i');
  const filteredProducts = props.products.filter(({name, stocked}) =>
    regex.test(name) && (props.isStockOnly ? stocked : true)
  );
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

function ProductCategoryRow({category}) { 
  return (
    <li className="product-category">{category}</li>
  );
}

function ProductRow({product}) {
  const outOfStock = !product.stocked;

  return (
    <li>
      <div className={'product-name ' + (outOfStock ? 'product-out-of-stock' : '')}>
        {product.name}
      </div>
      <div className="product-price">
        {product.price}
      </div>
    </li>
  );
}

function App() {
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

export default App;
