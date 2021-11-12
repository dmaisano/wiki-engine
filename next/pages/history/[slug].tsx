import {
  Container,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { Layout, NextChakraLink } from "../../components";
import { WikiPageProps } from "../../types";
import { getPageFromSlug } from "../../utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params || typeof context.params[`slug`] !== "string") {
    return {
      notFound: true,
    };
  }

  const slug = context.params[`slug`];
  const data = await getPageFromSlug(slug);
  return {
    props: {
      data,
    },
  };
};

const HistoryPage = ({ data: page }: { data: WikiPageProps }) => {
  return (
    <div>
      <Head>
        <title>Simple Wiki Engine</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Container maxWidth="container.lg" mt="8">
          {page.history ? (
            <Table
              variant="simple"
              size="lg"
              colorScheme="gray"
              border="1px"
              borderColor="gray.200"
              mt="8"
            >
              <TableCaption>Page Search Results</TableCaption>
              <Thead>
                <Tr>
                  <Th>Change Description</Th>
                  <Th>Edited At</Th>
                  <Th>Diff</Th>
                </Tr>
              </Thead>
              <Tbody>
                {page.history.map((archive) => {
                  const params = new URLSearchParams({
                    slug: archive.slug,
                    archiveId: archive.id.toString(),
                  });

                  const diffLink = `/diff?${params.toString()}`;

                  return (
                    <Tr>
                      <Td>{archive.description}</Td>
                      <Td>{new Date(archive.archiveDate).toUTCString()}</Td>
                      <Td>
                        <NextChakraLink href={diffLink} fontWeight="semibold">
                          Diff
                        </NextChakraLink>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <div>no history</div>
          )}
        </Container>
      </Layout>
    </div>
  );
};

export default HistoryPage;