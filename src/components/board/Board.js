import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { getBoardDatas } from "../../api/board";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardDatas } from '../../store/board/boardSlice';
import styles from './Board.module.scss';
import Post from './post/Post';

const PAGE_SIZE = 10;

function Board({ nopost, category, complain, myPosts }) {
  const loginUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모드 상태
  const [view, setView] = useState([]);

  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.boardSlice);
  const { isAuthenticated } = useSelector((state) => state.userSlice);

  // 데이터 로드
  useEffect(() => {
    dispatch(fetchBoardDatas(category));
  }, [dispatch, category]);

  // posts가 업데이트되면 view도 업데이트
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      setView(posts); // posts 데이터를 view 상태로 설정
    }
  }, [posts, isLoading]);

  // 페이지 넘기기
  const totalPages = Math.ceil(view.length / PAGE_SIZE);
  const currentItem = view.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const PreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const NextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // 글쓰기
  const addPost = (newPost) => {
    setView([...view, newPost]); // Also add to view
    setIsWriting(false); // 글쓰기 모드 종료
  };

  // 글쓰기 취소
  const notPosting = () => {
    setIsWriting(false);
  };

  // 글쓰기 버튼
  const handleWriteClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return setIsWriting(false);
    } else {
      setIsWriting(true); // 로그인된 경우에만 글쓰기 모드로 전환
    }
  };

  // 데이터 불러오기
  // const handleLoad = async () => {
  //   const data = await getBoardDatas(category);
  //   setView(data);
  // };

  // useEffect(() => {
  //   handleLoad();
  // }, []);

  return (
    <div className={styles.container}>
      {/* 글쓰기 모드 */}
      {isWriting ? (
        <Post onClick={notPosting} onSubmit={addPost} category={category} />
      ) : (
        <>
          <div className={styles.col}>
            <div>NO.</div>
            <div>제목</div>
            <div>작성자</div>
            <div>작성일</div>
            <div>조회수</div>
          </div>

          <div className={styles.board}>
            <ul>
              {currentItem.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/community/${item.collection}/${item.id}`}
                  state={{ ...item, complain }}
                >
                  <li id={view.length - ((currentPage - 1) * PAGE_SIZE + idx)}>
                    <div>{item.id}</div>
                    <div>{item.title}</div>
                    <div>{item.nick}</div>
                    <div>{item.createdAt}</div>
                    <div>{item.count}</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className={styles.pagination}>
            <button
              onClick={PreviousPage}
              disabled={currentPage === 1} // 첫 페이지에서는 비활성화
            >
              &lt; 이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={NextPage}
              disabled={currentPage === totalPages} // 마지막 페이지에서는 비활성화
            >
              다음 &gt;
            </button>
          </div>
          {nopost === false ? (
            loginUser?.nick === '관리자' && (
              <div className={styles.upload}>
                {<button onClick={handleWriteClick}>글쓰기</button>}
              </div>
            )
          ) : (
            <div className={styles.upload}>
              {<button onClick={handleWriteClick}>글쓰기</button>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Board;
