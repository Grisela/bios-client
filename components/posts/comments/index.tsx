import { Center, Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "config/firebase/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentPost from "./CommentPost";
import CommentViews from "./CommentViews";

dayjs.extend(relativeTime);

const limitData = 25;

const Index = (props: any) => {
  const { postId, user } = props;

  const [content, setContent] = useState("");
  const [loadComment, setLoadComment] = useState(false);
  const [loadReplies, setLoadReplies] = useState(false);
  const [comments, setComments]: any = useState(null);
  const [replies, setReplies]: any = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const toast = useToast();
  const [onOpen, setOnOpen] = useState(null);
  const [replyTo, setReplyTo] = useState(null);

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
        setReplies(data);
      });
      // const fetch = await getDocs(initialQuery);
      // const result: any = fetch.docs.map((e) => ({ ...e.data(), id: e.id }));
      // setComments(result);
      setLoadReplies(true);
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
    if (!replyContent) return;
    if (user) {
      const messageRef = collection(
        db,
        `myPosts/${postId}/comments/${id}/replies`
      );
      const data = {
        created_at: dayjs().format("DD MMMM YYYY, HH:mm:ss:sss"),
        comment_body: replyContent,
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
          <CommentPost
            user={user}
            content={content}
            setContent={setContent}
            handleAddComment={handleAddComment}
          />
          <CommentViews
            comments={comments}
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            getReplies={getReplies}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleAddReply={handleAddReply}
            replies={replies}
            setReplyTo={setReplyTo}
            replyTo={replyTo}
          />
        </>
      )}
    </>
  );
};

export default Index;
