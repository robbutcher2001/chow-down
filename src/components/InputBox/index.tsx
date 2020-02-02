import React, { ChangeEvent } from 'react';

import styled from 'styled-components';

export interface InputBoxProps {
  name: string,
  type: 'text' | 'number',
  label: string,
  form?: {
    [key: string]: string | number
  },
  onChange?: (field: string, type: 'text' | 'number', event: ChangeEvent<HTMLInputElement>) => void
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

export default (props: InputBoxProps) => (
  <Label htmlFor={props.name}>
    {props.label}
    <input
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.form[props.name]}
      onChange={event => props.onChange(props.name, props.type, event)}
    />
  </Label>
);