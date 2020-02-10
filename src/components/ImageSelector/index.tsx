import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';

const reader = new FileReader();

export interface ImageSelectorProps {
  name: string,
  label: string,
  form?: {
    [key: string]: string | number
  },
  setNewFormState?: (field: string, newValue: string | number) => void
};

interface OwnState {
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
      error: null
    };
  }

  getImgData = (event: ProgressEvent<FileReader>) => {
    this.props.setNewFormState(
      this.props.name,
      event.target.result.toString()
    );
    this.setState({
      error: null
    });
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files: FileList = event.target.files;

    if (files.length === 1) {
      const img: File = files[0];
      if (img.type.match(/image.*/)) {
        reader.readAsDataURL(img);
      }
      else {
        this.props.setNewFormState(
          this.props.name,
          null
        );
        this.setState({
          error: 'Not an image'
        });
      }
    }
    else {
      this.props.setNewFormState(
        this.props.name,
        null
      );
      this.setState({
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
        onChange={event => this.onChange(event)} />
      <img src={this.props.form[this.props.name].toString()} />
      <div className='red'>{this.state.error}</div>
    </Label>
  );
};

export default ImageSelector;