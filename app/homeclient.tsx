"use client"
import TaskDialog from './home/AddTaskDialog';
import {useState } from 'react';
interface StylableProps{
  className?: string;
}

interface HomeClientProps {
  children: JSX.Element;
}

export default function HomeClient({ children, }: {children: React.ReactNode}) {
  const AddIcon:React.FC<StylableProps> = () => {
    return(
      <svg className="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 1v16M1 9h16"/>
      </svg>
    )
  }  
  const [showModal, setShowModal] = useState(false);

  const handleAddTaskClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <main className='flex flex-col justify-center items-center py-[4rem] '>
      <div className='mb-[4rem]'>
        <h1 className="text-4xl font-bold">
          MyTodo, not only a Todo List App
        </h1>
        <h2 className='text-2xl text-[#b04141]'>
          A TodoList App made just for you.
        </h2> 
      </div>
      <div className='flex gap-x-9 items-center justify-center mb-[2rem] bg-[grey] hover:bg-[white] text-[white] hover:text-black hover:border-[5px] py-[1rem] px-[1rem] rounded-lg cursor-pointer' onClick={handleAddTaskClick}>        
        <AddIcon />
        <h2 className='text-2xl font-medium'>Add a new task</h2>
      </div>
      {children}

      {showModal && (
        <TaskDialog onClose={handleModalClose}></TaskDialog>
      )}
      {/* <Tasks/> */}
      
    </main>
  )
}
