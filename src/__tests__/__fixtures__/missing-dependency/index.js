import * as React from 'react';
import {bar} from './dependency';

export default function Component() {
  return <div {...bar} />;
}
