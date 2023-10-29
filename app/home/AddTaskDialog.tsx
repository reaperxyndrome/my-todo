// import { useState } from "react";

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

const TaskDialog:React.FC<TaskDialogProps> = ({className, onClose}) => {
  return(
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
        <div className='absolute w-full h-full bg-gray-900 opacity-50' onClick={onClose}></div>
        <div className='absolute z-100 bg-white rounded-lg w-1/3 px-2 py-2'>
          <div className='flex justify-between items-center px-4 py-4 border-b'>
            <h2 className='text-2xl font-medium'>Add a new task</h2>
            <button onClick={() => onClose()}>
              <CloseIcon></CloseIcon>
            </button>
          </div>
          <div className='flex flex-col p-4'>
            <input type='text' placeholder='Task name' className='border border-gray-400 p-2 mb-4 rounded-lg w-full' />
            <textarea placeholder='Task description' className='border border-gray-400 p-2 mb-4 rounded-lg w-full' />
            <div className='flex justify-between mb-4'>
              <input type='date'></input>
              <input type='time'></input>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Add task</button>
          </div>
        </div>
      </div>
  )
}

export default TaskDialog;