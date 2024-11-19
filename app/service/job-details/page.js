"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const JobDetailsPage = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("jobNumber"); // Default to jobNumber
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setJobDetails([]); // Reset job details list for new search
    setPage(1);
    fetchJobDetails(searchType, searchTerm, 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchJobDetails(searchType, searchTerm, page);
    }
  }, [page, searchTerm, searchType]);

  const fetchJobDetails = async (type, term, currentPage) => {
    setLoading(true);
    try {
      const response = await GlobalApi.searchJobDetails(
        type,
        term,
        currentPage
      );

      // Sort the job details by JobNumber in descending order
      const sortedJobDetails = response.data.data.sort((a, b) => {
        return parseInt(b.JobNumber) - parseInt(a.JobNumber);
      });

      setJobDetails((prev) => [...prev, ...sortedJobDetails]);
      if (response.data.meta.pagination) {
        setTotalPages(response.data.meta.pagination.pageCount);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-3">
        <Input
          type="text"
          placeholder="Enter job No. or Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          onValueChange={(value) => setSearchType(value)}
          value={searchType}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Search By</SelectLabel>
              <SelectItem value="JobNumber">Job Number</SelectItem>
              <SelectItem value="CustomerName">Customer Name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center items-center gap-3 mt-3">
        <Button onClick={handleSearch}>Submit</Button>
      </div>

      {/* Render table if there are job details */}
      {jobDetails.length > 0 && (
        <Table className="mt-4">
          <TableCaption>A list of your recent job details.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Job Number</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobDetails.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.JobNumber}</TableCell>
                <TableCell>{job.CustomerName}</TableCell>
                <TableCell>{job.ServiceStatus || "N/A"}</TableCell>

                <TableCell className="text-center">
                  <Button variant="link">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Jobs</TableCell>
              <TableCell className="text-right">{jobDetails.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}

      {/* Show loading message while fetching */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default JobDetailsPage;
