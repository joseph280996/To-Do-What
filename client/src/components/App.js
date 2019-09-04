import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import TaskShow from './Calendar/Task/TaskShow';
import TaskCreate from './Calendar/Task/TaskCreate';
import TaskEdit from './Calendar/Task/TaskEdit';
import TaskDelete from './Calendar/Task/TaskEdit';
import DateList from './Calendar/DateList';
import Header from './header';
import history from '../history';
import GoogleAuth from './GoogleAuth';

class App extends React.Component {
    state = { isSignedIn: false };
    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={GoogleAuth} />
                            <Route path="/tasks" exact component={DateList} />
                            <Route path="/tasks/new" exact component={TaskCreate} />
                            <Route path="/tasks/edit/:id" exact component={TaskEdit} />
                            <Route path="/tasks/delete/:id" exact component={TaskDelete} />
                            <Route path="/tasks/:id" exact component={TaskShow} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
};

export default App;