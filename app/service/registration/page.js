"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

const ServiceRegistration = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [otherFields, setOtherFields] = useState({
        machineType: false,
        machineBrand: false,
        serviceType: false,
    });
    const [date, setDate] = React.useState()

    const handleSelectChange = (field, value) => {
        setOtherFields((prev) => ({
            ...prev,
            [field]: value === "others",
        }));
    };

    return (
        
        <form>
            <div className=" flex items-center  justify-center underline font-bold text-2xl pt-3 md:text-4xl ">
              <h5>Service Registration</h5>
            </div>
        <div className="max-w-2xl mx-auto p-6 space-y-6 rounded-lg shadow-lg">
            

            

            {/* Choose Service */}
            <div className="space-y-4">
                <Label>Choose Service</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="home">Home Service</SelectItem>
                            <SelectItem value="store">Store Service</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Customer Name */}
            <div className="space-y-4">
                <Label>Customer Name</Label>
                <Input type="text" className="w-full" />
            </div>

            {/* Customer Number */}
            <div className="space-y-4">
                <Label>Customer Number</Label>
                <Input type="tel" className="w-full" />
            </div>

            {/* Customer Address */}
            <div className="space-y-4">
                <Label>Customer Address</Label>
                <Textarea
                    className="w-full p-3 border rounded-lg text-gray-700  resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address here..."
                    rows={4}
                />
            </div>
            {/* Service Type Select */}
            <div className="space-y-4">
                <Label>Service Type</Label>
                <Select onValueChange={(value) => handleSelectChange("serviceType", value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="freeService">Free Service</SelectItem>
                            <SelectItem value="standardService">Standard Service</SelectItem>
                            <SelectItem value="fullService">Full Service</SelectItem>
                            <SelectItem value="fullServiceWash">Full Service & Wash</SelectItem>
                            <SelectItem value="overOil">Over Oil & Checking</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {otherFields.serviceType && (
                    <Input type="text" placeholder="Specify service type" className="w-full mt-2" />
                )}
            </div>

            {/* Machine Type Select */}
            <div className="space-y-4">
                <Label>Machine Type</Label>
                <Select onValueChange={(value) => handleSelectChange("machineType", value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select machine type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="bagCloser">Bag Closer</SelectItem>
                            <SelectItem value="domestic">Domestic SM</SelectItem>
                            <SelectItem value="embroidery">Embroidery/130K</SelectItem>
                            <SelectItem value="interlock">Interlock SM</SelectItem>
                            <SelectItem value="industrial">Industrial/Locksmith</SelectItem>
                            <SelectItem value="leather">Leather/31K</SelectItem>
                            <SelectItem value="linkDeluxe">Link Deluxe SM</SelectItem>
                            <SelectItem value="umbrella">Umbrella/TA1/103K/95K</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {otherFields.machineType && (
                    <Input type="text" placeholder="Specify machine type" className="w-full mt-2" />
                )}
            </div>

            {/* Machine Brand Select */}
            <div className="space-y-4">
                <Label>Machine Brand</Label>
                <Select onValueChange={(value) => handleSelectChange("machineBrand", value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select machine brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="conark">Conark</SelectItem>
                            <SelectItem value="geminy">Geminy</SelectItem>
                            <SelectItem value="jack">Jack</SelectItem>
                            <SelectItem value="merritt">Merritt</SelectItem>
                            <SelectItem value="revo">Revo</SelectItem>
                            <SelectItem value="samarat">Samarat</SelectItem>
                            <SelectItem value="singer">Singer</SelectItem>
                            <SelectItem value="usha">Usha</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {otherFields.machineBrand && (
                    <Input type="text" placeholder="Specify machine brand" className="w-full mt-2" />
                )}
            </div>

            {/* Model Name */}
            <div className="space-y-4">
                <Label>Model Number</Label>
                <Input type="text" className="w-full" />
            </div>

            {/* engine Number */}
            <div className="space-y-4">
                <Label>Engine Number</Label>
                <Input type="text" className="w-full" />
            </div>

            {/* due date */}
            <div className="space-y-4">
                <Label>Due Date</Label>
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
            {/* Problem */}
            <div className="space-y-4">
                <Label>Problem</Label>
                <Input type="text" className="w-full" />
            </div>
            {/* Notes*/}
            <div className="space-y-4">
                <Label>Notes</Label>
                <Textarea
                    className="w-full p-3 border rounded-lg text-gray-700  resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter additional notes here..."
                    rows={4}
                />

            </div>
            <div className=" flex justify-center items-center">
            <Button type="submit">Submit</Button>
            </div>
           
        </div>
        </form>
    );
};

export default ServiceRegistration;
