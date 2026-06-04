import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";

const CommonDialog = ({
  open,
  onClose,
  children,
  header = null,
  style = { width: "46%" },
  headerClassName = "hidden",
  closable = true,
  closeOnEscape = true,
  dismissableMask = true,
  ...rest
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
  return (
    <Dialog
      visible={open}
      onHide={onClose}
      header={header}
      style={style}
      headerClassName={headerClassName}
      closable={closable}
      closeOnEscape={closeOnEscape}
      dismissableMask={dismissableMask}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

export default CommonDialog;
