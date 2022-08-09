import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  useToast,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BellIcon,
} from "@chakra-ui/icons";
import handleSignout from "utils/handleSignOut";
import { getAuth } from "config/firebase/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function WithSubnavigation() {
  const [user] = useAuthState(getAuth());
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const relogUser = () => {
    handleSignout()
      .then(() => {
        router.push(`/auth/login`);
      })
      .catch((e) =>
        toast({
          title: "Signout",
          description: `You've been signed out`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Box>
      {user && !user?.emailVerified && (
        <Flex
          flexDirection="column"
          w="100vw"
          bg="red"
          alignItems="center"
          fontWeight="bold"
        >
          <Text fontSize="sm" color="white">
            Please verify your email address
          </Text>
          <Text fontSize="sm" color="white">
            Already verified? please re-log{" "}
            <Text onClick={() => relogUser()} as="i" color="blue">
              here
            </Text>
          </Text>
        </Flex>
      )}
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image src="/icon.svg" alt="icon" pt={3} pl={3} w="80px" />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user ? (
            <>
              <Menu>
                <MenuButton>
                  <BellIcon w="25px" h="25px" color="teal" />
                </MenuButton>
                <MenuList w={{ base: "90vw", md: "30vw" }}>
                  <MenuItem>
                    <Box>
                      <Text fontWeight="bold">Here is a title</Text>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolore.
                      </Text>
                    </Box>
                  </MenuItem>
                  <MenuItem>
                    <Box>
                      <Text fontWeight="bold">Here is a title</Text>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolore.
                      </Text>
                    </Box>
                  </MenuItem>
                  <MenuItem>
                    <Box>
                      <Text fontWeight="bold">Here is a title</Text>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illum, dolore.
                      </Text>
                    </Box>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton>
                  {user?.photoURL ? (
                    <Image
                      borderRadius="full"
                      boxSize="35px"
                      src={user?.photoURL}
                      alt="Dan Abramov"
                    />
                  ) : (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      w="35px"
                      h="35px"
                      borderRadius="3xl"
                      bg="teal"
                    >
                      <Heading as="h2" size="xl" color="white">
                        {user.email?.charAt(0)}
                      </Heading>
                    </Flex>
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSignout().then(() => {
                        toast({
                          title: "Signout",
                          description: `You've been signed out`,
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        });
                      });
                      router.push("/");
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Text onClick={() => router.push("/auth/login")}>Sign In</Text>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, signOut }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        justify={"space-between"}
        onClick={() => {
          signOut &&
            handleSignout().then(() => {
              toast({
                title: "Signout",
                description: `You've been signed out`,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            });
          router.push("/");
        }}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  signOut?: boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
