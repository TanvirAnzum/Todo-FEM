/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import './App.css';
import iconCheck from './images/icon-check.svg';
import iconCross from './images/icon-cross.svg';
import iconMoon from './images/icon-moon.svg';
import iconSun from './images/icon-sun.svg';

function App() {
  const [themeStatus, setThemeStatus] = useState(true);
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const [isPressed, setIsPressed] = useState(false);

  const [displayTask, setDisplayTask] = useState([]);

  const changeTheme = () => {
    if (themeStatus) setThemeStatus(false);
    else setThemeStatus(true);
  };

  const addTask = (event) => {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      content: task,
      isFinished: false,
    };
    newTask.isFinished = isPressed ? true : false;
    if(task) {
      setTaskList([newTask,...taskList]);
      setDisplayTask([newTask,...displayTask]);
      setTask('');
      setIsPressed(false);
    }
    else {
      alert("Fields cannot be empty!!");
    }
  };

  const clearCompletedTask = () => {
    const afterDeletion = displayTask.filter(
      (task) => task.isFinished === false
    );
    setTaskList(afterDeletion);
    setDisplayTask(afterDeletion);
  };

  const showCompletedTask = () => {
    const Ctask = taskList.filter(task => task.isFinished === true);
    setDisplayTask([...Ctask]);
  };

  const showActiveTask = () => {
    const Atask = taskList.filter(task => task.isFinished === false);
    setDisplayTask([...Atask]);
  };

  const showAllTask = () => {
    setDisplayTask(taskList);
  };

  const deleteTask = (id) => {
    const tobeDeleted = taskList.filter((task) => task.id !== id);
    setTaskList(tobeDeleted);
    setDisplayTask(tobeDeleted);
  };

  const markedCompleted = (id) => {
    const tobeMarked = taskList.find((task) => task.id === id);
    tobeMarked.isFinished = true;
    setTaskList([...taskList]);
  };


  return (
    <div className="App">
      <div className="App-header">
        <h1 className="Header-title">TODO</h1>
        <div className="Header-theme" onClick={changeTheme}>
          <img
            src={themeStatus ? iconSun : iconMoon}
            alt="theme icon"
            id="img"
          />
        </div>
      </div>
      <form
        onSubmit={(event) => {
          addTask(event);
        }}
      >
        <span className="circle" onClick={() => setIsPressed(true)}>
          <img className="check-1" id={task.id} src={iconCheck} alt="check icon" />
        </span>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </form>
      <ul>
        {displayTask.map((task) => (
          <li>
            <span
              className={task.isFinished ? "list-circle bg":"list-circle" }
              onClick={() => markedCompleted(task.id)}
            ><img className={task.isFinished ? 'check-2-up' : 'check-2'} src={iconCheck} alt="" /></span>
            <p className="task">{task.content}</p>
            <span onClick={() => deleteTask(task.id)}>
              <img className="cross-img" src={iconCross} alt="cross icon" />
            </span>
          </li>
        ))}
      </ul>
      <div className="app-footer">
        <p>{taskList.filter(task => task.isFinished === false).length} items left</p>
        <span>
          <button className="btn" onClick={showAllTask}>
            All
          </button>
          <button className="btn" onClick={showActiveTask}>
            Active
          </button>
          <button className="btn" onClick={showCompletedTask}>
            Completed
          </button>
        </span>

        <button className="btn" onClick={clearCompletedTask}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
