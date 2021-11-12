import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box } from "@chakra-ui/react";
import React from "react";

interface NavSearchProps {}

const NavSearch: React.FC<NavSearchProps> = ({}) => {
  return (
    <Box bg="gray.200" borderRadius="md">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="search"
          placeholder="Search..."
          variant="filled"
          colorScheme="blue"
        />
      </InputGroup>
    </Box>
  );
};

export default NavSearch;
