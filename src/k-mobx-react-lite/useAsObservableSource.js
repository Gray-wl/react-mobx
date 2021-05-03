import { useState } from 'react';
import { observable, runInAction } from 'mobx';

export function useAsObservableSource(current) {
  const [res] = useState(() => observable(current));
  runInAction(() => {
    Object.assign(res, current);
  })
  return res;
}
