import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, focus } from 'redux-form';

import './project-images.css';

export class ProjectImages extends React.Component {

   

    render() {
        let formError;
        if (this.props.error) {
            formError = (
                <li className='form-row'>
                    <div className='formError' aria-live='assertive'>
                        {this.props.error}
                    </div>
                </li>
            );
        }

        let images;
        if (this.props.images) {
            images = this.props.images.map((image, index) =>
                (
                    <figure key={index}>
                        <img src={image} className='project-image' alt='Knit sweater' />
                    </figure>
                )
            )
        }

        return (
            <section className='images-section'>
                {images}
                
                {formError}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    croppedImage: state.projectsReducer.croppedImage,
    croppedFile: state.projectsReducer.croppedFile
});


const ProjectImagesForm = reduxForm({
    form: 'projectImages',
    onSubmitFail: (errors, dispatch) => dispatch(focus('projectImages', Object.keys(errors)[0]))
})(ProjectImages);

export default connect(mapStateToProps)(ProjectImagesForm);
