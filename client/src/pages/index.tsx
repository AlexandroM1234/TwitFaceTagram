import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
const Index = () => {
  const [{ data, fetching }] = usePostsQuery({ variables: { limit: 10 } });
  if (!fetching && !data) {
    return <div> Query for posts failed</div>;
  }
  return (
    <Layout>
      <Flex textAlign="center">
        <Heading>TwitFaceTagram</Heading>
        <NextLink href="/createPost">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack>
          {data!.posts.map((p) => (
            <Box
              key={p.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              flex="1"
              borderRadius="md"
            >
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button isLoading={fetching} m="auto" my={8}>
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
