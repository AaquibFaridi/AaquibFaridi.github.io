import React, { useState } from 'react'
import Sidebar from 'react-sidebar'
import { ContextLayout } from 'utility/context/Layout'
import DiarySidebar from './DiarySidebar'
import DiaryList from './DiaryList'
import TaskSidebar from './TaskSidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'assets/scss/plugins/extensions/toastr.scss'
import 'assets/scss/pages/app-todo.scss'
const mql = window.matchMedia(`(min-width: 992px)`)

const Diary = (props) => {
  const [addTask, setaddTask] = useState(false)
  const [sidebarOpen, setsidebarOpen] = useState(false)
  const [taskToUpdate, settaskToUpdate] = useState(null)
  const [prevState, setprevState] = useState(null)

  const onSetSidebarOpen = (open) => {
    setsidebarOpen(open)
  }

  const handleAddTask = (status) => {
    if (status === 'open') setaddTask(true)
    else {
      setaddTask(false)
      settaskToUpdate(null)
    }
  }
  const handleUpdateTask = (todo) => {
    if (todo !== undefined) {
      setaddTask(true)
      settaskToUpdate(todo)
    } else {
      settaskToUpdate(null)
    }
  }

  const handleUndoChanges = () => {
    setprevState(true)
  }

  return (
    <div>
      <ToastContainer />
      <h2 className="warning spacing nodisplay">Secret Diary</h2>
      <div className="todo-application position-relative">
        <div
          className={`app-content-overlay ${
            addTask || sidebarOpen ? 'show' : ''
          }`}
          onClick={() => {
            handleAddTask('close')
            onSetSidebarOpen(false)
          }}
        />
        <ContextLayout.Consumer>
          {(context) => (
            <Sidebar
              sidebar={
                <DiarySidebar
                  routerProps={props}
                  addTask={handleAddTask}
                  mainSidebar={onSetSidebarOpen}
                />
              }
              docked={mql.matches}
              open={sidebarOpen}
              sidebarClassName="sidebar-content todo-sidebar d-flex"
              touch={false}
              contentClassName="sidebar-children d-none"
              pullRight={context.state.direction === 'rtl'}
            ></Sidebar>
          )}
        </ContextLayout.Consumer>
        <DiaryList
          routerProps={props}
          handleUpdateTask={handleUpdateTask}
          mainSidebar={onSetSidebarOpen}
          prevState={prevState}
          clearPrevState={() => {
            setprevState(false)
          }}
        />
        <TaskSidebar
          addTask={handleAddTask}
          addTaskState={addTask}
          taskToUpdate={taskToUpdate}
          mainSidebar={onSetSidebarOpen}
          handleUndoChanges={handleUndoChanges}
        />
      </div>
    </div>
  )
}

export default Diary
