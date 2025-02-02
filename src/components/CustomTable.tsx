import React from "react";
import { Table } from "antd";
import { CompaniesTableType } from "../types/CompaniesDataType";

const CustomTable: React.FC<CompaniesTableType> = ({ columns, data, loading, handleTableChange, pagination,pageCount }) => {
  return (
    <Table<any>
      loading={loading}
      className="border border-slate-300 rounded-md"
      columns={columns}
      dataSource={data || []}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        onChange: (page) => handleTableChange({ current: page, pageSize: pagination.pageSize }),
        total: pageCount,
      }}
      onChange={handleTableChange}
    />
  );
};

export default CustomTable;
