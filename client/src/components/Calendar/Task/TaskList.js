import React from 'react';
import { Link } from 'react-router-dom';

class TaskList extends React.Component {
    renderUR(task) {
        return (
            <div className="right floated content">
                <Link to={`/tasks/edit/${task.id}`} className="ui button primary">Edit</Link>
                <Link to={`/tasks/delete/${task.id}`} className="ui button negative">Delete</Link>
            </div>
        )
    }
    renderTaskList() {
        return this.props.tasks.map(task => {
            return (
                <div className="list" key={task.id}>
                    {this.renderUR(task)}
                    <div className="header">{task.title}</div>
                    <div className="description">{task.content}</div>
                </div>
            )
        });
    }
    render() {
        return <div>{this.renderTaskList()}</div>
    }
}

export default TaskList;