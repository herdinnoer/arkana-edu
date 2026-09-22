"use client";

import {
  Flex,
  Heading,
  HStack,
  Input,
  Icon,
  Box,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { useColorMode } from "../ui/color-mode";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px="24px"
      h="60px"
      bg="bg.primary"
      borderBottom="1px solid"
      borderColor="border.primary"
      position="sticky"
      top="0"
      zIndex="10"
      w="full"
    >
      <Heading fontSize="20px" fontWeight="semibold" color="text.primary">
        Overview
      </Heading>

      <HStack gap="8px">
        <HStack
          bg="bg.primary"
          px="12px"
          py="0px"
          borderRadius="xl"
          border="1px solid"
          borderColor="border.primary"
          w="320px"
          gap="0px"
        >
          <Icon as={Search} boxSize="16px" color="text.secondary" />
          <Input
            placeholder="Search here.."
            fontSize="14px"
            color="text.secondary"
            border="none"
            _focus={{ outline: "none" }}
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "blue.500",
              outlineOffset: "2px",
            }}
            _hover={{ border: "none" }}
            _active={{ border: "none" }}
            _placeholder={{ color: "text.secondary" }}
          />
          <ClientOnly
            fallback={<Skeleton w="45px" h="22px" borderRadius="lg" />}
          >
            <HStack gap="4px">
              <Flex
                as="kbd"
                px="8px"
                py="3px"
                bg="border.primary"
                color="text.secondary"
                fontSize="12px"
                fontWeight="semibold"
                borderRadius="lg"
                boxShadow={!isDark ? "0px 2px 0px #D4D4D4" : "none"}
                align="center"
                justify="center"
                minW="20px"
              >
                ⌘
              </Flex>
              <Flex
                as="kbd"
                px="10px"
                py="3px"
                bg="border.primary"
                color="text.secondary"
                fontSize="12px"
                fontWeight="semibold"
                borderRadius="lg"
                boxShadow={!isDark ? "0px 2px 0px #D4D4D4" : "none"}
                align="center"
                justify="center"
                minW="20px"
              >
                K
              </Flex>
            </HStack>
          </ClientOnly>
        </HStack>

        <HStack gap="8px">
          <ClientOnly
            fallback={<Skeleton w="72px" h="38px" borderRadius="xl" />}
          >
            <Flex
              as="button"
              onClick={() => {
                toggleColorMode();
              }}
              bg="border.primary"
              p="4px"
              borderRadius="xl"
              align="center"
              position="relative"
              cursor="pointer"
              w="72px"
              h="38px"
            >
              <Box
                position="absolute"
                left={isDark ? "37px" : "3px"}
                w="32px"
                h="32px"
                bg="bg.primary"
                borderRadius="lg"
                boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
                transition={
                  "left 0.3s ease-in-out, background 0.3s ease-in-out, color 0.3s ease-in-out"
                }
              />

              <Flex
                w="32px"
                h="32px"
                borderRadius="lg"
                bg={!isDark ? "bg.primary" : "transparent"}
                color={!isDark ? "text.primary" : "text.secondary"}
                boxShadow={!isDark ? "0px 2px 8px rgba(0, 0, 0, 0.12)" : "none"}
                align="center"
                justify="center"
                zIndex="1"
                cursor="pointer"
                _hover={{ color: "text.primary" }}
                transition="color 0.3s ease-in-out, background 0.3s ease-in-out"
              >
                <Icon as={Sun} boxSize="16px" />
              </Flex>

              <Flex
                w="32px"
                h="32px"
                borderRadius="lg"
                bg={isDark ? "bg.primary" : "transparent"}
                color={isDark ? "text.primary" : "text.secondary"}
                boxShadow={isDark ? "0px 2px 4px rgba(0, 0, 0, 0.08)" : "none"}
                align="center"
                justify="center"
                zIndex="1"
                cursor="pointer"
                _hover={{ color: "text.primary" }}
                transition="color 0.3s ease-in-out, background 0.3s ease-in-out"
              >
                <Icon as={Moon} boxSize="16px" />
              </Flex>
            </Flex>
          </ClientOnly>

          <Flex
            as="button"
            w="38px"
            h="38px"
            borderRadius="xl"
            bg="bg.primary"
            color="text.secondary"
            _hover={{ bg: "bg.muted" }}
            align="center"
            justify="center"
            border="1px solid"
            borderColor="border.primary"
            position="relative"
          >
            <Icon as={Bell} boxSize="16px" />

            <Box
              position="absolute"
              top="8px"
              right="8px"
              w="10px"
              h="10px"
              bg="red.500"
              borderRadius="full"
              border="2px solid"
              borderColor="bg.primary"
            />
          </Flex>
        </HStack>
      </HStack>
    </Flex>
  );
}
