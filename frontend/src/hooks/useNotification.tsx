import { useCallback } from "react";
import { styled } from "@mui/material";
import { useSnackbar, MaterialDesignContent } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "#43A047",
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: "#E53935",
    },
  })
);

export const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showNotification = useCallback(
    (
      msg: string,
      variant: "default" | "error" | "success" | "warning" | "info" | undefined
    ) => {
      enqueueSnackbar(msg, {
        variant: variant || "info",
        hideIconVariant: true,
        autoHideDuration: 5000,
        action: (key: any) => (
          <IconButton
            onClick={() => closeSnackbar(key)}
            sx={{ width: "28px", height: "28px" }}
          >
            <CloseIcon fontSize="small" sx={{ color: "#fff" }} />
          </IconButton>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );

  return showNotification;
};
