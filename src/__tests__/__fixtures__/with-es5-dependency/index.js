import * as React from 'react';
import {a} from 'test-dependency';

export default function Component({foo}) {
  return <div className={foo}>{a}</div>;
}

Component.propTypes = {
  foo: React.PropTypes.string.isRequired,
};
