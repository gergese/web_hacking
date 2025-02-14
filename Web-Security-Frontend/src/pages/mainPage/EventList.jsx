import PropTypes from "prop-types";

const EventList = ({ title, date }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="font-semibold">{title}</p>
      <p className="text-gray-600">{date}</p>
    </div>
  );
};

EventList.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default EventList;
