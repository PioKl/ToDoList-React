import React from 'react';
import Task from './Task';
/* import '../TaskList.scss'; */
import '../styles/TaskList.scss';

const TaskList = (props) => {

    const tasks = props.tasks.map(task => <Task key={task.id} text={task.text} id={task.id} checked={task.checked} handleDeleteTask={props.handleDeleteTask} handleCheckTask={props.handleCheckTask} />);
    return (
        <div className="taskListPanel">
            <ul className="taskList">{tasks}</ul>
        </div>
    );
}

export default TaskList;