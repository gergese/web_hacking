import PropTypes from "prop-types";
import image from "../../../public/image/airpodMax.jpg";
import { formattedPrice } from "../../common/utils";
import { Link } from "react-router-dom";

const GoodsDetailPage = (props) => {
  return (
    <section className="w-[50vw]">
      <h1 className="text-2xl font-semibold py-3">제품 상세</h1>

      <div className="w-full h-[640px] p-4 border-2 rounded-xl shadow-md">
        <div className="rounded-xl w-full h-[70%]">
          <img src={image} alt="image" className="w-full h-full rounded-lg" />
        </div>
        <div className="grid gap-3 mt-3">
          <p className="text-ellipsis overflow-hidden text-xl">에어팟 프로</p>
          <p className="text-ellipsis overflow-hidden">수원시 연무동</p>
          <p className="text-ellipsis overflow-hidden text-xl font-semibold">
            {formattedPrice(49000)}원
          </p>
        </div>

        <div className="h-[1px] w-full bg-gray-300 my-3"></div>

        <p className="text-ellipsis overflow-hidden">
          얼마 쓰지 않은 새상품입니다. 급하게 처분합니다.
        </p>
      </div>

      <Link to="/payment">
        <button className="w-full h-12 rounded-lg shadow-md mt-3 bg-orange-500 text-white font-semibold">
          구매하기
        </button>
      </Link>
    </section>
  );
};

GoodsDetailPage.propTypes = {};

export default GoodsDetailPage;
