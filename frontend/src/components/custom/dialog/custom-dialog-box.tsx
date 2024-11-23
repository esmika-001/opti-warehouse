import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../button";
type Props = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  saveButtonText?: string;
  saveButtonLoading?: boolean;
};

const CustomDialogBox = ({ children, title, onCancel, open, onSave, saveButtonLoading, saveButtonText }: Props) => {
  return (
    <>
      <Dialog
        open={open}
        sx={{ "& .MuiPaper-root": { width: { sm: "450px" }, padding: 0, borderRadius:"16px" } }}
      >
        <DialogTitle >
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
            <Typography sx={{
              fontSize: "20px",
              lineHeight: 1.4,
            }} fontWeight={"medium"}>
              {title}
            </Typography>
            {onCancel && <IconButton
              aria-label="close"
              sx={{ p: 0 }}
              onClick={() => onCancel && onCancel()}
            >
              <CloseIcon sx={{ width: "20px", height: "20px", color: "black" }} />
            </IconButton>}
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}
        >
          {children}
        </DialogContent>
        <DialogActions>
          {onSave && (
            <CustomButton
              loading={saveButtonLoading}
              color="primary"
              onClick={onSave}
              sx={{fontSize: "14px", lineHeight: "20px", fontWeight: 500}}
            >
              {saveButtonText ?? "Save"}
            </CustomButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialogBox;
