import React from 'react';
import Header from './header';
import Landing from './landing';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import Footer from './footer';

export default class Home extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <main role='main'>
                    <Landing />
                    <section className='account'>
                        <LoginForm />
                        <SignupForm />
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}