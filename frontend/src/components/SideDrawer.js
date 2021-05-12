import './SideDrawer.css'
import React, {Fragment} from 'react';
import {Link,withRouter } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { isAuthenticated, logout } from '../helpers/auth';

const SideDrawer = ({show,click, history}) =>{
    const sideDrawerClass = ['sidedrawer'];
    if (show){
        sideDrawerClass.push('show');
    }

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

    return <div className={sideDrawerClass.join(' ')}>
        <ul className='sidedrawer__links' onClick={click}>
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
    </div>;
};

export default withRouter(SideDrawer);