import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import DatePicker from "react-datepicker";
import { debounce } from './util'

class ToDoForm extends React.Component{
    constructor(...args) {
        super(...args)
        this.counter = 0;
        this.state = {
          value: [],
          tags: [{name: 'meeting' , id: 1},{name: 'updates' , id: 2}],
          priorityList: [{name: 'low' , id: 1},{name: 'medium' , id: 1},{name: 'high' , id: 1}], 
          title: '',
          time: new Date(),
          tagVal: [],
          priority: [],
          error: false,
          editMode: false,
        }
      }
      static getDerivedStateFromProps(props, state){
        var updatedState = null;

        if(props.editMode && !state.editMode){
            var updatedState = {
                editMode: true,
                title: props.itemToBeEdited.title,
                time: new Date(props.itemToBeEdited.time),
                tagVal: [...props.itemToBeEdited.tagVal],
                priority: props.itemToBeEdited.priority,
            }

        }
        if(!props.editMode && state.editMode){
            updatedState = {
                title: '',
                time: new Date(),
                tagVal: [],
                priority: [],
                error: false,
                editMode: false,
            }
        }

        return updatedState;
      }

      handleCreate(name) {
        let { tags, value, tagVal } = this.state;
    
        let newOption = {
          name,
          id: tags.length + 1
        }
    
        this.setState({
          tagVal: [...tagVal, newOption],
          value: [...value, newOption],  // select new option
          tags: [...tags, newOption] // add new option to our dataset
        })
        this.props.setTagFields([...tags, newOption]);
      }
      handleSubmit(){
        if(!this.state.title.length || 
            !this.state.tagVal.length || !Object.keys(this.state.priority).length){
                this.setState({ error: true });
                return;
        }
            this.setState({ error: false });
            var todoItem = {
                id: this.props.editMode ? this.props.itemToBeEdited.id : '' +this.counter++,
                title: this.state.title.charAt(0).toUpperCase() + this.state.title.slice(1),
                time: this.state.time.toDateString(),
                tagVal: this.state.tagVal,
                priority: this.state.priority
            }
            this.props.onSubmit(todoItem, this.props.editMode)
            this.resetState()
      }
    resetState(){
        this.setState({
            title: '',
            time: new Date(),
            tagVal: [],
            priority: [],
            error: false,
            editMode: false,
        })
    }
    render(){
        const { tags, value, priorityList,tagVal, title, time, priority } = this.state;
        return (
            <div className='todoForm'>
                {this.state.error && (<div className='row flex_1'>
                    <span className='error-msg'>Fill all fields.</span>
                </div>)}
                <div className='row flex_1'>
                    <div className='flex_1' style={{ display: 'flex'}}>
                        <label className="field_title">Title</label>
                        <input 
                            value={title}
                            style={{ width: '70%' }}
                            className="field_input"
                            onChange={(e) => this.setState({title: e.target.value})}
                        />
                    </div>
                    <div className='flex_1'>
                        <label className="field_title">Time</label>
                        <DatePicker 
                            selected={time} 
                            onChange={date => {
                                this.setState({time: date});
                            }} 
                        />
                    </div>
                    <div className='flex_1' style={{ display: 'flex'}}>
                        <label className="field_title">Priority</label>
                        <DropdownList
                            data={priorityList}
                            textField='name'
                            onChange={priority => this.setState({ priority })}
                            // itemComponent={ListItem}
                            containerClassName='dropdown'
                            value={priority}
                        />
                    </div>
                    
                </div>
                
                <div className='row'>
                    
                </div>
                <div className='row flex_1' style={{ justifyContent: 'space-between'}}>
                    <div style={{ display: 'flex' }}>
                        <label className="field_title">Tag</label>
                        <Multiselect 
                            style={{ width: '100%' }}
                            className="field_input"
                            data={tags}
                            value={tagVal}
                            allowCreate="onFilter"
                            onCreate={name => this.handleCreate(name)}
                            onChange={tagVal => {
                                this.setState({ tagVal: [...tagVal] })
                            }}
                            textField="name"
                            containerClassName='dropdown'
                        />
                    </div>
                    <div>
                        <button
                            className='btn'
                            onClick={() => this.handleSubmit()}
                        >
                            {this.props.editMode? 'Update' :'Create'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoForm;