import React, { ChangeEvent } from 'react';

export interface InputBoxProps {
  name: string,
  type: 'text' | 'number',
  placeholderText: string,
  form?: {
    [key: string]: string | number
  },
  onChange?: (field: string, type: 'text' | 'number', event: ChangeEvent<HTMLInputElement>) => void
};

export default (props: InputBoxProps) => (
  <input
    name={props.name}
    type={props.type}
    placeholder={props.placeholderText}
    value={props.form[props.name]}
    onChange={event => props.onChange(props.name, props.type, event)}
  />
);