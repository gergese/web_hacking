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

const CheckAccountModal = ({ onClose, account, token }) => {
  const [newAccount, setNewAccount] = useState("");

  const onChange = (e) => {
    setNewAccount(e.target.value);
  };

  const changeAccount = async () => {
    const res = await server.patch(
      "/users/changeaccount",
      { account: newAccount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      alert("변경이 완료되었습니다.");
      onClose();
      location.reload();
    } else {
      alert("변경 중 오류가 발생했습니다.");
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
        <p className="text-black py-2">회원님의 계좌정보를 확인해주세요</p>
        <Input name="account" defaultValue={account} onChange={onChange} />
      </DialogBody>

      <DialogFooter>
        <button
          onClick={changeAccount}
          className="w-full h-12 border rounded-lg shadow-md text-white font-semibold bg-orange-500"
        >
          변경하기
        </button>
      </DialogFooter>
    </Dialog>
  );
};

CheckAccountModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default CheckAccountModal;
