import React from "react";

interface TableHeadProps {
  children: React.ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
};

export default TableHead;
