import PropTypes from "prop-types";
import { formattedPrice } from "../../common/utils";

const GoodsCard = ({ url, title, price, place }) => {
  return (
    <div className="w-full h-[340px] p-4 border-2 rounded-xl shadow-md">
      <div className="rounded-xl w-full h-[70%]">
        <img src={url} alt="image" className="w-full h-full rounded-lg" />
      </div>
      <div className="grid gap-1 mt-3">
        <p className="text-ellipsis overflow-hidden text-lg">{title}</p>
        <p className="text-ellipsis overflow-hidden text-xs">{place}</p>
        <p className="text-ellipsis overflow-hidden text-lg font-semibold">
          {formattedPrice(price)}원
        </p>
      </div>
    </div>
  );
};

GoodsCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.any.isRequired,
  place: PropTypes.string.isRequired,
};

export default GoodsCard;
