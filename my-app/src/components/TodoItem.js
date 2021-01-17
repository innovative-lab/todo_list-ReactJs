import React from 'react';

class ToDoItem extends React.Component{

    render(){
        return (
            <div>
                <div className='row flex_1' style={{ justifyContent: 'space-between' }}>
                    {this.props.hideControls && (
                        <div className='header_title'><s>{this.props.data.title}</s></div>
                    )}
                    {!this.props.hideControls && (
                        <div className='header_title'>{this.props.data.title}</div>
                    )}
                    <div>{this.props.data.time}</div>
                </div>
                <div className='row flex_1' style={{ justifyContent: 'space-between', maxHeight: 'none' }}>
                    <div className='badge'>{this.props.data.priority.name}</div>
                    <div style={{ display: 'flex' }}>{this.props.data.tagVal.map(t => <span className='badge' style={{marginLeft: '5px'}}>{t.name}</span>)}</div>
                </div>
                {!this.props.hideControls && (
                    <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '10px'
                        }}
                    >
                        <button
                            className='btn'
                            onClick={() => this.props.editItem(this.props.data)}
                        >
                            Edit
                        </button>
                        <button
                            className='btn'
                            onClick={() => this.props.deleteItem(this.props.data)}
                            style={{marginLeft: '5px'}}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default ToDoItem