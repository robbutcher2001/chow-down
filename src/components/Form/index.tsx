import React, { Component, ReactElement, FormEvent } from 'react';

import styled from 'styled-components';

import { InputBoxProps } from '../InputBox';
import { TextareaProps } from '../Textarea';
import { ImageSelectorProps } from '../ImageSelector';
import { RecipeIngredientsProps } from '../RecipeIngredients';

type CombinedInputProps = InputBoxProps | TextareaProps | ImageSelectorProps | RecipeIngredientsProps;

interface FieldNames {
  [key: string]: string
};

interface StateProps { };

interface DispatchProps { };

interface OwnProps {
  dispatch: (form: object) => object,
  submitText: string,
  children: ReactElement<CombinedInputProps> | ReactElement<CombinedInputProps>[]
};

interface OwnState {
  form: {
    [key: string]: string | number
  }
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
    const fieldNames: FieldNames = this.getFieldNames();

    this.state = {
      form: {
        ...fieldNames
      }
    };
  };

  getFieldNames = () => React.Children.map(this.props.children, (child: ReactElement<CombinedInputProps>) => child.props.name)
    .reduce((names, name) => {
      names[name] = '';
      return names;
    }, {} as FieldNames);

  setNewFormState = (field: string, newValue: string | number) => {
    this.setState(prevState => {
      const newState = {
        form: Object.assign({}, prevState.form)
      };
      newState.form[field] = newValue;
      return newState;
    });
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formPopulated = Object.keys(this.state.form).reduce((acc, formField) =>
      this.state.form[formField] ? true : acc, false);

    if (formPopulated) {
      this.props.dispatch(this.state.form);
    }
  };

  onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldNames: FieldNames = this.getFieldNames();

    this.setState({
      form: {
        ...fieldNames
      }
    });
  };

  render = () => {
    const children = React.Children.map(this.props.children, (child: ReactElement<CombinedInputProps>) =>
      React.cloneElement(child, { form: this.state.form, setNewFormState: this.setNewFormState }));

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