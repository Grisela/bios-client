import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Collapse,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import CommentForm from "components/tools/editable/CommentForm";
import dayjs from "dayjs";
import React from "react";

const CommentViews = ({
  comments,
  onOpen,
  setOnOpen,
  getReplies,
  replyContent,
  setReplyContent,
  handleAddReply,
  replies,
  setReplyTo,
  replyTo,
}: any) => {
  return (
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
                src={e?.avatar}
                alt="alt ava"
              />
            ) : (
              <Center w="25px" h="25px" borderRadius="3xl" bg="teal">
                <Heading as="h6" size="md" color="white">
                  {e?.username?.charAt(0)}
                </Heading>
              </Center>
            )}
          </Box>
          <Box w="100%">
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
              w="100%"
              onClick={() => {
                onOpen === e?.id ? setOnOpen(null) : setOnOpen(e?.id);
                getReplies(e?.id);
              }}
            >
              <ChatIcon my={5} mr={2} />
              <Text color="teal" mr={2}>
                Reply
              </Text>
            </Flex>

            <Collapse in={onOpen === e?.id ? true : false} animateOpacity>
              <Box p="5px" rounded="md" shadow="md">
                <CommentForm
                  content={replyContent}
                  setContent={setReplyContent}
                  handleAddComment={handleAddReply}
                  width="70vw"
                  marginTop="none"
                  isReply={true}
                  commentedId={e?.id}
                  setReplyTo={setReplyTo}
                  replyTo={replyTo}
                />
                {replies?.map((r: any) => (
                  <Flex
                    key={r.id}
                    my={{ base: 3 }}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    p="5px"
                  >
                    <Box mr={3}>
                      {r?.avatar ? (
                        <Image
                          borderRadius="full"
                          boxSize="35px"
                          src={r?.avatar}
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Center w="25px" h="25px" borderRadius="3xl" bg="teal">
                          <Heading as="h6" size="md" color="white">
                            {r?.username?.charAt(0)}
                          </Heading>
                        </Center>
                      )}
                    </Box>
                    <Box w="100%">
                      <Flex mb={3}>
                        <Heading as="h4" size="md" color="teal" mr={2}>
                          {r?.username}
                        </Heading>
                        <Text color="gray">
                          {dayjs(r?.created_at).fromNow()}
                        </Text>
                      </Flex>
                      <Text>{r?.comment_body}</Text>
                      <Flex
                        mt="5px"
                        justifyContent="flex-end"
                        alignItems="center"
                        w="100&"
                        mr={1}
                      >
                        <ChatIcon my={5} mr={2} />
                        <Text color="teal">Reply</Text>
                      </Flex>
                    </Box>
                  </Flex>
                ))}
              </Box>
            </Collapse>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default CommentViews;
