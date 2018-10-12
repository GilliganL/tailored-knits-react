import React from 'react';
import MeasurementsForm from './measurements-form';

export default class Measurements extends React.Component {
    //fetch measurements

    render() {

        //map measurement cards, create card component

        return (
            <div className='measurements'>
            <h3>Measurements</h3>
            <ul className='cardContainer'>
                {/* {cards} */}
                <li className='add-card-wrapper'>
                    <MeasurementsForm />
                </li>


            </ul>

            </div>
        )
    }
}

//props fetch cards, userID