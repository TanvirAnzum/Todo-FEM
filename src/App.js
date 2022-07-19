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

  const [activeElem, setActiveElem] = useState(null);

  

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
    if (task) {
      setTaskList([newTask, ...taskList]);
      setDisplayTask([newTask, ...displayTask]);
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

  const showCompletedTask = (event) => {
    const target = event.target;
    if(!activeElem) {
      const all_btn = document.querySelector('.all');
      all_btn.classList.remove('active');
      target.classList.add('active');
      setActiveElem(target);
    }
    else {
      activeElem.classList.remove("active");
      target.classList.add("active");
      setActiveElem(target);
    }


    const Ctask = taskList.filter(task => task.isFinished === true);
    setDisplayTask([...Ctask]);
  };

  const showActiveTask = (event) => {
    const target = event.target;

    if(!activeElem) {
      const all_btn = document.querySelector('.all');
      all_btn.classList.remove('active');
      target.classList.add('active');
      setActiveElem(target);
    }
    else {
      activeElem.classList.remove("active");
      target.classList.add("active");
      setActiveElem(target);
    }


    const Atask = taskList.filter(task => task.isFinished === false);
    setDisplayTask([...Atask]);
  };

  const showAllTask = (event) => {
    const target = event.target;
    
    if(activeElem) {
      activeElem.classList.remove("active");
      target.classList.add("active");
      setActiveElem(target);
    }
    

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
        <span className={isPressed ? "circle bg" : "circle"} onClick={() => setIsPressed(true)}>
          <img className={isPressed ? "check-1-up" : "check-1"} src={iconCheck} alt="check icon" />
        </span>
        <input
          type="text"
          value={task}
          placeholder="Create a new todo..."
          onChange={(e) => setTask(e.target.value)}
        />
      </form>
      <ul>
        {displayTask.map((task) => (
          <li>
            <span
              className={task.isFinished ? "list-circle bg" : "list-circle"}
              onClick={() => markedCompleted(task.id)}
            ><img className={task.isFinished ? 'check-2-up' : 'check-2'} src={iconCheck} alt="" /></span>
            <p className={task.isFinished ? 'task line-through' : 'task'}>{task.content}</p>
            <span onClick={() => deleteTask(task.id)}>
              <img className="cross-img" src={iconCross} alt="cross icon" />
            </span>
          </li>
        ))}
      </ul>
      <div className="app-footer">
        <p>{taskList.filter(task => task.isFinished === false).length} items left</p>
        <span>
          <button className="btn active all" onClick={(event) => showAllTask(event)}>
            All
          </button>
          <button className="btn" onClick={(event) => showActiveTask(event)}>
            Active
          </button>
          <button className="btn" onClick={(event) => showCompletedTask(event)}>
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
