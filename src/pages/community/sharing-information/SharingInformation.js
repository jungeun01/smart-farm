import React from "react";
import { Outlet } from "react-router-dom";
import Board from "../../../components/board/Board";
import styles from "../community.module.scss";

function SharingInformation(props) {
  // const [sharingPost, setSharingPost] = useState([]);

  return (
    <div>
      <h2 className={styles.community}>정보 공유 게시판</h2>
      <p> - 아이팜 회원님들의 정보 공유 게시판입니다.</p>
      <div>
        <Outlet />
        <Board category={"sharing"} complain={true} />
      </div>
    </div>
  );
}

export default SharingInformation;
