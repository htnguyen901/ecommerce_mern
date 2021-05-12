import React, {useState, useEffect} from 'react';
import './Signup-in.css';
import {Link, useHistory} from 'react-router-dom';

//Validator
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';

//Message
import {showErrorMsg, showSuccessMsg} from '../helpers/message';
import {showLoading} from '../helpers/loading';
import { isAuthenticated } from '../helpers/auth';

//API
import {signup} from '../api/auth';


const Signup = () => {

    let history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        }
        else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/user/dashboard');
        }
    }, [history]);

    const[formData, setFormData] = useState({
        username:'',
        email:'',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        loading: false
    })

    const {username, 
        email,
        password,
        password2,
        successMsg,
        errorMsg,
        loading
    } = formData;

    // Event Handlers

    const handleChange = evt => {
        //console.log(evt);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: ''
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        // client-side validation

        if (isEmpty(username) | isEmpty(email) | isEmpty(password) | isEmpty(password2)) {
            setFormData({
                ...formData, errorMsg: 'All fields are required',
            })
        }
        else if (!isEmail(email)) {
            setFormData({
                ...formData, errorMsg: 'Invalid email',
            })
        }
        else if (!equals(password, password2)) {
            setFormData({
                ...formData, errorMsg: 'Passwords do not match',
            })
        }
        else {
            const {username,email,password} = formData;
            const data = {username,email,password};

            setFormData({...formData, loading: true});

            signup(data)
                .then((response) => {
                    console.log('Axios signup success: ', response);
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        loading: false,
                        successMsg:  response.data.successMessage
                    })
                })
                .catch ((err) => {
                    console.log('Axios signup error: ', err);
                    setFormData({...formData, loading: false, errorMsg: err.response.data.errorMessage});
                });
        }
    };

    // View

    const showSignupForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
            <h3 className='signup-in-label'>Sign Up</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" name ='username' value = {username} className="form-control" placeholder="Username" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" name ='email' value = {email} className="form-control" placeholder="Enter email" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" name ='password' value = {password} className="form-control" placeholder="Password" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Re-enter Password</label>
                <input type="password" name ='password2' value = {password2} className="form-control" placeholder="Confirm password" onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <Link to ='/signin'>Sign in?</Link>
            </p>
        </form>
        
    );
    
    // Render
    return (
        <div className='signup-container'>
            {successMsg && showSuccessMsg(successMsg)} 
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && <div className='text-center pb-4'> {showLoading()} </div>}
            {showSignupForm()}
            {/* {JSON.stringify(formData)} */}
        </div>
    );

};

export default Signup;