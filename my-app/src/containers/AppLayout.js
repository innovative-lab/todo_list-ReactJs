import React from 'react'

class AppLayout extends React.Component{

    render(){
        return (
            <div className="AppLayout">
                <div className="app_title">ToDo List</div>
                {this.props.children}
            </div>
        )
    }
}

export default AppLayout;