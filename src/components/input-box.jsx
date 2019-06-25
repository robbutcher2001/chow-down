import React, { Component } from 'react';
import { connect } from 'react-redux';

export default connect(null, null)(props => {
  return (
    <input
      type='text'
      name={props.name}
      placeholder={props.placeholderText}
      value={props.form[props.name]}
      onChange={event => props.onChange(props.name, event)}
    />
  );
});