import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ServiceRegistrationDialog({ dialogOpen, setDialogOpen, responseData }) {
  const iframeRef = useRef();

  if (!responseData) return null; // Do not render if there's no data

  const handlePrint = () => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>Print Service Registration</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
              }
              table {
                width: 100%;
                height: 100%;
                border-collapse: collapse;
              }
              th, td {
                padding: 8px;
                border: 1px solid #e2e8f0;
                text-align: left;
              }
            </style>
          </head>
          <body>
            
            <table class="w-full h-full border">
              <tbody>
              <tr>
                  <th class="px-4 py-2 font-semibold border-b">Job Number</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.JobNumber}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Customer ID</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.CustomerID}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Chosen Service</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.ChooseService}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Customer Name</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.CustomerName}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Customer Number</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.CustomerNumber}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Service Type</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.ServiceType || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Machine Type</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.MachineType || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Machine Brand</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.MachineBrand || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Model Number</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.ModelNumber || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Engine Number</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.EngineNumber || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Problem</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.Problem || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Notes</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.Notes || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Due Date</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.DueDate || "N/A"}</td>
                </tr>
                <tr>
                  <th class="px-4 py-2 font-semibold border-b">Service Status</th>
                  <td class="px-4 py-2 border-l border-b">${responseData.ServiceStatus || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `);
      doc.close();
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
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

      {/* Hidden iframe for direct printing */}
      <iframe ref={iframeRef} style={{ display: "none" }}></iframe>
    </Dialog>
  );
}
