import React from 'react';
import { connect } from 'react-redux';
import { imageSlide } from '../actions/projects';
import './project-images.css';

export class ProjectImages extends React.Component {

    goToNextSlide() {
        let currentIndex;
        let translateValue;
        if (this.props.currentIndex === this.props.images.length - 1) {
            currentIndex = 0;
            translateValue = 0;
            return this.props.dispatch(imageSlide({
                currentIndex,
                translateValue
            }))
        }
        currentIndex = this.props.currentIndex + 1;
        translateValue = this.props.translateValue + -(this.slideWidth());
        this.props.dispatch(imageSlide(currentIndex, translateValue));
    }

    goToPrevSlide() {
        let currentIndex;
        let translateValue;
        if (this.props.currentIndex === 0) {
            return;
        }
        currentIndex = this.props.currentIndex - 1;
        translateValue = this.props.translateValue + this.slideWidth();
        this.props.dispatch(imageSlide(currentIndex, translateValue));
    }

    slideWidth() {
        return document.querySelector('.slide').clientWidth
    }

    render() {
        let images;
        if (this.props.images) {
            images = this.props.images.map((image, index) =>

                (
                    <figure key={index} className='slide'>
                        <img src={image} className='project-image' alt='Knit sweater' />
                    </figure>
                )
            )
        }

        return (
            <section className='images-section slider'>
                <div className='slider-wrapper'
                    style={{
                        transform: `translate(${this.props.translateValue}px)`,
                        transition: 'transform ease-out 0.45s'
                    }}>
                    {images}
                </div>
                <div className='left arrow' onClick={() => this.goToPrevSlide()}>
                <i className="fas fa-angle-left"></i>
                </div>
                <div className='right arrow' onClick={() => this.goToNextSlide()}>
                <i className="fas fa-angle-right"></i>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    const images = state.projectsReducer.project.images;
    return {
        croppedImage: state.projectsReducer.croppedImage,
        croppedFile: state.projectsReducer.croppedFile,
        currentIndex: state.projectsReducer.currentIndex,
        translateValue: state.projectsReducer.translateValue,
        images
    }
};

export default connect(mapStateToProps)(ProjectImages);
