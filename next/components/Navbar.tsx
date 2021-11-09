import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { NextLink } from ".";
import NavSearch from "./NavSearch";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="#3F51B5"
      p={4}
      ml="auto"
      align="center"
      justifyContent="space-between"
    >
      <Heading as="h3" color="white" fontWeight="normal">
        <NextLink href="/">Wiki Project</NextLink>
      </Heading>

      <NavSearch />
    </Flex>
  );
};

export default Navbar;
