import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCommonInfo } from '../../../store/dashboard/dashboardSlice';
import styles from './FarmList.module.scss';
import FarmListItem from './my-farm-list-item/FarmListItem';

function FarmList() {
  const { commonInfo } = useSelector((state) => state.dashboardSlice);
  const { state } = useLocation();

  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem('user'));

  const userEmail =
    userData.email.includes('admin') && state !== null
      ? state.email
      : !userData.email.includes('admin') && state === null
      ? userData.email
      : 'admin@gmail.com';

  const list = () => {
    let listData = [];
    let owner = '';

    if (state !== null && userEmail === state.email) {
      // 관리자가 특정 회원을 조회하는 경우
      listData = commonInfo.filter((list) => {
        return list.userId === state.email && list.useYn === 'Y';
      });
      owner = state.name;
    } else if (userEmail === 'admin@gmail.com' && state === null) {
      // 관리자가 전체 회원 정보를 조회하는 경우
      listData = [...commonInfo];
      owner = '전체';
    } else if (!userEmail.includes('admin') && state === null) {
      // 일반 회원이 자신의 정보를 조회하는 경우
      listData = commonInfo.filter(
        (list) =>
          list.userId === userEmail &&
          list.useYn === 'Y' &&
          list.deleteYn === 'N'
      );
      owner = '내';
    }

    return { listData, owner };
  };

  useEffect(() => {
    dispatch(fetchCommonInfo('dashboard'));
  }, [dispatch]);

  return (
    <>
      <h2 className={styles.title}>{list().owner} 농장 리스트</h2>
      {list().listData?.length === 0 ? (
        <div>등록된 농장이 없습니다.</div>
      ) : (
        <ul className={styles.list}>
          {list().listData?.map((item) => (
            <FarmListItem key={item.docId} farmData={item} />
          ))}
        </ul>
      )}
    </>
  );
}

export default FarmList;
