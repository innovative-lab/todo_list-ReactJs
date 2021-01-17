import React from 'react'
import logo from './logo.svg';
import './App.css';
import 'react-widgets/dist/css/react-widgets.css';
import "react-datepicker/dist/react-datepicker.css";
import AppLayout from './containers/AppLayout'
import ToDoForm from './containers/TodoForm'
import ToDoList from './containers/TodoList'
import ToDoFilter from './containers/TodoFilter';

class App extends React.Component {
  state = {
    todolist: [],
    doneList:[],
    itemToBeEdited: {},
    editMode: false,
    priorityFields: [{name: 'low' , id: 1},{name: 'medium' , id: 1},{name: 'high' , id: 1}],
    tagFields: [{name: 'meeting' , id: 1},{name: 'updates' , id: 2}],
  }

  setTagFields(list){
    this.setState({
      tagFields: [...list]
    })
  }

  setToDoList(list){
    this.setState({
      todolist: [...list]
    })
  }

  setDoneList(list){
    this.setState({
      doneList: [...list]
    })
  }

  editItem(item){
    this.setState({
      itemToBeEdited: item,
      editMode: true
    })
  }

  deleteItem(item){
    var itemList = [...this.state.todolist];
    itemList = itemList.filter(i => i.id !== item.id);
    this.setState({ todolist: itemList});
    this.resetEditMode();
  }

  onSubmit(data, editMode){
    if(editMode){
      var list = [...this.state.todolist];
      var filteredItem = list.find(l => l.id === data.id);
      filteredItem = {...data}
      list = list.map(l => {
        if(l.id === data.id){
          return data
        }
        return l
      })
      this.setState({
        todolist: [...list]
      })
      this.resetEditMode();
      return;
    }
    this.setState({
      todolist: [...this.state.todolist, data]
    })
  }

  resetEditMode(){
    this.setState({
      itemToBeEdited: {},
      editMode: false,
    })
  }

  render(){
    
    return (
      <div className="App">
        <header className="App-header">
          <AppLayout>
            <ToDoForm 
              editMode={this.state.editMode}
              itemToBeEdited={this.state.itemToBeEdited}
              onSubmit={(data, editMode) => this.onSubmit(data, editMode)}
              setTagFields={list => this.setTagFields(list)}
            />
            {/* <ToDoFilter
              tagFields={this.state.tagFields}

            /> */}
            <ToDoList
              data={[...this.state.todolist]}
              doneList={[...this.state.doneList]}
              setToDoList={list => this.setToDoList(list)}
              setDoneList={list => this.setDoneList(list)}
              deleteItem={item => this.deleteItem(item)}
              editItem={item => this.editItem(item)}
            />
          </AppLayout>
        </header>
      </div>
    );
  }
 
}

export default App;
