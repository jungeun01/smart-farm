import React from "react";
import Board from "../../../components/board/Board";
import { as } from "../../../lib/post";
import PostView from "../../../components/board/post-view/PostView";
import Post from "../../../components/board/post/Post";

function AfterService(props) {
  return (
    <div>
      <h1>A/S 문의</h1>
      <p> - 이것저것 물어보슈</p>
      <div>
        <Board items={as} />
        <PostView />
        <Post />
      </div>
    </div>
  );
}

export default AfterService;
