import { Component, createRef, forwardRef } from 'react';
// import { observer, Observer, useObserver } from 'mobx-react';
import { useObserver, Observer, observer as observerLite } from '../k-mobx-react-lite';
import { observer } from '../k-mobx-react';

@observer
class TodoList extends Component {
  inputRef = createRef();

  render() {
    return (
      <div>
        <h3>TodoList</h3>
        <input type="text" ref={this.inputRef}/>
        <ul>
          {this.props.todoStore.todos.map(todo => (
            <TodoView key={todo.id} ref={this.inputRef} todo={todo} change={this.props.todoStore.change}/>
          ))}
        </ul>
        Tasks left: {this.props.todoStore.unfinishedTodoCount}
      </div>
    );
  }
}

export default TodoList;

// const TodoView = ({ todo, change }) => {
//   return useObserver(
//     () =>
//       <li>
//         <input
//           type="checkbox"
//           checked={todo.finished}
//           onChange={() => change(todo)}
//         />{todo.title}
//       </li>)
// };


// const TodoView = ({ todo, change }) => {
//   // return <Observer>
//   //   {() =>
//   //     <li>
//   //       <input
//   //         type="checkbox"
//   //         checked={todo.finished}
//   //         onChange={() => change(todo)}
//   //       />{todo.title}
//   //     </li>}
//   // </Observer>
//   return <Observer render={() =>
//     <li>
//       <input
//         type="checkbox"
//         checked={todo.finished}
//         onChange={() => change(todo)}
//       />{todo.title}
//     </li>}/>
// };

// const TodoView = observer(({ todo, change }, ref) => {
//   console.log(ref.current?.value);
//   return <li>
//     <input
//       type="checkbox"
//       checked={todo.finished}
//       onChange={() => change(todo)}
//     />{todo.title}
//   </li>
// }, { forwardRef: true });

const TodoView = observer(forwardRef((props, ref) => {
  const { todo, change } = props;
  console.log(ref.current?.value);
  return <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onChange={() => change(todo)}
    />{todo.title}
  </li>
}));
