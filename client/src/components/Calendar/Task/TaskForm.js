import React from 'react';
import { Field, reduxForm } from 'redux-form';

class TaskForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"></input>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter title" />
                <Field name="content" component={this.renderInput} label="Enter Content" />
                <Field name="date" component={this.renderInput} label="Enter Date (YYYY-MM-DD)" />
                <button className="ui button primary">Submit</button>
            </form>

        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) { errors.title = "You must enter a title"; }
    if (!formValues.content) { errors.content = "You must enter a content"; }
    if (!formValues.date) { errors.date = "You must enter a date"; }
    return errors;
}

export default reduxForm({
    form: 'taskForm',
    validate
})(TaskForm);