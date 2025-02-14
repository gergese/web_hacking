import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import closeIcon from "../../../public/icons/close.svg";

const SuccessModal = ({ onClose, text }) => {
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>
        <button className="absolute right-2 top-2 h-6 w-6" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </DialogHeader>

      <DialogBody className="flex justify-center">
        <p className="text-black">{text}</p>
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

SuccessModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default SuccessModal;
