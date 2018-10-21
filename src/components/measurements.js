import React from 'react';

import MeasurementsForm from './measurements-form';




export default function Measurements(props) {


    //calculations - update values as form changes. Send info to server onchange? 
    // if (editing) {
    //     return (
    //         <MeasurementsForm type={this.props.type} />
    //     )
    // }

    // if(!props.content) {
    //     return (
    //         <div></div>
    //     )
    // }

    let measureKeys = {
		chest: true,
        waist: true,
        hips: true,
		upperArm: true,
		length: true,
		wrist: true
    };
	
	if (props.style === 'Set In' || props.type === 'User') {
		measureKeys.armhole = true;
	} else if (props.style === 'Raglan'){
		measureKeys.raglanDepth = true;
	} else {
		measureKeys.yokeDepth = true;
    }
    
    if (props.type !== 'User') {
        measureKeys.ease = true;
        measureKeys.gaugeRow = true;
        measureKeys.gaugeStitches = true;
        measureKeys.needles = true;
    }

    if (props.type === 'Pattern') {
        measureKeys.style = true;
    }

    if (props.type === 'Project') {
        measureKeys.notes = true;
    }
    
    let contentList = Object.keys(measureKeys).map((key, index) =>
        (
            <li key={index} className='list-row'>
               <p><span className='label'>{key}:</span><span className='value'> {props.content[key]}</span></p>
            </li>
        )
    )

    return (
        <div className={props.type + `measurements`}>
            <h2>{props.type} Measurements</h2>
            <ul className='list-wrapper'>
                {contentList}
                <li className='list-row button-row'>
                    <button className='update-button'>Update</button>
                </li>
            </ul>
        </div >
    )

}


