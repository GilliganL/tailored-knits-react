import React from 'react';

import MeasurementsForm from './measurements-form';




export default function Measurements(props) {


    //calculations - update values as form changes. Send info to server onchange? 
    // if (editing) {
    //     return (
    //         <MeasurementsForm type={this.props.type} />
    //     )
    // }

    if(!props.content) {
        return (
            <div></div>
        )
    }
    let measureKeys = {
        waist: true,
        chest: true
    };
    
    let keys = Object.keys(props.content).filter(k => k in measureKeys);
    
    let contentList = keys.map((key, index) =>
        (
            <li key={index} className='list-row'>
                <p className='list-label'>{key}</p>
                <p className='list-value'>{props.content[key]}</p>
            </li>
        )
    )

    return (
        <div className={props.type} measurements >
            <h2>{props.type} Measurements</h2>
            <ul className='list-wrapper'>
                {contentList}
                <li className='list-row'>
                    <button>Update</button>
                </li>
            </ul>
        </div >
    )

}


