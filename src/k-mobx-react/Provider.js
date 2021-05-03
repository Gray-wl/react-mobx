import { useContext, useRef } from 'react';
import { MobxProviderContext } from './MobxProviderContext';

export function Provider({ children, ...stores }) {
  const parentValue = useContext(MobxProviderContext);
  const mutableProviderRef = useRef({ ...parentValue, ...stores });
  const value = mutableProviderRef.current;
  return <MobxProviderContext.Provider value={value}>{children}</MobxProviderContext.Provider>;
}
