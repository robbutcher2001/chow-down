import React, { Component } from 'react';

import styled from 'styled-components';
import { TagColour } from '../../store/domain/tags/types';
import { Fields, FieldValidations } from '../Form';

interface ColourPickerProps {
  name: string,
  label: string,
  colours: TagColour[],
  validator: (value: object) => boolean,
  form?: Fields,
  validFields?: FieldValidations,
  setNewFormState?: (field: string, newValue: object) => void,
  setValidationState?: (field: string, isValid?: boolean) => void
};

interface ColourProps {
  readonly $background: string;
  readonly $text: string;
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

  > div {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 0.5rem 0;
  }

  &.pink {
    border-color: ${props =>
      props.theme.colour.pink
    };
  }
`

const ColourLabel = styled.label<ColourProps>`
  border: 2px solid transparent;
  border-radius: 2rem;
  margin: 0.25rem 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.$background};
  color: ${props => props.$text};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:before {
    content: 'Tag name';
    font-size: ${props =>
      props.theme.typography.fontSize.small
    };
  }

  &.selected {
    border-color: ${props => props.theme.isDark ?
      props.theme.colour.white :
      props.theme.colour.grey
    };
    ${props => !props.theme.isDark && 'box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.6);'}
  }
`

class ColourPicker extends Component<ColourPickerProps, {}> {
  constructor(props: ColourPickerProps) {
    super(props);
  };

  componentDidMount = () => this.props.setValidationState(this.props.name);

  onChange = (colour: TagColour) => {
    this.props.setNewFormState(this.props.name, colour);
    this.props.setValidationState(this.props.name, this.props.validator(colour));
  };

  render = () => (
    <Label
      htmlFor={this.props.name}
      className={this.props.validFields[this.props.name] === false ? 'pink' : undefined} >
      <span>{this.props.label}</span>
      <div id={this.props.name} >
        {this.props.colours.map((colour, index) =>
          <ColourLabel
            key={index}
            htmlFor={`colour_${index}`}
            className={this.props.form[this.props.name] === colour ? 'selected' : undefined}
            $background={colour.background}
            $text={colour.text}
          >
            <input
              id={`colour_${index}`}
              name={this.props.name}
              type='radio'
              value={colour.background}
              checked={this.props.form[this.props.name] === colour ? true : false}
              hidden
              onChange={() => this.onChange(colour)}
            />
          </ColourLabel>
        )}
      </div>
    </Label>
  );
};

export default ColourPicker;