import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
   import React from 'react'
   import { useState } from "react"
   import { PlusIcon, CalendarIcon } from "lucide-react"
   import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Calendar } from "@/components/ui/calendar"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { format } from "date-fns"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import axios from "axios"
// import { getCookie } from "@/app/tasks/page"
import { getCookie } from "@/cookies/Cookie"
import { Textarea } from "./ui/textarea"
   const Showitem = ({task}) => {
         const [title, setTitle] = useState("")
         const [description, setItemDescription] = useState("")
         const [priority, setPriority] = useState("low")
         const [status, setStatus] = useState("todo")
         const [date, setDate] = useState<Date>()
         const [isOpen, setIsOpen] = useState(false)
        
       return (<Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <a href="#" className="text-blue-600">{task.title}</a>
        </SheetTrigger>
        <SheetContent className="bg-gray-900 text-gray-100 border-gray-800">
          <SheetHeader>
            <SheetTitle className="text-gray-100"></SheetTitle>
            <SheetDescription className="text-gray-400">
              View your task
            </SheetDescription>
          </SheetHeader>
          <form  className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="itemName" className="text-gray-200 tracking-wide">Title</Label>
              <Input
                id="itemName"
                value={task.title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-800 text-gray-100 border-gray-700 focus:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemDescription" className="text-gray-200">Description</Label>
              <Textarea
                id="itemDescription"
                value={task.description}
                onChange={(e) => setItemDescription(e.target.value)}
                className="bg-gray-800 text-gray-100 border-gray-700 focus:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-200">Priority</Label>
              <Select value={task.priority} onValueChange={setPriority}>
                <SelectTrigger id="priority" className="bg-gray-800 text-gray-100 border-gray-700">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-200">Status</Label>
              <Select value={task.status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="bg-gray-800 text-gray-100 border-gray-700">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-200">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal bg-gray-800 text-gray-100 border-gray-700 ${!date && "text-gray-500"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {task.duedate ? format(task.duedate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar
                    mode="single"
                    selected={task.duedate}
                    onSelect={setDate}
                    initialFocus
                    className="bg-gray-800 text-gray-100"
                  />
                </PopoverContent>
              </Popover>
            </div>
           
          </form>
        </SheetContent>
      </Sheet>
    )
}

export default Showitem
    