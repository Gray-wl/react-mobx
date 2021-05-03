import { observable, configure, makeObservable, computed, action } from 'mobx';

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' });

class TodoStore {
  constructor() {
    // 添加makeObservable
    makeObservable(this)
  }

  @observable todos = [{
    id: '0',
    finished: false,
    title: '任务1'
  }, {
    id: '1',
    finished: true,
    title: '任务2'
  }, {
    id: '2',
    finished: false,
    title: '任务3'
  }];

  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action change(todo) {
    todo.finished = !todo.finished;
  }
}

const todoStore = new TodoStore();

export default todoStore;
