import React from 'react';
import InfoEdit from '../pages/MyPage/info-edit/InfoEdit';
import IntroMyPage from '../pages/MyPage/intro-my-page/IntroMyPage';
import Payment from '../pages/MyPage/payment/Payment';
import { useComponentContext } from './ComponentContext';
import MYChatRoom from '../pages/MyPage/my-chat-room/MYChatRoom';

function MyPageMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'IntroMyPage':
      return <IntroMyPage />;
    case 'Payment':
      return <Payment />;
    case 'InfoEdit':
      return <InfoEdit />;
    case 'MyChatRoom':
      return <MYChatRoom />;
    // case 'Asinfo':
    //   return <Asinfo />;
    // case 'Myletter':
    //   return <Myletter />;
    // case 'Userout':
    //   return <Userout />;
    default:
      return <IntroMyPage />;
  }
}

export default MyPageMenu;
