import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import closeIcon from "../../../public/icons/close.svg";
import { useState } from "react";
import server from "../../common/server";

const LoadMoneyModal = ({ onClose, token }) => {
  const [money, setMoney] = useState(0);

  const handleInputChange = (e) => {
    setMoney(e.target.value);
  };

  const loadMoney = async () => {
    const res = await server.post(
      "/users/load",
      { amount: parseInt(money) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      alert("충전이 완료되었습니다.");
      onClose();
      location.reload();
    } else {
      alert("충전 중 오류가 발생했습니다.");
    }
  };

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>
        <button className="absolute right-2 top-2 h-6 w-6" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </DialogHeader>

      <DialogBody>
        <p className="py-2">충전하실 금액을 입력해주세요</p>
        <Input
          type="number"
          label="충전 금액"
          name="money"
          onChange={handleInputChange}
        />
      </DialogBody>

      <DialogFooter>
        <button
          onClick={loadMoney}
          className="w-full h-12 border rounded-lg shadow-md text-white font-semibold bg-orange-500"
        >
          충전하기
        </button>
      </DialogFooter>
    </Dialog>
  );
};

LoadMoneyModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default LoadMoneyModal;
