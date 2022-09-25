import { Box, Flex, Textarea, Text, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";

const CommentForm = ({
  content,
  setContent,
  handleAddComment,
  width,
  marginTop,
  isReply = false,
  commentedId = null,
  setReplyTo = null,
  replyTo = null,
}: any) => {
  // useEffect(() => {
  //   isReply && setContent()
  // }, [])

  return (
    <Box w={width} mt={marginTop}>
      <Textarea
        placeholder="Start writing..."
        size="md"
        value={content}
        onChange={(e: any) => {
          setContent(e?.target?.value);
        }}
        isInvalid={content.length > 200}
      />
      <Flex
        justifyContent={content.length > 200 ? "space-between" : "flex-end"}
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
          mt="2vh"
          onClick={() =>
            isReply ? handleAddComment(commentedId) : handleAddComment()
          }
        >
          Post Comment
        </Button>
      </Flex>
    </Box>
  );
};

export default CommentForm;
