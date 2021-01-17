import React from 'react';
import ToDoItem from '../components/TodoItem';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'whitesmoke',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    minHeight: 500,
});

class ToDoList extends React.Component{

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        var sourceData = source.droppableId === "droppable" ? this.props.data : this.props.doneList;
        var destData = source.droppableId === "droppable2" ? this.props.data : this.props.doneList;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                sourceData,
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
                this.props.setDoneList(items);
            } else {
                this.props.setToDoList(items);
            }
        } else {
            const result = move(
                sourceData,
                destData,
                source,
                destination
            );
            
            this.props.setToDoList(result.droppable);
            this.props.setDoneList(result.droppable2);

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    render(){
        return (
            <div className='todo_container'>
                <div style={{ display: 'flex' }}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div  className='dropBox'>
                        <div>Up Coming ({this.props.data.length})</div>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.data.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                                <ToDoItem  
                                                    editItem={this.props.editItem}
                                                    deleteItem={this.props.deleteItem}
                                                    data={item}
                                                />
                                            {/* {item.content} */}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                    </div>
                    <div  className='dropBox'>
                    <div>Done ({this.props.doneList.length})</div>
                    <Droppable droppableId="droppable2" className='dropBox'>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.doneList.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                                <ToDoItem 
                                                    hideControls 
                                                    data={item}
                                                />
                                            {/* {item.content} */}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
                </DragDropContext>
                </div>
            </div>
        )
    }
}

export default ToDoList