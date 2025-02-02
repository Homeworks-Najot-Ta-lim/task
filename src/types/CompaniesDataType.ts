import { TableColumnsType } from "antd";

export interface CompaniesTableType {
  columns: TableColumnsType<any>;
  data: any[];
  loading: boolean;
  handleTableChange: (pagination: any) => void;
  pagination: {
    current: number;
    pageSize: number;
  };
  pageCount: number
}
