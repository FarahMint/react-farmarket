import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.detailProduct;

          return (
            <div className="container py-5">
              {/* title */}
              <div className="col-10 mx-auto text-center text-blue my-5">
                <h1>{title}</h1>
              </div>
              {/* end title */}

              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <img src={img} alt={title} className="img-fluid" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>vegetable:{title}</h2>
                  <h4 className="text-title text-muted mb-2 mt-3 text-uppercase">
                    produced by:{company}
                  </h4>

                  <h4 className="text-blue">
                    price <span>$</span>
                    {price}
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* button */}

                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>

                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                  {/* end button */}
                </div>
              </div>
              {/* end product info */}
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
