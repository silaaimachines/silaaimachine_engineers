import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ServiceDetailsDialog({
  dialogOpen,
  setDialogOpen,
  responseData,
}) {
  const iframeRef = useRef();

  if (!responseData) return null; // Do not render if there's no data
  
  const createServiceDetailsHTML = () => {
    return `
      <html>
        <head>
          <title>Service Job Details</title>
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
            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
              max-width: 600px;
            }
            h2 {
              font-size: 1.5em;
              font-weight: bold;
              margin-bottom: 16px;
            }
            table {
              width: 100%;
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
          <div class="container">
            <h2>Service Job Details</h2>
            <table>
              <tbody>
                <tr>
                  <th>Job Number</th>
                  <td>${responseData.JobNumber}</td>
                </tr>
                <tr>
                  <th>Customer ID</th>
                  <td>${responseData.CustomerID}</td>
                </tr>
                <tr>
                  <th>Chosen Service</th>
                  <td>${responseData.ChooseService || "N/A"}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>${responseData.CustomerName}</td>
                </tr>
                <tr>
                  <th>Number</th>
                  <td>${responseData.CustomerNumber}</td>
                </tr>
                <tr>
                  <th>Service Type</th>
                  <td>${responseData.ServiceType || "N/A"}</td>
                </tr>
                <tr>
                  <th>Machine Type</th>
                  <td>${responseData.MachineType || "N/A"}</td>
                </tr>
                <tr>
                  <th>Machine Brand</th>
                  <td>${responseData.MachineBrand || "N/A"}</td>
                </tr>
                <tr>
                  <th>Model Number</th>
                  <td>${responseData.ModelNumber || "N/A"}</td>
                </tr>
                <tr>
                  <th>Engine Number</th>
                  <td>${responseData.EngineNumber || "N/A"}</td>
                </tr>
                <tr>
                  <th>Problem</th>
                  <td>${responseData.Problem || "N/A"}</td>
                </tr>
                <tr>
                  <th>Notes</th>
                  <td>${responseData.Notes || "N/A"}</td>
                </tr>
                <tr>
                  <th>Due Date</th>
                  <td>${responseData.DueDate || "N/A"}</td>
                </tr>
                <tr>
                  <th>Service Status</th>
                  <td>${responseData.ServiceStatus || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;
  };

  const handlePrint = () => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(createServiceDetailsHTML());
      doc.close();
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const viewJobDetails = () => {
    if (responseData.JobNumber) {
      const newWindow = window.open('', '_blank'); // Open a new tab
      newWindow.document.write(createServiceDetailsHTML());
      newWindow.document.close();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Service Details</DialogTitle>
          <DialogDescription>Details for the Service</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="text-center">Job Number: </p>
            <p className="text-xl font-bold text-center">
              {responseData.JobNumber}
            </p>
          </div>
          <Table>
            <TableCaption>Customer Information</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Customer ID</TableCell>
                <TableCell>{responseData.CustomerID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Customer Name</TableCell>
                <TableCell>{responseData.CustomerName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Button onClick={handlePrint}>Print</Button>
        <Button onClick={viewJobDetails}>View</Button>
      </DialogContent>

      {/* Hidden iframe for direct printing */}
      <iframe ref={iframeRef} style={{ display: "none" }}></iframe>
    </Dialog>
  );
}
