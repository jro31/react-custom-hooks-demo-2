import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: 'https://react-http-94026-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText },
    }, createTask.bind(null, taskText));
    // The first argument in 'bind' sets the 'this' keyword in the executed function. As we don't care about that, we can pass 'null'.
    // The second argument passed to bind, will be the first argument to be received by the 'to be called' function ('createTask' here)
    // Any other arugments passed by the place where the function is actually being called, will then be appended to these arguments
    // In this instance, the 'taskData' parameter, required by the 'createTask' function, is set when the function is called
    // (the 'data' argument in 'applyData(data);' in 'use-http.js')
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
