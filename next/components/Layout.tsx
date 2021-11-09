import { Box } from "@chakra-ui/layout";
import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box>{children}</Box>
    </>
  );
};

export default Layout;
