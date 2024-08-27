import React from "react";
import pest from "../../../../assets/abou/식2.png";
import styles from "./DiseasesItem.module.scss";

function DiseasesItem() {
  return (
    <div>
      <div className={styles.main}>
        {/* <div> */}
        <img src={pest} />
        {/* </div> */}
        <div className={styles.title}>
          <div>
            <span>해충명</span>
            <p>감자수염진딧물</p>
          </div>
          <div>
            <span>목/과명</span>
            <p>매미/진딧물</p>
          </div>
          <div>
            <span>작물명</span>
            <p>가지</p>
          </div>
        </div>
      </div>
      <div className={styles.title_item}>
        <div>
          <h4>피해정보</h4>
          <p>
            채소작물, 화훼작물, 과수작물 등의 원예작물의 신초나 새로 나온 잎의
            즙액을 빨아먹어 피해부위가 생장을 멈춰 세로로 말리고 위축되며 신초의
            자람을 억제하는 일차적인 피해뿐만 아니라 바이러스병을 전염시켜 큰
            피해를 준다. 또한 이들이 배설한 감로는 식물체의 잎을 오염시키고
            그을음병을 유발시켜 피해를 준다.
          </p>
        </div>
        <div>
          <h4>방재방법</h4>
          <p>
            진딧물은 비가 많이 오면 밀도가 떨어진다. 이와 반대로 가뭄이 지속되면
            다발생할 가능성이 높아 방제조치를 해야한다. 시설재배에서는 방충망을
            설치하여 외부에서 비래해 오는 진딧물을 차단한다. 입제 농약을 정식할
            때 구멍을 파고 0.5~2g씩 넣어주거나, 희석제를 살포한다. 약제살포여부
            결정은 진딧물 발생추이를 관찰하여 천적 발생이 없거나, 발생환경이
            좋아 지속적으로 밀도 증가가 예상될 때 살포한다. 이와 달리 천적
            발생이 많거나 발생환경이 좋지 않아 밀도증가가 멈출 때는 약제방제를
            하지 않는다. 천적으로 콜레마니진디벌, 진디혹파리, 무당벌레,
            풀잠자리, 꽃등에 등이 있다. 이 중에서 콜레마니진디벌이 시설작물에서
            널리 이용된다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiseasesItem;
