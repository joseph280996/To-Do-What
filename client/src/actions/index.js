import task from '../apis/tasks';
import history from '../history';
import {
    SIGN_IN, SIGN_OUT,
    CREATE_TASK, EDIT_TASK, FETCH_TASK, FETCH_TASKS
} from './types';

export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const fetchTasks = () => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await task.get(`/tasks/${userId}`);
    dispatch({ type: FETCH_TASKS, payload: response.data });
}

export const createTask = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await task.post('/tasks', { ...formValues, userId });
    dispatch({ type: CREATE_TASK, payload: response.data });
    history.push('/tasks');
}

export const fetchTask = id => async dispatch => {
    const response = await task.get(`/tasks/task/${id}`);

    dispatch({ type: FETCH_TASK, payload: response.data });
};

export const editTask = (id, formValues) => async dispatch => {
    const response = await task.patch(`/tasks/task/${id}`, formValues);

    dispatch({ type: EDIT_TASK, payload: response.data });
    history.push('/');
}
