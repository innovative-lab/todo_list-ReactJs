import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

class ToDoFilter extends React.Component{

    render(){
        return (
            <div className='row filter_container'>
                <div className='flex_1' style={{ display: 'flex'}}>
                        <label className="field_title">Select Tag</label>
                        <DropdownList
                            data={this.props.tagFields}
                            textField='name'
                            onChange={priority => this.setState({ priority })}
                            containerClassName='dropdown'
                        />
                </div>
                {/* <div className='flex_1' style={{ display: 'flex'}}>
                        <label className="field_title">Priority</label>
                        <DropdownList
                            data={this.props.tagFields}
                            textField='name'
                            onChange={priority => this.setState({ priority })}
                            containerClassName='dropdown'
                        />
                </div> */}
                <button className='btn'>Apply</button>
            </div>
        )
    }
}

export default ToDoFilter;