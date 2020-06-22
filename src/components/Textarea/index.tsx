import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';
import { Fields, FieldValidations } from '../Form';

export interface TextareaProps {
  name: string,
  label: string,
  validator: (value: string) => boolean,
  form?: Fields,
  validFields?: FieldValidations,
  setNewFormState?: (field: string, newValue: string) => void,
  setValidationState?: (field: string, isValid?: boolean) => void
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;

  > textarea {
    border: solid 1px #e4e4e4;
    border-radius: 5px;
    padding: 0.5em;
    margin: 0.5rem 0;
    font-size: 1rem;
    resize: vertical;
  }
`

class Textarea extends Component<TextareaProps, {}> {
  constructor(props: TextareaProps) {
    super(props);
  };

  componentDidMount = () => this.props.setValidationState(this.props.name);

  onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    this.props.setNewFormState(this.props.name, event.currentTarget.value);
  };

  render = () => (
    <Label htmlFor={this.props.name}>
      {this.props.label}
      <textarea
        id={this.props.name}
        name={this.props.name}
        rows={5}
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

export default Textarea;