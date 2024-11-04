'use client'

import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody
} from "@material-tailwind/react";

const TABLE_HEAD = ["Index", "Name", "Bio", "Short Description"];

export default function UserLayout({ children }) {
    return (
        <Card className="w-full flex-row h-full block">
            <CardHeader floated={false} shadow={false} className="rounded-none mt-0 pt-4">
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Authors list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all authors
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3" size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add author
                        </Button>
                    </div>
                </div>
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

                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}