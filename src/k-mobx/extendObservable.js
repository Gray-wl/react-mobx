import { asObservableObject } from './observableObject';

export function extendObservable(target, props) {
  const adm = asObservableObject(target);

  Object.keys(props).forEach(key => {
    adm.addObservableProp_(key, props[key]);
  });

  return target;
}

