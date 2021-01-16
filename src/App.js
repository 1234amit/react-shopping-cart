import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Product from './components/Product';
import data from "./data.json";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    }
  }
  sortProducts = (event) =>{
    //imp
    const sort = event.target.value
    console.log(event.target.value)
    this.setState((state)=>({
        sort : sort,
        products: this.state.products.slice().sort((a,b)=>(
          sort === "lowest"?
          ((a.price > b.price)? 1:-1):
          sort === "highest"?
          ((a.price < b.price)? 1:-1):
          ((a._id > b._id)? 1:-1) 
        ))
    }))
  }
  filterProducts = (event) => {
    //imp
    console.log(event.target.value)
    if(event.target.value === ""){
      this.setState({ size: event.target.value , products : data.products });
    }else{
      this.setState({
        size : event.target.value,
        products: data.products.filter(
          (products) => products.availableSizes.indexOf(event.target.value)>=0
        ),
      }); 
    }
   
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filters count={this.state.products.length} size={this.state.size} sort={this.state.sort} 
              filterProducts={this.filterProducts} sortProducts={this.sortProducts} />
              <Product products = {this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
