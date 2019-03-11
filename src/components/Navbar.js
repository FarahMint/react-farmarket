import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

// Style
import styled from "styled-components";
import { ButtonContainer } from "./Button";
export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-0">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand w-50" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Products
            </Link>
          </li>
        </ul>

        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus">my cart</i>
            </span>
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}
const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
