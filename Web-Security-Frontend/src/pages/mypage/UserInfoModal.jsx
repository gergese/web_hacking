import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import closeIcon from "../../../public/icons/close.svg";

const UserInfoModal = ({ onClose, name, userId }) => {
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>
        <h1 className="text-black">유저 정보</h1>
        <button className="absolute right-2 top-2 h-6 w-6" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </DialogHeader>

      <DialogBody className="grid gap-2 py-2">
        <p>이름: {name}</p>
        <p>아이디: {userId}</p>
      </DialogBody>

      <DialogFooter>
        <button
          onClick={onClose}
          className="w-full h-12 border rounded-lg shadow-md text-white font-semibold bg-orange-500"
        >
          확인
        </button>
      </DialogFooter>
    </Dialog>
  );
};

UserInfoModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default UserInfoModal;
