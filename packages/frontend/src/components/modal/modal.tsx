import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import "./modal.scss";

interface ModalProps {
  children: null | React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
}

const modalRoot = document.querySelector("#modal-root");

export function Modal({children, onClick}: ModalProps): React.ReactPortal {
  const [container] = useState(document.createElement("div"));

  useEffect(() => {
    modalRoot.appendChild(container);

    return () => {
      modalRoot.removeChild(container);
    };
  });

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__content">{children}</div>
      <div className="modal__bg" onClick={onClick} />
    </div>,
    container
  );
}
