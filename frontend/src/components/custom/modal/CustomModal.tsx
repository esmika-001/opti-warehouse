import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import "./style.css";
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

const CustomModal = ({
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
    <Modal open={open} >
      <Box className="mainCustomModal" maxHeight={"92% !important"} overflow={"auto"}>
        <Box sx={{ px: 3, pb: 1, pt: 2 }} >
          <Typography sx={{
            fontSize: "20px",
            lineHeight: 1.4,
          }} fontWeight={"medium"} >
            {title}
          </Typography>
        </Box>
        <Box sx={{ px: 3, py: 0 }} >
          {children}
        </Box >
        <Stack
          sx={{ px: 3, py: 2 }}
          justifyContent={"right"}
          direction={"row"}
          mt={"auto"}
        >
          {onCancel && (
            <Button
              sx={{
                color: saveButtonLoading ? "#757575" : "#424242",
                fontSize: "14px", lineHeight: "20px", fontWeight: 500
              }}
              onClick={onCancel}
            >
              {cancelButtonText ?? "Cancel"}
            </Button>
          )}
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
        </Stack>
      </Box >
    </Modal >
  )
};

export default CustomModal;
