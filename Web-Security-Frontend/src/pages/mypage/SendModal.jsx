import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import closeIcon from "../../../public/icons/close.svg";
import { formattedPrice } from "../../common/utils";
import { useState } from "react";
import server from "../../common/server";

const SendModal = ({ onClose, balance, account, token }) => {
  const [inputs, setInputs] = useState({
    sendAccount: "",
    money: "",
  });

  const { sendAccount, money } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendMoney = async () => {
    const res = await server.post(
      "/users/transfer",
      {
        toUserAccount: sendAccount,
        amount: parseInt(money),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      alert("송금에 성공했습니다.");
      onClose();
    } else {
      alert("송금에 실패했습니다.");
    }
    location.reload();
  };

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>
        <button className="absolute right-2 top-2 h-6 w-6" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </DialogHeader>

      <DialogBody>
        <div className="grid gap-2 py-2">
          <p className="text-black">송금하실 계좌와 금액을 입력해주세요</p>
          <p className="text-xs">현재 잔액: {formattedPrice(balance)}원</p>
          <p className="text-xs">연결 계좌: {account}</p>
        </div>
        <div className="grid mt-5 gap-3">
          <Input
            label="송금 계좌"
            name="sendAccount"
            value={sendAccount}
            onChange={onChange}
          />
          <Input label="금액" name="money" value={money} onChange={onChange} />
        </div>
      </DialogBody>

      <DialogFooter>
        <button
          onClick={sendMoney}
          className="w-full h-12 border rounded-lg shadow-md text-white font-semibold bg-orange-500"
        >
          송금하기
        </button>
      </DialogFooter>
    </Dialog>
  );
};

SendModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
  balance: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default SendModal;
