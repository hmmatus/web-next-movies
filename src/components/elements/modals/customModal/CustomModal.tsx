import { ReactNode } from "react";
import Modal from "react-modal";
import MainButton from "../../buttons/MainButton/MainButton";

type CustomModalP = {
  isOpen: boolean;
  onRequestClose(): void;
  title: string;
  onAccept(): void;
  acceptText: string;
  rejectText: string;
  description: string;
};
const CustomModal = ({
  isOpen,
  onRequestClose,
  title,
  acceptText,
  rejectText,
  description,
  onAccept
}: CustomModalP) => {
  const handleAcceptText = () => {
    onRequestClose();
    onAccept();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div className="flex flex-col p-4">
        <p>{description}</p>
        <div className="flex">
          <MainButton
            className="mr-1"
            title={acceptText}
            onClick={handleAcceptText}
          />
          <MainButton
            className="mr-1"
            title={rejectText}
            onClick={onRequestClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
