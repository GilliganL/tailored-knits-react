import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { saveImage } from '../actions/projects';
import "react-image-crop/dist/ReactCrop.css";

import './images-form.css';

class ImagesForm extends PureComponent {
  state = {
    src: null,
    buttonClass: 'hidden',
    labelClass: '',
    crop: {
      x: 10,
      y: 10
    }
  };

  onClick(e) {
    this.props.saveFile(e);
    this.setState({
      croppedImageUrl: '',
      buttonClass: 'hidden',
      labelClass: '',
      src: null,
      crop: {
        x: 10,
        y: 10
      }
    });
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({
          src: reader.result,
          buttonClass: '',
          labelClass: 'hidden'
        })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = async (crop, pixelCrop) => {
    const fileName = uuidv4();
    const croppedImageResponse = await this.getCroppedImg(
      this.imageRef,
      pixelCrop,
      fileName
    );
    const croppedImageUrl = croppedImageResponse.url;
    this.setState({ croppedImageUrl });
    this.props.dispatch(saveImage(croppedImageUrl, croppedImageResponse.file))
  };

  onCropChange = crop => {
    this.setState({
      crop
    })
  };

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        file.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(file);
        const responseObject = {
          url: this.fileUrl,
          file
        }
        resolve(responseObject);
      }, "image/jpeg");
    });
  }

  render() {
    const { croppedImageUrl } = this.state;
    return (
      <div className="crop">
        <div className='file-container'>
          <input type="file" className='uploadPhoto' id='uploadPhoto' name='uploadPhoto' tabIndex='-1' accept='image/*' onChange={this.onSelectFile} />
          <label role='button' className={this.state.labelClass} tabIndex='0' htmlFor='uploadPhoto' id='upload-label' aria-live='assertive'><span id='upload-span'>Upload a Photo</span></label>
        </div>
        {this.state.src && (
          <ReactCrop
            src={this.state.src}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && <img id='crop-preview' alt="Crop" src={croppedImageUrl} />}
        <button type='button ' className={this.state.buttonClass} id='save-image' onClick={(e) => this.onClick(e)}>Save</button>
      </div>
    );
  }
}

export default connect()(ImagesForm);
