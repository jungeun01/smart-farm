import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSectorContext } from "../../../../../../context/SectorContext";
import { setData } from "../../../../../../store/controlData/controlSlice";
import { renameOptionsKor } from "../../../../../../utils/renameOptions";
import ControlItem from "./control-item/ControlItem";

function ControlBox() {
  const { sector } = useSectorContext();
  const [movedData, setMovedData] = useState([]);
  const dispatch = useDispatch();
  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, vlaue]) => renameOptionsKor(key));

  useEffect(() => {
    dispatch(
      setData({
        Data: movedData,
      })
    );
  }, []);

  const handleMoveComponent = (data) => {
    setMovedData((prevData) => [...prevData, data]);

    localStorage.setItem("movedData", JSON.stringify(movedData));
  };
  let db;

  // 데이터베이스를 여는 함수
  function openDatabase() {
    let request = indexedDB.open("MyDatabase", 1);

    // Object Store 생성
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains("myStore")) {
        db.createObjectStore("myStore", {
          keyPath: "docId",
          autoIncrement: true,
        });
        console.log("Object Store 생성 완료");
      }
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      console.log("데이터베이스 열기 성공");

      // 데이터베이스가 열린 후, addUniqueData 함수를 호출
      addUniqueData(movedData);
    };

    request.onerror = function (event) {
      console.error("IndexedDB 열기 실패", event);
    };
  }

  function addUniqueData(movedData) {
    // 데이터베이스가 열려 있지 않은 경우 오류 처리
    if (!db) {
      console.error("데이터베이스가 열리지 않았습니다.");
      return;
    }

    // 트랜잭션 생성
    let transaction = db.transaction(["myStore"], "readwrite");
    let store = transaction.objectStore("myStore");

    // 모든 데이터를 조회
    let getAllRequest = store.getAll();
    getAllRequest.onsuccess = function () {
      const existingData = getAllRequest.result; // 현재 저장된 데이터
      // movedData의 각 item에 대해 중복 검사 후 추가
      movedData.forEach((item) => {
        // existingData에서 option 값이 같은 객체가 있는지 확인
        const isDuplicate = existingData.some(
          (existingItem) =>
            existingItem.option === item.option && existingItem.id === item.id
        );

        if (!isDuplicate) {
          // 중복이 아닐 경우 데이터 추가
          store.add(item);
          console.log(`데이터 추가 성공: ${JSON.stringify(item)}`);
        } else {
          console.log(`중복된 데이터: ${item.option}은 이미 존재합니다.`);
        }
      });
    };

    getAllRequest.onerror = function () {
      console.error("데이터 조회 실패");
    };
  }

  // 데이터베이스 열기 호출

  openDatabase();

  // function deleteDatabase(dbName) {
  //   // 데이터베이스 삭제 요청
  //   const request = indexedDB.deleteDatabase(dbName);

  //   request.onsuccess = function () {
  //     console.log(`${dbName} 데이터베이스 삭제 성공`);
  //   };

  //   request.onerror = function (event) {
  //     console.error(`${dbName} 데이터베이스 삭제 실패`, event);
  //   };

  //   request.onblocked = function () {
  //     console.log(`${dbName} 데이터베이스 삭제가 차단되었습니다.`);
  //   };
  // }

  // deleteDatabase("MyDatabase"); // 삭제할 데이터베이스 이름
  return (
    <>
      <div>
        {filteredOptions.map((option, idx) => (
          <ControlItem
            key={idx}
            idx={idx}
            option={option}
            onMoveComponent={handleMoveComponent}
            state={false}
          />
        ))}
      </div>
    </>
  );
}

export default ControlBox;
