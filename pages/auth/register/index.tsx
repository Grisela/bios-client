import type { NextPage } from "next";
import Register from "components/auth/register";
import { Box, Flex, Center, Heading, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "config/firebase/firebase";

const Auth: NextPage = () => {
  const router: any = useRouter();

  const userCheck = async () => {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      }
    });
  };

  useEffect(() => {
    userCheck();
  }, []);

  return (
    <>
      <Center h="100vh" bg="gray.100">
        <Box
          w={{ base: "90%", md: "80%", lg: "70%", xl: "70%" }}
          h="95vh"
          rounded="lg"
          boxShadow="base"
          bg="white"
        >
          <Flex
            flexDirection={{ base: "column", md: "row", lg: "row", xl: "row" }}
          >
            <Box
              display={{ base: "none", md: "block", lg: "block", xl: "block" }}
              w={{ base: "100%", md: "30%", lg: "30%", xl: "30%" }}
              h="70vh"
              bgGradient="linear(to-r, #00BAAF, #00b7e6)"
            >
              <Image src="/icon_white.svg" alt="icon" pt={3} pl={3} w="80px" />
              <Flex
                flexDirection="column"
                p={5}
                color="whiteAlpha.800"
                justify="center"
                align="center"
                h="55vh"
              >
                <Heading as="h2" size="2xl">
                  Welcome
                </Heading>
                <Text fontSize="md" mt={14} align="center">
                  What is The Schedule You Have Today? Create A New Drawing, New
                  Design, Or Is It, ...New Apps?
                </Text>
              </Flex>
            </Box>

            <Box
              w={{ base: "100%", md: "70%", lg: "70%", xl: "70%" }}
              h="70vh"
              p={3}
            >
              <Center>
                <Heading as="h2" size="2xl" color="#00b7e6" mt="60px">
                  Register
                </Heading>
              </Center>
              <Center mt={4}>
                <Text color="gray" textAlign="center">
                  I Surely Hope That You Remember Your Credential
                </Text>
              </Center>
              <Center mt="30px">
                <Register />
              </Center>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default Auth;
