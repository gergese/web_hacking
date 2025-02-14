import { useNavigate } from "react-router-dom";
import { useState } from "react";
import server from "../../common/server";

const EventWritePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const res = await server.post("/events/newevent", {
      title: title,
      content: content,
    });
    if (res.data.success) {
      alert("게시글 업로드를 완료했습니다.");
      navigate("/event");
    } else {
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">글쓰기</h1>

      <div className="w-[70vw] flex flex-col gap-3">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className="w-full outline-none border-b-2 p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          cols="30"
          rows="10"
          placeholder="본문을 입력해주세요."
          className="outline-none border-2 resize-none p-3 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="flex gap-2 self-end">
          <button
            onClick={handleSubmit}
            className="p-2 w-24 h-10 rounded-md shadow-sm bg-orange-500 text-white font-semibold"
          >
            게시하기
          </button>
          <button
            onClick={() => navigate(-1, { replace: true })}
            className="p-2 w-24 h-10 rounded-md shadow-sm border-2 font-semibold"
          >
            취소
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventWritePage;
