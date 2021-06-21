import React from "react";
import { Modal, Button } from "rsuite";

interface ModalBreedListProps {
  show: boolean;
  onClose: () => void;
  breeds: string[];
  onSetBreed: (val: string) => void;
}
export default function ModalBreedList({
  show,
  onClose,
  breeds,
  onSetBreed,
}: ModalBreedListProps) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Select a breed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul style={{ height: 500 }}>
          {breeds.map((breed) => (
            <li key={breed}>
              <Button
                onClick={() => {
                  onSetBreed(breed);
                  onClose();
                }}
                appearance="link"
              >
                {breed}
              </Button>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
