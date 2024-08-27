import React from "react";
import Board from "../../../components/board/Board";
import { notice } from "../../../lib/post";

function Notice() {
  return (
    <div>
      <h1>공지사항</h1>
      <p>업데이트 소식 안내 등</p>
      <div>
        <Board items={notice} />
      </div>
    </div>
  );
}

export default Notice;
