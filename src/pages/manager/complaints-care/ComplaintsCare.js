import React, { useEffect, useState } from "react";
import { TbReportSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../../components/search_box/SearchBox";
import {
  fetchProcessed,
  fetchProcessing,
} from "../../../store/complain/complainSlice";
import styles from "./ComplaintsCare.module.scss";
import CpComment from "./part/CpComment";
import CpPost from "./part/CpPost";
import CpProfile from "./part/CpProfile";

function ComplaintsCare() {
  const [sort, setSort] = useState("all");
  const [process, setProcess] = useState("processing");

  const dispatch = useDispatch();
  const { processing, processed } = useSelector((state) => state.complainSlice);

  // 카테고리별 렌더링
  const handleSortClick = (selectedsort) => {
    setSort(selectedsort);
  };

  // 처리별 렌더링
  const handleProcessClick = (selectedprocess) => {
    setProcess(selectedprocess);
  };

  useEffect(() => {
    dispatch(fetchProcessing(process));
  }, [dispatch, process]);

  useEffect(() => {
    dispatch(fetchProcessed(process));
  }, [dispatch, process]);

  // 카테고리별 필터링된 데이터 가져오기
  // const filteredData = () => {
  //   const data = process === "processing" ? processing : processed;

  //   if (sort === "profile") {
  //     return data.filter((item) => item.reasonCode.startsWith("pf"));
  //   } else if (sort === "post") {
  //     return data.filter((item) => item.reasonCode.startsWith("ps"));
  //   } else if (sort === "comment") {
  //     return data.filter((item) => item.reasonCode.startsWith("cm"));
  //   }
  //   return data; // 전체
  // };
  const filteredData = (sort) => {
    const data = process === "processing" ? processing : processed;

    if (sort === "profile") {
      const profileData = data.filter((item) =>
        item.reasonCode.startsWith("pf")
      );
      return profileData;
    } else if (sort === "post") {
      const postData = data.filter((item) => item.reasonCode.startsWith("ps"));
      return postData;
    } else if (sort === "comment") {
      const commentData = data.filter((item) =>
        item.reasonCode.startsWith("cm")
      );
      return commentData;
    }
  };

  return (
    <div className={styles.complaints}>
      <SearchBox name={<TbReportSearch />} placeholder={"신고 검색"} />
      <div className={styles.header}>
        <div className={styles.state}>
          <div>
            <button onClick={() => handleProcessClick("processing")}>
              처리중
            </button>
            <button onClick={() => handleProcessClick("processed")}>
              처리완료
            </button>
          </div>
        </div>
        <div className={styles.category}>
          <div>
            <button
              className={sort === "all" ? styles.active : ""}
              onClick={() => handleSortClick("all")}
            >
              전체
            </button>
            <button
              className={sort === "profile" ? styles.active : ""}
              onClick={() => handleSortClick("profile")}
            >
              프로필
            </button>
            <button
              className={sort === "post" ? styles.active : ""}
              onClick={() => handleSortClick("post")}
            >
              게시글
            </button>
            <button
              className={sort === "comment" ? styles.active : ""}
              onClick={() => handleSortClick("comment")}
            >
              댓글
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div
          className={sort === "post" || sort === "comment" ? styles.hide : ""}
        >
          <b>프로필</b>
          <section>
            {filteredData("profile").map((items, idx) => {
              return <CpProfile key={idx} item={items} process={process} />;
            })}
          </section>
        </div>

        <div
          className={
            sort === "profile" || sort === "comment" ? styles.hide : ""
          }
        >
          <b>게시글</b>
          <section>
            {filteredData("post").map((items, idx) => {
              return <CpPost key={idx} item={items} process={process} />;
            })}
          </section>
        </div>

        <div
          className={sort === "profile" || sort === "post" ? styles.hide : ""}
        >
          <b>댓글</b>
          <section>
            {filteredData("comment").map((items, idx) => {
              return <CpComment key={idx} item={items} process={process} />;
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ComplaintsCare;
