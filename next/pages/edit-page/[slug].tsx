import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import axios from "axios";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Layout } from "../../components";
import { WikiPageProps } from "../../types";
import { API_ENDPOINTS, getPageFromSlug } from "../../utils";

type FormValues = {
  title: WikiPageProps["title"];
  description: WikiPageProps["description"];
  content: WikiPageProps["content"];
};

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

const EditPage = ({ data }: { data: WikiPageProps }) => {
  const router = useRouter();

  const initialValues: FormValues = {
    title: data.title,
    description: data.description || "",
    content: data.content || "",
  };

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: async (values) => {
      const postData = {
        ...values,
        slug: data.slug,
      };

      try {
        await axios.post(
          `${API_ENDPOINTS.BASE_URL}/${API_ENDPOINTS.CREATE_EDIT_PAGE}`,
          postData,
        );
      } catch (error) {
        alert(`Failed to Edit Page`);
        console.error({ edit_page_error: { error, postData } });
      }
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.title || values.title.length < 1) {
        errors.title = `Title cannot be empty`;
      }

      return errors;
    },
  });

  const { title, content, description } = formik.values;

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    const files = event.target.files;

    try {
      if (files && files.length >= 1) {
        const image = files[0];

        const formData = new FormData();
        formData.append(`file`, image);

        const { data } = await axios.post<{ error: boolean; imgSrc?: string }>(
          `${API_ENDPOINTS.BASE_URL}/${API_ENDPOINTS.UPLOAD_IMAGE}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (data.error || !data.imgSrc) {
          throw new Error();
        }

        formik.setFieldValue(
          `content`,
          content + `\n\n![${data.imgSrc}](${data.imgSrc})\n\n`,
        );
      }
    } catch (error) {
      alert(`Failed to upload image`);
    }
  };

  return (
    <div>
      <Head>
        <title>Simple Wiki Engine</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Container id="page-content" maxW="container.lg" mt="16">
          <form onSubmit={formik.handleSubmit}>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h2">{title}</Heading>

              <Box>
                <Button disabled={!isEmpty(formik.errors)} type="submit" mr="4">
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Go Back
                </Button>
              </Box>
            </Flex>

            <Box mt="8">
              <FormControl id="title">
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Please enter a title..."
                  onChange={formik.handleChange}
                  value={title}
                />
                {formik.errors.title && (
                  <FormHelperText color="red">
                    {formik.errors.title}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="description" mt="6">
                <FormLabel>Description</FormLabel>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Please enter a description..."
                  onChange={formik.handleChange}
                  value={description}
                />
              </FormControl>
            </Box>

            <Flex
              w="full"
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              mt="8"
            >
              <Textarea
                id="content"
                name="content"
                placeholder="Please enter the markdown content..."
                onChange={formik.handleChange}
                value={content}
                height="650px"
                width="50%"
                resize="none"
                border="none"
                borderRadius="none"
                overflowY="scroll"
              />
              <Box height="650px" width="50%" overflowY="scroll">
                <ReactMarkdown components={ChakraUIRenderer()} skipHtml={false}>
                  {content || ""}
                </ReactMarkdown>
              </Box>
            </Flex>
          </form>

          <Container mt="8">
            <form action="">
              <FormControl>
                <label htmlFor="file">Max file size 5mb. JPG | GIF | PNG</label>
                <input
                  id="file"
                  type="file"
                  multiple={false}
                  accept="image/jpeg,image/gif,image/png"
                  onChange={handleFileUpload}
                />
              </FormControl>
            </form>
          </Container>
        </Container>
      </Layout>
    </div>
  );
};

export default EditPage;
