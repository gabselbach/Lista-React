
import React, { Component } from 'react'
class Tela extends Component {
  
    state = {
        tasks: [
            {id: "1", taskName:"Estudar programação",type:"inProgress"},
            {id: "2", taskName:"Fazer o TCC", type:"inProgress"},
            {id: "3", taskName:"Ir a academia", type:"Done"},
            {id: "4", taskName:"Ler um livro", type:"Done"}
        ]
      }
      onDragStart = (event, taskName) => {
        console.log('dragstart on div: ', taskName);
        event.dataTransfer.setData("taskName", taskName);
    }
    onDragOver = (event) => {
        event.preventDefault();
    }
    
    onDrop = (event, cat) => {
        let taskName = event.dataTransfer.getData("taskName");
    
        let tasks = this.state.tasks.filter((task) => {
            if (task.taskName == taskName) {
                task.type = cat;
            }
            return task;
        });
    
        this.setState({
            ...this.state,
            tasks
        });
    }
    render() {
      var tasks = {
          inProgress: [],
          Done: []
        }
    
      this.state.tasks.forEach ((task) => {
        tasks[task.type].push(
          <div key={task.id} 
            onDragStart = {(event) => this.onDragStart(event, task.taskName)}
            draggable
            className="draggable">
            {task.taskName}
          </div>
        );
      });
    
        return (
          <div className="drag-container">
            <h2 className="head">Lista de tarefas Drag & Drop</h2>
          <div className="inProgress"
            onDragOver={(event)=>this.onDragOver(event)}
              onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
              <span className="group-header">Fazendo</span>
              {tasks.inProgress}
            </div>
            <div className="droppable"
              onDragOver={(event)=>this.onDragOver(event)}
                onDrop={(event)=>this.onDrop(event, "Done")}>
              <span className="group-header">Feito</span>
              {tasks.Done}
            </div>	        
          </div>
        );
      }
}
export default Tela;