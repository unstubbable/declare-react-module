import * as React from 'react';
import {TestDependency as Dependency} from 'test-dependency';

export {TestDependency} from 'test-dependency';

export default function Component(props) {
  return <Dependency {...props} />;
}

Component.propTypes = Dependency.propTypes;
