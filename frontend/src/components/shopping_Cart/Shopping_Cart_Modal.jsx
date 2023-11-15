import { useState } from 'react';

let openModalFunc; 

const SideModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  openModalFunc = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Contenido del modal...</p>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Estilos generales del modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          right: 0;
          width: 25%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .modal-content {
          width: 75%; /* Ajusta según tus necesidades */
          height: 100%;
          background-color: #f1f1f1;
          padding: 20px;
        }

        /* Estilos del botón para cerrar el modal */
        .close {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 28px;
          color: #333;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

SideModal.openModal = openModalFunc;

export default SideModal;