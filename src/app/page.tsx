"use client";

import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  VStack,
  Icon,
  Badge,
  Button,
  Input,
  Table,
  Avatar,
  Center,
  Image,
} from "@chakra-ui/react";
import {
  ArrowUpRight,
  TrendingUp,
  BookOpen,
  Download,
  ArrowUp,
  Check,
  X,
  UserRoundPlus,
  LayoutList,
  UserRoundPen,
  CalendarMinus2,
  CheckLine,
  ClockCheck,
  UserCog,
} from "lucide-react";
import { Sidebar } from "../components/Layout/sidebar";
import { Header } from "../components/Layout/header";
import { GlossyButton } from "../components/ui/Button";
import { useEffect, useState } from "react";

function useCountUp(
  end: number,
  duration: number = 1000,
  decimals: number = 0,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 4);

      setCount(easeProgress * end);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return Number(count).toFixed(decimals);
}

export default function OverviewPage() {
  const [, setIsLoading] = useState(true);
  const attendanceRate = useCountUp(94.8, 1000, 1);
  const studentsPresent = useCountUp(1850, 1000, 0);
  const staffPresent = useCountUp(210, 1000, 0);
  const activeClasses = useCountUp(65, 1000, 0);
  const classCapacity = useCountUp(85, 1000, 0);
  const remainingBudget = useCountUp(68, 1000, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex h="100vh" w="100vw" bg="bg.muted" overflow="hidden">
      <Sidebar />

      <Flex
        flex="1"
        direction="column"
        h="calc(100vh - 32px)"
        m="16px"
        ml="0px"
        bg="bg.primary"
        borderRadius="24px"
        border="1px solid"
        borderColor="border.primary"
        transition="all 0.3s ease-in-out"
        overflow="hidden"
      >
        <Header />

        <Box flex="1" overflowY="auto" p="24px">
          <HStack gap="8px" mb="24px">
            <Text fontSize="20px" fontWeight="semibold" color="text.primary">
              Last Updated
            </Text>
            <Text fontSize="24px" fontWeight="semibold" color="text.secondary">
              •
            </Text>
            <Text fontSize="14px" fontWeight="regular" color="text.secondary">
              9 Sep 2026, 12:00
            </Text>
          </HStack>

          <Flex gap="24px" align="stretch">
            <VStack flex="1" align="stretch" gap="24px">
              <Flex gap="24px">
                <Box
                  flex="1.2"
                  bg="bg.primary"
                  p="24px"
                  borderRadius="24px"
                  border="1px solid"
                  borderColor="border.primary"
                >
                  <Text
                    fontSize="14px"
                    color="text.secondary"
                    fontWeight="regular"
                    mb="32px"
                  >
                    Overall School Attendance Today
                  </Text>

                  <Heading
                    fontSize="60px"
                    fontWeight="bold"
                    color="text.primary"
                    mb="32px"
                  >
                    {attendanceRate}%
                  </Heading>

                  <HStack gap="4px" mb="24px">
                    <Icon as={TrendingUp} boxSize="16px" color="green.500" />
                    <Text
                      fontSize="14px"
                      fontWeight="semibold"
                      color="green.500"
                    >
                      +1.5%
                    </Text>
                    <Text
                      fontSize="14px"
                      fontWeight="regular"
                      color="text.secondary"
                    >
                      vs Yesterday
                    </Text>
                  </HStack>

                  <Box w="full" h="1px" bg="border.primary" my="24px" />

                  <HStack justify="flex-start" gap="24px" w="full">
                    <VStack align="start" gap="4px" flex="1">
                      <Text fontSize="14px" color="text.secondary">
                        Students Present
                      </Text>
                      <Text
                        fontSize="24px"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        {studentsPresent}{" "}
                        <Text
                          as="span"
                          fontSize="16px"
                          color="text.secondary"
                          fontWeight="normal"
                        >
                          / 1950
                        </Text>
                      </Text>
                    </VStack>

                    <VStack align="start" gap="4px" flex="1">
                      <Text fontSize="14px" color="text.secondary">
                        Staff Present
                      </Text>
                      <Text
                        fontSize="24px"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        {staffPresent}{" "}
                        <Text
                          as="span"
                          fontSize="16px"
                          color="text.secondary"
                          fontWeight="normal"
                        >
                          / 225
                        </Text>
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <VStack flex="1" align="stretch" gap="16px">
                  <Box
                    bg="bg.primary"
                    p="18px"
                    borderRadius="24px"
                    border="1px solid"
                    borderColor="border.primary"
                  >
                    <Flex justify="space-between" align="center" mb="4px">
                      <Text
                        fontSize="14px"
                        color="text.secondary"
                        fontWeight="regular"
                      >
                        Total Active Classes
                      </Text>
                      <Icon
                        as={ArrowUpRight}
                        boxSize="20px"
                        color="text.secondary"
                      />
                    </Flex>
                    <Heading
                      fontSize="24px"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {activeClasses}
                    </Heading>
                  </Box>

                  <Box
                    bg="bg.primary"
                    p="18px"
                    borderRadius="24px"
                    border="1px solid"
                    borderColor="border.primary"
                  >
                    <Flex justify="space-between" align="center" mb="4px">
                      <Text
                        fontSize="14px"
                        color="text.secondary"
                        fontWeight="regular"
                      >
                        Class Capacity Utilization
                      </Text>
                      <Icon
                        as={ArrowUpRight}
                        boxSize="20px"
                        color="text.secondary"
                      />
                    </Flex>
                    <Heading
                      fontSize="24px"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {classCapacity}%
                    </Heading>
                  </Box>

                  <Box
                    bg="bg.primary"
                    p="18px"
                    borderRadius="24px"
                    border="1px solid"
                    borderColor="border.primary"
                  >
                    <Flex justify="space-between" align="center" mb="4px">
                      <Text
                        fontSize="14px"
                        color="text.secondary"
                        fontWeight="regular"
                      >
                        Remaining Budget (%)
                      </Text>
                      <Icon
                        as={ArrowUpRight}
                        boxSize="20px"
                        color="text.secondary"
                      />
                    </Flex>
                    <Heading
                      fontSize="24px"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {remainingBudget}%
                    </Heading>
                  </Box>
                </VStack>
              </Flex>

              <Box
                bg="bg.primary"
                px="24px"
                py="20px"
                borderRadius="24px"
                border="1px solid"
                borderColor="border.primary"
              >
                <Flex justify="space-between" align="center" mb="20px">
                  <HStack align="flex-start" gap="16px">
                    <Center
                      p="8px"
                      bg="bg.primary"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="border.primary"
                      boxShadow="sm"
                    >
                      <Icon
                        as={ClockCheck}
                        boxSize="18px"
                        color="text.secondary"
                      />
                    </Center>
                    <Box>
                      <HStack gap="8px">
                        <Text
                          fontSize="16px"
                          fontWeight="bold"
                          color="text.primary"
                        >
                          Pending Approvals
                        </Text>
                        <Badge
                          bg="border.primary"
                          color="text.primary"
                          fontSize="12px"
                          px="6px"
                          py="2px"
                          borderRadius="full"
                        >
                          4
                        </Badge>
                      </HStack>
                      <Text
                        fontSize="14px"
                        fontWeight="regular"
                        color="text.secondary"
                      >
                        Request requiring administrative review and approval.
                      </Text>
                    </Box>
                  </HStack>
                  <HStack
                    as="button"
                    color="text.secondary"
                    fontSize="14px"
                    fontWeight="medium"
                    gap="8px"
                    _hover={{ opacity: 0.8 }}
                  >
                    <Text>View all approvals</Text>
                    <Icon as={ArrowUpRight} boxSize="16px" />
                  </HStack>
                </Flex>

                <Box
                  overflowX="auto"
                  bg="bg.primary"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="border.primary"
                  overflowY="hidden"
                  w="full"
                >
                  <Table.Root size="sm" variant="line">
                    <Table.Header>
                      <Table.Row bg="bg.muted">
                        <Table.ColumnHeader
                          py="12px"
                          px="20px"
                          fontSize="14px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                        >
                          <HStack gap="8px">
                            <Icon as={LayoutList} boxSize="16px" />
                            <Text>Approval Type</Text>
                          </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="20px"
                          fontSize="14px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                        >
                          <HStack gap="8px">
                            <Icon as={UserRoundPen} boxSize="16px" />
                            <Text>Requester</Text>
                          </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="20px"
                          fontSize="14px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                        >
                          <HStack gap="8px">
                            <Icon as={CalendarMinus2} boxSize="16px" />
                            <Text>Request Date</Text>
                          </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="20px"
                          fontSize="14px"
                          fontWeight="medium"
                          color="text.primary"
                          w="1%"
                        >
                          <HStack gap="8px">
                            <Icon as={CheckLine} boxSize="16px" />
                            <Text>Action</Text>
                          </HStack>
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {[
                        {
                          type: "Purchase Order - IT Equipment",
                          name: "Maria Garcia",
                          date: "9 Sep 2026, 10:21",
                          avatar: "/avatars/maria-garcia.png",
                        },
                        {
                          type: "Leave Request - Staff",
                          name: "Ahmad Wardani",
                          date: "8 Sep 2026, 09:43",
                          avatar: "/avatars/ahmad-wardani.png",
                        },
                        {
                          type: "Field Trip Approval - Grade 8",
                          name: "Sabrina Nurhay...",
                          date: "8 Sep 2026, 14:11",
                          avatar: "/avatars/sabrina-nurhayati.png",
                        },
                        {
                          type: "Budget for Annual School Play",
                          name: "Kenjiro Tsunoda",
                          date: "6 Sep 2026, 08:52",
                          avatar: "/avatars/kenjiro-tsunoda.png",
                        },
                      ].map((row, i) => (
                        <Table.Row
                          key={i}
                          _hover={{ bg: "bg.muted" }}
                          transition="background-color 0.2s ease-in-out"
                        >
                          <Table.Cell
                            py="16px"
                            px="20px"
                            fontSize="14px"
                            fontWeight="regular"
                            color="text.primary"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            {row.type}
                          </Table.Cell>
                          <Table.Cell
                            py="16px"
                            px="20px"
                            fontSize="14px"
                            color="text.primary"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            <HStack gap="10px">
                              <Avatar.Root size="2xs">
                                <Avatar.Image src={row.avatar} />
                                <Avatar.Fallback name={row.name} />
                              </Avatar.Root>
                              <Text>{row.name}</Text>
                            </HStack>
                          </Table.Cell>
                          <Table.Cell
                            py="16px"
                            px="20px"
                            fontSize="14px"
                            color="text.primary"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            {row.date}
                          </Table.Cell>
                          <Table.Cell py="16px" px="20px" textAlign="right">
                            <HStack gap="8px" justify="flex-start">
                              <Button
                                size="xs"
                                variant="subtle"
                                colorPalette="red"
                                w="30px"
                                h="30px"
                                borderRadius="lg"
                              >
                                <Icon as={X} boxSize="16px" />
                              </Button>
                              <GlossyButton
                                colorScheme="green"
                                h="30px"
                                px="8px"
                                borderRadius="lg"
                              >
                                <Icon as={Check} boxSize="16px" />
                                <Text fontSize="12px">Approve</Text>
                              </GlossyButton>
                            </HStack>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Box>
            </VStack>

            <Box
              w="360px"
              h="screen"
              position="sticky"
              top="0px"
              backgroundImage="url('/bg-arkana-agent.png')"
              backgroundSize="100% 100%"
              backgroundPosition="center"
              borderRadius="24px"
              border="1.7px solid"
              borderColor="#DF358D"
              overflow="hidden"
              display="flex"
              flexDirection="column"
            >
              <style>
                {`
                  @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                    100% { transform: translateY(0px); }
                  }
                  @keyframes pulse-glow {
                    0% { box-shadow: 0 0 0 0 rgba(241, 101, 174, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(241, 101, 174, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(241, 101, 174, 0); }
                  }
                  @keyframes slide-up-fade {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                `}
              </style>

              <Box p="16px" pb="40px">
                <HStack gap="10px">
                  <Image
                    src="/agent-1.svg"
                    alt="Arkana Logo"
                    objectFit="contain"
                  />
                  <Text fontWeight="bold" fontSize="16px" color="white">
                    Arkana Agent
                  </Text>
                </HStack>
              </Box>

              <Flex
                bg="bg.primary"
                borderTopRadius="24px"
                borderBottomRadius="24px"
                mt="-24px"
                p="16px"
                flex="1"
                flexDirection="column"
                justifyContent="flex-end"
                position="relative"
              >
                <Box textAlign="center" pt="8px" mb="320px">
                  <Box
                    boxSize="96px"
                    mx="auto"
                    mb="0px"
                    borderRadius="full"
                    bg="transparant"
                    animation="pulse-glow 2.5s infinite, float 4s ease-in-out infinite"
                  >
                    <Image
                      src="/agent-2.png"
                      alt="Agent Avatar"
                      boxSize="96px"
                      mx="auto"
                      objectFit="contain"
                    />
                  </Box>

                  <Box
                    animation="slide-up-fade 1s ease-out 1s forwards"
                    opacity="0"
                  >
                    <Heading
                      fontSize="18px"
                      fontWeight="bold"
                      color="text.primary"
                      mb="2px"
                    >
                      Hello, Dadang
                    </Heading>

                    <Text
                      fontSize="14px"
                      color="text.primary"
                      fontWeight="regular"
                    >
                      How can I help you today?
                    </Text>
                  </Box>
                </Box>

                <Flex
                  direction="column"
                  gap="12px"
                  mb="16px"
                  animation="slide-up-fade 1s ease-out 2s forwards"
                  opacity="0"
                >
                  <Flex gap="12px">
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="border.primary"
                      borderRadius="lg"
                      color="text.primary"
                      shadow="xs"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="regular"
                      _hover={{ bg: "bg.muted" }}
                    >
                      <Icon
                        as={UserRoundPlus}
                        boxSize="14px"
                        color="text.primary"
                      />
                      Add User
                    </Button>
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="border.primary"
                      borderRadius="lg"
                      color="text.primary"
                      shadow="xs"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="regular"
                      _hover={{ bg: "bg.muted" }}
                    >
                      <Icon as={UserCog} boxSize="14px" color="text.primary" />
                      Manage Role
                    </Button>
                  </Flex>
                  <Flex gap="12px">
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="border.primary"
                      borderRadius="lg"
                      color="text.primary"
                      shadow="xs"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="regular"
                      _hover={{ bg: "bg.muted" }}
                    >
                      <Icon as={BookOpen} boxSize="14px" color="text.primary" />
                      Manage Class
                    </Button>
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="border.primary"
                      borderRadius="lg"
                      color="text.primary"
                      shadow="xs"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="regular"
                      _hover={{ bg: "bg.muted" }}
                    >
                      <Icon as={Download} boxSize="14px" color="text.primary" />
                      Export Data
                    </Button>
                  </Flex>
                </Flex>

                <Flex
                  align="center"
                  bg="bg.primary"
                  pl="1px"
                  pr="8px"
                  py="2px"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="border.primary"
                  animation="slide-up-fade 1s ease-out 3s forwards"
                  opacity="0"
                  _focusWithin={{
                    borderColor: "#f08ec1",
                    boxShadow: "0 0 0 1px #f3a1cb",
                  }}
                  transition="all 0.5s"
                >
                  <Input
                    placeholder="Ask something..."
                    fontSize="14px"
                    color="text.primary"
                    border="none"
                    _focus={{ outline: "none", boxShadow: "none" }}
                    _hover={{ border: "none" }}
                    _active={{ border: "none" }}
                    _placeholder={{ color: "text.secondary" }}
                  />
                  <GlossyButton
                    colorScheme="pink"
                    w="32px"
                    h="32px"
                    minW="32px"
                    p="0px"
                    borderRadius="lg"
                  >
                    <Icon as={ArrowUp} boxSize="16px" />
                  </GlossyButton>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
