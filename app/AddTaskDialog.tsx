"use client"
import { ChangeEvent, useContext, useState } from "react";
import { RefreshTasksContext } from "./page";
import prisma from "@/lib/prisma";

interface StylableProps{
    className?: string;
}

interface TaskDialogProps extends StylableProps {
    onClose: () => void;
}

const CloseIcon = () => {
  return(
    <svg className="w-6 h-6 text-[red]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  )
}


const TaskForm:React.FC = () => {
  const [title, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const refreshTasks = useContext(RefreshTasksContext)
  async function createTask(e: React.FormEvent) {
    try{
      e.preventDefault();
      const task = {title, description, date, time, complete: false}
      console.log('Sending task to server:', task);
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // const responseData = await response.json();
      // console.log(responseData)
      refreshTasks()
    } catch (error){
      console.error(error)
    }
  }

  return(
    // TODO: refresh task list after adding a new task
    <form onSubmit={createTask} className='flex flex-col p-4'>
      <input type='text' onChange={(e) => setTaskName(e.target.value)}
        required 
        placeholder='Task name'
        className='border border-gray-400 p-2 mb-4 rounded-lg w-full' ></input>
      <textarea onChange={(e) => setDescription(e.target.value)} 
        placeholder='Task description' 
        value={description} 
        className='border border-gray-400 p-2 mb-4 rounded-lg w-full' />
      <div className='flex justify-between mb-4'>
        <input type='date' onChange={(e) => setDate(e.target.value)} className="cursor-pointer"/>
        <input type='time' onChange={(e) => setTime(e.target.value)} className="cursor-pointer"/>
      </div>
      <input type="submit" value="Add Task"
        className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer'/>
    </form>
  )
}


// Create a new component for the dialog header
const DialogHeader: React.FC<{ onClose: Function }> = ({ onClose }) => (
  <div className='flex justify-between items-center px-4 py-4 border-b'>
    <h2 className='text-2xl font-medium'>Add a new task</h2>
    <button onClick={() => onClose()}>
      <CloseIcon></CloseIcon>
    </button>
  </div>
)

const AddTaskDialog:React.FC<TaskDialogProps> = ({className, onClose}) => {
  return(
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
      <div className='absolute w-full h-full bg-gray-900 opacity-50'
       onClick={onClose}/>
      <div className='absolute z-100 bg-white rounded-lg w-1/3 px-2 py-2'>
        <DialogHeader onClose={onClose}/>
        <TaskForm></TaskForm>
      </div>
    </div>
  )
}

export default AddTaskDialog;