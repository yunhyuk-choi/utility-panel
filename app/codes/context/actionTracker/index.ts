/*
 *
 *   Copyright 2022 DZS Inc
 *
 */

import { useContext } from 'react';
import Context from './Context';

export { default } from './Provider';

export function useActionTracker() {
  return useContext(Context);
}
