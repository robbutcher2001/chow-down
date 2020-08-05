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
  background-color: ${props =>
    props.theme.colour.lightGrey
  };
  margin-bottom: 2rem;
  border-radius: 5px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.isDark ?
    props.theme.colour.grey :
    props.theme.colour.darkGrey
  };

  > span {
    padding: 0.25rem 0.5rem 0;
    color: ${props => props.theme.isDark ?
      props.theme.colour.grey :
      props.theme.colour.darkGrey
    };
  }

  > figure {
    align-self: center;
    width: 100%;
    max-width: 420px;
    min-height: 320px;
    margin: 1rem 0;
    cursor: pointer;

    > img {
      width: 100%;
    }
  }

  > figure, aside, figcaption, img {
    border-radius: 20px;
  }

  &.pink {
    border-color: ${props =>
      props.theme.colour.pink
    };
  }
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
      className={this.props.validFields[this.props.name] === false ? 'pink' : undefined}
    >
      <span>{this.props.label}</span>
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
      <div>{this.state.error}</div>
    </Label>
  );
};

export default ImageSelector;