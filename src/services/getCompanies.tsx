import React, { SetStateAction, useContext } from "react";
import { Context } from "../contexts/Context";
import { useQuery } from "@tanstack/react-query";
import { MoreOutlined } from "@ant-design/icons";
import { instance } from "../hooks/instance";
import { CompanyType } from "../types/CompaniesType";
import { toast } from "react-toastify";

type CompanyResponse = {
  data: any[];
  totalCount: number;
};


export const getCompanies = (
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  handleMoreBtnClick: any,
  page: number,
  limit: number,
): CompanyResponse | never[] => {
  const { token } = useContext(Context);
  const params = { PageIndex: page, PageSize: limit };

  const { data = [] } = useQuery({
    queryKey: ["companies", page, limit],
    queryFn: async () => {
      try {
        const res = await instance().get("/companies/get-all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        });

        const totalCount = JSON.parse(res.headers.pagination).TotalCount;
        const mappedData = res.data?.map((item: CompanyType, index: number) => ({
          ...item,
          key: index + 1 + (page - 1) * limit,
          actions: (
            <div>
              <button onClick={() => handleMoreBtnClick(item.id)}>
                <MoreOutlined className="scale-[1.5] cursor-pointer relative" />
              </button>
            </div>
          ),
        }));

        return { data: mappedData, totalCount };
      } catch (error) {
        toast("Ошибка сервера или некорректно введенные данные.");
        return { data: [], totalCount: 0 };
      } finally {
        setIsLoading(false);
      }
    },
  });

  return data;  // This will now be of type CompanyResponse or never[]
};

