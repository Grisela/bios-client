import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db, getAuth } from "config/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Box,
  useToast,
  Heading,
  Text,
  Image,
  Center,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import DOMPurify from "dompurify";

const Details = () => {
  const router = useRouter();
  const idPost = router?.query?.id;
  const [postData, setPostData]: any = useState(null);
  const toast = useToast();

  const createMarkupPreview = () => {
    const sanitizeHtml = DOMPurify.sanitize(postData?.description);
    return { __html: sanitizeHtml };
  };

  const getDataById = async (id: any) => {
    try {
      const getDocument = await doc(db, "myPosts", id);
      const result: any = await getDoc(getDocument).then((res) => res.data());
      setPostData(result);
    } catch (e) {
      toast({
        title: "Error Occured",
        description: "Error",
        status: "error",
        duration: 700,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    idPost && getDataById(idPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPost]);
  return !postData ? (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  ) : (
    <Box>
      <Heading as="h3" size="lg">
        {postData?.title}
      </Heading>
      <Text as="i" fontSize="sm">
        {dayjs(postData?.created_at).format("dddd, MMMM YYYY, hh:ss")}
      </Text>
      <br />
      <br />
      {postData?.tag?.map((t: any, i: number) => (
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
      <Image
        my={7}
        w={{ base: "90vw", md: "70vw", lg: "50vw", xl: "40vw" }}
        src={postData?.media_url}
        alt="Picture"
      />
      <Box w="70vw">
        <div
          dangerouslySetInnerHTML={
            postData?.description && createMarkupPreview()
          }
        />
      </Box>
    </Box>
  );
};

export default Details;
