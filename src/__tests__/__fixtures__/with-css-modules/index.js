import * as React from 'react';
import styles from './styles.css';

export function Component({foo}) {
  return <div className={styles.foo}>{foo}</div>;
}

Component.propTypes = {
  foo: React.PropTypes.string.isRequired
};
