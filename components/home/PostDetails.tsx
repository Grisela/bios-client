/*
>create comment {created_at, comment_body, user_id, is_parent, parent_id, children[] post_id}
>get comment id
>create new comment field with received id

>get comment where post_id = post_id
>children ? reply onclick get comment where post_id = post_id && where children has parent_id = parent_id
*/

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db, getAuth } from "config/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("components/tools/editable/TextEditor"),
  {
    ssr: false,
  }
);

const limitData = 25;

const Details = () => {
  const router = useRouter();
  const idPost = router?.query?.id;
  const [postData, setPostData]: any = useState(null);
  const toast = useToast();
  const [content, setContent] = useState("");
  const [loadComment, setLoadComment] = useState(false);
  const [comments, setComments] = useState(null);

  const auth = getAuth();

  const createMarkupPreview = (value: string) => {
    const sanitizeHtml = DOMPurify.sanitize(value);
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

  const handleAddComment = async () => {
    if (!content) return;
    if (auth?.currentUser) {
      const messageRef = collection(db, `myPosts/${idPost}/comments`);
      const data = {
        created_at: dayjs().format("DD MMMM YYYY, HH:mm:ss:sss"),
        comment_body: content,
        user_id: auth?.currentUser?.uid,
      };
      try {
        await addDoc(messageRef, data);
        toast({
          title: "Success",
          description: "Data successfully added ",
          status: "success",
          duration: 700,
          isClosable: true,
        });
        setContent("");
      } catch (e) {
        toast({
          title: "Error",
          description: "Internal server error",
          status: "error",
          duration: 700,
          isClosable: true,
        });
      }
    }
  };

  const getComments = async (id: any) => {
    try {
      const initialQuery = query(
        collection(db, "myPosts", id, "comments"),
        // where("post_status", "==", 1),
        orderBy("created_at", "desc"),
        limit(limitData)
      );

      const fetch = await getDocs(initialQuery);
      const result: any = fetch.docs.map((e) => ({ ...e.data(), id: e.id }));
      setComments(result);
      setLoadComment(true);
    } catch (e) {
      toast({
        title: "Error",
        description: "Internal server error",
        status: "error",
        duration: 700,
        isClosable: true,
      });
    }

    // if (result.length < limitData) {
    //   setPostsEnd(true);
    // }
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
      <Box w="88vw" mb="5vh">
        <div
          dangerouslySetInnerHTML={
            postData?.description && createMarkupPreview(postData?.description)
          }
        />
      </Box>
      {!loadComment && (
        <Center>
          <Button
            onClick={() => getComments(idPost)}
            w={{ base: "90vw", md: "auto" }}
            size="md"
            colorScheme="teal"
          >
            Load Comment
          </Button>
        </Center>
      )}
      {loadComment && (
        <>
          <hr />
          <Box w="88vw" mt="5vh">
            <TextEditor
              label="Post comment"
              setContent={setContent}
              content={content}
            />
            <Flex justifyContent="flex-end">
              <Button
                w={{ base: "88vw", md: "auto" }}
                colorScheme="teal"
                mt="5vh"
                onClick={() => handleAddComment()}
              >
                Post Comment
              </Button>
            </Flex>
          </Box>
          <Box w="88vw" mt="5vh">
            <Flex>
              <Box mr={3}>Ava</Box>
              <Box>
                <Flex mb={3}>
                  <Heading as="h4" size="md" color="teal" mr={2}>
                    username
                  </Heading>
                  <Text color="gray">date and time</Text>
                </Flex>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sapiente hic vero porro voluptatum aperiam modi dignissimos
                  praesentium quisquam similique quibusdam?
                </Text>
              </Box>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Details;
