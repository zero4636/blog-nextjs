import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";

export default function Search({ currentSearch, onSearch }) {
    const [searchText, setSearchText] = useState(currentSearch);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-6">
            <div className="w-full md:w-72">
                <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
}