import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";

export default function Search() {
    return (
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-6">
            <div className="w-full md:w-72">
                <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
            </div>
        </div>
    );
}