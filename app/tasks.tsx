import prisma from '@/lib/prisma';
import Task from './task';

// async function getAllTasks(){
//     return await prisma.task.findMany()
// }

const Tasks = async () => {
    const tasks = await prisma.task.findMany();
    console.log(tasks[0].createdAt.toLocaleDateString())
    console.log(tasks[0].createdAt.toLocaleTimeString())
    return (
        <div className='flex flex-col gap-y-5 bg-[grey] px-5 py-5 rounded-lg w-[50rem]'>
            {tasks.map((task) => 

            <Task key={task.id}
                task_name={task.title}
                description={task.description}
                date={task.createdAt.toLocaleDateString()}
                time={task.createdAt.toLocaleTimeString()}/>
            )}
        </div>
    )
}

export default Tasks;