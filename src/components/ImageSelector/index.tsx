import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';

const reader = new FileReader();

interface ImageSelectorProps {
  name: string,
  label: string
};

interface OwnState {
  img: any,
  error: string
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;

  > input {
    border: solid 2px #e4e4e4;
  }

  > input {
    border-radius: 5px;
    padding: 0 0.5em;
    margin: 0.5rem 0;
    height: 2rem;
    font-size: 1rem;
  }

  > img {
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
  }

  .red {
    color: #dc3545;
  }
`

class ImageSelector extends Component<ImageSelectorProps, OwnState> {
  constructor(props: ImageSelectorProps) {
    super(props);

    reader.onload = this.getImgData;

    this.state = {
      img: null,
      error: null
    };
  }

  getImgData = (event: ProgressEvent<FileReader>) => {
    this.setState({
      img: event.target.result,
      error: null
    });
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files: FileList = event.target.files;

    if (files.length === 1) {
      const img = files[0];
      if (img.type.match(/image.*/)) {
        reader.readAsDataURL(img);
      }
      else {
        this.setState({
          img: null,
          error: 'Not an image'
        });
      }
    }
    else {
      this.setState({
        img: null,
        error: 'Select only one image'
      });
    }
  };

  render = () => (
    <Label htmlFor={this.props.name}>
      {this.props.label}
      <input
        id={this.props.name}
        name={this.props.name}
        type='file'
        accept='image/*'
        onChange={this.onChange} />
      <img src={this.state.img} />
      <div className='red'>{this.state.error}</div>
    </Label>
  );
};

export default ImageSelector;