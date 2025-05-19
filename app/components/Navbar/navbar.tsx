"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  useDisclosure,
  addToast,
} from "@heroui/react";

import React, { useEffect, useState } from "react";
import LoginModal from "../Forms/loginModal";
import getSession from "@/app/server/getSession";
import { authClient } from "@/lib/auth-client";
import { UserSession } from "@/app/types";
export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
} & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function NavbarComp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRegistered, setIsRegistered] = useState(false);
  const [session, setSession] = useState<UserSession | null>(null);

  async function logOut() {
    await authClient.signOut();
    setSession(null);
    setIsRegistered(false);
  }

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session) {
        setSession(session.user);
      }
    }
    fetchSession();
  }, []);

  return (
    <>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <a href="/">
              <img
                src="https://res.cloudinary.com/dclmbxlv5/image/upload/v1744277245/YumeZone_Logo_p62hsw.png"
                height={100}
                width={100}
              />
            </a>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem isActive>
              <Link color="primary" href="#">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link aria-current="page" color="foreground" href="#">
                Anime
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Manga
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />

          {!session ? (
            <Button onPress={onOpen} color="primary">
              Login
            </Button>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={session.name}
                  size="sm"
                  src={session.image || ""}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session.name}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem
                  onPress={() => {
                    logOut();
                    addToast({
                      title: "Logged Out",
                      description: "You have been logged out.",
                      timeout: 3000,
                      color: "danger",
                    });
                  }}
                  key="logout"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>
      </Navbar>

      <div>
        <LoginModal
          openModal={isOpen}
          onChange={onOpenChange}
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
          setSession={setSession}
        />
      </div>
    </>
  );
}
