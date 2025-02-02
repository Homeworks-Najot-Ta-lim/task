import { FormEvent, useContext, useState } from "react";
import SignIn from "../components/SignIn";

import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { instance } from "../hooks/instance";
import { Context } from "../contexts/Context";
import { toast } from "react-toastify";
import Signup from "../components/SignUp";

const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const { setToken } = useContext(Context);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
        const form = e.target as HTMLFormElement;
 
      if (loginStatus === "login") {
        const data = {
            login: form.username.value,
            password: form.password.value,
          };
        const response = await instance().post("/auths/sign-in", data);
        if (response.status === 200) {
          setToken(response.data);
          toast.success(`Привет, добро пожаловать`)
          navigate("/companies");
        }
      } else if (loginStatus === "register") {
        const data = {
            fullName: form.fullname.value,
            login: form.username.value,
            password: form.password.value,
        }
        const response = await instance().post("/auths/sign-up", data);
        if (response.status === 200) {
            toast.success("Успешная регистрация.")
          setLoginStatus("login");
        }
      }
    } catch (error: any) {
        if(error.response.message && error.response.message !=""){
            toast.error(error.response.message)
        }else {
            toast.error("Ошибка авторизации.")
        }
    }
  }

  const handleLoginStatusChange = () => {
    setLoginStatus((prevStatus) =>
      prevStatus === "login" ? "register" : "login"
    );
  };

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-center min-h-screen min-w-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <form onSubmit={handleSubmit}>
        <div
          className={`container bg-white w-[462px] ${
            loginStatus === "login" ? "h-[298px]" : "h-[382px]"
          } rounded-[2px] p-5`}
        >
          {loginStatus === "login" ? <SignIn /> : <Signup />}
          <span
            onClick={handleLoginStatusChange}
            className="text-[#1890FF] font-[400] text-[14px] cursor-pointer"
          >
            {loginStatus === "login" ? "Регистрация" : "Вход"}
          </span>
          <div className="w-full flex items-center justify-center mt-1 border border-t-[#efefef] border-b-0 border-l-0 border-r-0 py-2">
            <CustomButton type="submit"
              title={loginStatus === "login" ? "Вход" : "Регистрировать"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
