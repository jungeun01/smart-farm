import React, { useRef, useState } from "react";
import styles from "./Post.module.scss";
import { addBoardDatas, uploadImage } from "../../../api/firebase/board";
import { getUserAuth } from "../../../api/firebase";
import { ref } from "firebase/storage";

const loginUser = JSON.parse(localStorage.getItem("user"));

const INITIAL_VALUE = {
  title: "",
  // userId: loginUser.nick,
  count: 0,
  summary: "",
  createAt: new Date().toISOString().split("T")[0],
};

function Post({ onClick, onSubmit, category, initialValue = INITIAL_VALUE }) {
  const [values, setValues] = useState(initialValue);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const imgFile = e.target.files[0];
    setFile(imgFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";

    if (file) {
      const fileName = `${new Date().getTime()}_${file.name}`;
      imgUrl = await uploadImage(`board/${fileName}`, file);
    }

    const addObj = { ...values, imgUrl };

    try {
      // 게시글 데이터베이스에 추가
      const result = await addBoardDatas(category, addObj);
      if (result) {
        onSubmit(result); // Board 컴포넌트로 새로운 게시글 전달
        setValues(INITIAL_VALUE); // 폼 리셋
        setFile(null); // 파일 상태 리셋
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("전송 에러", error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>게시글 작성하기</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <p>제목:</p>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.content}>
          <p>내용:</p>
          <textarea
            name="summary"
            placeholder="내용을 입력해주세요."
            value={values.summary}
            onChange={handleChange}
          />
        </div>
        <b>
          ※ 부적절한 콘텐츠가 포함될 경우 관리자에 의해 게시글이 삭제될 수
          있으며, 해당 아이디가 정지 처리될 수 있습니다.
        </b>
        <div className={styles.file}>
          <p>첨부:</p>{" "}
          <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        </div>

        <div className={styles.btn}>
          <div>
            <button type="submit" className={styles.sub}>
              작성완료
            </button>
            <button className={styles.delete} onClick={onClick}>
              취소하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Post;
