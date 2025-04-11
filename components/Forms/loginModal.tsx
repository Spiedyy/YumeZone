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

export default function LoginModal({ openModal, onChange }) {
  const [register, setRegister] = useState(false);

  return (
    <>
      <Modal isOpen={openModal} onOpenChange={onChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {!register ? (
                <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              ) : (
                <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
              )}
              <ModalBody>
                <AuthForm
                  onClose={onClose}
                  register={register}
                  setRegister={setRegister}
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
