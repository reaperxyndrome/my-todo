import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';


"use client"
import Task from './Task';

import TaskDialog from './AddTaskDialog';

import { useState } from 'react';

export default function Home() {
  interface StylableProps{
    className?: string;
  }
  interface TaskProps{
    task_name: string;
    description?: string;
    date?: string;
    time?: string;
  }
  
  interface addTaskProps extends TaskProps{
    task_list: any[];
  }

  // function addTask(task_name: string, description :string, deadline: string) {
  //   var task = {
  //       task_name: task_name,
  //       description: description,
  //       deadline: deadline,
  //   };
  //   taskList.push(task);
  // }

  const AddIcon:React.FC<StylableProps> = () => {
    return(
        <svg className="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
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
      <div className='flex flex-col gap-y-5 bg-[grey] px-5 py-5 rounded-lg w-[50rem]'>
        <Task task_name='Task1'/>
        <Task task_name='Task2' description=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti labore debitis, ad eveniet accusantium optio amet fugiat? Rerum a pariatur libero! Accusantium perspiciatis a, assumenda non quasi modi quae?'/>
        <Task task_name='Task3'/>
        <Task task_name='Task4'/>
        <Task task_name='Task1'/>
        <Task task_name='Task2'/>
        <Task task_name='Task3'/>
        <Task task_name='Task4'/>
        <Task task_name='Task1'/>
        <Task task_name='Task2'/>
        <Task task_name='Task3'/>
        <Task task_name='Task4'/>
        <Task task_name='Task1'/>
        <Task task_name='Task2'/>
        <Task task_name='Task3'/>
        <Task task_name='Task4'/>
      </div>
      {showModal && (
        <TaskDialog onClose={handleModalClose}></TaskDialog>
      )}
    </main>
  )
}
