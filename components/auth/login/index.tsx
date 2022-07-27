import React from "react";
import FormWithFLoatingLabel from "components/tools/editable/FormWithFloatingLabel";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Center,
  extendTheme,
  ChakraProvider,
  Link,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "config/firebase/firebase";
import { useRouter } from "next/router";
import NextLink from "next/link";

const theme = extendTheme({
  colors: {
    baseColor: {
      50: "#44337A",
      100: "#00b7e6",
      500: "#00b7e6",
    },
  },
});

const Index = () => {
  const toast = useToast();
  const auth = getAuth();

  const router = useRouter();

  const handleSignin = async (values: any) => {
    await signInWithEmailAndPassword(auth, values?.email, values?.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast({
          title: "Welcome!",
          description: `Welcome Back!`,
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({
          title: errorCode,
          description: errorMessage,
          status: "error",
          duration: 700,
          isClosable: true,
        });
        console.log(`${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <>
      <ChakraProvider theme={theme}>
        <Center mt={10}>
          <Flex flexDirection={{ base: "column" }}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, actions) => {
                handleSignin(values);
              }}
            >
              {() => (
                <Form>
                  <Field Field name="email">
                    {({ field, form }: any) => {
                      return (
                        <>
                          <FormWithFLoatingLabel
                            label="E-mail"
                            isRequired={true}
                            fieldProps={field}
                            formProps={form}
                            type="text"
                            widthCustom={{
                              base: "70vw",
                              md: "30vw",
                              lg: "30vw",
                              xl: "30vw",
                            }}
                          />
                        </>
                      );
                    }}
                  </Field>
                  <Field Field name="password">
                    {({ field, form }: any) => (
                      <>
                        <FormWithFLoatingLabel
                          label="Password"
                          isRequired={true}
                          fieldProps={field}
                          formProps={form}
                          type="password"
                          widthCustom={{
                            base: "70vw",
                            md: "30vw",
                            lg: "30vw",
                            xl: "30vw",
                          }}
                        />
                      </>
                    )}
                  </Field>
                  <Center mt={5}>
                    <Button
                      ml={3}
                      mt={3}
                      colorScheme="baseColor"
                      type="submit"
                      w={{ base: "70vw", md: "8vw", lg: "8vw", xl: "8vw" }}
                    >
                      Submit
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
            <Text fontSize="sm" textAlign="center" mt={2}>
              No Account yet?&nbsp;
              <NextLink href="/auth/register" passHref>
                <Link color="blue" as="i">
                  Register here
                </Link>
              </NextLink>
            </Text>
          </Flex>
        </Center>
      </ChakraProvider>
    </>
  );
};

export default Index;
