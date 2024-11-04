'use client'

import Search from "./search";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter
} from "@material-tailwind/react";

const TABLE_HEAD = ["Index", "Name", "Description", "Action"];

export default function CateLayout({ children }) {
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
                <Search />
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
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}