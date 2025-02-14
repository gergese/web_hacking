import PropTypes from "prop-types";
import rightIcon from "../../../public/icons/right.svg";
import { Link } from "react-router-dom";

const EventSection = ({ children }) => {
  return (
    <div
      className="grid w-full h-full
     p-6 border-2 rounded-xl shadow-md"
    >
      <Link to="/event">
        <div className="flex self-start justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">진행 중인 이벤트</h1>
          <img src={rightIcon} alt="go" className="cursor-pointer" />
        </div>
      </Link>

      <div className="flex flex-col overflow-scroll scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

EventSection.propTypes = {
  children: PropTypes.any.isRequired,
};

export default EventSection;
