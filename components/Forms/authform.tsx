"use client";

import React, { useState } from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ onClose, register, setRegister }) {
  const [errors, setErrors] = useState({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    if (!formData.username) {
      setErrors({ username: "Username is required" });

      return;
    }

    const email = formData.email as string;
    const password = formData.password as string;
    const name = formData.username as string;
    const image = formData.profilePicture as string;

    const { data } = await authClient.signUp.email(
      {
        email,
        name,
        password,
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          addToast({
            title: "Loading...",
          });
        },
        onSuccess: (ctx) => {
          console.log(ctx.data);
          localStorage.setItem("session_token", ctx.data.token);
          addToast({
            title: "Success",
            color: "success",
          });
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
          onSubmit={onSubmit}
        >
          <Input
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
          />
          <Input
            label="Password"
            type="password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
          />
          {register && (
            <>
              <Input
                label="Email"
                type="email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
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
            {!register ? (
              <Button
                onPress={() => {
                  handleClose();
                }}
                className="w-full"
                type="submit"
                variant="flat"
              >
                Login
              </Button>
            ) : (
              <Button
                onPress={() => {
                  handleClose();
                }}
                className="w-full"
                type="submit"
                variant="flat"
              >
                Register
              </Button>
            )}
          </div>
        </Form>

        <div className="pt-2">
          {!register ? (
            <p className="text-xs">
              Dont have a acount? Sign up{" "}
              <button
                onClick={() => {
                  setRegister(true);
                }}
                className="underline"
              >
                here
              </button>
            </p>
          ) : (
            <p className="text-xs">
              Already have an account? Login{" "}
              <button
                onClick={() => {
                  setRegister(false);
                }}
                className="underline"
              >
                here
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// Fake server used in this example.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function callServer(data) {
  return {
    errors: {
      username: "Sorry, this username is taken.",
    },
  };
}
