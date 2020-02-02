import React, { ChangeEvent } from 'react';

import styled from 'styled-components';

export interface InputBoxProps {
  name: string,
  label: string,
  form?: {
    [key: string]: string | number
  },
  onChange?: (
    field: string,
    type: 'text' | 'number',
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void
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

export default (props: InputBoxProps) => (
  <Label htmlFor={props.name}>
    {props.label}
    <textarea
      id={props.name}
      name={props.name}
      value={props.form[props.name]}
      onChange={event => props.onChange(props.name, 'text', event)}
      rows={4}
    />
  </Label>
);