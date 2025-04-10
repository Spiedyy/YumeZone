"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";

export default function App() {
  const [errors, setErrors] = React.useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.username) {
      setErrors({ username: "Username is required" });

      return;
    }

    const result = callServer(data);

    setErrors(result.errors);
  };

  return (
    <>
      <div className="flex flex-col items-center h-3/4 w-1/3 m-auto rounded-lg text-center border pt-12">
        <h1 className="text-2xl font-bold`">Login</h1>
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
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
          />
          <div className="flex justify-center items-center w-full pt-12">
            <Button className="w-full" type="submit" variant="flat">
              Login
            </Button>
          </div>
        </Form>

        <div className="pt-2">
          <p className="text-xs">Dont have a acount? Sign up <a className="underline" href="/signup">here!</a></p>
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
