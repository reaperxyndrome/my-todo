"use client"
import React, {useContext, useState } from "react";
import { RefreshTasksContext } from "../context";
import { TaskProps } from "./Task";
// import prisma from "@/lib/prisma";

interface StylableProps{
    className?: string;
}

interface TaskDialogProps extends StylableProps {
    closeTaskDialog: () => void;
}

const CloseIcon = () => {
  return(
    <svg className="w-6 h-6 text-[red]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  )
}

async function PostTaskServer(task: TaskProps) {
  try{
    console.log('Sending task to server:', task);
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error){
    console.error(error)
  }
}

const TaskForm:React.FC<{ closeTaskDialog: Function }> = ({closeTaskDialog}) => {
  const [task, setTask] = useState<TaskProps>({
    title: '',
    description: '',
    date: '',
    time: '',
    complete: false
  })
  
  const refreshTasks = useContext(RefreshTasksContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    await PostTaskServer(task)
    refreshTasks()
    closeTaskDialog()
  }

  return(
    <form onSubmit={handleSubmit} className='flex flex-col p-4'>
      <input type='text' name="title" onChange={handleChange}
        required 
        placeholder='Task name'
        value={task.title}
        className='border border-gray-400 p-2 mb-4 rounded-lg w-full' ></input>
      <textarea name="description" onChange={handleChange} 
        placeholder='Task description' 
        value={task.description} 
        className='border border-gray-400 p-2 mb-4 rounded-lg w-full' />
      <div className='flex justify-between mb-4'>
        <input type='date' name="date" value={task.date} onChange={handleChange} className="cursor-pointer"/>
        <input type='time' name="time" value={task.time} onChange={handleChange} className="cursor-pointer"/>
      </div>
      <input type="submit" value="Add Task"
        className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer'/>
    </form>
  )
}


// Create a new component for the dialog header
const DialogHeader: React.FC<{ closeTaskDialog: Function }> = ({ closeTaskDialog }) => (
  <div className='flex justify-between items-center px-4 py-4 border-b'>
    <h2 className='text-2xl font-medium'>Add a new task</h2>
    <button onClick={() => closeTaskDialog()}>
      <CloseIcon></CloseIcon>
    </button>
  </div>
)

const AddTaskDialog:React.FC<TaskDialogProps> = ({className, closeTaskDialog}) => {
  return(
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
      <div className='absolute w-full h-full bg-gray-900 opacity-50'
       onClick={closeTaskDialog}/>
      <div className='absolute z-100 bg-white rounded-lg w-1/3 px-2 py-2'>
        <DialogHeader closeTaskDialog={closeTaskDialog}/>
        <TaskForm closeTaskDialog={closeTaskDialog}></TaskForm>
      </div>
    </div>
  )
}

export default AddTaskDialog;