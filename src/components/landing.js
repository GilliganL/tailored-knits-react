import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './login-form';
import SignupForm from './signup-form';

export function Landing(props) {

    if(props.loggedIn) {
        return <Redirect to='/projects' />;
    }

    return (
        <div>
            <section>
                <h2>Measurements</h2>
                <p>Use your measurements, or those of the lucky person you are making a sweater for,
            to make adjustments and modifications to an existing pattern for personalized fit.</p>
            </section>
            <section>
                <h2>Pattern Specifications</h2>
                <p>Tailored Knit takes the gauge, stitch pattern, ease, and shape of the sweater
                    pattern into account when making adjustments so it will fit you better and maintain
            the overall look wihtout losing the special details. </p>
            </section>
            <section>
                <h2>Modifications</h2>
                <p>Easily add length and width to keep the intended ease even when you are between sizes.
            Adjust ease. Add bust, waist, and hip shaping.</p>
            </section>
            <section>
                <h2>Connect via Ravelry</h2>
                <p>Use your Ravelry account to create your Tailored Knits account.</p>
            </section>
            <section className='account-section'>
                <LoginForm />
                <SignupForm />
            </section>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(Landing);