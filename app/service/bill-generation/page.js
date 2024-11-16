"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GlobalApi from "@/app/_utils/GlobalApi";

const Page = () => {
  const [date, setDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [paidInCash, setPaidInCash] = useState("");
  const [paidOnline, setPaidOnline] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobNumber: "",
  });

  const handleGenerateBill = () => {
    const amountToPay = totalAmount - discountAmount;

    const billContent = `
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h2 { text-align: center; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
      </style>
      <h2>Payment Details</h2>
      <table>
        <tr><th>Total Amount</th><td>${totalAmount}</td></tr>
        <tr><th>Discount Amount</th><td>${discountAmount}</td></tr>
        <tr><th>Amount to Pay</th><td>${amountToPay}</td></tr>
        <tr><th>Paid in Cash</th><td>${paidInCash}</td></tr>
        <tr><th>Paid Online</th><td>${paidOnline}</td></tr>
        <tr><th>Due Date</th><td>${date ? format(date, "PPP") : "N/A"}</td></tr>
      </table>
    `;

    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Bill</title></head><body>");
    printWindow.document.write(billContent);
    printWindow.document.close();
    printWindow.print();
  };

  const fetchDetail = async () => {
    if (!formData.jobNumber) {
      alert("Please enter a job number.");
      return;
    }
    try {
      const response = await GlobalApi.searchJobDetails(
        "JobNumber",
        formData.jobNumber
      );
      setResponseData(response.data.data[0]);
      setDialogOpen(true);
    } catch (error) {
      alert("Failed to fetch job details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 max-w-md mx-auto rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold">Payment Details</h2>

      <div className="space-y-4">
        <div className="mb-4">
          <Label htmlFor="jobNumber" className="text-gray-700 font-medium">
            Job Number
          </Label>
          <Input
            type="text"
            id="jobNumber"
            placeholder="Enter Job Number"
            name="jobNumber"
            value={formData.jobNumber}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="flex justify-center items-center mb-6">
          <Button onClick={fetchDetail} className="px-6 py-2">
            Fetch Detail
          </Button>
        </div>
        <Separator />
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
        <Separator />
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
  );
};

export default Page;
