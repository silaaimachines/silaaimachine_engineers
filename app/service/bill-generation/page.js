"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Page = () => {
  const [date, setDate] = useState(null);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>

      <div className="space-y-4">
        <Input 
          type="number" 
          placeholder="Total amount" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input 
          type="number" 
          placeholder="Discount amount" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input 
          type="number" 
          placeholder="Paid in cash" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input 
          type="number" 
          placeholder="Paid online" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label className="text-gray-700">Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-left border border-gray-300 rounded-md text-gray-700",
                !date && "text-gray-400"
              )}
            >
              <CalendarIcon className="mr-2" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="rounded-md shadow-lg"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default Page
