import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  Image,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ChatIcon } from "@chakra-ui/icons";

const Content = ({ dataSource }: any) => {
  const router = useRouter();
  const [commentFlag, setCommentFlag] = useState(false);

  return (
    <>
      {dataSource?.map((e: any) => (
        <Flex key={e?.id} flexDirection="column" my={12}>
          <Box>
            <Heading
              onClick={() =>
                router.push(`/posts/view/${e?.id}`, undefined, {
                  scroll: false,
                })
              }
              as="h3"
              size="lg"
            >
              {e?.title}
            </Heading>
            <Text as="i" fontSize="sm" color="gray">
              {dayjs(e?.created_at).format("dddd, MMMM YYYY, hh:ss")}
            </Text>
          </Box>
          <Center>
            <Image
              my={7}
              w={{ base: "90vw", md: "70vw", lg: "50vw", xl: "40vw" }}
              src={e?.media_url}
              alt="Picture"
            />
          </Center>
          <Box>
            {e?.tag?.map((t: any, i: number) => (
              <Tag
                size="sm"
                key={i}
                borderRadius="full"
                variant="solid"
                colorScheme="green"
                mx={1}
              >
                <TagLabel>{t}</TagLabel>
              </Tag>
            ))}
          </Box>
          <Box onClick={() => setCommentFlag(!commentFlag)}>
            <Flex alignItems="center" justifyContent="flex-end">
              <ChatIcon my={5} mr={2} />
              <Text>0 Comment</Text>
            </Flex>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default Content;
