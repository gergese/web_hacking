import PropTypes from "prop-types";
import rightIcon from "../../../public/icons/right.svg";
import { useNavigate } from "react-router-dom";

const TradeSection = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="grid w-full h-[440px] p-6 border-2 rounded-xl shadow-md">
      <div className="flex self-start justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">따끈한 거래품</h1>
        <img
          src={rightIcon}
          alt="go"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="flex gap-3 overflow-scroll scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

TradeSection.propTypes = {
  children: PropTypes.any,
};

export default TradeSection;
