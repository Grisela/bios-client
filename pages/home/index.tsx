import React from "react";
import { useEffect, useRef, useState } from "react";
import { db, getStorage, ref, getDownloadURL } from "config/firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  limit,
  startAt,
  endAt,
  startAfter,
  orderBy,
  where,
} from "firebase/firestore";
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
import HomeContent from "components/home/Content";

const limitData = 1;

const HomePage = () => {
  const [postList, setPostList]: any = useState(null);
  const [postsEnd, setPostsEnd] = useState(false);

  const firstRenderDoc = async () => {
    const initialQuery = query(
      collection(db, "myPosts"),
      where("post_status", "==", 1),
      orderBy("created_at", "desc"),
      limit(limitData)
    );

    const fetch = await getDocs(initialQuery);
    const result = fetch.docs.map((e) => ({ ...e.data(), id: e.id }));
    setPostList(result);

    if (result.length < limitData) {
      setPostsEnd(true);
    }
  };

  const getAllDocs = async () => {
    const lastVisible = postList[postList.length - 1];

    const next = query(
      collection(db, "myPosts"),
      where("post_status", "==", 1),
      orderBy("created_at", "desc"),
      startAfter(lastVisible?.created_at ?? 0),
      limit(limitData)
    );

    const fetchData = await getDocs(next);
    const resultData = fetchData.docs.map((e) => ({ ...e.data(), id: e.id }));

    setPostList(postList.concat(resultData));

    if (resultData.length < limitData) {
      setPostsEnd(true);
    }
  };

  useEffect(() => {
    firstRenderDoc();
  }, []);

  return (
    <Box m={5}>
      <HomeContent dataSource={postList} />
      {postsEnd ? (
        <></>
      ) : (
        <>
          <Center onClick={() => getAllDocs()}>Load More</Center>
        </>
      )}
    </Box>
  );
};

export default HomePage;
