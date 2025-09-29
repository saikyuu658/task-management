import React, { useState } from "react";

type SidebarItem = {
    id: number;
    label: string;
};

const sidebarItems: SidebarItem[] = [
    { id: 1, label: "Dashboard" },
    { id: 2, label: "Tasks" },
    { id: 3, label: "Projects" },
    { id: 4, label: "Settings" },
    { id: 5, label: "Profile" },
];

const Sidebar: React.FC = () => {
    const [search, setSearch] = useState("");

    const filteredItems = sidebarItems.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside className="w-60 bg-gray-100 p-4">
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <ul className="list-none p-0">
                {filteredItems.map(item => (
                    <li
                        key={item.id}
                        className="py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-200 transition"
                    >
                        {item.label}
                    </li>
                ))}
                {filteredItems.length === 0 && (
                    <li className="text-gray-500 py-2">No items found</li>
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;
