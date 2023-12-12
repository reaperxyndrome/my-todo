"use client"
import AddTaskDialog from './AddTaskDialog';
import {Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import Tasks from "./Tasks"
import { TaskProps } from './Task';
interface StylableProps{
  className?: string;
}

export default function HomePage() {
  const AddIcon:React.FC<StylableProps> = () => {
    return(
      <svg className="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 1v16M1 9h16"/>
      </svg>
    )
  }  
  const [showAddTask, setShowModal] = useState(false);
  // const completedTaskCount
  const getCompletedTaskCount = async () => {
    try {
      const res = await fetch('/api/task/count_complete', {
        method: 'GET',
      })
      // handle the error
      if (!res.ok) throw new Error("Failed to get count of completed tasks")
      const completedCount = await res.json()
      // console.log(completedCount)
      setPoints(completedCount)
      return completedCount
    } catch (e: any) {
      // Handle errors here
      console.error(e)
      return 0; // return a default value in case of an error
    }
  }
  // const taskCount = getCompletedTaskCount();
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0)
  
  
  useEffect(() => {
    // console.log("Points changed")
    // TODO: fix leveling system
    const calculateProgressLevel = () => {
      let level = 1;
      let tempPoints = points
      // console.log(tempPoints)
      let requiredPoints = level
      // console.log(requiredPoints)
      console.log("level: ", level)
      console.log("temppoints: ", tempPoints)
      console.log("requiredPoints: ", requiredPoints)
      while (tempPoints >= requiredPoints) {
        tempPoints -= requiredPoints;
        // console.log(tempPoints)
        level++;
        requiredPoints = level
        console.log("level: ", level)
        console.log("temppoints: ", tempPoints)
        console.log("requiredPoints: ", requiredPoints)
      }
      const requiredPointsThisLevel = requiredPoints
      const pointsGainedThisLevel = tempPoints
      const progressThisLevel = Number((pointsGainedThisLevel / requiredPointsThisLevel * 100).toFixed(2))

 
      // console.log("points gained in this level:", pointsGainedThisLevel)
      // console.log("remaining points needed to level up:", remainingPointsThisLevel)
      // console.log("required points needed to pass this level: ", requiredPointsThisLevel)
      // console.log(progressThisLevel)

      setProgress(progressThisLevel)
      setLevel(level)
    }
    calculateProgressLevel()
  }, [points])

  useEffect(() => {
    getCompletedTaskCount()
      .then((count) => setPoints(count))
  }, [])

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
      
      {/* TODO: Make the progress bar animated */}
      <h2 className='text-3xl mb-2'>Level {level}</h2>
      <div className='flex items-center mb-2 w-[300px] h-9 bg-black p-1 rounded-lg'>
        <div className='flex items-center h-6 bg-green-400 rounded-md pl-2 py-[2px] transition-[width]' style={{width: `${progress}%`}}>
          <p className='text-white'>{progress}%</p>
        </div>
      </div>
      <h2 className='text-2xl mb-5'>Total points: {points}</h2>
      
      <div className='flex gap-x-9 items-center justify-center mb-[2rem] bg-[grey] hover:bg-[white] text-[white] hover:text-black hover:border-[5px] py-[1rem] px-[1rem] rounded-lg cursor-pointer' onClick={handleAddTaskClick}>        
        <AddIcon />
        <h2 className='text-2xl font-medium'>Add a new task</h2>
      </div>
      <Tasks/>
      
      {showAddTask && (
        <AddTaskDialog onClose={handleModalClose}></AddTaskDialog>
      )}
      
    </main>
  )
}
