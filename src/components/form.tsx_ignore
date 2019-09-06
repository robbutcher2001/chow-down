import * as React from 'react';
import { connect } from 'react-redux';

export default connect(null, dispatch => ({
  submitPayload: (type, payload) => dispatch({ type, payload })
}))(
  class Form extends React.Component<any, any> {
    constructor(props) {
      super(props);

      const fieldNames = React.Children.map(this.props.children, child => child.props.name)
        .reduce((names, name) => {
          names[name] = '';
          return names;
        }, {});

      this.state = {
        form: {
          ...fieldNames
        }
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(field, event) {
      event.preventDefault();
      const value = event.target.value;
      this.setState(prevState => {
        const newState = {
          form: Object.assign({}, prevState.form)
        };
        newState.form[field] = value;
        return newState;
      });
    }

    onSubmit(event) {
      event.preventDefault();
      const formPopulated = Object.keys(this.state.form).reduce((acc, formField) =>
        this.state.form[formField].length > 0 ? true : acc, false);

      if (formPopulated) {
        this.props.submitPayload(this.props.payloadType, this.state.form);
      }
    }

    render() {
      const children = React.Children.map(this.props.children, child =>
        React.cloneElement(child, { form: this.state.form, onChange: this.onChange }));

      return (
        <form onSubmit={event => this.onSubmit(event)}>
          {children}
          <input type='submit' value={this.props.submitText} />
        </form>
      );
    }
  }
);