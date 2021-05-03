import { Component } from 'react';
import { Reaction } from 'mobx';

export function makeClassComponentObserver(componentClass) {
  const target = componentClass.prototype;
  const baseRender = target.render;
  target.render = function () {
    return makeComponentReactive.call(this, baseRender);
  };
  return componentClass;
}

function makeComponentReactive(render) {
  const baseRender = render.bind(this);
  this.render = reactiveRender;

  let isRenderingPending = false;
  const reaction = new Reaction(`${this.constructor.name}.render`, () => {
    if (!isRenderingPending) {
      isRenderingPending = true;
      Component.prototype.forceUpdate.call(this);
    }
  });

  function reactiveRender() {
    isRenderingPending = false;
    let rendering;
    reaction.track(() => {
      rendering = baseRender();
    });
    return rendering;
  }

  return reactiveRender.call(this);
}
