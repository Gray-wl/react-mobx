import { Component } from 'react';
import { observer } from 'mobx-react';

// 2、创建视图以响应状态的变化
@observer
class TimerView extends Component {

  onReset = () => {
    this.props.appStore.resetTimer();
  }

  render() {
    return (
      <div>
        <h3>TimerView</h3>
        <button onClick={this.onReset}>{this.props.appStore.time}</button>
      </div>
    );
  }
}

export default TimerView
