import { useState } from 'react';
// import TimerView from './pages/TimerView';
import TodoList from './pages/TodoList';
import UseLocalStore from './pages/UseLocalStore';
// import appStore from './store/appStore';
import todoStore from './store/todoStore';
import './App.css';

function App() {
  const [countInit, setCountInit] = useState(-1);

  return (
    <div className="App">
      <button onClick={() => setCountInit(countInit + 1)}>add countInit{countInit}</button>
      {/*<TimerView appStore={appStore}/>*/}
      <TodoList todoStore={todoStore}/>
      <UseLocalStore init={countInit}/>
    </div>
  );
}

export default App;
