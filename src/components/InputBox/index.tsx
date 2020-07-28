import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';
import { Fields, FieldValidations } from '../Form';

export interface InputBoxProps {
  name: string,
  type: 'text' | 'number',
  label: string,
  validator: (value: string) => boolean,
  form?: Fields,
  validFields?: FieldValidations,
  setNewFormState?: (field: string, newValue: string | number) => void,
  setValidationState?: (field: string, isValid?: boolean) => void
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
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

  > input {
    border: none;
    background-color: transparent;
    ${props => props.theme.isDark &&
      `color: ${props.theme.colour.white};`
    };
    font-family: ${props =>
      props.theme.typography.fontFamily.app
    };
    font-size: ${props =>
      props.theme.typography.fontSize.large
    };
    margin: 0;
    padding: 0.25rem 0.5rem;
    -webkit-appearance: none;
  }
`

class InputBox extends Component<InputBoxProps, {}> {
  constructor(props: InputBoxProps) {
    super(props);
  };

  componentDidMount = () => this.props.setValidationState(this.props.name);

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    this.props.setNewFormState(
      this.props.name,
      this.props.type === 'number' && value ? parseInt(value) : value
    );
  };

  render = () => (
    <Label
      htmlFor={this.props.name}
      className={this.props.validFields[this.props.name] === false ? 'red' : undefined} >
      <span>{this.props.label}</span>
      <input
        id={this.props.name}
        name={this.props.name}
        type={this.props.type}
        value={this.props.form[this.props.name] ? this.props.form[this.props.name] : ''}
        onChange={event => this.onChange(event)}
        onBlur={event => this.props.setValidationState(
          this.props.name,
          this.props.validator(event.currentTarget.value)
        )}
      />
    </Label>
  );
};

export default InputBox;