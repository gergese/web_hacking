import PropTypes from "prop-types";
import { formattedPrice } from "../../common/utils";
import rightWhiteIcon from "../../../public/icons/rightWhite.svg";
import rightGrayIcons from "../../../public/icons/rightGray.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoadMoneyModal from "./LoadMoneyModal";
import SendModal from "./SendModal";
import CheckAccountModal from "./CheckAccountModal";
import UserInfoModal from "./UserInfoModal";
import { AuthContext } from "../../contexts/AuthContext";
import { getMyAccount, getMyBalance } from "../../common/api";

const MyPage = (props) => {
  const navigate = useNavigate();
  const { auth, authId, authName, authLogout } = useContext(AuthContext);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  useEffect(() => {
    const getAccountInfo = async () => {
      const myAccount = await getMyAccount();
      const myBalance = await getMyBalance();
      setAccount(myAccount.account);
      setBalance(myBalance.balance);
    };
    getAccountInfo();
  }, []);

  const handleLoadMoneyModal = () => {
    setOpenLoadModal((prev) => !prev);
  };

  const handleSendModal = () => {
    setOpenSendModal((prev) => !prev);
  };

  const handleAccountModal = () => {
    setOpenAccountModal((prev) => !prev);
  };

  const handleInfoModal = () => {
    setOpenInfoModal((prev) => !prev);
  };

  return (
    <section>
      {" "}
      {auth ? (
        <>
          <div className="w-[50vw] h-full p-6 rounded-xl shadow-md bg-orange-500 text-white">
            <h1 className="font-semibold text-2xl">내 경기페이</h1>

            <div className="h-[1px] w-full bg-white my-3"></div>

            <div className="text-3xl font-bold mt-10">
              {account ? (
                `${formattedPrice(balance)}원`
              ) : (
                <p>연결된 계좌가 없어요. </p>
              )}
            </div>

            <div className="flex w-full h-full mt-7">
              <button
                className="items-center w-1/2 p-4 h-full border-2 border-white rounded-md rounded-r-none shadow-md text-lg text-orange-500 font-semibold bg-white"
                onClick={handleLoadMoneyModal}
              >
                충전하기
              </button>
              <button
                className="w-1/2 p-4 h-full border-2 border-white rounded-md rounded-l-none shadow-md text-lg text-orange-500 font-semibold bg-white"
                onClick={handleSendModal}
              >
                보내기
              </button>
            </div>

            <button
              className="justify-self-end flex gap-1 items-center mt-5"
              onClick={handleAccountModal}
            >
              <p className="font-semibold">연결계좌 변경</p>
              <img src={rightWhiteIcon} alt="right" />
            </button>
          </div>

          <div className="mt-5 px-4 cursor-pointer" onClick={handleInfoModal}>
            <div className="py-5 flex items-center justify-between text-xl text-gray-500">
              <p>회원 정보</p>
              <img src={rightGrayIcons} alt="go" />
            </div>
          </div>
          <div className="h-[0.5px] w-full bg-gray-500"></div>
          <div className="px-4 cursor-pointer" onClick={authLogout}>
            <div className="py-5 flex items-center justify-between text-xl text-gray-500">
              <p>로그아웃</p>
              <img src={rightGrayIcons} alt="go" />
            </div>
          </div>
          <div className="h-[0.5px] w-full bg-gray-500"></div>
        </>
      ) : (
        <div
          onClick={() => navigate("/login")}
          className="flex w-[50vw] h-[400px] rounded-lg shadow-md bg-orange-500 text-white cursor-pointer"
        >
          <h1 className="self-center mx-auto text-2xl font-semibold">
            로그인 후 사용해주세요!
          </h1>
        </div>
      )}
      {openLoadModal && (
        <LoadMoneyModal token={auth.token} onClose={handleLoadMoneyModal} />
      )}
      {openSendModal && (
        <SendModal
          token={auth.token}
          balance={balance}
          account={account}
          onClose={handleSendModal}
        />
      )}
      {openAccountModal && (
        <CheckAccountModal
          token={auth.token}
          account={account}
          onClose={handleAccountModal}
        />
      )}
      {openInfoModal && (
        <UserInfoModal
          name={authName}
          userId={authId}
          onClose={handleInfoModal}
        />
      )}
    </section>
  );
};

MyPage.propTypes = {};

export default MyPage;
