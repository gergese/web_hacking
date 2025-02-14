import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../../common/api";
import { formattedDate } from "../../common/utils";

const EventDetailPage = () => {
  const { id } = useParams();

  const { data, isSuccess } = useQuery(["eventInfo", id], getEventInfo);

  return (
    isSuccess && (
      <section className="section-margin w-[90vw]">
        <div className="flex flex-col justify-between gap-1">
          <h1 className="text-2xl font-semibold">{data.title}</h1>

          <p className="text-gray self-end">{formattedDate(data.date)}</p>
        </div>

        <div className="w-full h-[1px] my-3 bg-gray-300"></div>

        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </section>
    )
  );
};

export default EventDetailPage;
