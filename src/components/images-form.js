import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import { connect } from 'react-redux';
import { saveImage } from '../actions/projects';
import "react-image-crop/dist/ReactCrop.css";


class ImagesForm extends PureComponent {
  state = {
    src: null,
    crop: {
      x: 10,
      y: 10,
      aspect: 1,
      height: 80
    }
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = async (crop, pixelCrop) => {
    const croppedImageUrl = await this.getCroppedImg(
      this.imageRef,
      pixelCrop,
      "newFile.jpeg"
    );
    this.setState({ croppedImageUrl });
    this.props.dispatch(saveImage(croppedImageUrl))
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
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { croppedImageUrl } = this.state;

    return (
      <div className="crop">
        <div>
          <input type="file" onChange={this.onSelectFile} />
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
        {croppedImageUrl && <img alt="Crop" src={croppedImageUrl} />}
        
      </div>
    );
  }
}

export default connect()(ImagesForm);
