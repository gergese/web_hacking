import EventListSection from "./EventListSection";
import EventList from "./../mainPage/EventList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../common/api";
import { formattedDate } from "../../common/utils";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      setEvents(await getAllEvents());
    };

    getEvents();
  }, []);

  return (
    <section>
      <EventListSection>
        {events.map((item) => (
          <Link key={item} to={`/event/${item.id}`}>
            <EventList title={item.title} date={formattedDate(item.date)} />
            <div className="h-[0.5px] w-full bg-gray-200"></div>
          </Link>
        ))}
      </EventListSection>
    </section>
  );
};

export default EventPage;
