import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

// context api comes directly from react
// need only to create a new ctxt object
const ProductContext = React.createContext();
// ctxt comes with 2 components Provider & Consumer

// Provider -> provides info for all the app- so set up provider on top  of app and whenever we want to use the info we use consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    // cart: storeProducts,
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    // 1rst create empty arr
    let products = [];
    // loop through all arr that I have
    storeProducts.forEach(item => {
      // each item is goin to be an object
      // assign val from that  obj and copy that
      // copy the val no ref issue anymore
      const singleItem = { ...item };

      // grab all val from prod as we loop through
      // and add single item destructured above
      products = [...products, singleItem];
    });

    this.setState(() => {
      return { products };
    });
  };

  // utility method to get id
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        detailProduct: product
      };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      prevState => {
        return {
          products: tempProducts,
          cart: [...prevState.cart, product]
        };
      },
      () => {
        this.addTotal();
      }
    );
  };

  // MODAL

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true
      };
    });
  };
  closeModal = () => {
    this.setState(prevState => {
      return {
        modalOpen: !prevState.modalOpen
      };
    });
  };

  increment = id => {
    // console.log(`increment`);
    let tempCart = [...this.state.cart];
    const selectedItem = tempCart.find(item => item.id === id);

    // need specific index of item
    const index = tempCart.indexOf(selectedItem);
    // assign this item to prod var to get access to specific product
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        // calculate right away th value
        this.addTotal();
      }
    );
  };

  decrement = id => {
    // console.log(`decrement`);
    let tempCart = [...this.state.cart];
    const selectedItem = tempCart.find(item => item.id === id);
    // need specific index of item
    const index = tempCart.indexOf(selectedItem);
    // assign this item to prod var to get access to specific product
    const product = tempCart[index];
    // do decrementation

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.count = product.count - 1;
      product.total = product.count * product.price;
    }
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        // calculate right away th value
        this.addTotal();
      }
    );
  };

  removeItem = id => {
    // console.log(`remove item`);
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    // filter return only item that does not match id
    tempCart = tempCart.filter(item => item.id !== id);

    // Look for index
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotal());
  };

  clearCart = () => {
    console.log(`clear cart`);
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        // give new copy of all objects
        //  all modified obj set back to default
        this.setProducts();
        this.addTotal();
      }
    );
  };

  addTotal = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    // tax 10%
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
