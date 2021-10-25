import { useRef } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = (props) => {
  const taskInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      // This is where the 'enteredValue' (the 'taskText' param gets passed to the 'enterTaskHandler')
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='text' ref={taskInputRef} />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
