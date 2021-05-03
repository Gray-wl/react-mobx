import { action, observable } from 'mobx';

// 1、定义状态并使其可观察
const appStore = observable({
  time: 0
});

appStore.resetTimer = action(function reset() {
  appStore.time = 0;
})

setInterval(action(function tick() {
  appStore.time++;
}), 1000);

export default appStore;
