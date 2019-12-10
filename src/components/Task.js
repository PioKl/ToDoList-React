import React from 'react';
/* import '../Task.scss'; */
import '../styles/Task.scss';

const Task = (props) => {

    /*     const style = {
            textDecoration: 'line-through',
        } */

    return (
        <form className="taskItemContainer">
            <li className="taskItem" onClick={() => props.handleCheckTask(props.id)} >
                <strong className={props.checked ? 'checkItem' : null}>{props.text}</strong>
                {/* <strong style={props.checked ? style : null}>{props.text}</strong> */}
            </li>
            <button className="removeTaskItemButton" onClick={() => props.handleDeleteTask(props.id)}></button>
        </form>
    );
}

export default Task;