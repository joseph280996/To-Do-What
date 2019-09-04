import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions'
import TaskList from './Task/TaskList';

class DateList extends React.Component {
    constructor() {
        super();
        this.props.fetchTasks();
    }
    renderList() {
        let display = [];
        this.props.dates.forEach((key, val) => {
            display.push(
                <div className="item" key={val}>
                    <div className="content">
                        <div className="header">{new Date(val).toLocaleDateString('en-US')}</div>
                        <TaskList tasks={key} />
                    </div>
                </div>
            )
        })
        return display;
    }

    render() {
        if (this.props.isSignedIn === null) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        } else if (this.props.isSignedIn === false) {
            return (
                <div>
                    <h2>Please Sign In</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Things To Do</h2>
                    <div className="ui celled list">{this.renderList()}</div>
                </div>);
        }
    }
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    })
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

const mapStateToProps = (state) => {
    return {
        dates: groupBy(Object.values(state.tasks), task => task.date),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, { fetchTasks })(DateList);