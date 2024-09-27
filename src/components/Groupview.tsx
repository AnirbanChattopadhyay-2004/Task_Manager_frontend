"use client"

import React, { useEffect, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCookie } from '@/cookies/Cookie'
import axios from 'axios'
import Additem from './Additem'
import Showitem from './Showitem'
interface Task {
  _id: string
  title: string
  description:string
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  duedate:Date|null
}

const priorityColors = {
  low: 'bg-blue-600 hover:bg-blue-700',
  medium: 'bg-yellow-600 hover:bg-yellow-700',
  high: 'bg-red-600 hover:bg-red-700',
}

const TaskCard: React.FC<{ task: Task; moveTask: (_id: string, status: 'todo' | 'in-progress' | 'completed') => void;tasks:any }> = ({ task, moveTask,tasks }) => {
  const dragRef = (element: HTMLDivElement | null) => {
    drag(element)
  }
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-4 bg-gray-800 border-gray-900">
        <CardContent className="p-4">
          {/* <h3 className="text-lg font-semibold text-gray-100 mb-2">{task.title}</h3> */}
          <div className='flex flex-col gap-2'>
          <Showitem task={task} />
          <Badge className={`${priorityColors[task.priority]} text-white w-fit rounded-xl`}>
            {task.priority}
          </Badge>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const Column: React.FC<{ title: string; tasks: Task[]; status: 'todo' | 'in-progress' | 'completed'; moveTask: (id: string, status: 'todo' | 'in-progress' | 'completed') => void }> = ({ title, tasks, status, moveTask }) => {
  const [, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string }) => moveTask(item.id, status),
  }))
  const dropRef = (element: HTMLDivElement | null) => {
    drop(element)
  }
  return (
    <div ref={dropRef} className="bg-gray-950 border-2 border-gray-800 p-4 rounded-lg shadow-lg flex-1 min-h-[500px]">
      <h2 className={`text-xl font-bold mb-4 text-gray-400`}>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} tasks={tasks} moveTask={moveTask} />
      ))}
    </div>
  )
}

const KanbanBoard: React.FC = () => {
  //take task from backend
  const [tasks, setTasks] = useState<Task[]>()
  
  const token = getCookie("token");

  useEffect(() => {
    async function handlesubmission() {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/notes",
        {
          headers: {
            token: token,
          },
        }
      );
      if (res) setTasks(res.data.notes);
      return;
    }
    handlesubmission();
  }, []);
  const moveTask =async (id: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    if(!tasks)
      return
    for(let i=0;i<tasks?.length;i++){
      if(tasks[i]._id === id){
        await axios.put(process.env.NEXT_PUBLIC_API_URL+"api/notes/"+id,{...tasks[i],status:newStatus},{headers:{token:token}})
        break;
      }
    }
    setTasks((prevTasks:any) =>
      prevTasks.map((task:any) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    )
  }
  if(!tasks)
    return <div className='size-full flex h-[80vh] justify-center items-center'>loading...</div>
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 bg-gray-950 size-full">
      <div className='flex justify-start mb-5'>
      <Additem setNotes={setTasks} />

      </div>
        <div className="flex space-x-6">
          <Column
            title="To Do"
            tasks={tasks.filter((task) => task.status === 'todo')}
            status="todo"
            moveTask={moveTask}
          />
          <Column
            title="In Progress"
            tasks={tasks.filter((task) => task.status === 'in-progress')}
            status="in-progress"
            moveTask={moveTask}
          />
          <Column
            title="Completed"
            tasks={tasks.filter((task) => task.status === 'completed')}
            status="completed"
            moveTask={moveTask}
          />
        </div>
      </div>
    </DndProvider>
  )
}

export default KanbanBoard