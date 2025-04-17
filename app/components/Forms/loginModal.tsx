import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import AuthForm from "./authform";
import { useState } from "react";

export default function LoginModal({ openModal, onChange, setLoggedIn, isRegistered, setIsRegistered, }) {

  return (
    <>
      <Modal isOpen={openModal} onOpenChange={onChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {!isRegistered ? (
                <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              ) : (
                <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
              )}
              <ModalBody>
                <AuthForm
                  onClose={onClose}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                  closeModal={onClose}
                  setLoggedIn={setLoggedIn}
                />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
