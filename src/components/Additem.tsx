import React, { useState } from 'react'
import { format } from "date-fns"
import axios from "axios"
import { getCookie } from "@/cookies/Cookie"
import { PlusIcon, CalendarIcon } from "lucide-react"
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
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Task } from './Tableview'

export function Additem({setNotes}:{setNotes : (task : any)=>void}) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "todo",
    date: undefined as Date | undefined
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = process.env.NEXT_PUBLIC_API_URL as string
    const note = { ...formData, duedate: formData.date }
    try {
      const res = await axios.post(url + "api/notes", note, {
        headers: {
          token: getCookie("token")
        }
      })
      if (res) {
        setNotes((prev: Task[]) => [...prev, note])
        setIsOpen(false)
        setFormData({
          title: "",
          description: "",
          priority: "low",
          status: "todo",
          date: undefined
        })
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-blue-700 text-gray-100 border-blue-600 hover:bg-blue-600 hover:text-gray-100">
          <PlusIcon className="mr-2 h-5 w-5" />
          Add Item
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 text-gray-100 border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-gray-100">Add New Item</SheetTitle>
          <SheetDescription className="text-gray-400">
            Fill in the details for the new item you want to add.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-gray-800 text-gray-100 border-gray-700 focus:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-200">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-gray-800 text-gray-100 border-gray-700 focus:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-gray-200">Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
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
            <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger id="status" className="bg-gray-800 text-gray-100 border-gray-700">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-200">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal bg-gray-800 text-gray-100 border-gray-700 ${!formData.date && "text-gray-500"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                  initialFocus
                  className="bg-gray-800 text-gray-100"
                />
              </PopoverContent>
            </Popover>
          </div>
          <SheetFooter>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Add Item
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default Additem