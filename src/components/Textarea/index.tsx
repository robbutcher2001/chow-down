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
  background-color: ${props =>
    props.theme.colour.lightGrey
  };
  margin-bottom: 2rem;
  border-radius: 5px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.isDark ?
    props.theme.colour.grey :
    props.theme.colour.darkGrey
  };

  > span {
    padding: 0.25rem 0.5rem 0;
    color: ${props => props.theme.isDark ?
      props.theme.colour.grey :
      props.theme.colour.darkGrey
    };
  }

  > textarea {
    border: none;
    background-color: rgba(0, 0, 0, 0);
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
    resize: vertical;
  }

  &.pink {
    border-color: ${props =>
      props.theme.colour.pink
    };
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
    <Label
      htmlFor={this.props.name}
      className={this.props.validFields[this.props.name] === false ? 'pink' : undefined} >
      <span>{this.props.label}</span>
      <textarea
        id={this.props.name}
        name={this.props.name}
        rows={5}
        value={this.props.form[this.props.name] ? (this.props.form[this.props.name] as string) : ''}
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