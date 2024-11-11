"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GlobalApi from "@/app/_utils/GlobalApi";

const page = () => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    date: "",
    name: "",
    phoneNumber: "",
    address: "",
    particular: "",
    quantity: "",
    ratePerUnit: "",
    totalAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jsonData = {
      data: {
        InvoiceNumber: formData.invoiceNumber,
        Date: date ? date : null, // Ensure the date is passed correctly
        Name: formData.name,
        MobileNo: formData.phoneNumber,
        Address: formData.address,
        Particular: formData.particular,
        quantity: formData.quantity,
        ratePerUnit: formData.ratePerUnit,
        totalAmount: formData.totalAmount,
      },
    };

    try {
      const response = await GlobalApi.postSalesInvoiceData(jsonData); // Make sure GlobalApi is correctly defined
      setResponseData(response.data.data);
      console.log("Form submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-10">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-center underline font-bold text-lg pt-3 md:text-2xl">
          <h1>Invoice Details</h1>
        </div>
        {/* Invoice Number Input */}
        <div>
          <Label>Invoice Number</Label>
          <Input
            type="number"
            placeholder="Invoice Number"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="space-y-4">
          {/* Date */}
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Name Input */}
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Phone Number Input */}
        <div>
          <Label>Phone Number</Label>
          <Input
            type="number"
            placeholder="8653434654"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Address Textarea */}
        <div>
          <Label>Address</Label>
          <Textarea
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="space-y-4">
          {/* Particular Textarea */}
          <div>
            <Label>Particular</Label>
            <Textarea
              type="text"
              placeholder="Particular"
              name="particular"
              value={formData.particular}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Quantity Input */}
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Rate per Unit Input */}
          <div>
            <Label>Rate/Unit</Label>
            <Input
              type="number"
              placeholder="Rate/Unit"
              name="ratePerUnit"
              value={formData.ratePerUnit}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Total Amount Input */}
        <div>
          <Label>Total Amount</Label>
          <Input
            type="number"
            placeholder="Total Amount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default page;
