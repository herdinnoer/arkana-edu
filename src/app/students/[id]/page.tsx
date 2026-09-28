"use client";

import { useState, useEffect } from "react";
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
  Table,
  Avatar,
  SimpleGrid,
  Center,
  NativeSelect,
  Menu,
} from "@chakra-ui/react";
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  MoreHorizontal,
  BookOpen,
  UsersRound,
  LayoutList,
  ChartColumnIncreasing,
  CreditCard,
  ChevronDown,
  CalendarMinus2,
  CheckLine,
  FileChartColumn,
  CaseUpper,
} from "lucide-react";
import { Sidebar } from "../../../components/Layout/sidebar";
import { Header } from "../../../components/Layout/header";
import { GlossyButton } from "../../../components/ui/Button";
import { motion, useSpring, useTransform } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

// Helper Animasi Angka Berhitung (Counter) dengan opsi desimal
function AnimatedNumber({
  value,
  decimals = 2,
}: {
  value: number;
  decimals?: number;
}) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => current.toFixed(decimals));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

// Mock Data Detail Nilai Siswa per Semester
const MOCK_GRADES: Record<
  string,
  Array<{ id: string; subject: string; grade: number; index: string }>
> = {
  "Semester 1": [
    { id: "MAT211", subject: "Matematika", grade: 8.2, index: "A" },
    { id: "IND211", subject: "Bahasa Indonesia", grade: 8.0, index: "A" },
    { id: "ENG211", subject: "Bahasa Inggris", grade: 8.5, index: "A" },
    { id: "PHY211", subject: "Fisika", grade: 7.5, index: "B+" },
    { id: "HIS211", subject: "Sejarah", grade: 8.25, index: "A" },
  ],
  "Semester 2": [
    { id: "MAT212", subject: "Matematika", grade: 8.65, index: "A" },
    { id: "IND212", subject: "Bahasa Indonesia", grade: 8.2, index: "A" },
    { id: "ENG212", subject: "Bahasa Inggris", grade: 8.75, index: "A" },
    { id: "PHY212", subject: "Fisika", grade: 7.9, index: "B+" },
    { id: "HIS212", subject: "Sejarah", grade: 8.55, index: "A" },
  ],
};

