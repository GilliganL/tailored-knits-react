import React from 'react';

import './stitches.css';

export default class Stitches extends React.Component {

    calculateGauge(measurement) {
        let rowKeys = ['length', 'armhole', 'raglanDepth', 'yokeDepth'];
        let stitches = 0;
        if (rowKeys.find(key => key === measurement)) {
            stitches = 2 * Math.round((this.props.content[measurement] * this.props.content.gaugeRow) / 2);

        } else {
            stitches = 2 * Math.round((this.props.content[measurement] * this.props.content.gaugeStitches) / 2);
        }
        if (!stitches) {
            stitches = '';
        }
        return stitches;
    }

    render() {

        let measureKeys = {
            chest: 'Chest',
            waist: 'Waist',
            hips: 'Hips',
            upperArm: 'Upper Arm',
            length: 'Length',
            wrist: 'Wrist'
        };

        if (this.props.style === 'Set In' || this.props.type === 'User') {
            measureKeys.armhole = 'Armhole';
        }

        if ((this.props.style === 'Raglan' || this.props.style === 'Yoke') && this.props.type !== 'User') {
            measureKeys.raglanDepth = 'Raglan Depth';
        }

        if (this.props.style === 'Yoke' && this.props.type !== 'User') {
            measureKeys.yokeDepth = 'Yoke Depth';
        }

        let stitchesList;

        stitchesList = Object.keys(measureKeys).map((key, index) => {
            let listItem;
            let itemValue;
            if (key) {
                itemValue = this.calculateGauge(key);
            }
            listItem = (
                <li key={index} className='list-row'>
                    <label className='label stitches-label'>{measureKeys[key]}:</label>
                    <p className='value'>{itemValue || ''}</p>
                </li>
            )
            return listItem;
        })

        return (
            <div className={this.props.type.toLowerCase() + `-stitches stitches-div`}>
                <ul className='list-wrapper stitches-list'>
                    <li className='list-row'>
                        <h3 className='stitches-title'>{this.props.type}</h3>
                    </li>
                    {stitchesList}
                </ul>
            </div >
        )
    }
}