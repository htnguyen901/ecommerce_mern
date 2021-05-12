import './Navbar.css';
import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { isAuthenticated, logout } from '../helpers/auth';

const Navbar = ({click, history}) =>{

    const handleLogout = evt => {
        logout(() => {
            history.push('/signin');
        });
    };

    const cart = useSelector(state => state.cart);
    const {cartItems} =cart;

    const getCartCount = () => {
        return cartItems.reduce((qty,item) => qty + Number(item.qty),0);
    };

    return (
        <nav className="navbar">
            <Link to='/' className="navbar__logo">
                <h2>TAME</h2>
            </Link>

            <ul className="navbar__links">
                {!isAuthenticated() && (
                    <Fragment>
                        <li>
                            <Link to="/cart" className="cart__link">
                                <i className="fas fa-shopping-cart"></i>
                                <span>
                                    Cart
                                    <span className="cartlogo__badge">{getCartCount()}</span>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin">
                                Log In
                            </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && isAuthenticated().role === 0 && (
                    <Fragment>
                        <li>
                            <Link to="/cart" className="cart__link">
                                <i className="fas fa-shopping-cart"></i>
                                <span>
                                    Cart
                                    <span className="cartlogo__badge">{getCartCount()}</span>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && isAuthenticated().role === 1 && (
                    <Fragment>
                        {/* <li>
                            <Link to="/cart" className="cart__link">
                                <i className="fas fa-shopping-cart"></i>
                                <span>
                                    Cart
                                    <span className="cartlogo__badge">{getCartCount()}</span>
                                </span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/admin/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <Fragment>
                        <li>
                            <Link className='btn__logout' onClick={handleLogout}>
                                <button>
                                    Log Out
                                </button>
                            </Link>
                        </li>
                    </Fragment>
                )}    
            </ul>

            <div className="hamburger_menu" onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar);