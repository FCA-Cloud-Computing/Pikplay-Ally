import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";

export default function ModalLayout({ label, children, className }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        className={`font-geist font-light text-2xl leading-6 transition-all duration-150 ease-in-out cursor-pointer bg-blue-600 bg-opacity-50 p-1 w-9 h-auto rounded-md ${className}`}
      >
        {label}
      </button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <div className="font-medium relative flex flex-col gap-2 overflow-hidden bg-[#0D0E32] rounded-lg shadow-lg p-6 w-96 text-[#FAFAFA]">
          {children}
        </div>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.displayName = "Backdrop";

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
