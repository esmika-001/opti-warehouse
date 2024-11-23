import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import CustomButton from "../button";

type Props = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
  saveButtonLoading?: boolean;
};

const CustomAlertBox = ({
  children,
  title,
  onCancel,
  onSave,
  cancelButtonText,
  saveButtonText,
  open,
  saveButtonLoading,
}: Props) => {
  return (
    <Dialog open={open} sx={{ "& .MuiPaper-root": { width: "416px", padding: 0, borderRadius: "16px" } }}>
      <DialogTitle sx={{
        fontSize: "20px",
        lineHeight: 1.4,
      }} fontWeight={"medium"}>
        {title}
      </DialogTitle>
      <DialogContent
        className="dialog-content"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button
            sx={{
              p: "8px 8px",
              color: saveButtonLoading ? "#757575 !important" : "#424242",
              fontSize: "14px", lineHeight: "20px", fontWeight: 500
            }}
            onClick={onCancel}
          >
            {cancelButtonText ?? "Cancel"}
          </Button>
        )}
        {onSave && (
          <CustomButton
            loading={saveButtonLoading || false}
            sx={{ p: "8px 8px", ml: 0, fontSize: "14px", lineHeight: "20px", fontWeight: 500 }}
            color="primary"
            onClick={onSave}
          >
            {saveButtonText ?? "Save"}
          </CustomButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlertBox;
