"use client"
import Task from './Task';
import { useEffect, useState } from 'react';

import { TaskProps } from './Task';

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    // console.log("getting tasks")
    getAllTasks()
  }, [])

  // TODO: refresh task list after adding a new task
  async function getAllTasks() {
    try {
      const response = await fetch('/api/task', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const responseData = await response.json();
      // console.log(typeof responseData[0].createdAt)
      setTasks(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex flex-col gap-y-5 bg-[grey] px-5 py-5 rounded-lg w-[50rem]'>
      {tasks.map((task) => {
      const createdAt = new Date(task.createdAt ? task.createdAt : 0);
      const updatedAt = new Date(task.updatedAt? task.updatedAt : 0);
      return (
        <Task key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          date={createdAt.toLocaleDateString()}
          time={createdAt.toLocaleTimeString()}
          complete={task.complete}
          createdAt={createdAt.toString()}
          updatedAt={updatedAt.toString()}
        />
      );
    })}
    </div>
  )
}

export default Tasks;