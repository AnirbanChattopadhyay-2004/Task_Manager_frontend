import React, { useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { Pencil, X, Trash } from "lucide-react";
import axios from "axios"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { getCookie } from "@/cookies/Cookie";
import Additem from "./Additem";
import Showitem from "./Showitem";
interface Task {
  _id: string;
  title:string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  duedate: Date | null
}

const priorityColors: any = {
  low: "bg-blue-900 text-blue-200",
  medium: "bg-yellow-900 text-yellow-200",
  high: "bg-red-900 text-red-200",
};
const statusColors: any = {
  "todo": "bg-blue-900 text-blue-200",
  "in-progress": "bg-yellow-900 text-yellow-200",
  "completed": "bg-red-900 text-red-200",
};
const NoteComponent = ({ task ,notes,setNotes}:{task:Task,notes:Task[],setNotes:(notes:Task[])=>void}) => {
  const [editingTask, setEditingTask] = useState<Task|null>(null);
  const updateTask =async (updatedTask: Task) => {
    const url:string = process.env.NEXT_PUBLIC_API_URL as string
    try{
      
      await axios.put(url+"api/notes/"+updatedTask._id,updatedTask,{
        headers:{
          token:getCookie("token")
        }
      })
      
      setNotes(notes.map(note => note._id === updatedTask._id ? updatedTask : note))
     
      setEditingTask(null);
    }
    catch(err){
      console.log(JSON.stringify(err))
    }
  };
  
  const deleteTask =async (id: string) => {
    try{

      const url:string = process.env.NEXT_PUBLIC_API_URL as string
      await axios.delete(url+"api/notes/"+id,{
      headers:{
        token:getCookie("token")
      }
    })
    setNotes(notes.filter((note:Task) => note._id !== id))
  }
  catch(err){
    console.log(JSON.stringify(err))
  }
  };
  return (
    <TableRow key={task._id} className=" border-b border-gray-700 hover:bg-gray-950 text-[1rem] ">
      <TableCell className="p-5">
        {editingTask && editingTask?._id === task._id ? (
          <Input
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
          />
        ) : (
          // task.title
          <Showitem task = {task}  />
        )}
      </TableCell>
      <TableCell className="p-5">
        {editingTask && editingTask?._id === task._id ? (
          <Input
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
            className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
          />
        ) : (
          
         <span className="text-blue-400 tracking-wide"> {task.description && (task.description).substring(0,6)+"..."}</span>
        )}
      </TableCell>
      <TableCell className="p-5">
        {editingTask && editingTask?._id === task._id ? (
          <Select
            value={editingTask.priority}
            onValueChange={(value) =>
              setEditingTask({
                ...editingTask,
                priority: value as "low" | "medium" | "high",
              })
            }
          >
            <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <span
            className={` px-3 py-1 rounded-3xl text-white ${
              priorityColors[task.priority]
            }`}
          >
            {(task.priority).charAt(0).toUpperCase()+(task.priority).slice(1)}
          </span>
        )}
      </TableCell>
      <TableCell className="p-5 min-w-fit">
        {editingTask && editingTask?._id === task._id ? (
          <Select
            value={editingTask.status}
            onValueChange={(value) =>
              setEditingTask({
                ...editingTask,
                status: value as "todo" | "in-progress" | "completed",
              })
            }
          >
            <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <span className={`capitalize  px-3 py-1 rounded-3xl  text-white ${
              statusColors[task.status]
            }`}>{task.status.replace("-", " ")}</span>
        )}
      </TableCell>
      <TableCell className="p-5">
                  { editingTask && editingTask?._id === task._id ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal bg-gray-700 text-gray-700 border-gray-600 ${!editingTask.duedate && "text-gray-500"}`}
                        >
                          {editingTask.duedate ? format(editingTask.duedate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                        <Calendar
                          mode="single"
                          selected={editingTask.duedate || undefined}
                          onSelect={(date) => setEditingTask({ ...editingTask, duedate:date })}
                          initialFocus
                          className="bg-gray-800 text-gray-100"
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <span className="text-green-500 tracking-wide">{task.duedate ? format(task.duedate, "PPP") : "No date set"}</span>
                  )}
                </TableCell>
      <TableCell className="text-right p-5">
        {editingTask &&  editingTask?._id === task._id ? (
          <>
            <Button
              onClick={() =>{
               updateTask(editingTask)
              }
            }
              size="icon"
              variant="ghost"
              className="text-gray-300 hover:text-gray-700"
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setEditingTask(null)}
              size="icon"
              variant="ghost"
              className="text-gray-300 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {setEditingTask(task)
               
              }}
              size="icon"
              variant="ghost"
              className="text-gray-300 hover:text-gray-700"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => deleteTask(task._id)}
              size="icon"
              variant="ghost"
              className="text-gray-300 hover:text-gray-700"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default NoteComponent;
