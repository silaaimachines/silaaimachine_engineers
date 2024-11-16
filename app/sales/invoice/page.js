"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

const AddInvoicePage = () => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    date: "",
    name: "",
    phoneNumber: "",
    address: "",
    particulars: [{ particular: "", quantity: "", ratePerUnit: "" }],
  });

  // Calculate total amount dynamically
  useEffect(() => {
    const total = formData.particulars.reduce((acc, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const ratePerUnit = parseFloat(item.ratePerUnit) || 0;
      return acc + quantity * ratePerUnit;
    }, 0);
    setTotalAmount(total);
  }, [formData.particulars]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      const newParticulars = [...formData.particulars];
      newParticulars[index][name] = value;
      setFormData((prevData) => ({
        ...prevData,
        particulars: newParticulars,
      }));
    }
  };

  const addParticularRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      particulars: [
        ...prevData.particulars,
        { particular: "", quantity: "", ratePerUnit: "" },
      ],
    }));
  };

  const removeParticularRow = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      particulars: prevData.particulars.filter((_, i) => i !== index),
    }));
  };

  // Validate the form
  const validateForm = () => {
    if (
      !formData.invoiceNumber ||
      !date ||
      !formData.name ||
      !formData.phoneNumber ||
      !formData.address ||
      formData.particulars.length === 0
    ) {
      return false;
    }

    // Ensure each particular item has valid values
    for (let item of formData.particulars) {
      if (!item.particular || !item.quantity || !item.ratePerUnit) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all fields and add at least one particular.");
      return;
    }
    setLoading(true);

    // Format particulars as a single string
    const formattedParticulars = formData.particulars
      .map(
        (item, index) =>
          `${index + 1}-${item.particular}-${item.quantity}-${item.ratePerUnit}`
      )
      .join(", ");

    const jsonData = {
      data: {
        InvoiceNumber: formData.invoiceNumber,
        Date: date ? date : null,
        Name: formData.name,
        MobileNo: formData.phoneNumber,
        Address: formData.address,
        Particular: formattedParticulars,
        TotalAmount: totalAmount,
      },
    };

    try {
      const response = await GlobalApi.postSalesInvoiceData(jsonData);
    } catch (error) {
    } finally {
      setLoading(false);
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
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Date */}
        <div className="space-y-4">
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

        {/* Name Input */}
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            required
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
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Address Textarea */}
        <div>
          <Label>Address</Label>
          <Textarea
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Particulars Table */}
        <Table>
          <TableCaption>Product Details</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Particular</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate/Unit</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.particulars.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Textarea
                    placeholder="Particular"
                    name="particular"
                    value={item.particular}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    required
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    required
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Rate/Unit"
                    name="ratePerUnit"
                    value={item.ratePerUnit}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    required
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeParticularRow(index)}
                    disabled={formData.particulars.length === 1}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add Particular Button */}
        <Button
          type="button"
          variant="outline"
          onClick={addParticularRow}
          className="w-full"
        >
          <PlusCircle className="mr-2" />
          Add Particular
        </Button>

        {/* Total Amount */}
        <div>
          <Label>Total Amount</Label>
          <Input
            type="number"
            placeholder="Total Amount"
            value={totalAmount}
            readOnly
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
            <Button type="submit" disabled={!validateForm()}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddInvoicePage;
