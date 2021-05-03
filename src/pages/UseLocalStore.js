import {
  // useAsObservableSource,
  // useLocalStore
} from 'mobx-react';
// import { useObserver } from 'mobx-react';
import { Observer, useAsObservableSource, useLocalStore, useObserver } from '../k-mobx-react-lite';

const UseLocalStore = (props) => {
  const newProps = { ...props }; // useAsObservableSource(props);
  const countStore = useLocalStore(
    newProps => ({
      count: props.init === undefined ? 0 : props.init,
      add() {
        this.count = this.count + 1;
      },
      get emoji() {
        return this.count % 2 ? "😜" : "🏃";
      },
      get specialNum() {
        return newProps.init > -1 && newProps.init < 9 ? '0' + newProps.init : newProps.init;
      }
    }),
    newProps
  );
  // return useObserver(() => (
  //   <div className="border">
  //     <h3>UseLocalStore</h3>
  //     <button onClick={countStore.add}>count: {countStore.count}</button>
  //     <p>{countStore.specialNum}</p>
  //   </div>
  // ));
  return <Observer>
    {() => <div className="border">
      <h3>UseLocalStore</h3>
      <button onClick={countStore.add}>count: {countStore.count}</button>
      <p>{countStore.specialNum}</p>
    </div>}
  </Observer>;
};

export default UseLocalStore;
