import {
  Box,
  Center,
  Button,
  Textarea,
  Collapse,
  Badge,
  useToast,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatIcon } from "@chakra-ui/icons";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "config/firebase/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const limitData = 25;

const Index = (props: any) => {
  const { postId, user } = props;

  const [content, setContent] = useState("");
  const [loadComment, setLoadComment] = useState(false);
  const [comments, setComments]: any = useState(null);
  const [replies, setReplies]: any = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const toast = useToast();

  const [onOpen, setOnOpen] = useState(null);

  const getComments = async (id: any) => {
    try {
      const initialQuery = query(
        collection(db, "myPosts", id, "comments"),
        // where("post_status", "==", 1),
        orderBy("created_at", "desc"),
        limit(limitData)
      );

      await onSnapshot(initialQuery, (snapshot: any) => {
        const data: any = [];
        snapshot?.forEach((doc: any) =>
          data.push({ ...doc?.data(), id: doc?.id })
        );
        setComments(data);
      });
      // const fetch = await getDocs(initialQuery);
      // const result: any = fetch.docs.map((e) => ({ ...e.data(), id: e.id }));
      // setComments(result);
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

  const handleAddComment = async () => {
    if (!content) return;
    if (user) {
      const messageRef = collection(db, `myPosts/${postId}/comments`);
      const data = {
        created_at: dayjs().format("DD MMMM YYYY, HH:mm:ss:sss"),
        comment_body: content,
        user_id: user?.uid,
        avatar: user?.photoURL ? user?.photoURL : null,
        username: user?.displayName,
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

  const getReplies = async (id: any) => {
    try {
      const initialQuery = query(
        collection(db, "myPosts", postId, "comments", id, "replies"),
        orderBy("created_at", "desc"),
        limit(limitData)
      );

      await onSnapshot(initialQuery, (snapshot: any) => {
        const data: any = [];
        snapshot?.forEach((doc: any) =>
          data.push({ ...doc?.data(), id: doc?.id })
        );
        setComments(data);
      });
      // const fetch = await getDocs(initialQuery);
      // const result: any = fetch.docs.map((e) => ({ ...e.data(), id: e.id }));
      // setComments(result);
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

  const handleAddReply = async (id: any) => {
    if (!content) return;
    if (user) {
      const messageRef = collection(
        db,
        `myPosts/${postId}/comments/${id}/replies`
      );
      const data = {
        created_at: dayjs().format("DD MMMM YYYY, HH:mm:ss:sss"),
        comment_body: content,
        user_id: user?.uid,
        avatar: user?.photoURL ? user?.photoURL : null,
        username: user?.displayName,
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
        setReplyContent("");
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

  return (
    <>
      {!loadComment && (
        <Center>
          <Button
            onClick={() => getComments(postId)}
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
          {user ? (
            user?.emailVerified ? (
              <Box w="88vw" mt="5vh">
                <Textarea
                  placeholder="Start writing..."
                  size="md"
                  value={content}
                  onChange={(e) => {
                    setContent(e?.target?.value);
                  }}
                  isInvalid={content.length > 200}
                />
                <Flex
                  justifyContent={
                    content.length > 200 ? "space-between" : "flex-end"
                  }
                >
                  {content.length > 200 && (
                    <Text as="i" color="red" mt="3px" fontWeight="semibold">
                      Comment is too long!
                    </Text>
                  )}
                  <Text
                    textAlign="end"
                    color={content.length > 200 ? "red" : "teal"}
                    mt="3px"
                    fontWeight="semibold"
                  >
                    {content.length}/200
                  </Text>
                </Flex>
                <Flex justifyContent="flex-end">
                  <Button
                    isDisabled={content.length > 200 || content.length === 0}
                    w={{ base: "88vw", md: "auto" }}
                    colorScheme="teal"
                    mt="5vh"
                    onClick={() => handleAddComment()}
                  >
                    Post Comment
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Center textAlign="center" color="gray">
                You have to verify your email to post a comment
              </Center>
            )
          ) : (
            <Center textAlign="center" color="gray">
              You have to login to post a comment
            </Center>
          )}
          <Box w="88vw" mt="5vh">
            {comments?.map((e: any, i: any) => (
              <Flex
                key={i}
                my={{ base: 3 }}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p="5px"
              >
                <Box mr={3}>
                  {e?.avatar ? (
                    <Image
                      borderRadius="full"
                      boxSize="35px"
                      src={user?.photoURL}
                      alt="Dan Abramov"
                    />
                  ) : (
                    <Center w="25px" h="25px" borderRadius="3xl" bg="teal">
                      <Heading as="h6" size="md" color="white">
                        {user?.email?.charAt(0)}
                      </Heading>
                    </Center>
                  )}
                </Box>
                <Box>
                  <Flex mb={3}>
                    <Heading as="h4" size="md" color="teal" mr={2}>
                      {e?.username}
                    </Heading>
                    <Text color="gray">{dayjs(e?.created_at).fromNow()}</Text>
                  </Flex>
                  <Text>{e?.comment_body}</Text>
                  <Flex
                    mt="5px"
                    justifyContent="flex-end"
                    alignItems="center"
                    onClick={() => {
                      onOpen === e?.id ? setOnOpen(null) : setOnOpen(e?.id);
                      getReplies(e?.id);
                    }}
                  >
                    <ChatIcon my={5} mr={2} />
                    <Text color="blue">Reply</Text>
                  </Flex>

                  <Collapse in={onOpen === e?.id ? true : false} animateOpacity>
                    <Box p="5px" rounded="md" shadow="md">
                      <Textarea
                        placeholder="Start writing..."
                        size="md"
                        value={replyContent}
                        onChange={(e) => {
                          setReplyContent(e?.target?.value);
                        }}
                        isInvalid={replyContent.length > 200}
                      />
                      <Flex
                        justifyContent={
                          replyContent.length > 200
                            ? "space-between"
                            : "flex-end"
                        }
                      >
                        {replyContent.length > 200 && (
                          <Text
                            as="i"
                            color="red"
                            mt="3px"
                            fontWeight="semibold"
                          >
                            Comment is too long!
                          </Text>
                        )}
                        <Text
                          textAlign="end"
                          color={replyContent.length > 200 ? "red" : "teal"}
                          mt="3px"
                          fontWeight="semibold"
                        >
                          {replyContent.length}/200
                        </Text>
                      </Flex>
                      <Flex>
                        <Button
                          isDisabled={
                            replyContent.length > 200 ||
                            replyContent.length === 0
                          }
                          w={{ base: "100%", md: "auto" }}
                          colorScheme="teal"
                          mt="5vh"
                          onClick={() => handleAddReply(e?.id)}
                        >
                          Post Comment
                        </Button>
                      </Flex>
                    </Box>
                  </Collapse>
                </Box>
              </Flex>
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default Index;
