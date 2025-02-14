import { Input } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import server from "../../common/server";

const LoginPage = (props) => {
  const navigate = useNavigate();

  const { authLogin } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    userId: "",
    password: "",
  });

  const { userId, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (userId.length === 0 || password.length === 0) {
      return;
    }

    const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b|['";\-\-])/gi;

    const isValidInput = (input) => {
      return !sqlInjectionPattern.test(input);
    };

    // SQL 인젝션 의심 입력 방지
    if (!isValidInput(userId) || !isValidInput(password)) {
      alert("잘못된 입력입니다.");
      return;
    }

    const res = await server.post(`/users/signin`, {
      userId: userId,
      password: password,
    });

    if (res.data.success) {
      authLogin(res.data.data);
      navigate("/");
    } else {
      alert("아이디 혹은 비밀번호를 확인해주세요.");
    }
  };

  return (
    <section className="flex flex-col mt-24 items-center w-[40vw] h-full p-6 border-2 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold pb-10">로그인</h1>

      <form onSubmit={onSubmit}>
        <div className="w-[25vw] flex flex-col gap-8">
          <Input
            name="userId"
            label="아이디"
            value={userId}
            onChange={onChange}
          />
          <Input
            type="password"
            name="password"
            label="비밀번호"
            value={password}
            onChange={onChange}
          />
          <button
            type="submit"
            className="w-full h-12 rounded-lg border border-gray-200 bg-orange-500 text-lg text-white font-semibold shadow-md"
          >
            로그인
          </button>
        </div>
      </form>

      <Link to="/signup" className="mt-3 text-gray-400 font-semibold">
        회원가입
      </Link>
    </section>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
