import React, { useState } from "react";
import styles from "./Diseases.module.scss";
import DiseasesList from "./diseases-list/DiseasesList";
import { Input } from "@mui/material";
import { Outlet } from "react-router-dom";

function Diseases(props) {
  const [pests, setPests] = useState(null);

  return (
    <>
      {/* <Input /> */}
      <div className={styles.main}>
        {/* {pests && <pre>{JSON.stringify(pests, null, 2)}</pre>} */}
        <div className={styles.list}>
          <Outlet />
          <DiseasesList />
        </div>
      </div>
    </>
  );
}

export default Diseases;
