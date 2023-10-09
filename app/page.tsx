import Image from 'next/image'
import AddCircleIcon from '@mui/icons-material/AddCircle'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import { UploadForm } from './UploadForm';
import { list } from 'postcss';

export default function Home() {
  interface TaskProps{
    task_name: string;
    description?: string;
    deadline?: string;
  }
  const Task:React.FC<TaskProps> = ({task_name, description, deadline}) => {
    return(
      <div className='relative group bg-[black] hover:bg-white text-[white] hover:text-black px-[1rem] hover:border-black hover:border-[2px] py-[1rem] rounded-lg'>
        <DeleteIcon className='hidden group-hover:block absolute top-[1rem] right-[1rem] cursor-pointer' color='secondary'></DeleteIcon>
        <EditIcon className='hidden group-hover:block absolute top-[1rem] right-[3rem] cursor-pointer'></EditIcon>
        <PushPinIcon className='hidden group-hover:block absolute top-[1rem] right-[5rem] cursor-pointer'></PushPinIcon>
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
      <div className='flex gap-x-9 items-center justify-center mb-[2rem] bg-[grey] hover:bg-[white] text-[white] hover:text-[black] hover:border-[5px] py-[.5rem] px-[1rem] rounded-lg cursor-pointer'>        
        <AddCircleIcon className='h-[50px] w-[50px]' />
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
    </main>
  )
}
