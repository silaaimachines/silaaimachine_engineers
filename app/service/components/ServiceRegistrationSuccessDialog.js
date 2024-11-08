import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRef } from "react";

export function ServiceRegistrationDialog({ dialogOpen, setDialogOpen, responseData, formData }) {
  if (!responseData || !formData) return null; // Do not render if there's no data

  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Optional: refresh to reset the page's original layout
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Service Registration Successful</DialogTitle>
          <DialogDescription>Details for the registered service:</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>Job Number: {responseData.JobNumber}</div>
          <div>Customer ID: {responseData.CustomerID}</div>
          <div>Customer Name: {responseData.CustomerName}</div>
        </div>
        <Button onClick={handlePrint}>Print</Button>

        {/* Hidden print area */}
        <div style={{ display: "none" }} ref={printRef}>
          <h2>Service Registration Successful</h2>
          <p>Details for the registered service:</p>
          <h3>User-Entered Data</h3>
          <div>Service: {formData.service}</div>
          <div>Customer Name: {formData.customerName}</div>
          <div>Customer Number: {formData.customerNumber}</div>
          <div>Customer Address: {formData.customerAddress}</div>
          <div>Service Type: {formData.serviceType}</div>
          <div>Machine Type: {formData.machineType}</div>
          <div>Machine Brand: {formData.machineBrand}</div>
          <div>Model Number: {formData.modelNumber}</div>
          <div>Engine Number: {formData.engineNumber}</div>
          <div>Due Date: {formData.dueDate || "N/A"}</div>
          <div>Problem: {formData.problem}</div>
          <div>Notes: {formData.notes}</div>

          <h3>API Response Data</h3>
          <div>Job Number: {responseData.JobNumber}</div>
          <div>Customer ID: {responseData.CustomerID}</div>
          <div>Customer Name: {responseData.CustomerName}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
