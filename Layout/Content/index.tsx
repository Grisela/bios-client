import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Content = ({ breadcrumb = null, toolbar = null, children }: any) => {
  const router = useRouter();

  return (
    <Box bg="white" p={5}>
      {breadcrumb && (
        <Breadcrumb>
          {breadcrumb().map((e: any) => (
            <BreadcrumbItem key={e.idx}>
              <BreadcrumbLink href={e.link}>{e.text}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      {toolbar && (
        <Flex justifyContent="flex-end" mt={10} mx={5}>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() =>
              router.push(`${router?.pathname}/${toolbar?.action}`, undefined, {
                scroll: false,
              })
            }
            size="md"
          >
            {toolbar?.text}
          </Button>
        </Flex>
      )}
      <Box mt={5}>{children}</Box>
    </Box>
  );
};

export default Content;
