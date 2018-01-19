import * as React from 'react';
import testDependency from './dependency.json';

export default function Component({foo}) {
  return <div>{testDependency.test}</div>;
}

Component.propTypes = {
  foo: React.PropTypes.string.isRequired,
};
