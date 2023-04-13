import React, { useRef, useEffect } from "react";

// Import Styles
import "../../styles/modal.scss";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e: MouseEvent) => {
    console.log(!modalRef.current?.contains(e.target as Node));
    console.log(e.target);
    if (
      modalRef.current &&
      e.target instanceof Node &&
      !modalRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, []);

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <h2>Titre de la modale</h2>
        <p>Description de la modale</p>
      </div>
    </div>
  );
};

export default Modal;