"use client"
import { twMerge } from 'tailwind-merge';
import { MouseEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface StylableProps{
    className?: string;
}

export interface TaskProps{
  id?: string,
  title?: string;
  task_name?: string,
  description?: string;
  date?: string;
  time?: string;
  complete?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface IconProps extends StylableProps{
  onClick: () => Promise<void>;
}

interface DeleteIconProps extends StylableProps{
  id?: string
}

interface ClickableIconProps extends StylableProps{
  id?: string,
  onClick: MouseEventHandler<SVGElement>,
}

// TODO: refactor the icons into buttons
const DeleteIcon:React.FC<DeleteIconProps> = ({className, id}) => {
  const handleDelete = async () => {
    console.log("Deleting task")
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      console.log('Received response from server:', response.json());
      // comment window.location.reload() to debug
      window.location.reload();
      // Handle successful deletion (e.g., refresh the page or remove the task from state)
    } catch (error) {
      console.error(error);
    }
  };
  
  return(
    <svg className= {twMerge("w-6 h-6 text-[red]", className)}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20" onClick={handleDelete}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
    </svg>
  )
}

const EditIcon:React.FC<ClickableIconProps> = ({className, onClick}) => {
  return(
    <svg onClick={onClick} className={twMerge("w-6 h-6 text-gray-400", className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"> 
      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
    </svg>
  ) 
}

// refactor this icon into a button
const StarOutlineIcon:React.FC<StylableProps> = ({className}) => {
  return(
    <svg className={twMerge("w-6 h-6 hover:text-[green]", className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
    </svg>
  )
}


const CheckIcon:React.FC<ClickableIconProps> = ({className, onClick}) => {
  
  return(
    <svg className={twMerge("w-6 h-6 hover:text-[green]", className)} xmlns="http://www.w3.org/2000/svg" fill="currentColor" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 305.002 305.002" onClick={onClick}>
      <g>
        <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5    S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5    c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
        <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678    l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385    c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/>
      </g>
    </svg>
  )
}

interface IconGroupProps{
  id?:string,
  handleEditClick: MouseEventHandler<SVGElement>
  handleComplete: MouseEventHandler<SVGElement>
}

const IconGroup: React.FC<IconGroupProps> = ({id, handleEditClick, handleComplete}) => (
  <>
    <DeleteIcon className='hidden group-hover:block absolute top-[1rem] right-[1rem] cursor-pointer' id={id}></DeleteIcon>
    <EditIcon className='hidden group-hover:block absolute top-[1rem] right-[3rem] cursor-pointer' id={id} onClick={handleEditClick}></EditIcon>
    <StarOutlineIcon className='hidden group-hover:block absolute top-[1rem] right-[5rem] cursor-pointer'></StarOutlineIcon>
    <CheckIcon className='hidden group-hover:block absolute top-[1rem] right-[7rem] cursor-pointer' onClick={handleComplete}></CheckIcon>
  </>
)

const TaskDetail: React.FC<{ detail?: string }> = ({ detail }) => (
  detail && <p className='mt-[1rem]'>{detail}</p>
)

interface TaskReadMode {
  task: TaskProps
}
const TaskReadMode: React.FC<TaskReadMode>= ({task}) => {
  return(
    <>
      <h3 className='font-bold'>{task.title}</h3>
      <TaskDetail detail={task.description} />
      <div className='flex gap-x-4 justify-end'>
        <TaskDetail detail={task.date} />
        <TaskDetail detail={task.time} />  
      </div>
    </>
  )
}

interface TaskEditModeProps{
  editedTask: TaskProps,
  eventHandlers: {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleInputFocus: () => void,
    handleInputBlur: () => void,
  }

}
const TaskEditMode:React.FC<TaskEditModeProps> = ({editedTask, eventHandlers}) => {
  const formFields = [
    { id: 'title', label: 'Task Name', value: editedTask.title, type: 'text' },
    { id: 'description', label: 'Description', value: editedTask.description, type: 'text' },
    { id: 'date', label: 'Date', value: editedTask.date, type: 'text' },
    { id: 'time', label: 'Time', value: editedTask.time, type: 'text' },
  ];
  return(
    <form>
      <div className='flex flex-col gap-y-[2px]'>
      {formFields.map(field => (
        <div className='flex justify-between w-[330px]' key={field.id}>
          <label htmlFor={field.id} className='font-bold'>
            {field.label}:
          </label>
          <input
            id={field.id}
            type={field.type}
            name={field.id}
            value={field.value}
            onChange={eventHandlers.handleInputChange}
            onFocus={eventHandlers.handleInputFocus}
            onBlur={eventHandlers.handleInputBlur}
            className='bg-transparent'
          />
        </div>
      ))}
      </div>
    </form>
  )
}

// TODO: handle complete task
const Task:React.FC<TaskProps> = ({id, title, description, date, time, complete}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title, description, date, time, complete });
  // const [initialTask, setInitialTask] = useState({ task_name, description, date, time });
  const task = {title, description, date, time, complete}

  const handleEditClick:MouseEventHandler<SVGElement> = () => {
    editTimeoutRef.current = setTimeout(() => {
      // Code to execute when the timer ends
      setIsEditing(false)
      setEditedTask(task)
    }, 2000);
    setIsEditing(true);
  };

  const handleComplete:MouseEventHandler<SVGElement> = () => {
      setEditedTask({...task, complete: true});
      console.log("Task completed: ", id, "complete:", editedTask.complete)
      // handleSaveTask()
  };

  

  useEffect(() => {
    console.log(isEditing ? `Editing task ${id}` : `Reading task ${id}`)
    console.log(editedTask)
  }, [isEditing, editedTask, id])

  const editTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInputFocusedRef = useRef(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed")
    setEditedTask({ ...editedTask, [event.target.name]: event.target.value });
    console.log(event.target.name, event.target.value)
  };

  const handleInputFocus = () => {
    isInputFocusedRef.current = true;
    if (editTimeoutRef.current) {
      clearTimeout(editTimeoutRef.current);
      editTimeoutRef.current = null;
    }
  };

  const handleInputBlur = () => {
    isInputFocusedRef.current = false;
    // Start a timeout to end edit mode
    editTimeoutRef.current = setTimeout(() => {
      if (!isInputFocusedRef.current) {
        // Save the edited task here
        setIsEditing(false);
        setEditedTask(task);
        console.log(`Task ${id} in read mode`)
      }
    }, 500);
  };

  // const [taskSaved, setTaskSaved] = useState(false);

  const handleSaveTask = useCallback(async () => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'PUT', // or 'PUT' if you're updating an existing task
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save task');
      }
  
      const data = await response.json();
      console.log('Saved task client successful:', data);
      // setTaskSaved(true)
      // window.location.reload();

    } catch (error) {
      console.error('Error:', error);
    }
    // // Clear the timeout if it's still running
    if (editTimeoutRef.current) {
      clearTimeout(editTimeoutRef.current);
    }
  
    // Switch back to read mode
    setIsEditing(false);
  }, [editedTask, id]);

  useEffect(() => {
    return () => {
      // Clean up the timeout when the component unmounts
      if (editTimeoutRef.current) {
        clearTimeout(editTimeoutRef.current);
      }
    };
  }, []);

  const eventHandlers = {handleInputChange, handleInputFocus, handleInputBlur}

  return(
    <div className='relative group bg-[black] hover:bg-white text-[white] hover:text-black px-[1rem] hover:border-black hover:border-[2px] py-[1rem] rounded-lg'>
      <IconGroup id={id} handleEditClick={handleEditClick} handleComplete={handleComplete}/>
      {isEditing ? (
        <div className='flex flex-col gap-y-2'>
          <TaskEditMode editedTask={editedTask} eventHandlers={eventHandlers}/>
          <button className='self-end bg-[#c85454] p-2 rounded-md w-[120px]' onClick={handleSaveTask}>Save Task</button>
        </div>
        
      ) : (
        <TaskReadMode task={task}/>
      )}
    </div>
  )
}

export default Task;