export default function StudentDetailPage() {
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Activity" | "Payment"
  >("Overview");
  const [selectedSemester, setSelectedSemester] = useState<
    "Semester 1" | "Semester 2"
  >("Semester 2");

  const academicData = {
    "Semester 1": {
      gpa: 8.25,
      attendance: "94%",
      paymentStatus: "Paid",
      discipline: "Good",
      grades: [
        {
          id: "MAT101",
          subject: "Matematika Wajib",
          grade: "8.20",
          index: "A",
        },
        {
          id: "IND101",
          subject: "Bahasa Indonesia",
          grade: "8.50",
          index: "A",
        },
        { id: "ENG101", subject: "Bahasa Inggris", grade: "8.00", index: "A" },
        { id: "BIO101", subject: "Biologi Dasar", grade: "7.75", index: "B+" },
        {
          id: "EKO101",
          subject: "Ekonomi & Bisnis",
          grade: "8.10",
          index: "A",
        },
      ],
    },
    "Semester 2": {
      gpa: 8.65,
      attendance: "96%",
      paymentStatus: "Paid",
      discipline: "Good",
      grades: [
        {
          id: "MAT202",
          subject: "Matematika Lanjutan",
          grade: "8.80",
          index: "A",
        },
        {
          id: "IND202",
          subject: "Bahasa Indonesia Lanjut",
          grade: "8.50",
          index: "A",
        },
        {
          id: "ENG202",
          subject: "English for Academic Purposes",
          grade: "8.75",
          index: "A",
        },
        { id: "PHY202", subject: "Fisika Dasar", grade: "8.20", index: "A" },
        { id: "KIM202", subject: "Kimia Dasar", grade: "9.00", index: "A" },
      ],
    },
  };

  // Data dummy siswa (bisa dinamis sesuai [id] jika menggunakan useParams)
  const student = {
    id: "321011000930",
    name: "Alya Putri Maharani",
    class: "XII - RPL A",
    status: "Active",
    email: "alya12@example.com",
    phone: "+62-8515-1231",
    address: "Jl. Utama II No 25 RT 004 RW 006, Green Garden City, Jakarta",
    avatar: "/avatars/students/alya.png",
    gpa: "8.45",
    attendance: "92%",
    paymentStatus: "Paid",
    discipline: "Good",
  };

  // Mengambil data spesifik sesuai semester yang dipilih saat ini
  const currentData = academicData[selectedSemester];

  // Contoh definisi data gradesData di dalam file page.tsx
  const gradesData: Record<
    string,
    Array<{ id: string; subject: string; grade: string; index: string }>
  > = {
    "Semester 1": [
      { id: "MAT101", subject: "Matematika Wajib", grade: "8.20", index: "A" },
      { id: "IND101", subject: "Bahasa Indonesia", grade: "8.50", index: "A" },
      { id: "ENG101", subject: "Bahasa Inggris", grade: "8.80", index: "A" },
      { id: "BIO101", subject: "Biologi Dasar", grade: "7.75", index: "B+" },
      { id: "EKO101", subject: "Ekonomi & Bisnis", grade: "8.10", index: "A" },
      { id: "SJR101", subject: "Sejarah Indonesia", grade: "8.30", index: "A" },
    ],
    "Semester 2": [
      {
        id: "MAT202",
        subject: "Matematika Lanjutan",
        grade: "8.65",
        index: "A",
      },
      {
        id: "IND202",
        subject: "Bahasa Indonesia Lanjut",
        grade: "8.20",
        index: "A",
      },
      {
        id: "ENG202",
        subject: "English for Academic Purposes",
        grade: "8.75",
        index: "A",
      },
      { id: "PHY202", subject: "Fisika Dasar", grade: "7.90", index: "B+" },
      { id: "KIM202", subject: "Kimia Dasar", grade: "8.00", index: "A" },
      {
        id: "PST202",
        subject: "Pendidikan Pancasila",
        grade: "8.90",
        index: "A",
      },
    ],
  };

  function GpaGauge({ value }: { value: number }) {
    const percentage = Math.min(Math.max(value / 10, 0), 1);

    const size = 170;
    const strokeWidth = 14;
    const center = size / 2;
    const radius = center - strokeWidth;

    const semiCircumference = Math.PI * radius;
    const strokeDashoffset = semiCircumference * (1 - percentage);

    return (
      // Tambahkan pr="32px" di sini agar ada ruang kosong di sebelah kanan grafik sebelum garis pembatas
      <Box position="relative" w={`${size}px`} h="95px" mx="auto" pr="32px">
        <svg
          width={size}
          height={size / 2 + 10}
          viewBox={`0 0 ${size} ${size / 2 + 10}`}
          style={{ overflow: "visible" }}
        >
          <path
            d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${center}`}
            fill="none"
            stroke="var(--chakra-colors-border-primary)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Animasi Transisi Halus pada Grafik Hijau */}
          <motion.path
            d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${center}`}
            fill="none"
            stroke="#00C853"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={semiCircumference}
            initial={{ strokeDashoffset: semiCircumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>

        <VStack
          position="absolute"
          bottom="4px"
          left="0px"
          w="full"
          align="center"
          justify="center"
          gap="0px"
          textAlign="center"
        >
          <Text
            fontSize="24px"
            fontWeight="bold"
            color="text.primary"
            lineHeight="1.1"
          >
            <AnimatedNumber value={value} />
          </Text>
          <Text
            fontSize="12px"
            color="text.secondary"
            mt="2px"
            whiteSpace="nowrap"
          >
            GPA (Cumulative)
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Flex h="100vh" w="100vw" bg="bg.muted" overflow="hidden">
      <Sidebar />

      {/* 1. Animasi Page Load Keseluruhan (Stagger Entrance) */}
      <MotionFlex
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        flex="1"
        direction="column"
        h="calc(100vh - 32px)"
        m="16px"
        ml="0px"
        bg="bg.primary"
        borderRadius="24px"
        border="1px solid"
        borderColor="border.primary"
        overflow="hidden"
      >
        {/* Header terintegrasi dengan mode breadcrumb otomatis */}
        <Header
          backHref="/students"
          breadcrumbIcon={UsersRound}
          breadcrumbText={student.name}
        />

        <Flex flex="1" direction="column" overflow="hidden">
          {/* Navigation Tabs (Overview, Activity, Payment) dengan Ikon */}
          <Flex
            px="24px"
            pt="24px"
            gap="24px"
            borderBottom="1px solid"
            borderColor="border.primary"
            flexShrink={0}
          >
            {[
              { name: "Overview", icon: LayoutList },
              { name: "Activity", icon: ChartColumnIncreasing },
              { name: "Payment", icon: CreditCard },
            ].map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <Box
                  key={tab.name}
                  pb="16px"
                  cursor="pointer"
                  position="relative"
                  onClick={() => setActiveTab(tab.name as any)}
                >
                  <HStack gap="8px">
                    <Icon
                      as={tab.icon}
                      boxSize="16px"
                      color={isActive ? "text.primary" : "text.secondary"}
                    />
                    <Text
                      fontSize="14px"
                      fontWeight={isActive ? "semibold" : "regular"}
                      color={isActive ? "text.primary" : "text.secondary"}
                    >
                      {tab.name}
                    </Text>
                  </HStack>
                  {isActive && (
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      w="full"
                      h="3px"
                      bg="brand.primary"
                      borderTopRadius="full"
                    />
                  )}
                </Box>
              );
            })}
          </Flex>

          {/* Scrollable Content Area */}
          <Flex
            flex="1"
            overflowY="auto"
            p="24px"
            gap="24px"
            direction={{ base: "column", xl: "row" }}
          >
            {/* Left Column: Profile Card & Contact Info */}
            <VStack
              w={{ base: "full", xl: "356px" }}
              gap="24px"
              align="stretch"
              flexShrink={0}
            >
              <Box
                border="1px solid"
                borderColor="border.primary"
                borderRadius="2xl"
                overflow="hidden"
                bg="bg.primary"
                p="6px"
              >
                {/* Banner & Avatar Profile */}
                <Box
                  h="120px"
                  bgImage="url('/bg-profile.png')"
                  bgSize="cover"
                  backgroundPosition="center"
                  position="relative"
                  borderRadius="xl"
                >
                  <Box
                    position="absolute"
                    bottom="-42px"
                    left="24px"
                    border="4px solid"
                    borderColor="bg.primary"
                    borderRadius="full"
                  >
                    <Avatar.Root size="full">
                      <Avatar.Image src={student.avatar} />
                      <Avatar.Fallback name={student.name} />
                    </Avatar.Root>
                  </Box>

                  {/* Badge Active di luar kanan bawah banner */}
                  <Box position="absolute" bottom="-40px" right="10px">
                    <Badge
                      bg="green.100"
                      color="green.700"
                      px="16px"
                      py="6px"
                      borderRadius="full"
                      fontSize="14px"
                      fontWeight="semibold"
                    >
                      {student.status}
                    </Badge>
                  </Box>
                </Box>

                {/* Name & Basic Info */}
                <VStack
                  align="start"
                  pt="60px"
                  pb="16px"
                  px="10px"
                  gap="16px"
                  borderBottom="1px solid"
                  borderColor="border.primary"
                >
                  <Heading
                    fontSize="20px"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {student.name}
                  </Heading>

                  {/* Ubah dari SimpleGrid kolom vertikal menjadi VStack ke bawah dengan baris horizontal */}
                  <VStack w="full" gap="12px">
                    <Flex justify="space-between" align="center" w="full">
                      <Text fontSize="14px" color="text.secondary">
                        Student ID
                      </Text>
                      <Text
                        fontSize="14px"
                        fontWeight="regular"
                        color="text.primary"
                      >
                        {student.id}
                      </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" w="full">
                      <Text fontSize="14px" color="text.secondary">
                        Class
                      </Text>
                      <Text
                        fontSize="14px"
                        fontWeight="regular"
                        color="text.primary"
                      >
                        {student.class}
                      </Text>
                    </Flex>
                  </VStack>
                </VStack>

                {/* Contact Section */}
                <VStack align="start" py="16px" px="10px" gap="20px">
                  <Text fontSize="16px" fontWeight="bold" color="text.primary">
                    Contact
                  </Text>

                  <HStack gap="12px" align="center">
                    <Center
                      boxSize="28px"
                      minW="28px"
                      minH="28px"
                      flexShrink={0}
                      bg="bg.primary"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="border.primary"
                      color="text.secondary"
                      shadow="lg"
                    >
                      <Icon as={Mail} boxSize="14px" />
                    </Center>
                    <VStack align="start" gap="0px">
                      <Text fontSize="14px" color="text.primary">
                        {student.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack gap="12px" align="center">
                    <Center
                      boxSize="28px"
                      minW="28px"
                      minH="28px"
                      flexShrink={0}
                      bg="bg.primary"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="border.primary"
                      color="text.secondary"
                      shadow="lg"
                    >
                      <Icon as={Phone} boxSize="14px" />
                    </Center>
                    <VStack align="start" gap="0px">
                      <Text fontSize="14px" color="text.primary">
                        {student.phone}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack gap="12px" align="flex-start">
                    <Center
                      boxSize="28px"
                      minW="28px"
                      minH="28px"
                      flexShrink={0}
                      bg="bg.primary"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="border.primary"
                      color="text.secondary"
                      shadow="lg"
                    >
                      <Icon as={MapPin} boxSize="14px" />
                    </Center>
                    <VStack align="start" gap="0px">
                      <Text
                        fontSize="14px"
                        color="text.primary"
                        lineHeight="1.4"
                      >
                        {student.address}
                      </Text>
                    </VStack>
                  </HStack>

                  {/* Action Buttons */}
                  <HStack w="full" pt="16px" gap="12px">
                    <Button
                      variant="outline"
                      borderColor="border.primary"
                      borderRadius="xl"
                      w="40px"
                      h="40px"
                    >
                      <Icon as={MoreHorizontal} boxSize="18px" />
                    </Button>
                    <GlossyButton
                      colorScheme="pink"
                      flex="1"
                      h="40px"
                      borderRadius="xl"
                    >
                      <Icon as={Edit} boxSize="16px" />
                      <Text fontSize="14px">Edit</Text>
                    </GlossyButton>
                  </HStack>
                </VStack>
              </Box>
            </VStack>

            {/* Right Column: Academic Performance & Subject Grades */}
            <VStack flex="1" gap="24px" align="stretch">
              {/* Academic Performance Card */}
              <Box bg="bg.primary">
                <Flex justify="space-between" align="flex-start" mb="24px">
                  <VStack align="start" gap="0px">
                    <Heading
                      fontSize="18px"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      Academic Performance
                    </Heading>
                    <Text
                      fontSize="14px"
                      fontWeight="regular"
                      color="text.secondary"
                    >
                      Overview of student performance for this Semester
                    </Text>
                  </VStack>

                  {/* Semester Selector */}
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        borderRadius="xl"
                        borderColor="border.primary"
                        bg="bg.primary"
                        color="text.primary"
                        fontSize="14px"
                        fontWeight="normal"
                        px="12px"
                        py="10px"
                        h="auto"
                        gap="24px"
                        _hover={{ bg: "bg.muted" }}
                        focusRing="none"
                      >
                        <Text>{selectedSemester}</Text>
                        <Icon
                          as={ChevronDown}
                          boxSize="16px"
                          color="text.primary"
                        />
                      </Button>
                    </Menu.Trigger>

                    <Menu.Positioner>
                      <Menu.Content
                        bg="bg.primary"
                        border="1px solid"
                        borderColor="border.primary"
                        borderRadius="xl"
                        boxShadow="lg"
                        p="6px"
                        minW="140px"
                      >
                        {(["Semester 1", "Semester 2"] as const).map((sem) => (
                          <Menu.Item
                            key={sem}
                            value={sem}
                            onClick={() => setSelectedSemester(sem)}
                            borderRadius="lg"
                            px="10px"
                            py="8px"
                            fontSize="14px"
                            color="text.primary"
                            cursor="pointer"
                            _hover={{ bg: "gray.200" }}
                            bg={
                              selectedSemester === sem
                                ? "bg.muted"
                                : "transparent"
                            }
                            transition="all 0.2s"
                          >
                            {sem}
                          </Menu.Item>
                        ))}
                      </Menu.Content>
                    </Menu.Positioner>
                  </Menu.Root>
                </Flex>

                {/* Metrics Overview */}
                <SimpleGrid
                  columns={{ base: 1, md: 4 }}
                  gap="16px"
                  px="24px"
                  py="24px"
                  border="1px solid"
                  borderRadius="2xl"
                  borderColor="border.primary"
                  alignItems="center"
                >
                  {/* Mengganti kotak GPA lama dengan Grafik SVG Semi-Circle */}
                  <Flex
                    justify="center"
                    align="center"
                    pr="28px"
                    // Menggunakan style inline CSS agar warnanya tidak ketarik hitam oleh tema
                    style={{
                      borderRight: "1px solid #E2E8F0",
                    }}
                    py="2px"
                  >
                    <GpaGauge value={currentData.gpa} />
                  </Flex>

                  <VStack align="start" gap="6px" pl="12px">
                    <Text fontSize="14px" color="text.secondary">
                      Attendance Rate
                    </Text>
                    {/* 2. Micro-interaction Fade/Slide Animasi saat Attendance Berubah */}
                    <MotionBox
                      key={currentData.attendance}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      fontSize="24px"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      <AnimatedNumber
                        value={parseInt(currentData.attendance, 10)}
                        decimals={0}
                      />
                      %
                    </MotionBox>
                  </VStack>

                  <VStack align="start" gap="6px">
                    <Text fontSize="14px" color="text.secondary">
                      Payment Status
                    </Text>
                    <Text fontSize="24px" fontWeight="bold" color="green.600">
                      {currentData.paymentStatus}
                    </Text>
                  </VStack>

                  <VStack align="start" gap="6px">
                    <Text fontSize="14px" color="text.secondary">
                      Discipline Record
                    </Text>
                    <Text fontSize="24px" fontWeight="bold" color="green.600">
                      {currentData.discipline}
                    </Text>
                  </VStack>
                </SimpleGrid>
              </Box>

              {/* Card Pembungkus Utama Subject Grades */}
              <Box
                bg="bg.primary"
                px="24px"
                py="20px"
                borderRadius="2xl"
                border="1px solid"
                borderColor="border.primary"
                w="full"
              >
                {/* Header Section */}
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
                        as={FileChartColumn}
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
                          Subject Grades - {selectedSemester}
                        </Text>
                      </HStack>
                      <Text
                        fontSize="14px"
                        fontWeight="regular"
                        color="text.secondary"
                      >
                        Academic performance across all subjects this semester
                      </Text>
                    </Box>
                  </HStack>
                </Flex>

                {/* Table Container */}
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
                          w="15%"
                        >
                          <Text>ID</Text>
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
                          <Text>Mata Pelajaran</Text>
                        </Table.ColumnHeader>

                        <Table.ColumnHeader
                          py="12px"
                          px="20px"
                          fontSize="14px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                          w="20%"
                        >
                          <Text>Grade</Text>
                        </Table.ColumnHeader>

                        <Table.ColumnHeader
                          py="12px"
                          px="20px"
                          fontSize="14px"
                          fontWeight="medium"
                          color="text.primary"
                          w="15%"
                        >
                          <Text>Indeks</Text>
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {currentData.grades.map((item: any, index: number) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: index * 0.04 }}
                          style={{
                            borderBottom:
                              "1px solid var(--chakra-colors-border-subtle)",
                          }}
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
                            {item.id}
                          </Table.Cell>

                          <Table.Cell
                            py="16px"
                            px="20px"
                            fontSize="14px"
                            color="text.primary"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            {item.subject}
                          </Table.Cell>

                          <Table.Cell
                            py="16px"
                            px="20px"
                            fontSize="14px"
                            fontWeight="medium"
                            color="text.primary"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            {item.grade}
                          </Table.Cell>

                          <Table.Cell py="16px" px="20px">
                            <Badge
                              px="10px"
                              py="4px"
                              borderRadius="full"
                              fontSize="12px"
                              fontWeight="semibold"
                              bg={
                                item.index === "A" ? "green.100" : "yellow.100"
                              }
                              color={
                                item.index === "A" ? "green.700" : "yellow.700"
                              }
                            >
                              {item.index}
                            </Badge>
                          </Table.Cell>
                        </motion.tr>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Box>
            </VStack>
          </Flex>
        </Flex>
      </MotionFlex>
    </Flex>
  );
}
