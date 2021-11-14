import _ from 'lodash';

import { ElementFragment } from './interfaces';

export const takeMinHasId = (
  fragments: ElementFragment[]
): ElementFragment[] => {
  const index = _.findLastIndex(fragments, (f) => typeof f.id !== 'undefined');
  return index !== -1 ? fragments.slice(index) : fragments;
};
