import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = this.getStateDefault();
  }

  getStateDefault() {
    return {
      title: '',
      items: Array(9).fill({
        value: null,
        backgroundColor: '#FFFFFF',
      }),
      isX: true,
      endGame: false,
    };
  }

  renderItems() {
    let items = [];

    this.state.items.forEach((item, index) => {
      let style = {
        color: item.value ? (item.value === 'X' ? '#FF0000' : '#006600') : '#FFFFFF',
        backgroundColor: item.backgroundColor,
        cursor: this.state.endGame ? 'not-allowed' : null
      };
      items.push(
        <span className="item" style={style} key={index} onClick={() => this.selectedItem(index)}>
          {item.value}
        </span>
      );
    });

    return items;
  }

  renderButton() {
    if (this.state.items.filter(item => item.value).length) {
      return (<button className="ResetGame" onClick={() => this.resetGame()}>Reset Game</button>);
    }
  }

  resetGame() {
    this.setState(this.getStateDefault());
  }

  selectedItem(index) {
    let items = this.state.items.slice();

    if(items[index].value || this.state.endGame){
      return;
    }

    items[index] = {
      value: this.state.isX ? 'X' : 'O',
    };

    this.checkEndGame(items);

    this.setState({
      items: items,
      isX: !this.state.isX
    });
  }

  getResult() {
    // TODO: Hiện tại mảng này đang fix cứng, sẽ nghiên cứu công thức để tính cho mọi trường hợp ở pull sau
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  checkEndGame(items) {
    let result = this.getResult();

    for (let i = 0; i < result.length; i++) {
      let [a, b, c] = result[i];
      if (items[a].value && items[a].value === items[b].value && items[a].value === items[c].value) {
        items[a] = items[b] = items[c] = Object.assign(items[a], {
          backgroundColor: '#CCCC33',
        });
        this.setState({
          endGame: true
        });
        return;
      }
    }
    if (items.length === items.filter(item => item.value).length) {
      items.map(item => item.backgroundColor = '#000000');
      this.setState({
        endGame: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Board">
          {this.renderItems()}
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default App;
