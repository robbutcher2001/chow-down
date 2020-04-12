import React, { Component, ChangeEvent } from 'react';
import ImageResizer from 'react-image-file-resizer';

import styled from 'styled-components';

import UnknownImage from '../UnknownImage';
import { Fields, FieldValidations } from '../Form';

const reader = new FileReader();

export interface ImageSelectorProps {
  name: string,
  label: string,
  validator: (files: FileList) => boolean,
  form?: Fields,
  validFields?: FieldValidations,
  setNewFormState?: (field: string, newValue: string) => void,
  setValidationState?: (field: string, isValid?: boolean) => void
};

interface OwnState {
  error: string
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`

class ImageSelector extends Component<ImageSelectorProps, OwnState> {
  constructor(props: ImageSelectorProps) {
    super(props);

    reader.onload = this.getImgData;

    this.state = {
      error: null
    };
  };

  componentDidMount = () => this.props.setValidationState(this.props.name);

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
      if (img.type.match(/image\/(jpeg|png)/)) {
        ImageResizer.imageFileResizer(
          img,
          500,
          500,
          img.type.substring(6),
          100,
          0,
          (uri: Blob) => reader.readAsDataURL(uri),
          'blob'
        );
      }
      else {
        this.props.setNewFormState(
          this.props.name,
          null
        );
        this.setState({
          error: 'Image uploads limited to PNG or JPEG images only'
        });
      }
    }
    else {
      this.props.setNewFormState(
        this.props.name,
        null
      );
      this.setState({
        error: null
      });
    }

    this.props.setValidationState(
      this.props.name,
      this.props.validator(files)
    );
  };

  render = () => (
    <Label
      htmlFor={this.props.name}
      className={this.props.validFields[this.props.name] === false ? 'red' : undefined}
    >
      {this.props.label}
      <input
        id={this.props.name}
        name={this.props.name}
        type='file'
        accept='image/jpeg,image/png'
        hidden
        onChange={event => this.onChange(event)}
      />
      {this.props.form[this.props.name] ?
        <figure>
          <img src={this.props.form[this.props.name].toString()} />
        </figure> :
        <UnknownImage />
      }
      <div className='red'>{this.state.error}</div>
    </Label>
  );
};

export default ImageSelector;