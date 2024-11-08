import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ServiceRegistrationDialog({ dialogOpen, setDialogOpen, responseData, formData }) {
  if (!responseData || !formData) return null; // Do not render if there's no data

  const handlePrint = () => {
    const printContent = `
      <div>
        <h2>Service Registration Successful</h2>
        <p>Details for the registered service:</p>
        <h3>User-Entered Data</h3>
        <div>Service: ${formData.service}</div>
        <div>Customer Name: ${formData.customerName}</div>
        <div>Customer Number: ${formData.customerNumber}</div>
        <div>Customer Address: ${formData.customerAddress}</div>
        <div>Service Type: ${formData.serviceType}</div>
        <div>Machine Type: ${formData.machineType}</div>
        <div>Machine Brand: ${formData.machineBrand}</div>
        <div>Model Number: ${formData.modelNumber}</div>
        <div>Engine Number: ${formData.engineNumber}</div>
        <div>Due Date: ${formData.dueDate || "N/A"}</div>
        <div>Problem: ${formData.problem}</div>
        <div>Notes: ${formData.notes}</div>

        <h3>API Response Data</h3>
        <div>Job Number: ${responseData.JobNumber}</div>
        <div>Customer ID: ${responseData.CustomerID}</div>
        <div>Customer Name: ${responseData.CustomerName}</div>
      </div>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Service Registration Details</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2, h3 { margin-top: 0; }
            h3 { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Service Registration Successful</DialogTitle>
          <DialogDescription>Details for the registered service:</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          <h3>API Response Data</h3>
          <div>Job Number: {responseData.JobNumber}</div>
          <div>Customer ID: {responseData.CustomerID}</div>
          <div>Customer Name: {responseData.CustomerName}</div>
        </div>
        <Button onClick={handlePrint}>Print</Button>
      </DialogContent>
    </Dialog>
  );
}
