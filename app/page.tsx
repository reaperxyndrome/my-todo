import Image from 'next/image'
import PushPinIcon from '@mui/icons-material/PushPin';
// import { UploadForm } from './UploadForm';
// import { list } from 'postcss';

"use client"
import { twMerge } from 'tailwind-merge';

import { useState } from 'react';


export default function Home() {
  interface StylableProps{
    className?: string;
  }
  interface TaskProps{
    task_name: string;
    description?: string;
    deadline?: string;
  }


  
  const Task:React.FC<TaskProps> = ({task_name, description, deadline}) => {
    const DeleteIcon:React.FC<StylableProps> = ({className}) => {
      return(
        <svg className= {twMerge("w-6 h-6 text-[red]", className)}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
        </svg>
      )
    }
    const EditIcon:React.FC<StylableProps> = ({className}) => {
      return(
        <svg className={twMerge("w-6 h-6 text-gray-400", className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"> 
          <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
          <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
        </svg>
      ) 
    }

    const StarOutlineIcon:React.FC<StylableProps> = ({className}) => {
      return(
        <svg className={twMerge("w-6 h-6 hover:text-[green]", className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
        </svg>
      )
    }


    return(
      <div className='relative group bg-[black] hover:bg-white text-[white] hover:text-black px-[1rem] hover:border-black hover:border-[2px] py-[1rem] rounded-lg'>
        <DeleteIcon className='hidden group-hover:block absolute top-[1rem] right-[1rem] cursor-pointer'></DeleteIcon>
        <EditIcon className='hidden group-hover:block absolute top-[1rem] right-[3rem] cursor-pointer'></EditIcon>
        <StarOutlineIcon className='hidden group-hover:block absolute top-[1rem] right-[5rem] cursor-pointer'></StarOutlineIcon>
        <h3 className='font-bold'>{task_name}</h3>
        {
          description && 
          <p className='mt-[1rem]'>{description}</p>
        }
      </div>
    )
  }


  let taskList = []
  
  interface addTaskProps extends TaskProps{
    task_list: any[];
  }

  function addTask(task_name: string, description :string, deadline: string) {
    var task = {
        task_name: task_name,
        description: description,
        deadline: deadline,
    };
    taskList.push(task);
  }

  const AddIcon:React.FC<StylableProps> = ({className}) => {
    return(
        <svg className={twMerge("w-6 h-6", className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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
  
  const ModalDialog:React.FC<StylableProps> = ({className}) => {
    return(
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='absolute w-full h-full bg-gray-900 opacity-50' onClick={handleModalClose}></div>
          <div className='absolute z-100 bg-white rounded-lg w-1/3'>
            <div className='flex justify-between items-center px-4 py-2 border-b'>
              <h2 className='text-lg font-medium'>Add a new task</h2>
              <button onClick={handleModalClose}>
                <div className='w-6 h-6 cursor-pointer bg-[red]' />
              </button>
            </div>
            <div className='p-4'>
              <input type='text' placeholder='Task name' className='border border-gray-400 p-2 mb-4 rounded-lg w-full' />
              <textarea placeholder='Task description' className='border border-gray-400 p-2 mb-4 rounded-lg w-full' />
              <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Add task</button>
            </div>
          </div>
        </div>
    )
  }
  return (
    <main className='flex flex-col justify-center items-center py-[4rem] '>
      {/* <UploadForm></UploadForm> */}
      {/* <form>
        <input type='time'></input>
      </form> */}
      <div className='mb-[4rem]'>
        <h1 className="text-4xl font-bold">
          MyTodo, not only a Todo List App
        </h1>
        <h2 className='text-2xl text-[#b04141]'>
          A TodoList App made just for you.
        </h2> 
      </div>
      <div className='flex gap-x-9 items-center justify-center mb-[2rem] bg-[grey] hover:bg-[white] text-[white] hover:text-black hover:border-[5px] py-[1rem] px-[1rem] rounded-lg cursor-pointer' onClick={handleAddTaskClick}>        
        <AddIcon className='w-[30px] h-[30px] ' />
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
        <ModalDialog></ModalDialog>
      )}
    </main>
  )
}
