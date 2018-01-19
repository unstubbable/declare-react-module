import * as React from 'react';
import * as path from 'path';

export default function Component({foo}) {
  return <div>{path.sep}</div>;
}

Component.propTypes = {
  foo: React.PropTypes.string.isRequired,
};
