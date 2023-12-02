import prisma from '@/lib/prisma';
import Task from './Task';

// async function getAllTasks(){
//     return await prisma.task.findMany()
// }

const Tasks = async () => {
  const tasks = await prisma.task.findMany();
  if (tasks.length > 0) {
    console.log(tasks[0].createdAt.toLocaleTimeString())
    console.log(tasks[0].createdAt.toLocaleDateString())
  } else {
    console.log('No tasks available');
  }
  return (
    <div className='flex flex-col gap-y-5 bg-[grey] px-5 py-5 rounded-lg w-[50rem]'>
      {tasks.map((task) => 

      <Task key={task.id}
        id={task.id}
        task_name={task.title}
        description={task.description}
        date={task.createdAt.toLocaleDateString()}
        time={task.createdAt.toLocaleTimeString()}/>
      )}
    </div>
  )
}

export default Tasks;