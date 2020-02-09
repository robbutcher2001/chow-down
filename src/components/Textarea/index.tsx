import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';

export interface TextareaProps {
  name: string,
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

  > textarea {
    border: solid 2px #e4e4e4;
  }

  > textarea {
    border-radius: 5px;
    padding: 0.5em;
    margin: 0.5rem 0;
    font-size: 1rem;
  }
`

class Textarea extends Component<TextareaProps, {}> {
  constructor(props: TextareaProps) {
    super(props);
  };

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
        value={this.props.form[this.props.name]}
        onChange={event => this.onChange(event)}
        rows={4}
      />
    </Label>
  );
};

export default Textarea;