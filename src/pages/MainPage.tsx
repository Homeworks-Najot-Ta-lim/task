import { FormEvent, useContext, useState } from "react";

import Header from "../components/Header";
import { CompanyType } from "../types/CompaniesType";
import { TableColumnsType } from "antd";
import CustomTable from "../components/CustomTable";
import { getCompanies } from "../services/getCompanies";

import { Dropdown, Menu } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import CustomModal from "../components/CustomModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../hooks/instance";
import { Context } from "../contexts/Context";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [companyName,setCompanyName] = useState<string>()
  const [countEmployees,setCountEmployees] = useState<number>()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10})
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );

  const { token } = useContext(Context);
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: ()=>instance().put("/companies/update",{
      id: selectedCompanyId,
      name: companyName,
      count: countEmployees
    },{
      headers: {Authorization: `Bearer ${token}`}
    }),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["companies"]})
      toast.success("Успешно отредактировано.")
      setOpenEditModal(false)
    },
    onError: ()=>{
      toast.error("Ошибка сервера или некорректно введенные данные.",)
      setOpenEditModal(false)
    }
  })


  const deleteMutation = useMutation({
    mutationFn: () =>
      instance().delete(`/companies/delete/by-id`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: `${selectedCompanyId}`,
      }),
    onSuccess: () => {
      toast.success("Успешно удалено. ");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setOpenDeleteAlert(false);
    },
    onError: () => {
      toast.error("Ошибка сервера или некорректно введенные данные.");
    },
  });

  const columns: TableColumnsType<CompanyType> = [
    { title: "Названия компании", dataIndex: "name" },
    { title: "Количество сотрудников", dataIndex: "count" },
    { title: "Действия", dataIndex: "actions" },
  ];

  function handleMoreBtnClick(id: string) {
    setOpenDropdownId(openDropdownId === id ? null : id);
  }

  function handleOkDelete(id: string) {
    setSelectedCompanyId(id);
    setOpenDeleteAlert(true);
  }

  function handleDeleteConfirm() {
    if (selectedCompanyId) {
      deleteMutation.mutate();
    }
  }

  function handleOpenEdit(company: CompanyType) {
    setCompanyName(company.name)
    setCountEmployees(company.count)
    setSelectedCompanyId(company.id);
    setOpenEditModal(true)
  }

  function handleEditSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    editMutation.mutate()
  }

  const menu = (company: CompanyType) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleOpenEdit(company)}>
        <span className="flex items-center justify-center space-x-1">
          <EditOutlined />
          <p>Изменить</p>
        </span>
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleOkDelete(company.id)}>
        <span className="flex items-center justify-center space-x-1 text-red-600">
          <DeleteOutlined />
          <p>Удалить</p>
        </span>
      </Menu.Item>
    </Menu>
  );
  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  
  
  const companiesData = getCompanies(setIsLoading, handleMoreBtnClick, pagination.current, pagination.pageSize);
  let companies = []
  let totalCount = 0
  if ('totalCount' in companiesData){
    totalCount=companiesData.totalCount
  }
 

  if ('data' in companiesData) {
    companies = companiesData.data.map((company: any) => ({
      ...company,
      actions: (
        <Dropdown
          overlay={menu(company)}
          trigger={["click"]}
          visible={openDropdownId === company.id}
          onVisibleChange={(visible) =>
            setOpenDropdownId(visible ? company.id : null)
          }
        >
          <button>
            <MoreOutlined className="scale-[1.5] cursor-pointer" />
          </button>
        </Dropdown>
      ),
    }));
  
    
  }
  
  

  return (
    <div>
      <Header />
      <CustomTable loading={isLoading} columns={columns} data={companies} handleTableChange={handleTableChange} pagination={pagination} pageCount={totalCount}/>
      <CustomModal
        isAlert={true}
        open={openDeleteAlert}
        title="Удаление"
        text="Вы хотите удалить?"
        onCancel={() => setOpenDeleteAlert(false)}
        onOk={handleDeleteConfirm}
      />

      <CustomModal isAlert={false} onCancel={()=>setOpenEditModal(false)} title="Изменить" open={openEditModal}>
        <form onSubmit={handleEditSubmit}>
        <div className="w-full p-3 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center w-full space-y-2">
            <div className="flex flex-col space-y-1 w-full">
              <label>Названия компании</label>
              <CustomInput name="update_company_name" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} type="text"  placeholder="Введите названия"/>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label>Количество сотрудников</label>
              <CustomInput name="update_number_employees" value={countEmployees} onChange={(e)=>setCountEmployees(parseInt(e.target.value))}  type="number" placeholder="Введите количество"/>
            </div>
          </div>
          <CustomButton
          type="submit"
          extraClass="!bg-[#1890FF] !mt-4 rounded-[1px]"
          title="Update"
          
        />
        </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default MainPage;
