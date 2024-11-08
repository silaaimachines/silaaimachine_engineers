import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ServiceRegistrationDialog({ dialogOpen, setDialogOpen, responseData }) {
  if (!responseData) return null; // Do not render if there's no data
  
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
        <Button>Print</Button>
      </DialogContent>
    </Dialog>
  );
}