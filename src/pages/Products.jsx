import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Header from '../layout/Header';
import { getProducts } from '../api/api';
import List from '../component/common/List';
import Product from '../component/derived/product/Product';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      pageNo: 1,
      itemsPerPage: 12,
      loading: true,
      error: false,
    };
  }

  componentDidMount = () => {
    this.loadProducts();
  }

  loadProducts = (pageNo = 1) => {
    const { itemsPerPage, products } = this.state;
    getProducts(
      pageNo,
      itemsPerPage,
    ).then((res) => {
      this.setState({
        loading: false,
        products: pageNo === 1
          ? res.data
          : {
            ...res.data,
            products: [
              ...products.products,
              ...res.data.products,
            ],
          },
        pageNo,
      });
    }).catch(() => {
      this.setState({
        loading: false,
        error: true,
      });
    });
  }

  updateProduct = (index, quantity) => {
    const { products } = this.state;
    const newProducts = { ...products };
    newProducts.products[index] = {
      ...newProducts.products[index],
      cartQuantity: quantity,
    };
    this.setState({
      products: newProducts,
    });
  }

  handleLazyLoad = (e) => {
    const {
      loading, products, pageNo,
    } = this.state;
    const {
      offsetHeight, scrollHeight, scrollTop,
    } = e.target;
    if (
      (scrollHeight - scrollTop < offsetHeight + 10)
      && (!loading
      && (!!products
      && products.total > products.products.length
      ))) {
      this.loadProducts(
        pageNo + 1,
      );
    }
  }

  render() {
    const {
      loading, error, products,
    } = this.state;

    let totalCartItems = 0;
    if (products) {
      for (let i = 0; i < products.products.length; i += 1) {
        totalCartItems += products.products[i].cartQuantity;
      }
    }

    if (error) {
      return null;
    }

    return (
      <div
        className="main-container bg-white"
      >
        <Header
          {...this.props}
          isProductPage
          totalCartItems={totalCartItems}
        />
        {
          !!products
          && (
            <div
              className="flex-grow-1 overflow-y px-6 py-2"
              onScroll={this.handleLazyLoad}
            >
              <List
                idField="id"
                list={products.products}
                Component={Product}
                updateProduct={this.updateProduct}
              />
            </div>
          )
        }
        {
          loading && (
            <Row
              className="mx-0 justify-content-center p-2"
            >
              <Spinner
                animation="border"
              />
            </Row>
          )
        }
      </div>
    );
  }
}

export default Products;
