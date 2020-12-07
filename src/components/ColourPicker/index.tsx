import React, { Component, ChangeEvent } from 'react';

import styled from 'styled-components';
import { TagColour } from '../../store/domain/tags/types';
import { Fields, FieldValidations } from '../Form';

export interface ColourPickerProps {
  name: string,
  colours: TagColour[],
  validator: (value: string) => boolean,
  form?: Fields,
  validFields?: FieldValidations,
  setNewFormState?: (field: string, newValue: object) => void,
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

  &.pink {
    border-color: ${props =>
      props.theme.colour.pink
    };
  }
`

class ColourPicker extends Component<ColourPickerProps, {}> {
  constructor(props: ColourPickerProps) {
    super(props);
  };

  componentDidMount = () => this.props.setValidationState(this.props.name);

  onChange = (colour: TagColour) => {
    // event.preventDefault();
    // const value = event.currentTarget.value;
    this.props.setNewFormState(
      this.props.name,
      colour
    );
  };

  render = () => (
    <>
    {this.props.colours.map((colour, index) =>
      <label key={index}>
        <input
          id={this.props.name}
          name={this.props.name}
          type='radio'
          value={colour.background}
          checked={this.props.form[this.props.name] === colour.background ? true : false}
          // hidden
          onChange={() => this.onChange(colour)}
          // onBlur={event => this.props.setValidationState(
          //   this.props.name,
          //   this.props.validator(event.currentTarget.value)
          // )}
        />
        {console.log(this.props.form)}
      </label>
    )}
    {/* <Label
      htmlFor={this.props.name}
      className={this.props.validFields[this.props.name] === false ? 'pink' : undefined} >
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
    </Label> */}
    </>
  );
};

export default ColourPicker;