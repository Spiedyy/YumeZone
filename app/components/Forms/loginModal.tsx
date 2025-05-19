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

interface LoginModalProps {
  openModal: boolean;
  onChange: (isOpen: boolean) => void;
  isRegistered: boolean;
  setIsRegistered: (value: boolean) => void;
  setSession: (session: any) => void;
}

export default function LoginModal({
  openModal,
  onChange,
  isRegistered,
  setIsRegistered,
  setSession,
}: LoginModalProps) {
  return (
    <>
      <Modal isOpen={openModal} onOpenChange={onChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {!isRegistered ? (
                <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              ) : (
                <ModalHeader className="flex flex-col gap-1">
                  Register
                </ModalHeader>
              )}
              <ModalBody>
                <AuthForm
                  onClose={onClose}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                  closeModal={onClose}
                  setSession={setSession}
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
