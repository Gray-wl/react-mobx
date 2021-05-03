import { useEffect, useRef } from 'react';
import { Reaction } from 'mobx';
import { useForceUpdate } from './useForceUpdate';

function observerComponentNameFor(baseComponentName) {
  return `observer${baseComponentName}`;
}

export function useObserver(fn, baseComponentName = 'observed', options = {}) {
  const wantedForceUpdateHook = options.useForceUpdate || useForceUpdate;
  const forceUpdate = wantedForceUpdateHook();
  const reactionTrackRef = useRef(null);
  if (!reactionTrackRef.current) {
    reactionTrackRef.current = {
      reaction: new Reaction(observerComponentNameFor(baseComponentName), () => {
        forceUpdate();
      })
    };
  }
  const { reaction } = reactionTrackRef.current;

  useEffect(() => {
    return () => {
      reactionTrackRef.current.reaction.dispose();
      reactionTrackRef.current = null;
    }
  }, []);

  let rendering;
  reaction.track(() => {
    rendering = fn();
  })
  return rendering;
}
