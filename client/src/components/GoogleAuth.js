import React from 'react';
import { signIn, signOut } from '../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class GoogleAuth extends React.Component {
    async componentDidMount() {
        await window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '356171366882-4j28c4os8c37eijlijlr096o7k5cks8n.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignIn = () => {
        this.props.fetchTasks();
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderCreateButtion() {
        if (this.props.isSignedIn) {
            return (
                <Link to="/tasks/new" className="ui button primary">
                    Add Task
                </Link>
            )
        }
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>
            )
        }
    }
    render() {
        return <div>{this.renderCreateButtion()}{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);