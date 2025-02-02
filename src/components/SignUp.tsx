import CustomInput from "./CustomInput";

const Signup = () => {
  return (
    <>
      <h1 className="text-[36px] line-clamp-[22px] mb-1 font-[700]">
        Регистрация
      </h1>
      <div className="flex flex-col items-start space-y-3 w-full mb-3">
        <div className="flex space-y-1 items-start justify-center flex-col w-full">
          <label htmlFor="">Ф.И.О</label>
          <CustomInput
            name="fullname"
            type="text"
            placeholder="Введите Ф.И.О"
          />
        </div>
        <div className="flex space-y-1 items-start justify-center flex-col w-full">
          <label>Логин</label>
          <CustomInput
            name="username"
            type="text"
            placeholder="Введите логин"
          />
        </div>
        <div className="flex space-y-1 items-start justify-center flex-col w-full">
          <label>Пароль</label>
          <CustomInput
            name="password"
            type="text"
            placeholder="Введите пароль"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
