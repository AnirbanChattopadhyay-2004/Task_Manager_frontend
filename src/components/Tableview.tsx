"use client";
import React, { useCallback, useEffect, useState } from "react";

import { getCookie } from "@/cookies/Cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoteComponent from "./NoteComponent";
import Additem from "./Additem";
// import { getCookie } from '@/app/tasks/page'

import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  duedate: Date | null;
}
const Tableview = () => {
  const [Notes, setNotes] = useState<any>();

  const token: any = getCookie("token");

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
      if (res) setNotes(res.data.notes);
      return;
    }
    handlesubmission();
  }, []);
  type SortOption =
    | "priority-asc"
    | "priority-desc"
    | "duedate-asc"
    | "duedate-desc"
    | "status-asc"
    | "status-desc"
    | "default-val";
  const [sortOption, setSortOption] = useState<SortOption>("default-val");
  const sortTasks = useCallback((option: SortOption) => {
    setSortOption(option);

    setNotes((prevNotes: Task[]) => {
      return [...prevNotes].sort((a, b) => {
        const [field, order] = option.split("-") as [string, "asc" | "desc"];
        const multiplier = order === "asc" ? 1 : -1;

        if (field === "priority") {
          const priorityOrder: {
            low: number;
            medium: number;
            high: number;
          } = { low: 1, medium: 2, high: 3 };
          return (
            (priorityOrder[a.priority] - priorityOrder[b.priority]) * multiplier
          );
        } else if (field === "duedate") {
          if (!a.duedate) return order === "asc" ? 1 : -1;
          if (!b.duedate) return order === "asc" ? -1 : 1;
          return (
            (new Date(a.duedate).getTime() - new Date(b.duedate).getTime()) *
            multiplier
          );
        } else if(field === "status") {
          const statusOrder: {
            "todo": number;
            "in-progress": number;
            "completed": number;
          } = { "todo": 1, "in-progress": 2, "completed": 3 };
          return (
            (statusOrder[a.status] - statusOrder[b.status]) * multiplier
          );
        }
        return 0;
      });
    });
  }, []);
  if (!Notes) return <div className="h-[80vh] flex justify-center items-center">loading...</div>;
  return (
    <div className=" mx-auto p-4 bg-gray-950 text-gray-100  ">
      <div className="flex gap-5 justify-between">
        <div className="pb-5 flex gap-5 ">
          <Additem setNotes={setNotes} />
        </div>
        <div>
          <Select
            value={sortOption}
            onValueChange={(value) => sortTasks(value as SortOption)}
          >
            <SelectTrigger className="w-[200px] bg-blue-700  text-gray-100 border-gray-700 hover:bg-blue-600">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
              <SelectItem value="default-val" >
                Sort out
              </SelectItem>
              <SelectItem value="priority-asc">
                Priority (Low to High)
              </SelectItem>
              <SelectItem value="priority-desc">
                Priority (High to Low)
              </SelectItem>
              <SelectItem value="duedate-asc">
                Due Date (Earliest First)
              </SelectItem>
              <SelectItem value="duedate-desc">
                Due Date (Latest First)
              </SelectItem>
              <SelectItem value="status-asc">
                Status (Asc Order)
              </SelectItem>
              <SelectItem value="status-desc">
                Status (Desc Order)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-900 border-b border-gray-900 hover:bg-gray-800 ">
              <TableHead className="text-gray-300 p-5 tracking-wider text-[1rem]">Title</TableHead>
              <TableHead className="text-gray-300 p-5 tracking-wider text-[1rem]">Description</TableHead>
              <TableHead className="text-gray-300 p-5 tracking-wider text-[1rem]">Priority</TableHead>
              <TableHead className="text-gray-300 p-5 tracking-wider text-[1rem]" >Status</TableHead>
              <TableHead className="text-gray-300 p-5 tracking-wider text-[1rem]">DueDate</TableHead>
              <TableHead className="text-right text-gray-300 p-5 tracking-wider text-[1rem]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Notes.map((ele: any) => {
              return (
                <NoteComponent
                  key={ele._id}
                  task={ele}
                  notes={Notes}
                  setNotes={setNotes}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tableview;
