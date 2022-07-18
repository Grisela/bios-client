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
import React from "react";
import { useRouter } from "next/router";

const Content = ({ dataSource }: any) => {
  const router = useRouter();
  return (
    <>
      {dataSource?.map((e: any) => (
        <Flex key={e?.id} flexDirection="column" my={12}>
          <Box>
            <Heading
              onClick={() => router.push(`/home/view/${e?.id}`)}
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
        </Flex>
      ))}
    </>
  );
};

export default Content;
