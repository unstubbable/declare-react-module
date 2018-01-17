import * as React from 'react';
import * as PropTypes from 'prop-types';

export class MyComponent extends React.Component {
  static propTypes = {
    foo: PropTypes.string.isRequired,
  };

  render() {
    return <div>{this.props.foo}</div>;
  }
}
