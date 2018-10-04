import React from 'react';

import LoginForm from './login-form';
import SignupForm from './signup-form';
import Footer from './footer';

export default function Landing(props) {
    return (
        <div>
            <header> 
            <div>
                <h1>Tailored Knits</h1> 
                <p>Modify sweater patterns for a personalized fit with the help of Tailored Knits.</p>
                {/* make a <Link? */}
                <button>View Demo</button>
            </div>
            </header>
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
            <section className='account'>
                <LoginForm />
                <SignupForm />
            </section>
            <Footer />
        </div>
    );
}