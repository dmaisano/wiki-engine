import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { API_ENDPOINTS } from "../utils";

interface NavSearchProps {}

const NavSearch: React.FC<NavSearchProps> = ({}) => {
  const router = useRouter();

  const [text, setText] = useState<string>(
    typeof router.query.text === "string" ? router.query.text : "",
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    if (event.key !== `Enter`) {
      return;
    }

    router.push({
      pathname: `/search`,
      query: { text: encodeURIComponent(text.trim()) },
    });
  };

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    const value = event.target.value;
    setText(value);
  };

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
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
    </Box>
  );
};

export default NavSearch;
