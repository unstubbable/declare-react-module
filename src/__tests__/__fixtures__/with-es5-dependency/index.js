import * as React from 'react';
import testDependency from 'test-dependency';

export default function Component({foo}) {
  return <div className={testDependency(foo)}></div>;
}

Component.propTypes = {
  foo: React.PropTypes.string.isRequired
};
