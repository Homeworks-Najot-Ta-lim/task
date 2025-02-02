import { LogoutOutlined } from "@ant-design/icons";
import CustomButton from "./CustomButton";
import {useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";

import CustomModal from "./CustomModal";
import CustomInput from "./CustomInput";
import { instance } from "../hooks/instance";
import { toast } from "react-toastify";
import { Context } from "../contexts/Context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const [openAddCompanyModal, setOpenAddCompanyModal] =useState<boolean>(false);

  const navigate = useNavigate();
  const {token} = useContext(Context)
  const queryClient = useQueryClient()
  function handleLogOut() {
    localStorage.clear();
    navigate("/");
    setOpenLogoutModal(false);
  }

  function cancelAlertModal() {
    setOpenLogoutModal(false);
  }
  function cancelAddCompanyModal() {
    setOpenAddCompanyModal(false);

  }

  const addCompanyMutation = useMutation({
    mutationFn: (e: FormEvent<HTMLFormElement>)=>instance().post("/companies/add", {
      name: (e.target as HTMLFormElement).company_name.value,
      count: parseInt((e.target as HTMLFormElement).number_employees.value)
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["companies"]})
      toast.success("Компания успешно создана");
      setOpenAddCompanyModal(false); 
    },
    onError: ()=>{
      toast.error("Ошибка сервера или некорректно введенные данные.")
    }
  })

  async function handleAddCompany(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addCompanyMutation.mutate(e)
  }
  

  return (
    <>
      <div className="flex w-screen items-center justify-between bg-[#313131] p-3">
        <h1 className="text-2xl text-white font-[700]">Компании</h1>
        <div className="flex items-center justify-center space-x-5">
          <LogoutOutlined
            onClick={() => setOpenLogoutModal(true)}
            style={{ color: "white", fontSize: "25px" }}
            className="transform rotate-180 cursor-pointer"
          />
          <CustomButton
            title="Добавить компанию"
            type="button"
            extraClass="!bg-[#08979C] rounded-[1px]"
            onClick={() => setOpenAddCompanyModal(true)}
          />
        </div>
      </div>
      <CustomModal
        isAlert={true}
        title="Выход"
        text="Вы уверены, что хотите выйти?"
        open={openLogoutModal}
        onCancel={cancelAlertModal}
        onOk={handleLogOut}
      />

     
     <CustomModal
        isAlert={false}
        title="Добавить компания"
        open={openAddCompanyModal}
        onCancel={cancelAddCompanyModal}
      >
        <form onSubmit={handleAddCompany}>
        <div className="w-full p-3 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center w-full space-y-2">
            <div className="flex flex-col space-y-1 w-full">
              <label>Названия компании</label>
              <CustomInput name="company_name" type="text"  placeholder="Введите названия"/>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label>Количество сотрудников</label>
              <CustomInput name="number_employees"  type="number" placeholder="Введите количество"/>
            </div>
          </div>
          <CustomButton
          type="submit"
          extraClass="!bg-[#1890FF] !mt-4 rounded-[1px]"
          title="Добавить компания"
          
        />
        </div>
        </form>
      </CustomModal>
    
    </>
  );
};

export default Header;
