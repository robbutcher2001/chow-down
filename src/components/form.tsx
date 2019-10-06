import React, { Component, FormEvent, ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';

import { InputBoxProps } from './input-box';

interface StateProps { };

interface DispatchProps { };

interface OwnProps {
  dispatch: (form: object) => object,
  submitText: string,
  children: ReactElement<InputBoxProps> | ReactElement<InputBoxProps>[]
};

interface OwnState {
  form: {
    [key: string]: string
  }
};

type CombinedProps = StateProps & DispatchProps & OwnProps;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  > input {
    border: solid 2px #e4e4e4;
  }

  > input, button {
    border-radius: 5px;
    padding: 0 0.5em;
    margin: 0.5rem 0;
    height: 2.5rem;
    font-size: 1rem;
  }

  > .button-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 0 2em;

    > button {
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

    interface Names {
      [key: string]: string
    }

    const fieldNames = React.Children.map(this.props.children, (child: ReactElement<InputBoxProps>) => child.props.name)
      .reduce((names, name) => {
        names[name] = '';
        return names;
      }, {} as Names);

    this.state = {
      form: {
        ...fieldNames
      }
    };
  }

  onChange = (field: string, event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    this.setState(prevState => {
      const newState = {
        form: Object.assign({}, prevState.form)
      };
      newState.form[field] = value;
      return newState;
    });
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formPopulated = Object.keys(this.state.form).reduce((acc, formField) =>
      this.state.form[formField].length > 0 ? true : acc, false);

    if (formPopulated) {
      this.props.dispatch(this.state.form);
    }
  }

  render = () => {
    const children = React.Children.map(this.props.children, (child: ReactElement<InputBoxProps>) =>
      React.cloneElement(child, { form: this.state.form, onChange: this.onChange }));

    return (
      <Form id='form' onSubmit={event => this.onSubmit(event)}>
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
  }
};

export default FormComponent;