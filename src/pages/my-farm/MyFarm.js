import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import CustomMaps from '../../components/map/CustomMaps';
import { useComponentContext } from '../../context/ComponentContext';
import { fetchCommonInfo } from '../../store/dashboard/dashboardSlice';
import FarmList from './my-farm-list/FarmList';
import styles from './MyFarm.module.scss';

function MyFarm() {
  const { currComp } = useComponentContext();
  const { commonInfo } = useSelector((state) => state.dashboardSlice);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommonInfo('dashboard'));
  }, [dispatch]);

  const geoCode = commonInfo
    .map((item) => {
      const latitude = item.latitude || null;
      const longitude = item.longitude || null;

      return {
        lat: latitude,
        lng: longitude,
      };
    })
    .filter((farm) => farm.lat !== null && farm.lng !== null);

  return (
    <Container className={styles.myFarm}>
      <div className={styles.map}>
        <CustomMaps geoCode={geoCode} />
      </div>
      <div className={styles.content}>
        <Outlet />
        {currComp && location.pathname !== '/my-farm' ? (
          <Link to="details">
            <FarmList />
          </Link>
        ) : null}
      </div>
    </Container>
  );
}

export default MyFarm;
