import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class Landing extends Component {
    render() {
        return (
            <div>
            <Navbar />
            <div className="landing">
            <div className="dark-overlay landing-inner text-light">
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">Shopping List Prediction System</h1>
                    <p className="lead">Makes Shopping Easy !!</p>
                    <hr />
                    <a href="/register" className="btn btn-lg btn-info mr-2">Sign Up</a>
                    <a href="/login" className="btn btn-lg btn-info mr-2">Login</a>
                </div>
                </div>
            </div>
            </div>
            </div>
            <Footer />
            </div>
        );
    }
}

export default Landing;