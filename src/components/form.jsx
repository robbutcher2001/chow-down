import React, { Component } from 'react';
import { connect } from 'react-redux';

export default connect(null, dispatch => ({
  submitPayload: (type, payload) => dispatch({ type, payload })
}))(
  class Form extends Component {
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
      if (Object.keys(this.state.form).length > 0) {
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