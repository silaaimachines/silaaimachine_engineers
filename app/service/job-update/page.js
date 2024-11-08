"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import GlobalApi from '@/app/_utils/GlobalApi';
import { ServiceDetailsDialog } from '../components/ServiceDetailsDialog';

const JobUpdatePage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const [formData, setFormData] = useState({
        jobNumber: '',
        serviceType: '',
        serviceTypeOther: '',
        machineType: '',
        machineTypeOther: '',
        machineBrand: '',
        machineBrandOther: ''
    });

    const [otherFields, setOtherFields] = useState({
        serviceType: false,
        machineType: false,
        machineBrand: false
    });

    const handleSelectChange = (field, value) => {
        setOtherFields((prev) => ({
            ...prev,
            [field]: value === "others",
        }));
    };

    const fetchDetail = async () => {
        if (!formData.jobNumber) {
            alert("Please enter a job number.");
            return;
        }
        try {
            const response = await GlobalApi.searchJobDetails('JobNumber', formData.jobNumber);
            setResponseData(response.data.data[0]);
            setDialogOpen(true);
            console.log("Job Details", response);
        } catch (error) {
            console.error("Error fetching job details:", error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            serviceType: formData.serviceType === "others" ? formData.serviceTypeOther : formData.serviceType,
            machineType: formData.machineType === "others" ? formData.machineTypeOther : formData.machineType,
            machineBrand: formData.machineBrand === "others" ? formData.machineBrandOther : formData.machineBrand,
        };

        console.log("Updated Form Data", updatedFormData);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
            <h1 className="text-2xl font-bold text-center mb-6">Job Update</h1>

            <div className="mb-4">
                <Label htmlFor="jobNumber" className="text-gray-700 font-medium">Job Number</Label>
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
                <Button onClick={fetchDetail} className="px-6 py-2">Fetch Detail</Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="serviceType" className="text-gray-700 font-medium">Service Type</Label>
                    <Select
                        value={formData.serviceType}
                        onValueChange={(value) => {
                            handleChange({ target: { name: "serviceType", value } });
                            handleSelectChange("serviceType", value);
                        }}
                    >
                        <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select Service Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Service Type</SelectLabel>
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
                        <Input
                            type="text"
                            name="serviceTypeOther"
                            placeholder="Specify service type"
                            value={formData.serviceTypeOther}
                            onChange={handleChange}
                            className="w-full mt-2"
                        />
                    )}
                </div>

                <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">Additional Details</Label>
                    <Textarea
                        id="message"
                        placeholder="Type your message here."
                        className="w-full mt-1"
                    />
                </div>

                <Button type="submit" className="w-full py-2 mt-4">Submit</Button>
            </form>

            {/* Render the ServiceDetailsDialog here */}
            <ServiceDetailsDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                responseData={responseData}
            />
        </div>
    );
};

export default JobUpdatePage;
