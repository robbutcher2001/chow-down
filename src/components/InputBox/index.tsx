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
  margin-bottom: 0.75rem;

  > input {
    border: solid 1px #e4e4e4;
    border-radius: 5px;
    padding: 0 0.5em;
    margin: 0.5rem 0;
    height: 2rem;
    font-size: 1rem;
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
    <Label htmlFor={this.props.name}>
      {this.props.label}
      <input
        id={this.props.name}
        name={this.props.name}
        type={this.props.type}
        className={this.props.validFields[this.props.name] === false ? 'red' : undefined}
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