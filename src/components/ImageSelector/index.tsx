import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';
import questionImg from './question.svg';
import foodImg from '../../food.jpg';

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

  > figure {
    position: relative;
    align-self: center;
    max-width: 400px;
    margin: 0.5rem 0;
    cursor: pointer;

    > img {
      width: 100%;
    }

    aside, figcaption {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    aside {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(40, 40, 40, 0.7);

      > img {
        height: 100%;
      }
    }

    > figcaption {
      background: rgba(40, 40, 40, 0.8);

      &::after {
        content: 'No picture selected';
        visibility: hidden;
      }
    }
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

  //TODO: select image, then open popup and click cancel, tries to render null
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
        error: null
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
        hidden
        onChange={event => this.onChange(event)} />
      {this.props.form[this.props.name] ?
        <figure>
          <img src={this.props.form[this.props.name].toString()} />
        </figure> :
        <figure>
          <img src={foodImg} />
          <aside>
            <img src={questionImg} />
          </aside>
          <figcaption />
        </figure>
      }
      <div className='red'>{this.state.error}</div>
    </Label>
  );
};

export default ImageSelector;