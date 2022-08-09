import React, { useState } from "react";
import FormWithFLoatingLabel from "components/tools/editable/FormWithFloatingLabel";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Center,
  extendTheme,
  ChakraProvider,
  Link,
  useToast,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  sendEmailVerification,
  db,
  updateProfile,
} from "config/firebase/firebase";
import { useRouter } from "next/router";
import { actionCodeSettings } from "constant/globalVariable";
import NextLink from "next/link";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";

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
  const auth: any = getAuth();
  const [passwordFlag, setPasswordFlag] = useState(false);

  const router = useRouter();

  const handleSendEmailVerification = async (
    email: string,
    username: string
  ) => {
    await sendEmailVerification(auth.currentUser)
      .then(() => {
        toast({
          title: "Success!",
          description: `Register Success, Email verification has been sent`,
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        // window.localStorage.setItem("emailForSignIn", email);
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
    // await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //   .then(() => {
    //     toast({
    //       title: "Success!",
    //       description: `Register Success, Email verification has been sent`,
    //       status: "success",
    //       duration: 7000,
    //       isClosable: true,
    //     });
    //     window.localStorage.setItem("emailForSignIn", email);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     toast({
    //       title: errorCode,
    //       description: errorMessage,
    //       status: "error",
    //       duration: 700,
    //       isClosable: true,
    //     });
    //     console.log(`${errorCode}: ${errorMessage}`);
    //   });
  };

  const handleCreateUserDataAfterRegister = async (
    userCredential: any,
    username: string
  ) => {
    const userRef = collection(db, `myUsers`);
    const data = {
      created_at: dayjs().format("DD MMMM YYYY, HH:mm:ss:sss"),
      username,
      email: userCredential?.user?.email,
      avatar: userCredential?.user?.photoURL
        ? userCredential?.user?.photoURL
        : null,
    };
    try {
      const docRef = doc(userRef, userCredential?.user?.uid);
      await setDoc(docRef, data)
        .then(async () => {
          await updateProfile(userCredential?.user, {
            displayName: username,
          }).then(() => {
            toast({
              title: "Success",
              description: `User Registration Success, welcome ${username}!`,
              status: "success",
              duration: 700,
              isClosable: true,
            });
            handleSendEmailVerification(userCredential?.user?.email, username);
          });
        })
        .catch((e) => {
          toast({
            title: "Error",
            description: "Registration Failed",
            status: "error",
            duration: 700,
            isClosable: true,
          });
        });
    } catch (e) {
      toast({
        title: "Error",
        description: "Internal server error",
        status: "error",
        duration: 700,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (values: any) => {
    if (values?.password != values?.repassword) {
      setPasswordFlag(true);
      return;
    }
    await createUserWithEmailAndPassword(auth, values?.email, values?.password)
      .then((userCredential) => {
        // Signed in
        handleCreateUserDataAfterRegister(userCredential, values?.username);
        // handleSendEmailVerification(values?.email);
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
              initialValues={{
                username: "",
                email: "",
                password: "",
                repassword: "",
              }}
              onSubmit={(values, actions) => {
                handleSignup(values);
              }}
            >
              {() => (
                <Form>
                  <Field Field name="username">
                    {({ field, form }: any) => {
                      return (
                        <>
                          <FormWithFLoatingLabel
                            label="Username"
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
                  <Field Field name="repassword">
                    {({ field, form }: any) => (
                      <>
                        <FormWithFLoatingLabel
                          label="Retype Password"
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
                        {passwordFlag && (
                          <Flex justifyContent="flex-end" mr={{ base: "5vw" }}>
                            <Text fontSize="sm" as="i" color="red">
                              {`Password doesn't match`}
                            </Text>
                          </Flex>
                        )}
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
              Already have an account?&nbsp;
              <NextLink href="/auth/login" passHref>
                <Link color="blue" as="i">
                  Login here
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
