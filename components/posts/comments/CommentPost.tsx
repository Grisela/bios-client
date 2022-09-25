import { Center } from "@chakra-ui/react";
import CommentForm from "components/tools/editable/CommentForm";
import React from "react";

const CommentPost = ({ user, content, setContent, handleAddComment }: any) => {
  return (
    <>
      <hr />
      {user ? (
        user?.emailVerified ? (
          <CommentForm
            content={content}
            setContent={setContent}
            handleAddComment={handleAddComment}
            width="88vw"
            marginTop="5vh"
          />
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
    </>
  );
};

export default CommentPost;
