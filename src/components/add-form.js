import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { required, nonEmpty, length, isTrimmed, matches, email } from '../validators';

export default function AddFrom(props) {

    return (
        <div>
            <p>Project card</p>
        
            <button>Edit</button>
        </div>
    )
}

//one card with add card form

//default props