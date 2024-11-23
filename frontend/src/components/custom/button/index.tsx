import React from "react";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import {
  CircularProgress,
  CircularProgressProps,
  Button as MuiButton,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

/**
 * Custom Button component with additional features like loading indicator and optional Typography.
 *
 * @param {boolean} typography - Whether to wrap the button label in Typography component.
 * @param {TypographyProps} typographyProps - Additional props for the Typography component.
 * @param {boolean} loading - Whether the button is in loading state.
 * @param {CircularProgressProps} loadingprops - Additional props for the CircularProgress component.
 * @param {object} props - Additional props for the Button component.
 *
 * Usage:
 *
 * // Import the component
 * import Button from './Button';
 *
 * // Inside a component, use the Button component
 * <Button
 *     typography
 *     typographyProps={{ variant: 'body1' }}
 *     loading={loading}
 *     loader={<CircularProgress size={20} />}
 *     loadingprops={{ color: 'secondary' }}
 *     onClick={handleClick}
 * >
 *     Click Me
 * </Button>
 */
interface ButtonProps extends MuiButtonProps {
  typography?: Boolean;
  typographyProps?: TypographyProps;
  loading?: boolean;
  loadingprops?: CircularProgressProps;
}

const CustomizedMuiButton = styled(MuiButton)(({ theme, variant, color }) => {
  switch (variant) {
    case "outlined":
      return {
        border: `1px solid ${color ? color : "var(--primary-900)"}`,
        color: color || "var(--primary-900)",
        "&:hover": {
          border: `1px solid ${color ? color : "var(--primary-900)"}`,
          color: color || "var(--primary-900)",
          boxShadow: "none",
        },
      };
    case "contained":
      return {
        backgroundColor: color ? color : "var(--primary-900)",
        color: color || "var(--white)",
        boxShadow: "none",
      };
    case "text":
      return {
        color: color ? color : "var(--primary-900)",
        fontWeight: "600",
      };
    default:
      return {
        backgroundColor: color ? color : "var(--primary-900)",
        color: color || "var(--white)",
        boxShadow: "none",
      };
  }
});

const CustomizedTypography = styled(Typography)<TypographyProps>(() => ({
  fontSize: "14px",
  lineHeight: "26px",
  fontWeight: 600,
  letterSpacing: "0.07px",
  fontStyle: "normal",
  fontFamily: "Open Sans",
}));

const CustomButton = (props: ButtonProps) => {
  return (
    <CustomizedMuiButton
      disabled={props.loading || props.disabled}
      color={props.color}
      onClick={props.onClick}
      sx={{...props.sx}}
    >
      {props?.loading && (
        <CircularProgress
          value={75}
          {...props.loadingprops}
          size={15}
        />
      )}
      {!props?.loading &&
        (props.typography ? (
          <CustomizedTypography >
            {props.children}
          </CustomizedTypography>
        ) : (
          props.children
        ))}
    </CustomizedMuiButton>
  );
};

export default CustomButton;
