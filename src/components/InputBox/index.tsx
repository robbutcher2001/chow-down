import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';

export interface InputBoxProps {
  name: string,
  type: 'text' | 'number',
  label: string,
  form?: {
    [key: string]: string | number
  },
  setNewFormState?: (field: string, newValue: string | number) => void
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
`

class InputBox extends Component<InputBoxProps, {}> {
  constructor(props: InputBoxProps) {
    super(props);
  };

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
        value={this.props.form[this.props.name]}
        onChange={event => this.onChange(event)}
      />
    </Label>
  );
};

export default InputBox;