import React, { ChangeEvent } from 'react';

export interface InputBoxProps {
  name: string,
  placeholderText: string,
  form?: {
    [key: string]: string
  },
  onChange?: (field: string, event: ChangeEvent<HTMLInputElement>) => void
};

export default (props: InputBoxProps) => (
  <input
    type='text'
    name={props.name}
    placeholder={props.placeholderText}
    value={props.form[props.name]}
    onChange={event => props.onChange(props.name, event)}
  />
);