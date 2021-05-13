import React, { useState, useEffect } from "react";
import {Link, useHistory } from 'react-router-dom';
import {showErrorMsg} from '../helpers/message';
import {showLoading} from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';

//Validator
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';

import { signin } from '../api/auth';

const Signin = () => {

    let history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        }
        else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/');
        }
    }, [history]);

    const[formData, setFormData] = useState({
        email:'',
        password: '',
        errorMsg: false,
        loading: false,
    });

    const {
        email,
        password,
        errorMsg,
        loading,
    } = formData;

    const handleChange = evt => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: ''
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        // client-side validation

        if ( isEmpty(email) | isEmpty(password)) {
            setFormData({
                ...formData, errorMsg: 'All fields are required',
            })
        }
        else if (!isEmail(email)) {
            setFormData({
                ...formData, errorMsg: 'Invalid email',
            })
        }
        else {
            const {email,password} = formData;
            const data = {email,password};

            setFormData({...formData, loading: true});

            signin(data)
                .then(response => {
                    setAuthentication(response.data.token, response.data.user);

                    if (isAuthenticated() && isAuthenticated().role === 1) {
                        console.log('Redirecting to Admin dashboard');
                        history.push('/admin/dashboard');
                    }
                    else {
                        console.log('Redirecting to User dashboard');
                        history.push('/');
                    }
                })
                .catch(err => {
                    console.log('signin api function error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    })
                });
        }
    };

    //View
    const showSigninForm = () => (

        <form className='signin-form' onSubmit={handleSubmit}>
            <h3 className='signup-in-label'>Log In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" name='email' value={email} className="form-control" placeholder="Enter email" onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" name='password' value={password} className="form-control" placeholder="Enter password" onChange={handleChange}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Log In</button>
            <p className="forgot-password text-right">
                Don't have an account? <Link to='/signup'>Register here</Link>
            </p>
        </form>
    );
        
    //Render
    return (
        <div className='signin-container'>
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && <div className='text-center pb-4'> {showLoading()} </div>}
            {showSigninForm()}
        </div>
    );

}

export default Signin;