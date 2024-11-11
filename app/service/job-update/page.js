"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import GlobalApi from "@/app/_utils/GlobalApi";
import { ServiceDetailsDialog } from "../components/ServiceDetailsDialog";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const JobUpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [itemsData, setItemsData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([{ id: "", name: "" }]);
  const [openIndex, setOpenIndex] = useState(-1);
  const [JobId, setJobId] = useState("");

  const [formData, setFormData] = useState({
    jobNumber: "",
    chooseService: "",
    serviceType: "",
  });

  const [otherFields, setOtherFields] = useState({
    serviceType: false,
  });

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOtherFields((prev) => ({
      ...prev,
      [field]: value === "Others",
    }));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await GlobalApi.getAllItems();
      setItemsData(response);
    } catch (error) {
      alert("Failed to fetch items.");
    }
  };

  const fetchDetail = async () => {
    if (!formData.jobNumber) {
      alert("Please enter a job number.");
      return;
    }
    try {
      setLoading(true);
      const response = await GlobalApi.searchJobDetails(
        "JobNumber",
        formData.jobNumber
      );
      setResponseData(response.data.data[0]);
      setJobId(response.data.data[0].id);
      console.log(response.data.data[0]);
      setDialogOpen(true);
    } catch (error) {
      alert("Failed to fetch job details.");
    } finally {
      setLoading(false);
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

    if (!formData.jobNumber || !formData.serviceType) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedFormData = {
      ...formData,
      serviceType:
        formData.serviceType === "others"
          ? formData.serviceTypeOther
          : formData.serviceType,
      items: selectedItems.map((item) => item.name).join(", "),
    };

    const jsonData = {
      data: {
        ChooseServiceGiven: updatedFormData.chooseService
          ? updatedFormData.chooseService
          : null,
        ServiceTypeGiven: updatedFormData.serviceType
          ? updatedFormData.serviceType
          : null,
        ExtraWork: formData.message ? formData.message : null,
        ItemsUsed: updatedFormData.items ? updatedFormData.items : null,
      },
    };

    try {
      console.log("UpdatedFormData", updatedFormData);
      console.log("JSON Data:", jsonData);
      const response = await GlobalApi.putServiceJobUpdateByJobNumber(
        jsonData,
        JobId
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      alert("Failed to submit job update.");
    }
  };

  const addItemSelector = () => {
    setSelectedItems([...selectedItems, { id: "", name: "" }]);
  };

  const handleItemSelect = (index, item) => {
    const newItems = [...selectedItems];
    newItems[index] = { id: item.id, name: item.ItemName };
    setSelectedItems(newItems);
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-center mb-6 underline  md:text-2xl">
        Job Update
      </h1>

      <div className="mb-4">
        <Label htmlFor="jobNumber" className="font-medium">
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
        {loading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button onClick={fetchDetail} className="px-6 py-2">
            Fetch Detail
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Type Selection */}
        <div>
          <Label htmlFor="serviceType" className="font-medium">
            Service Type
          </Label>
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
                <SelectItem value="Others">Others</SelectItem>
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

        {/* Dynamically added item selectors */}
        <div>
          <Label htmlFor="items" className="font-medium">
            Select Items
          </Label>
          {selectedItems.map((selectedItem, index) => (
            <Popover
              key={index}
              open={openIndex === index}
              onOpenChange={() => setOpenIndex(index)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openIndex === index}
                  className="w-full justify-between mt-1"
                >
                  {selectedItem.name || "Select Item"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search item..." />
                  <CommandList>
                    <CommandEmpty>No items found.</CommandEmpty>
                    <CommandGroup>
                      {itemsData.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.ItemName}
                          onSelect={() => {
                            handleItemSelect(index, item);
                            setOpenIndex(false);
                          }}
                        >
                          {item.ItemName}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedItem.id === item.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ))}
          <Button
            type="button"
            onClick={addItemSelector}
            className="mt-2 w-full"
          >
            Add Item
          </Button>
        </div>

        <div>
          <Label htmlFor="message" className="font-medium">
            Additional Details
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here."
            className="w-full mt-1"
          />
        </div>

        <Button type="submit" className="w-full py-2 mt-4">
          Submit
        </Button>
      </form>

      <ServiceDetailsDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        responseData={responseData}
      />
    </div>
  );
};

export default JobUpdatePage;
