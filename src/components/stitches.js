import React from 'react';

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
            wrist: 'Wrist',
            armhole: 'Armhole',
            raglanDepth: 'Raglan Depth',
            yokeDepth: 'Yoke Depth'
        };

        let stitchesList;

        // let toCalculate = Object.keys(measureKeys).filter(key => !key.includes('gauge') && key !== 'ease')

        stitchesList = Object.keys(measureKeys).map((key, index) => {
            let listItem;
            if (this.props.content[key]) {
                listItem = (
                    <li key={index} className='list-row'>
                        <label className='label stitches-label'>{measureKeys[key]}:</label>
                        <p className='value'>{this.calculateGauge(key)}</p>
                    </li>
                )
            }
            return listItem;
        })

        return (
            <div className={this.props.type.toLowerCase() + `-measurements measurements-div`}>
                <ul className='list-wrapper stitches-list'>
                    <h3 className='stitches-title'>{this.props.type} Stitches</h3>
                    {stitchesList}
                </ul>
            </div >
        )
    }
}