import PropTypes from "prop-types";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import server from "../../common/server";

const SignUpPage = (props) => {
  const navigate = useNavigate();

  const [isAllExist, setIsAllExist] = useState(false);
  const [data, setData] = useState({
    userId: null,
    password: null,
    name: null,
  });

  useEffect(() => {
    if (data.userId && data.password && data.name) {
      setIsAllExist(true);
    } else {
      setIsAllExist(false);
    }
  }, [data]);

  const changeData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitSignUp = async () => {
    const res = await server.post(`/users/signup`, {
      userId: data.userId,
      password: data.password,
      name: data.name,
    });

    if (res.data.success) {
      alert("회원가입에 성공하였습니다.");
    } else {
      alert("회원가입에 실패했습니다.");
      location.reload();
    }
    navigate("/");
  };
  return (
    <section className="flex flex-col mt-16 items-center w-[40vw] h-full p-10 border-2 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold pb-10">회원가입</h1>

      <div className="w-[25vw] flex flex-col gap-8">
        <Input name="userId" label="아이디" onChange={changeData} />
        <Input
          type="password"
          name="password"
          label="비밀번호"
          onChange={changeData}
        />
        <Input name="name" label="이름" onChange={changeData} />

        <button
          onClick={submitSignUp}
          className={`w-full h-12 rounded-lg border border-gray-200 ${
            isAllExist ? "bg-orange-500" : "bg-blue-gray-400"
          } text-lg text-white font-semibold shadow-md`}
          disabled={!isAllExist}
        >
          가입하기
        </button>
      </div>
    </section>
  );
};

SignUpPage.propTypes = {};

export default SignUpPage;
