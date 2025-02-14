import PropTypes from "prop-types";
import { tradeData } from "../../mocks/TradeData";
import GoodsCard from "./GoodsCard";
import { Link } from "react-router-dom";

const GoodsListPage = (props) => {
  return (
    <section className="section-margin w-[50vw]">
      <h1 className="text-2xl font-semibold">중고거래 게시판</h1>
      <p className="mt-3">다양한 중고 거래 물품들을 둘러보세요!</p>

      <div className="grid grid-cols-2 gap-5 mt-5">
        {tradeData.map((item) => (
          <Link key={item} to={`/goodsdetail/${item.id}}`}>
            <GoodsCard
              url={item.url}
              title={item.title}
              place={item.place}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

GoodsListPage.propTypes = {};

export default GoodsListPage;
