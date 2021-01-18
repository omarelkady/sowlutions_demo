import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import axios from 'axios';
import ModalImage from "react-modal-image";
import Loader from 'react-loader-spinner'

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchTerm: '',
      loading: true
    };
    this.searchTerm = this.search.bind(this);
  }

  componentWillMount() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': '446a6828200604377695aa034cf57e36',
      'UserAddressId': 2378,
      'StoreId': 1
    }

    axios.get('https://app.markitworld.com/api/v2/user/products', {
      headers: headers
    })
      .then((response) => {
        this.state.loading = false;
        this.setState({ products: response.data.data.products })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  search(e) {
    // this.state.searchTerm = 
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  render() {
    return (
      <div className="container">
        <div>
          {this.state.loading ? ( 
            <Loader className="loader"
            type="Rings"
            color="#00BFFF"
            height={100}
            width={100}
         />
          ) : null}
        </div>
        <header>
          <h1>Sowlutions Task</h1>
        </header>
        <input className="search-box" placeholder="Search by title" onKeyUp={(e) => this.searchTerm(e)} type="text"></input>
        <ul className="collapse-able">
          {this.state.products.filter(product => {
            return product.title.toLowerCase().indexOf(this.state.searchTerm) > -1;
          }).map((product) => {
            return (<li>
              <div>
                <div className="image-thumbnail">
              {product.images.map((image) => {
                 return <ModalImage
                 small={image.thumbnail}
                 large={image.large}
                 alt="image"
               />;
                })}
                </div>
                <h3>{product.title}</h3>
                <b>Brand Name: </b>{product.brand_name}<br />
                <b>Price: </b>{product.price}<br />
                <b>Status: </b>{product.status}<br />
                
              </div>
            </li>
            );
          })}
        </ul>

      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
