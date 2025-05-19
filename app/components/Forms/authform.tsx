"use client";

import React, { useState } from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

interface AuthFormProps {
  onClose: () => void;
  isRegistered: boolean;
  setIsRegistered: (value: boolean) => void;
  closeModal: () => void;
  setSession: (session: any) => void;
}

export default function AuthForm({
  onClose,
  isRegistered,
  setIsRegistered,
  closeModal,
  setSession,
}: AuthFormProps) {
  const [errors, setErrors] = useState({});

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const email = formData.email as string;
    const password = formData.password as string;
    const name = formData.username as string;

    const { data } = await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onRequest: (ctx) => {
          addToast({
            title: "Loading...",
          });
        },
        onSuccess: (ctx) => {
          const session = ctx.data.user;
          setSession(session);
          closeModal();
          addToast({
            title: "Success",
            color: "success",
          });
          setIsRegistered(true);
        },
        onError: (ctx) => {
          setErrors(ctx.error);
        },
      }
    );
  }

  async function logIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const email = formData.email as string;
    const password = formData.password as string;

    const { data } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          addToast({
            title: "Loading...",
          });
        },
        onSuccess: (ctx) => {
          const session = ctx.data.user;
          setSession(session);
          closeModal();
          addToast({
            title: "Success",
            color: "success",
          });
          setIsRegistered(true);
        },
        onError: (ctx) => {
          setErrors(ctx.error);
        },
      }
    );
  }

  const handleClose = () => {
    if (1 > 3) {
      onClose();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Form
          className="w-full max-w-xs gap-3"
          validationErrors={errors}
          onSubmit={isRegistered ? signUp : logIn}
        >
          <Input
            label="Email"
            type="email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
          />
          {isRegistered && (
            <>
              <Input
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
              />
              <Input
                label="Profile Picture"
                labelPlacement="outside"
                name="profilePicture"
                type="file"
                accept="image/*"
                placeholder="Upload your profile picture"
              />
            </>
          )}
          <div className="flex justify-center items-center w-full pt-12">
            <Button
              onPress={() => {
                handleClose();
              }}
              className="w-full"
              type="submit"
              variant="flat"
            >
              {!isRegistered ? "Login" : "Register"}
            </Button>
          </div>
        </Form>

        <div className="pt-2">
          <p className="text-xs">
            {!isRegistered
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            {!isRegistered ? (
              <button
                onClick={() => {
                  setIsRegistered(true);
                }}
                className="underline"
              >
                here
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsRegistered(false);
                }}
                className="underline"
              >
                here
              </button>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
