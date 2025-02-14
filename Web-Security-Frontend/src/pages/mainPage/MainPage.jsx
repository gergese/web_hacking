import PropTypes from "prop-types";
import TradeSection from "./TradeSection";
import TradeCard from "./TradeCard";
import { tradeData } from "../../mocks/TradeData";
import EventSection from "./EventSection";
import EventList from "./EventList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../common/api";
import { formattedDate } from "../../common/utils";

const MainPage = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      setEvents(await getAllEvents());
    };

    getEvents();
  }, []);
  return (
    <section className="flex flex-col gap-4">
      <TradeSection>
        {tradeData.slice(0, 3).map((item) => (
          <Link key={item} to={`/goodsdetail/${item.id}`}>
            <TradeCard
              url={item.url}
              title={item.title}
              place={item.place}
              price={item.price}
            />
          </Link>
        ))}
      </TradeSection>

      <EventSection>
        {events.length > 0 ? (
          events.slice(0, 5).map((item) => (
            <Link key={item} to={`/event/${item.id}`}>
              <EventList title={item.title} date={formattedDate(item.date)} />
              <div className="h-[0.5px] w-full bg-gray-200"></div>
            </Link>
          ))
        ) : (
          <div>진행 중인 이벤트가 없습니다.</div>
        )}
      </EventSection>
    </section>
  );
};

MainPage.propTypes = {};

export default MainPage;
