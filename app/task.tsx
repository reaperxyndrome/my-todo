import { twMerge } from 'tailwind-merge';

interface StylableProps{
    className?: string;
}

interface TaskProps{
    task_name: string;
    description?: string;
    date?: string;
    time?: string;
}

const DeleteIcon:React.FC<StylableProps> = ({className}) => {
    return(
        <svg className= {twMerge("w-6 h-6 text-[red]", className)}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
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
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
        </svg>
    )
}

const IconGroup: React.FC = () => (
  <>
    <DeleteIcon className='hidden group-hover:block absolute top-[1rem] right-[1rem] cursor-pointer'></DeleteIcon>
    <EditIcon className='hidden group-hover:block absolute top-[1rem] right-[3rem] cursor-pointer'></EditIcon>
    <StarOutlineIcon className='hidden group-hover:block absolute top-[1rem] right-[5rem] cursor-pointer'></StarOutlineIcon>
  </>
)

const TaskDetail: React.FC<{ detail?: string }> = ({ detail }) => (
  detail && <p className='mt-[1rem]'>{detail}</p>
)

const Task:React.FC<TaskProps> = ({task_name, description, date, time}) => {
    return(
      <div className='relative group bg-[black] hover:bg-white text-[white] hover:text-black px-[1rem] hover:border-black hover:border-[2px] py-[1rem] rounded-lg'>
        <IconGroup/>
        <h3 className='font-bold'>{task_name}</h3>
        <TaskDetail detail={description} />
        <div className='flex gap-x-4 justify-end'>
          <TaskDetail detail={date} />
          <TaskDetail detail={time} />  
        </div>
      </div>
    )
  }

export default Task;