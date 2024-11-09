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
import { Separator } from '@radix-ui/react-dropdown-menu'

const Page = () => {
  const [date, setDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [paidInCash, setPaidInCash] = useState('');
  const [paidOnline, setPaidOnline] = useState('');

  const handleGenerateBill = () => {
    const amountToPay = totalAmount - discountAmount;

  const billContent = `
    <h2>Payment Details</h2>
    <p><strong>Total Amount:</strong> ${totalAmount}</p>
    <p><strong>Discount Amount:</strong> ${discountAmount}</p>
    <p><strong>Amount to Pay:</strong> ${amountToPay}</p>
    <p><strong>Paid in Cash:</strong> ${paidInCash}</p>
    <p><strong>Paid Online:</strong> ${paidOnline}</p>
    <p><strong>Due Date:</strong> ${date ? format(date, "PPP") : 'N/A'}</p>
  `;

  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Bill</title></head><body>');
  printWindow.document.write(billContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};

  return (
    <div className="p-6 max-w-md mx-auto  rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold">Payment Details</h2>

      <div className="space-y-4">
        <h1>Total Amount</h1>
        <Input
          type="number"
          placeholder="Total amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h1>Discount Amount</h1>
        <Input
          type="number"
          placeholder="Discount amount"
          value={discountAmount}
          onChange={(e) => setDiscountAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h1>Amount to pay</h1>
        <Input
          type="number"
          placeholder="Amount to pay"
          value={totalAmount - discountAmount}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Separator/>
        <h1>Paid in Cash</h1>
        <Input
          type="number"
          placeholder="Paid in cash"
          value={paidInCash}
          onChange={(e) => setPaidInCash(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h1>Paid Online</h1>
        <Input
          type="number"
          placeholder="Paid online"
          value={paidOnline}
          onChange={(e) => setPaidOnline(e.target.value)}
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

      <Button onClick={handleGenerateBill} className="mt-4">
        Generate Bill
      </Button>
    </div>
  )
}

export default Page;
