"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import GlobalApi from "@/app/_utils/GlobalApi";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ServiceDetailsDialog } from "../components/ServiceDetailsDialog";

const ServiceRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [otherFields, setOtherFields] = useState({
    machineType: false,
    machineBrand: false,
    serviceType: false,
  });

  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    customerName: "",
    customerNumber: "",
    customerAddress: "",
    customerType: "",
    serviceType: "",
    machineType: "",
    machineBrand: "",
    modelNumber: "",
    engineNumber: "",
    dueDate: "",
    problem: "",
    notes: "",
  });

  const handleSelectChange = (field, value) => {
    setOtherFields((prev) => ({
      ...prev,
      [field]: value === "others",
    }));
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
    setLoading(true);

    const updatedFormData = {
      ...formData,
      customerType:
        formData.customerType === "others"
          ? formData.customerTypeOther
          : formData.customerType,
      serviceType:
        formData.serviceType === "others"
          ? formData.serviceTypeOther
          : formData.serviceType,
      machineType:
        formData.machineType === "others"
          ? formData.machineTypeOther
          : formData.machineType,
      machineBrand:
        formData.machineBrand === "others"
          ? formData.machineBrandOther
          : formData.machineBrand,
    };

    const jsonData = {
      data: {
        ChooseService: updatedFormData.service,
        CustomerName: updatedFormData.customerName,
        CustomerNumber: Number(updatedFormData.customerNumber),
        CustomerAddress: updatedFormData.customerAddress,
        CustomerType: updatedFormData.customerType,
        ServiceType: updatedFormData.serviceType,
        MachineType: updatedFormData.machineType,
        MachineBrand: updatedFormData.machineBrand,
        ModelNumber: updatedFormData.modelNumber,
        EngineNumber: updatedFormData.engineNumber,
        DueDate: date ? date : null,
        Problem: updatedFormData.problem,
        Notes: updatedFormData.notes,
        ServiceStatus: "Pending",
      },
    };

    try {
      const response = await GlobalApi.postServiceRegistrationData(jsonData);
      setResponseData(response.data.data);
      setDialogOpen(true);

      // Generate WhatsApp message text
      const message = encodeURIComponent(`Service Registration Details:
    - Service: ${updatedFormData.service}
    - Customer Name: ${updatedFormData.customerName}
    - Address: ${updatedFormData.customerAddress}
    - Customer Type: ${updatedFormData.customerType}
    - Service Type: ${updatedFormData.serviceType}
    - Machine Type: ${updatedFormData.machineType}
    - Machine Brand: ${updatedFormData.machineBrand}
    - Model Number: ${updatedFormData.modelNumber}
    - Engine Number: ${updatedFormData.engineNumber}
    - Due Date: ${date ? format(date, "dd/MM/yyyy") : "N/A"}
    - Problem: ${updatedFormData.problem}
    - Notes: ${updatedFormData.notes}`);

      // Construct WhatsApp URL
      const whatsappUrl = `https://wa.me/${updatedFormData.customerNumber}?text=${message}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      console.log("Service registration successful:", response);
    } catch (error) {
      console.error("Error during service registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-10">
      <div className="flex items-center justify-center underline font-bold text-lg pt-3 md:text-2xl">
        <h5>Service Registration</h5>
      </div>
      <div className="max-w-2xl mx-auto p-6 space-y-6 rounded-lg shadow-lg">
        {/* Choose Service */}
        <div className="space-y-4">
          <Label>Choose Service</Label>
          <Select
            name="service"
            value={formData.service}
            onValueChange={(value) =>
              handleChange({ target: { name: "service", value } })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Home Service">Home Service</SelectItem>
                <SelectItem value="Store Service">Store Service</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Customer Name */}
        <div className="space-y-4">
          <div className="flex space-x-1">
            <Label>Customer Name </Label>
            <Label className="text-red-500">*</Label>
          </div>
          <Input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        {/* Customer Number */}
        <div className="space-y-4">
          <Label>Customer Number</Label>
          <Input
            type="tel"
            name="customerNumber"
            value={formData.customerNumber}
            onChange={handleChange}
            className="w-full"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>

        {/* Customer Address */}
        <div className="space-y-4">
          <Label>Customer Address</Label>
          <Textarea
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address here..."
            rows={4}
          />
        </div>

        {/* Customer Type */}
        <div className="space-y-4">
          <Label>Customer Type</Label>
          <Select
            name="customerType"
            value={formData.customerType}
            onValueChange={(value) => {
              handleChange({ target: { name: "customerType", value } });
              handleSelectChange("customerType", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Tailor">Tailor</SelectItem>
                <SelectItem value="Profession">Profession</SelectItem>
                <SelectItem value="Insitution">Insitution</SelectItem>
                <SelectItem value="Fabricator">Fabricator</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {otherFields.customerType && (
            <Input
              type="text"
              name="customerTypeOther"
              placeholder="Specify customer type"
              value={formData.customerTypeOther || ""}
              onChange={handleChange}
              className="w-full mt-2"
            />
          )}
        </div>

        {/* Service Type Select */}
        <div className="space-y-4">
          <Label>Service Type</Label>
          <Select
            name="serviceType"
            value={formData.serviceType}
            onValueChange={(value) => {
              handleChange({ target: { name: "serviceType", value } });
              handleSelectChange("serviceType", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Checking">Checking</SelectItem>
                <SelectItem value="Free Service">Free Service</SelectItem>
                <SelectItem value="Standard Service">
                  Standard Service
                </SelectItem>
                <SelectItem value="Full Service">Full Service</SelectItem>
                <SelectItem value="Full Service & Wash">
                  Full Service & Wash
                </SelectItem>
                <SelectItem value="Over Oil & Checking">
                  Over Oil & Checking
                </SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {otherFields.serviceType && (
            <Input
              type="text"
              name="serviceTypeOther"
              placeholder="Specify service type"
              value={formData.serviceTypeOther || ""}
              onChange={handleChange}
              className="w-full mt-2"
            />
          )}
        </div>

        {/* Machine Type Select */}
        <div className="space-y-4">
          <Label>Machine Type</Label>
          <Select
            name="machineType"
            value={formData.machineType}
            onValueChange={(value) => {
              handleChange({ target: { name: "machineType", value } });
              handleSelectChange("machineType", value);
            }}
          >
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
            <Input
              type="text"
              name="machineTypeOther"
              placeholder="Specify machine type"
              value={formData.machineTypeOther || ""}
              onChange={handleChange}
              className="w-full mt-2"
            />
          )}
        </div>

        {/* Machine Brand Select */}
        <div className="space-y-4">
          <Label>Machine Brand</Label>
          <Select
            name="machineBrand"
            value={formData.machineBrand}
            onValueChange={(value) => {
              handleChange({ target: { name: "machineBrand", value } });
              handleSelectChange("machineBrand", value);
            }}
          >
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
            <Input
              type="text"
              name="machineBrandOther"
              placeholder="Specify machine brand"
              value={formData.machineBrandOther || ""}
              onChange={handleChange}
              className="w-full mt-2"
            />
          )}
        </div>

        {/* Model Number */}
        <div className="space-y-4">
          <Label>Model Number</Label>
          <Input
            type="text"
            name="modelNumber"
            value={formData.modelNumber}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Engine Number */}
        <div className="space-y-4">
          <Label>Engine Number</Label>
          <Input
            type="text"
            name="engineNumber"
            value={formData.engineNumber}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Due Date */}
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
          <Input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <Label>Notes</Label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter additional notes here..."
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Submitting...
            </Button>
          ) : (
            <Button type="submit">Submit</Button> // show normal button
          )}
        </div>
      </div>

      <ServiceDetailsDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        responseData={responseData}
      />
    </form>
  );
};

export default ServiceRegistration;
