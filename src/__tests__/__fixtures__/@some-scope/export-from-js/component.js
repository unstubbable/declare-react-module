import * as React from 'react';

export function Component({foo}) {
  return <div>{foo}</div>;
}

Component.propTypes = {
  foo: React.PropTypes.string.isRequired,
};
