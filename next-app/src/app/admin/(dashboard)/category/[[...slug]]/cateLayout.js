'use client'

import Search from "./search";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter, Select, Option
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const TABLE_HEAD = ["Index", "Name", "Description", "Action"];

export default function CateLayout({ children, pagination }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(pagination.currentPage || "1");
    const [limit, setLimit] = useState(parseInt(pagination.limit || 10));
    const totalPages = parseInt(pagination.totalPages || "0");
    const currentSearch = searchParams.get("q") || "";

    const handlePageChange = (newPage, newLimit) => {
        const query = currentSearch ? `?q=${currentSearch}` : "";
        router.push(`/admin/category/${newPage}/${newLimit}${query}`);
    };

    const handleSearch = (searchText) => {
        const query = searchText ? `?q=${searchText}` : "";
        router.push(`/admin/category/1/${limit}${query}`);
    };


    useEffect(() => {
        handlePageChange(currentPage, limit);
    }, [limit]);

    return (
        <Card className="w-full flex-row h-full block">
            <CardHeader floated={false} shadow={false} className="rounded-none mt-0 pt-4">
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Categories list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all Categories
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3" size="sm">
                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
                        </Button>
                    </div>
                </div>
                <Search currentSearch={currentSearch} onSearch={handleSearch} />
            </CardHeader>
            <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-center">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </CardBody>

            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <div className="font-normal flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Typography variant="small" color="blue-gray" className="w-full pt-3">
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <div>
                        <Select
                            variant="standard"
                            className="w-full min-w-[150px] pt-0"
                            value={limit.toString()}
                            onChange={(val) => setLimit(val)}
                        >
                            <Option value="5" >5</Option>
                            <Option value="10" >10</Option>
                            <Option value="15" >15</Option>
                            <Option value="25" >25</Option>
                            <Option value="50" >50</Option>
                            <Option value="100" >100</Option>
                            <Option value="200" >200</Option>
                        </Select>
                    </div>
                </div>
                <div className="flex gap-2 pt-3">
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage >= totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}