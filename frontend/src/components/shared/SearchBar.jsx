"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { Button } from "@/components/ui/button";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarItem,
} from "@/components/ui/menubar";
import { Input } from "../ui/input";
import { useFormik } from "formik";
// import { MenubarItem } from "@radix-ui/react-menubar";

export function SearchField() {
  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Menubar>
      <MenubarMenu className="relative left-0">
        <MenubarTrigger>
          <IoIosSearch className="h-4 w-4" />
        </MenubarTrigger>
        <MenubarContent className="absolute p-2 -right-12 border-0  w-72 md:w-96">
          <form onSubmit={handleSubmit}>
            <Input
              value={values.search}
              onChange={handleChange}
              name="search"
              type="text"
              placeholder="Search"
            />

            <MenubarItem className="hover:bg-inherit">
              <Button type="submit" className="w-full mt-2" variant="default">
                Search
              </Button>
            </MenubarItem>
          </form>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
