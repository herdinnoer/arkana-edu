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
} from "@chakra-ui/react";
import {
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  UserPlus,
  Shield,
  BookOpen,
  Download,
  ArrowUp,
  Check,
  X,
  CheckCircle,
} from "lucide-react";
import { Sidebar } from "../components/Layout/sidebar"; // Sesuaikan path jika berbeda
import { Header } from "../components/Layout/header"; // Import header yang baru dibuat

export default function OverviewPage() {
  return (
    // Pembungkus utama memenuhi layar penuh dan dikunci agar tidak ada scrollbar luar
    <Flex h="100vh" w="100vw" bg="bg.muted" overflow="hidden">
      {/* 1. SIDEBAR (Diam / Fixed di kiri) */}
      <Sidebar />

      {/* 2. AREA KANAN (Header + Konten Utama) */}
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
        {/* HEADER (Diam di atas) */}
        <Header />

        {/* KONTEN UTAMA (Hanya bagian ini yang bisa di-scroll) */}
        <Box flex="1" overflowY="auto" p="24px">
          {/* Last Updated Timestamp */}
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

          {/* GRID UTAMA: KIRI (Statistik & Tabel) & KANAN (Arkana Agent) */}
          <Flex gap="24px" align="start">
            {/* KOLOM KIRI */}
            <VStack flex="1" align="stretch" gap="24px">
              {/* TOP STATS ROW */}
              <Flex gap="24px">
                {/* Kartu Besar Attendance */}
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
                    94.8%
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

                  {/* Bagian Students & Staff Present yang mengisi lebar secara fleksibel */}
                  <HStack justify="flex-start" gap="24px" w="full">
                    {/* Kolom Students */}
                    <VStack align="start" gap="4px" flex="1">
                      <Text fontSize="14px" color="text.secondary">
                        Students Present
                      </Text>
                      <Text
                        fontSize="24px"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        1850{" "}
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

                    {/* Kolom Staff */}
                    <VStack align="start" gap="4px" flex="1">
                      <Text fontSize="14px" color="text.secondary">
                        Staff Present
                      </Text>
                      <Text
                        fontSize="24px"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        210{" "}
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

                {/* 3 Kartu Kecil Kanan Statistik */}
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
                      65
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
                      85%
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
                      68%
                    </Heading>
                  </Box>
                </VStack>
              </Flex>

              {/* PENDING APPROVALS TABLE SECTION */}
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
                        as={CheckCircle}
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

                {/* Tabel Sederhana */}
                <Box overflowX="auto">
                  <Table.Root size="sm" variant="line">
                    <Table.Header>
                      <Table.Row bg="bg.muted">
                        <Table.ColumnHeader
                          py="10px"
                          px="12px"
                          fontSize="12px"
                          color="text.secondary"
                        >
                          Approval Type
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="10px"
                          px="12px"
                          fontSize="12px"
                          color="text.secondary"
                        >
                          Requester
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="10px"
                          px="12px"
                          fontSize="12px"
                          color="text.secondary"
                        >
                          Request Date
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="10px"
                          px="12px"
                          fontSize="12px"
                          color="text.secondary"
                          textAlign="right"
                        >
                          Action
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {[
                        {
                          type: "Purchase Order - IT Equipment",
                          name: "Maria Garcia",
                          date: "9 Sep 2026, 10:21",
                        },
                        {
                          type: "Leave Request - Staff",
                          name: "Ahmad Wardani",
                          date: "8 Sep 2026, 09:43",
                        },
                        {
                          type: "Field Trip Approval - Grade 8",
                          name: "Sabrina Nurhay...",
                          date: "8 Sep 2026, 14:11",
                        },
                        {
                          type: "Budget for Annual School Play",
                          name: "Kenjiro Tsunoda",
                          date: "6 Sep 2026, 08:52",
                        },
                      ].map((row, i) => (
                        <Table.Row key={i}>
                          <Table.Cell
                            py="14px"
                            px="12px"
                            fontSize="13px"
                            fontWeight="600"
                            color="text.primary"
                          >
                            {row.type}
                          </Table.Cell>
                          <Table.Cell
                            py="14px"
                            px="12px"
                            fontSize="13px"
                            color="text.secondary"
                          >
                            <HStack gap="8px">
                              <Avatar.Root size="2xs">
                                <Avatar.Fallback name={row.name} />
                              </Avatar.Root>
                              <Text>{row.name}</Text>
                            </HStack>
                          </Table.Cell>
                          <Table.Cell
                            py="14px"
                            px="12px"
                            fontSize="13px"
                            color="text.secondary"
                          >
                            {row.date}
                          </Table.Cell>
                          <Table.Cell py="14px" px="12px" textAlign="right">
                            <HStack gap="6px" justify="flex_end">
                              <Button
                                size="xs"
                                variant="subtle"
                                colorPalette="red"
                                px="8px"
                                h="28px"
                              >
                                <Icon as={X} boxSize="14px" />
                              </Button>
                              <Button
                                size="xs"
                                bg="green.600"
                                color="white"
                                px="12px"
                                h="28px"
                                _hover={{ bg: "green.700" }}
                              >
                                <Icon as={Check} boxSize="14px" />
                                <Text fontSize="12px">Approve</Text>
                              </Button>
                            </HStack>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Box>
            </VStack>

            {/* KOLOM KANAN: ARKANA AGENT PANEL */}
            <Box
              w="360px"
              bg="bg.primary"
              borderRadius="24px"
              border="1px solid"
              borderColor="bg.muted"
              boxShadow="sm"
              overflow="hidden"
            >
              {/* Header Gradient Pink */}
              <Box
                bgGradient="linear(to-r, brand.primary, pink.300)"
                p="16px"
                color="white"
              >
                <HStack gap="8px">
                  <Icon as={Sparkles} boxSize="18px" />
                  <Text fontWeight="bold" fontSize="15px">
                    Arkana Agent
                  </Text>
                </HStack>
              </Box>

              {/* Greeting & Avatar */}
              <Box p="24px" textAlign="center">
                <Center
                  w="56px"
                  h="56px"
                  bg="pink.50"
                  color="brand.primary"
                  borderRadius="full"
                  mx="auto"
                  mb="12px"
                  border="1px solid"
                  borderColor="pink.100"
                >
                  <Icon as={Sparkles} boxSize="24px" />
                </Center>
                <Heading
                  fontSize="16px"
                  fontWeight="bold"
                  color="text.primary"
                  mb="4px"
                >
                  Hello, Dadang
                </Heading>
                <Text fontSize="13px" color="text.secondary" mb="24px">
                  How can I help you today?
                </Text>

                {/* 4 Action Buttons Grid */}
                <Flex direction="column" gap="8px" mb="24px">
                  <Flex gap="8px">
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="bg.muted"
                      color="text.primary"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="500"
                    >
                      <Icon
                        as={UserPlus}
                        boxSize="14px"
                        color="text.secondary"
                      />{" "}
                      Add User
                    </Button>
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="bg.muted"
                      color="text.primary"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="500"
                    >
                      <Icon as={Shield} boxSize="14px" color="text.secondary" />{" "}
                      Manage Role
                    </Button>
                  </Flex>
                  <Flex gap="8px">
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="bg.muted"
                      color="text.primary"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="500"
                    >
                      <Icon
                        as={BookOpen}
                        boxSize="14px"
                        color="text.secondary"
                      />{" "}
                      Manage Class
                    </Button>
                    <Button
                      flex="1"
                      variant="outline"
                      size="sm"
                      borderColor="bg.muted"
                      color="text.primary"
                      justifyContent="flex-start"
                      fontSize="12px"
                      fontWeight="500"
                    >
                      <Icon
                        as={Download}
                        boxSize="14px"
                        color="text.secondary"
                      />{" "}
                      Export Data
                    </Button>
                  </Flex>
                </Flex>

                {/* Chat Input Box */}
                <Flex
                  align="center"
                  bg="bg.muted"
                  px="12px"
                  py="8px"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="bg.muted"
                >
                  <Input
                    placeholder="Ask something..."
                    fontSize="13px"
                    color="text.primary"
                    border="none"
                    _focus={{ outline: "none" }}
                    _hover={{ border: "none" }}
                    _active={{ border: "none" }}
                    _placeholder={{ color: "text.secondary" }}
                  />
                  <Flex
                    as="button"
                    w="28px"
                    h="28px"
                    bg="brand.primary"
                    color="white"
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    _hover={{ opacity: 0.9 }}
                  >
                    <Icon as={ArrowUp} boxSize="16px" />
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
