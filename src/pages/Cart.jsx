import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col, Container, Row, Spinner, Table,
} from 'react-bootstrap';
import { cart, getCartItems } from '../api/api';
import Header from '../layout/Header';
import CartItem from '../layout/cart/CartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: null,
      loading: true,
      error: false,
    };
  }

  componentDidMount = () => {
    this.loadCartItems();
  }

  loadCartItems = () => {
    getCartItems()
      .then((res) => {
        this.setState({
          loading: false,
          cartItems: res.data,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  handleCartItem = (index, productId, quantity) => {
    cart(
      productId, quantity,
    ).then(() => {
      this.setState((state) => {
        const cartItems = [...state.cartItems];
        if (quantity) {
          cartItems[index].cartQuantity = quantity;
        } else {
          cartItems.splice(index, 1);
        }
        return {
          cartItems,
        };
      });
    }).catch(() => {});
  }

  clearCart = () => {
    const { cartItems } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    const cartCalls = [];
    for (let i = 0; i < cartItems.length; i += 1) {
      cartCalls.push(cart(
        cartItems[i].id,
        0,
      ));
    }
    Promise.all(cartCalls)
      .then(() => {
        history.push('/');
      });
  }

  render() {
    const { history } = this.props;
    const { loading, error, cartItems } = this.state;

    let totalCartItems = 0;
    let totalOrderWorth = 0;
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i += 1) {
        totalCartItems += cartItems[i].cartQuantity;
        totalOrderWorth += cartItems[i].cartQuantity * cartItems[i].price;
      }
    }

    return (
      <div
        className="main-container"
      >
        <Header
          history={history}
        />
        {
          loading && (
          <Row
            className="mx-0 justify-content-center p-4"
          >
            <Spinner
              animation="border"
            />
          </Row>
          )
        }
        {
          error && (
            null
          )
        }
        {
           !loading && !error && (
           <Container
             fluid
             className="h-100"
           >
             <Row
               className="h-100"
             >
               <Col
                 xs={18}
                 className="bg-white"
               >
                 <Row
                   className="flex-column h-100"
                 >
                   <Col
                     className="flex-grow-0 py-2"
                   >
                     <Row
                       className="align-items-center"
                     >
                       <Col
                         xs="auto"
                       >
                         <b>
                           Shopping Cart
                         </b>
                         <span
                           className="fs-5 text-medium"
                         >
                           {`(${totalCartItems} ${totalCartItems > 1
                             ? 'Items' : 'Item'})`}
                         </span>
                       </Col>
                       <Col
                         xs="auto"
                         className="px-0 cursor-pointer text-link fs-5"
                         onClick={this.clearCart}
                       >
                         Clear Cart
                       </Col>
                     </Row>
                   </Col>
                   <Col
                     className="flex-grow-1 px-0 overflow-y"
                   >
                     <Table
                       responsive
                       className="fs-5"
                     >
                       <thead
                         className="bg-light"
                       >
                         <tr>
                           <th>
                             Item Details
                           </th>
                           <th>
                             Quantity
                           </th>
                           <th>
                             Rate
                           </th>
                           <th>
                             Amount
                           </th>
                         </tr>
                       </thead>
                       <tbody>
                         {cartItems.map((item, index) => (
                           <CartItem
                             key={item.id}
                             index={index}
                             item={item}
                             handleCartItem={this.handleCartItem}
                           />
                         ))}
                       </tbody>
                     </Table>
                   </Col>
                   <Col
                     className="flex-grow-0 py-2 border-top"
                   >
                     <Button
                       variant="outline-primary-dark"
                       onClick={() => {
                         history.push('/');
                       }}
                     >
                       {'< Continue Shopping'}
                     </Button>
                   </Col>
                 </Row>
               </Col>
               <Col
                 xs={6}
                 className="pr-0"
               >
                 <div
                   className="bg-white p-2 fs-5"
                 >
                   <Row
                     className="mx-0 py-2 align-items-center"
                   >
                     <Col
                       className="pl-0 text-medium"
                     >
                       Order Worth
                     </Col>
                     <Col
                       xs="auto"
                       className="pr-0"
                     >
                       {`₹${totalOrderWorth}`}
                     </Col>
                   </Row>
                   <Row
                     className="mx-0 mb-6 py-2 align-items-center border-top"
                   >
                     <Col
                       className="pl-0 text-medium"
                     >
                       <b>
                         Amount Payable
                       </b>
                     </Col>
                     <Col
                       xs="auto"
                       className="pr-0"
                     >
                       {`₹${totalOrderWorth}`}
                     </Col>
                   </Row>
                   <div
                     className="text-center pt-4"
                   >
                     <Button
                       variant="primary-dark"
                       className="px-5"
                     >
                       Checkout
                     </Button>
                   </div>
                 </div>
               </Col>
             </Row>
           </Container>
           )
        }
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Cart;
