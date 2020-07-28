import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';
import { Fields } from '../Form';

export interface StarRatingProps {
  name: string,
  label: string,
  form?: Fields,
  setNewFormState?: (field: string, newValue: number) => void
};

const Label = styled.label`
  background-color: ${props =>
    props.theme.colour.lightGrey
  };
  margin-bottom: 2rem;
  border-radius: 5px;
  border-bottom: 2px solid rgb(101, 119, 134);

  > span {
    padding: 0.25rem 0.5rem 0;
    color: rgb(101, 119, 134);
  }

  > div {
    padding: 0 0.5rem 0.25rem 0.5rem;

    > label {
      color: ${props =>
        props.theme.colour.semantic.theme
      };
      font-family: ${props =>
        props.theme.typography.fontFamily.times
      };
      font-size: ${props =>
        props.theme.typography.fontSize.largest
      };
      margin-right: 0.5rem;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }

  .filled:before {
    content: '★';
  }

  .empty:before {
    content: '☆';
  }
`

class StarRating extends Component<StarRatingProps, {}> {
  constructor(props: StarRatingProps) {
    super(props);
  };

  componentDidMount = () => this.props.setNewFormState(this.props.name, 0);

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    this.props.setNewFormState(
      this.props.name,
      parseInt(value)
    );
  };

  getClassName = (position: number) =>
    position <= this.props.form[this.props.name] ? 'filled' : 'empty';

  render = () => (
    <Label htmlFor={this.props.name}>
      <span>{this.props.label}</span>
      <div id={this.props.name}>
        <label
          htmlFor='rating_1'
          className={this.getClassName(1)}
        >
          <input
            id='rating_1'
            name={this.props.name}
            type='radio'
            value='1'
            hidden
            onChange={event => this.onChange(event)} />
        </label>
        <label
          htmlFor='rating_2'
          className={this.getClassName(2)}
        >
          <input
            id='rating_2'
            name={this.props.name}
            type='radio'
            value='2'
            hidden
            onChange={event => this.onChange(event)} />
        </label>
        <label
          htmlFor='rating_3'
          className={this.getClassName(3)}
        >
          <input
            id='rating_3'
            name={this.props.name}
            type='radio'
            value='3'
            hidden
            onChange={event => this.onChange(event)} />
        </label>
        <label
          htmlFor='rating_4'
          className={this.getClassName(4)}
        >
          <input
            id='rating_4'
            name={this.props.name}
            type='radio'
            value='4'
            hidden
            onChange={event => this.onChange(event)} />
        </label>
        <label
          htmlFor='rating_5'
          className={this.getClassName(5)}
        >
          <input
            id='rating_5'
            name={this.props.name}
            type='radio'
            value='5'
            hidden
            onChange={event => this.onChange(event)} />
        </label>
      </div>
    </Label>
  );
};

export default StarRating;