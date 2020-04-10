import React, { Component, ReactElement, FormEvent } from 'react';

import styled from 'styled-components';

import { InputBoxProps } from '../InputBox';
import { TextareaProps } from '../Textarea';
import { ImageSelectorProps } from '../ImageSelector';
import { RecipeIngredientsProps } from '../RecipeIngredients';

type CombinedInputProps = InputBoxProps | TextareaProps | ImageSelectorProps | RecipeIngredientsProps;

export interface Fields {
  [key: string]: string | number | Array<any>
};

export interface FieldValidations {
  [key: string]: boolean
};

interface StateProps { };

interface DispatchProps { };

interface OwnProps {
  dispatch: (form: object) => object,
  submitText: string,
  children: ReactElement<CombinedInputProps> | ReactElement<CombinedInputProps>[]
};

interface OwnState {
  form: Fields,
  validFields: FieldValidations
};

type CombinedProps = StateProps & DispatchProps & OwnProps;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  > .button-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 0 2em;
    margin-top: 1rem;

    > button {
      border-radius: 5px;
      padding: 0 0.5em;
      margin: 0.5rem 0;
      height: 3rem;
      font-size: 1rem;
      border: none;
      color: white;
      cursor: pointer;
  
      &[type=submit] {
        background-color: #4acaa8;
      }
  
      &[type=reset] {
        background-color: #989898;
      }
    }
  }
`

class FormComponent extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
    const fields: Fields = this.getFields();

    this.state = {
      form: {
        ...fields
      },
      validFields: {}
    };
  };

  getFields = () => React.Children.map(this.props.children, (child: ReactElement<CombinedInputProps>) => child.props.name)
    .reduce((names, name) => {
      names[name] = null;
      return names;
    }, {} as Fields);

  //TODO: need to rename this - tests complain
  setNewFormState = (field: string, newValue: string | number | Array<any>) => {
    this.setState(prevState => {
      const newState = {
        form: Object.assign({}, prevState.form)
      };
      newState.form[field] = newValue;
      return newState;
    });
  };

  setValidationState = (field: string, isValid?: boolean) => {
    this.setState(prevState => {
      const newState = {
        validFields: Object.assign({}, prevState.validFields)
      };
      newState.validFields[field] = isValid;
      return newState;
    });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValid = Object.keys(this.state.validFields).every(key => this.state.validFields[key] === true);

    if (formValid) {
      this.props.dispatch(this.state.form);
    }
  };

  onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields: Fields = this.getFields();

    this.setState({
      form: {
        ...fields
      }
    });
  };

  render = () => {
    console.log(this.state);
    const children = React.Children.map(this.props.children, (child: ReactElement<CombinedInputProps>) =>
      React.cloneElement(child, {
        form: this.state.form,
        validFields: this.state.validFields,
        setNewFormState: this.setNewFormState,
        setValidationState: this.setValidationState
      }));

    return (
      <Form id='form' onSubmit={this.onSubmit} onReset={this.onReset} >
        {children}
        <div className='button-group'>
          <button type='submit' form='form' value={this.props.submitText}>
            {this.props.submitText}
          </button>
          <button type='reset' form='form' value='Reset'>
            Reset
          </button>
        </div>
      </Form>
    );
  };
};

export default FormComponent;