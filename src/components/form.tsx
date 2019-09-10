import React, { Component, FormEvent, ChangeEvent, ReactElement } from 'react';

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

class Form extends Component<CombinedProps, OwnState> {
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
      <form onSubmit={event => this.onSubmit(event)}>
        {children}
        <input type='submit' value={this.props.submitText} />
      </form>
    );
  }
};

export default Form;