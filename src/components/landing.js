import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import Footer from './footer';

import './landing.css';

export function Landing(props) {

    if (props.loggedIn) {
        return <Redirect to='/projects' />;
    }

    return (
        <main role='main' id='main-landing'>
            <div className='landing-container'>
                <section id='measurements'>
                    <div>
                        <h2 className='landing-title'>Measurements</h2>
                        <p>Use your measurements, or those of the lucky person you are making a sweater for,
                    to make adjustments and modifications to an existing pattern for personalized fit.</p>
                    </div>
                    <img className='landing-image' id='measurements-image' src='https://s3-us-west-1.amazonaws.com/tailored-knits-repository/mens-sweater.jpg' alt='Model in a well fitting sweater' />
                </section>
                <section id='specifications'>
                    <h2 className='landing-title'>Pattern Specifications</h2>
                    <p>Tailored Knit takes the gauge, stitch pattern, ease, and shape of the sweater
                        pattern into account when making adjustments so it will fit you better and maintain
                    the overall look wihtout losing the special details. </p>
                </section>
                <section id='modifications'>
                    <h2 className='landing-title'>Modifications</h2>
                    <p>Easily add length and width to keep the intended ease even when you are between sizes.
                    Adjust ease. Add bust, waist, and hip shaping.</p>
                </section>
                <img className='account-image' id='measurements-image' src='https://s3-us-west-1.amazonaws.com/tailored-knits-repository/designing-image.jpg' alt='Taking notes on your knit project' />
                <section id='account' className='account-section'>
                    <LoginForm />
                    <SignupForm />
                </section>
            </div>
            <Footer />
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(Landing);