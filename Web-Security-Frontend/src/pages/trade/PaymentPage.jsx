import PropTypes from "prop-types";
import { useState } from "react";
import SuccessModal from "../../components/ui/SuccessModal";

const PaymentPage = (props) => {
  const [open, setOpen] = useState(false);
  const submitPayment = () => {
    setOpen((prev) => !prev);
  };
  return (
    <section className="w-[50vw]">
      <h1 className="text-2xl font-semibold py-5">결제하기</h1>
      <div className="grid gap-3 border-2 rounded-xl shadow-md p-6">
        <h1 className="text-xl font-semibold mb-3">거래명세서</h1>
        <p>제품명: </p>
        <p>가격: </p>
        <p>송금 계좌: </p>
      </div>
      <button
        onClick={submitPayment}
        className="w-full h-12 rounded-lg shadow-md mt-3 bg-orange-500 text-white font-semibold"
      >
        결제하기
      </button>
      {open && (
        <SuccessModal onClose={submitPayment} text="결제가 완료되었습니다." />
      )}
    </section>
  );
};

PaymentPage.propTypes = {};

export default PaymentPage;
