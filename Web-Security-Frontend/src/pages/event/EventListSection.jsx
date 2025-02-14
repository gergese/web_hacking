import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const EventListSection = ({ children }) => {
  const { authType } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">진행 중인 이벤트</h1>
        {authType === "admin" && (
          <button
            onClick={() => navigate("/eventwrite")}
            className="w-24 h-10 rounded-lg shadow-md bg-orange-500 text-white font-semibold"
          >
            글쓰기
          </button>
        )}
      </div>
      <div className="flex flex-col w-[90vw] h-full p-6 border-2 rounded-xl shadow-md">
        {children}
      </div>
    </section>
  );
};

EventListSection.propTypes = {
  children: PropTypes.any.isRequired,
};

export default EventListSection;
