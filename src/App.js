
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        {
          id: 1,
          body: "とりあえず表示してみる"
        },
        {
          id: 2,
          body: "私たち、いずれ書き換えられる運命"
        }
      ]
    }
    this.changeText = this.changeText.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.fetchTasks = this.fetchTasks.bind(this)
  }

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    fetch("http://localhost:3001/tasks")//db.jsonのデータを取得しに行く
    .then(response => response.json())//json型のレスポンスをオブジェクトに変え、
    .then( json => {                        //オブジェクトに変換したレスポンスを受け取って
      this.setState({ tasks: json }) //stateにぶち込む
    })
  }

  changeText(e){
    const inputText = e.target.value
    this.setState({inputText: inputText})
    console.dir(inputText);
  }

  submitTask(){
    fetch("http://localhost:3001/tasks",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: this.state.inputText })
    })
    .then(this.fetchTasks)

  }

  putTask(taskId){
    fetch("http://localhost:3001/tasks/"+taskId,{
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: "やったよ" })
    })
    .then( this.fetchTasks )
  }

  deleteTask(taskId) {
    fetch("http://localhost:3001/tasks/"+taskId, {
      method: "DELETE"
    })
    .then( this.fetchTasks )
  }

  render() {
    return (
      <div className="App">
        <div className="tasks">
        {
          this.state.tasks.map( task => {
              return <div className="task" key={ task.id }>
              { task.body }
              <button className="put" onClick={() => {this.putTask(task.id)}}>put</button>
              <button className="delete" onClick={() => {this.deleteTask(task.id)}}>delete</button>
              </div>
          })
        }
        </div>
        <div id="task-form">
          <input type="text" id="task-input" onChange={this.changeText}/>
          <button id="submit" className="button" onClick={this.submitTask}>submit</button>
        </div>
      </div>
    );
  }
}

export default App;