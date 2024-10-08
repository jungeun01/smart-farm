import { Modal } from "@mui/material";
import cn from "classnames";
import React from "react";
import styles from "./customModal.module.scss";

function CustomModal({
  title,
  btnName,
  btnHandler,
  children,
  isOpen,
  handleClose,
  className,
  isDisabled = false,
  onApprove,
  onReject,
}) {
  return (
    <Modal className={styles.Modal} open={isOpen} onClose={handleClose}>
      <div className={cn(styles.customModal, className)}>
        <div className={styles.header}>
          <h2 className={styles.customTitle}>{title}</h2>
          {onApprove && (
            <button className={styles.outBtn} onClick={onApprove}>
              승인
            </button>
          )}
          {onReject && (
            <button className={styles.outBtn} onClick={onReject}>
              거절
            </button>
          )}
          {!btnHandler && (
            <button className={styles.closeBtn} onClick={handleClose}>
              닫기
            </button>
          )}
        </div>
        <div className={styles.content}>{children}</div>
        {btnHandler && (
          <div className={styles.footer}>
            <button
              className={styles.outBtn}
              onClick={btnHandler}
              disabled={isDisabled}
            >
              {btnName}
            </button>
            <button className={styles.cancelBtn} onClick={handleClose}>
              취소
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CustomModal;
