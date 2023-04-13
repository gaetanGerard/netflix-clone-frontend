import React, { useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';

// Import Redux
import { reset_movie_store } from '../../redux/movies/movies.actions';
import { reset_tv_store } from '../../redux/series/series.actions';

// Import Styles
import "../../styles/modal.scss";

const Modal = ({ onClose, content, movieCredits }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e: MouseEvent) => {
    if (
      modalRef.current &&
      e.target instanceof Node &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(reset_movie_store());
      dispatch(reset_tv_store());
      onClose();
    }
  };

  useEffect(() => {
    console.log(content)
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  console.log(content)

  if(content) {
    return (
      <div className="modal" ref={modalRef}>
        <div className="modal-content">
          <h2>{content.title ? content.title : content.name}</h2>
          <p>Description de la modale</p>
        </div>
      </div>
    );
  }
  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <h2>LOADING!!!!</h2>
        <p>Description de la modale</p>
      </div>
    </div>
  );
};

export default Modal;