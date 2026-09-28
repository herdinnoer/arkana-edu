"use client";

import { useState } from "react";
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
  SimpleGrid,
  Square,
  Center,
  Checkbox,
} from "@chakra-ui/react";
import {
  Search,
  Filter,
  ArrowUpDown,
  List as ListIcon,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Menu,
  BookText,
  ListChecks,
  CheckLine,
  X,
} from "lucide-react";
import { Sidebar } from "../../components/Layout/sidebar";
import { Header } from "../../components/Layout/header";
import { GlossyButton } from "../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const MotionFlex = motion(Flex);

const MOCK_STUDENTS = [
  {
    id: "321011000930",
    name: "Alya Putri Maharani",
    class: "XII - RPL A",
    status: "Active",
    avatar: "/avatars/students/alya.png",
  },
  {
    id: "321011000929",
    name: "Nadia Safitri Rahman",
    class: "XII - TKJ B",
    status: "Active",
    avatar: "/avatars/students/nadia.png",
  },
  {
    id: "321011000928",
    name: "Rafi Akbar Pratama",
    class: "XII - TPM A",
    status: "Active",
    avatar: "/avatars/students/rafi.png",
  },
  {
    id: "321011000927",
    name: "Siti Nurhaliza Putri",
    class: "XII - RPL A",
    status: "Active",
    avatar: "/avatars/students/siti.png",
  },
  {
    id: "321011000926",
    name: "Dimas Arya Saputra",
    class: "XII - TKR B",
    status: "Active",
    avatar: "/avatars/students/dimas.png",
  },
  {
    id: "321011000925",
    name: "Nabila Azzahra",
    class: "XII - TKJ A",
    status: "Active",
    avatar: "/avatars/students/nabila.png",
  },
  {
    id: "321011000924",
    name: "Keisha Putri",
    class: "XII - RPL B",
    status: "Active",
    avatar: "/avatars/students/keisha.png",
  },
  {
    id: "321011000923",
    name: "Anisa Rahmawati",
    class: "XII - TKJ A",
    status: "Active",
    avatar: "/avatars/students/anisa.png",
  },
  {
    id: "321011000922",
    name: "Fajar Nugroho",
    class: "XII - TPM A",
    status: "Active",
    avatar: "/avatars/students/fajar.png",
  },
  {
    id: "321011000921",
    name: "Laila Maharani Putri",
    class: "XII - DKV B",
    status: "Inactive",
    avatar: "/avatars/students/anisa.png",
  },
];

export default function StudentsPage() {
  const [view, setView] = useState<"list" | "card">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const isAllSelected =
    selectedStudents.length === MOCK_STUDENTS.length &&
    MOCK_STUDENTS.length > 0;
  const isIndeterminate =
    selectedStudents.length > 0 &&
    selectedStudents.length < MOCK_STUDENTS.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(MOCK_STUDENTS.map((student) => student.id));
    }
  };

  const toggleSelectStudent = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id),
      );
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "class" | "status" | null
  >(null);

  const [draftClasses, setDraftClasses] = useState<string[]>([]);
  const [draftStatus, setDraftStatus] = useState<string[]>([]);

  const [appliedClasses, setAppliedClasses] = useState<string[]>([]);
  const [appliedStatus, setAppliedStatus] = useState<string[]>([]);

  const availableClasses = Array.from(
    new Set(MOCK_STUDENTS.map((student) => student.class)),
  );
  const availableStatuses = Array.from(
    new Set(MOCK_STUDENTS.map((student) => student.status)),
  );

  const activeFilterCount = appliedClasses.length + appliedStatus.length;

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSortDropdown, setActiveSortDropdown] = useState<
    "field" | "order" | null
  >(null);

  const [draftSortField, setDraftSortField] = useState<string>("Student ID");
  const [draftSortOrder, setDraftSortOrder] = useState<string>("");

  const [appliedSortField, setAppliedSortField] = useState<string>("");
  const [appliedSortOrder, setAppliedSortOrder] = useState<string>("");

  const sortFields = ["Student ID", "Name", "Class"];
  const sortOrders = ["Ascending", "Descending"];
  const activeSortCount = appliedSortField && appliedSortOrder ? 1 : 0;

  const handleApplySort = () => {
    setAppliedSortField(draftSortField);
    setAppliedSortOrder(draftSortOrder);
    setActiveSortDropdown(null);
    setIsSortOpen(false);
  };

  const handleResetSort = () => {
    setDraftSortField("Student ID");
    setDraftSortOrder("");
    setAppliedSortField("");
    setAppliedSortOrder("");
    setActiveSortDropdown(null);
    setIsSortOpen(false);
  };

  const openSortModal = () => {
    setDraftSortField(appliedSortField || "Student ID");
    setDraftSortOrder(appliedSortOrder || "");
    setActiveSortDropdown(null);
    setIsFilterOpen(false);
    setIsSortOpen(!isSortOpen);
  };

  const openFilterModal = () => {
    setDraftClasses(appliedClasses);
    setDraftStatus(appliedStatus);
    setActiveDropdown(null);
    setIsSortOpen(false);
    setIsFilterOpen(!isFilterOpen);
  };

  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchClass =
      appliedClasses.length === 0 || appliedClasses.includes(student.class);
    const matchStatus =
      appliedStatus.length === 0 || appliedStatus.includes(student.status);

    return matchesSearch && matchClass && matchStatus;
  }).sort((a, b) => {
    if (!appliedSortField || !appliedSortOrder) return 0;
    let valA = "";
    let valB = "";

    if (appliedSortField === "Student ID") {
      valA = a.id;
      valB = b.id;
    } else if (appliedSortField === "Name") {
      valA = a.name;
      valB = b.name;
    } else if (appliedSortField === "Class") {
      valA = a.class;
      valB = b.class;
    }

    if (appliedSortOrder === "Ascending") {
      return valA.localeCompare(valB);
    } else {
      return valB.localeCompare(valA);
    }
  });

  const handleApplyFilter = () => {
    setAppliedClasses(draftClasses);
    setAppliedStatus(draftStatus);
    setActiveDropdown(null);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setDraftClasses([]);
    setDraftStatus([]);
    setAppliedClasses([]);
    setAppliedStatus([]);
    setActiveDropdown(null);
    setIsFilterOpen(false);
  };

  return (
    <Flex h="100vh" w="100vw" bg="bg.muted" overflow="hidden">
      <Sidebar />

      <MotionFlex
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
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
        <Header />

        <Flex flex="1" direction="column" overflow="hidden">
          <MotionFlex
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            justify="space-between"
            align="center"
            px="24px"
            pt="24px"
            pb="24px"
          >
            <Heading fontSize="20px" fontWeight="semibold" color="text.primary">
              List of Students
            </Heading>
            <HStack gap="12px">
              <Button
                variant="outline"
                h="36px"
                px="12px"
                borderRadius="lg"
                borderColor="border.primary"
              >
                <Text fontSize="14px">More Action</Text>
                <Icon as={ChevronDown} boxSize="16px" />
              </Button>
              <GlossyButton
                colorScheme="pink"
                h="36px"
                px="12px"
                borderRadius="lg"
              >
                <Icon as={Plus} boxSize="16px" />
                <Text fontSize="14px">Add Students</Text>
              </GlossyButton>
            </HStack>
          </MotionFlex>

          <MotionFlex
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            justify="space-between"
            align="center"
            px="24px"
            pb="24px"
          >
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
                placeholder="Search students"
                fontSize="14px"
                color="text.primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                border="none"
                _focus={{ outline: "none" }}
                _hover={{ border: "none" }}
                _active={{ border: "none" }}
                _placeholder={{ color: "text.secondary" }}
              />
            </HStack>

            <HStack gap="12px">
              <Box position="relative">
                <Button
                  variant="outline"
                  h="36px"
                  px="12px"
                  color="text.primary"
                  fontWeight="regular"
                  borderRadius="lg"
                  borderColor="border.primary"
                  onClick={openFilterModal}
                >
                  <Icon as={Filter} boxSize="16px" /> Filter
                  <AnimatePresence>
                    {activeFilterCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        style={{ marginLeft: "4px" }}
                      >
                        <Center
                          bg="brand.primary"
                          color="white"
                          boxSize="20px"
                          borderRadius="full"
                          fontSize="12px"
                          fontWeight="bold"
                        >
                          {activeFilterCount}
                        </Center>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: "0px",
                        marginTop: "6px",
                        zIndex: 20,
                      }}
                    >
                      <Box
                        w="380px"
                        bg="bg.primary"
                        border="1px solid"
                        borderColor="border.primary"
                        borderRadius="2xl"
                        shadow="xl"
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          p="16px"
                          borderBottom="1px solid"
                          borderColor="border.primary"
                        >
                          <Text
                            fontSize="18px"
                            fontWeight="bold"
                            color="text.primary"
                          >
                            Filter
                          </Text>
                          <Flex
                            as="button"
                            onClick={() => setIsFilterOpen(false)}
                            bg="border.primary"
                            w="28px"
                            h="28px"
                            borderRadius="lg"
                            align="center"
                            justify="center"
                            color="text.primary"
                            _hover={{ bg: "gray.200" }}
                            transition="all 0.2s"
                          >
                            <Icon as={X} boxSize="16px" />
                          </Flex>
                        </Flex>

                        <Flex direction="column" p="16px" gap="16px">
                          <Box>
                            <Flex
                              justify="space-between"
                              align="center"
                              mb="8px"
                            >
                              <Text
                                fontSize="14px"
                                color="text.secondary"
                                fontWeight="regular"
                              >
                                Class
                              </Text>
                              <Text
                                fontSize="14px"
                                color="blue.500"
                                cursor="pointer"
                                fontWeight="regular"
                                onClick={() => setDraftClasses([])}
                              >
                                Clear
                              </Text>
                            </Flex>
                            <Flex
                              wrap="wrap"
                              gap="8px"
                              border="1px solid"
                              borderColor="border.primary"
                              borderRadius="xl"
                              p="8px"
                              align="center"
                              minH="46px"
                              position="relative"
                            >
                              {draftClasses.length === 0 ? (
                                <Box
                                  cursor="pointer"
                                  display="flex"
                                  alignItems="center"
                                  gap="8px"
                                  px="4px"
                                  onClick={() =>
                                    setActiveDropdown(
                                      activeDropdown === "class"
                                        ? null
                                        : "class",
                                    )
                                  }
                                >
                                  <Icon
                                    as={Plus}
                                    boxSize="16px"
                                    color="text.secondary"
                                  />
                                  <Text
                                    fontSize="14px"
                                    color="text.secondary"
                                    fontWeight="regular"
                                  >
                                    Choose class
                                  </Text>
                                </Box>
                              ) : (
                                <Box
                                  cursor="pointer"
                                  display="flex"
                                  alignItems="center"
                                  p="4px"
                                  onClick={() =>
                                    setActiveDropdown(
                                      activeDropdown === "class"
                                        ? null
                                        : "class",
                                    )
                                  }
                                >
                                  <Icon
                                    as={Plus}
                                    boxSize="16px"
                                    color="text.secondary"
                                  />
                                </Box>
                              )}

                              <AnimatePresence>
                                {activeDropdown === "class" && (
                                  <>
                                    <Box
                                      position="fixed"
                                      top="0"
                                      left="0"
                                      w="100vw"
                                      h="100vh"
                                      zIndex={25}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdown(null);
                                      }}
                                    />
                                    <motion.div
                                      initial={{ opacity: 0, y: -5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -5 }}
                                      transition={{ duration: 0.15 }}
                                      style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        marginTop: "8px",
                                        zIndex: 30,
                                        width: "100%",
                                      }}
                                    >
                                      <Flex
                                        direction="column"
                                        bg="bg.primary"
                                        border="1px solid"
                                        borderColor="border.primary"
                                        borderRadius="xl"
                                        p="6px"
                                        boxShadow="lg"
                                        maxH="200px"
                                        overflowY="auto"
                                        gap="4px"
                                      >
                                        {availableClasses.filter(
                                          (classOption) =>
                                            !draftClasses.includes(classOption),
                                        ).length === 0 ? (
                                          <Text
                                            p="8px"
                                            fontSize="14px"
                                            color="text.secondary"
                                            textAlign="center"
                                          >
                                            No options left
                                          </Text>
                                        ) : (
                                          availableClasses
                                            .filter(
                                              (classOption) =>
                                                !draftClasses.includes(
                                                  classOption,
                                                ),
                                            )
                                            .map((classOption) => (
                                              <Box
                                                key={classOption}
                                                px="12px"
                                                py="10px"
                                                borderRadius="lg"
                                                cursor="pointer"
                                                _hover={{ bg: "#f1f1f1" }}
                                                onClick={() => {
                                                  setDraftClasses([
                                                    ...draftClasses,
                                                    classOption,
                                                  ]);
                                                  setActiveDropdown(null);
                                                }}
                                              >
                                                <Text
                                                  fontSize="14px"
                                                  color="text.primary"
                                                >
                                                  {classOption}
                                                </Text>
                                              </Box>
                                            ))
                                        )}
                                      </Flex>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>

                              <AnimatePresence>
                                {draftClasses.map((cls) => (
                                  <motion.div
                                    key={cls}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <HStack
                                      bg="#f1f1f1"
                                      px="10px"
                                      py="6px"
                                      borderRadius="lg"
                                      gap="8px"
                                    >
                                      <Text
                                        fontSize="14px"
                                        fontWeight="medium"
                                        color="text.primary"
                                      >
                                        {cls}
                                      </Text>
                                      <Center
                                        bg="#737373"
                                        color="white"
                                        borderRadius="full"
                                        boxSize="14px"
                                        cursor="pointer"
                                        _hover={{ bg: "gray.500" }}
                                        onClick={() =>
                                          setDraftClasses(
                                            draftClasses.filter(
                                              (c) => c !== cls,
                                            ),
                                          )
                                        }
                                      >
                                        <Icon
                                          as={X}
                                          boxSize="10px"
                                          strokeWidth={3}
                                        />
                                      </Center>
                                    </HStack>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </Flex>
                          </Box>

                          <Box>
                            <Flex
                              justify="space-between"
                              align="center"
                              mb="8px"
                            >
                              <Text
                                fontSize="14px"
                                color="text.secondary"
                                fontWeight="regular"
                              >
                                Status
                              </Text>
                              <Text
                                fontSize="14px"
                                color="blue.500"
                                cursor="pointer"
                                fontWeight="regular"
                                onClick={() => setDraftStatus([])}
                              >
                                Clear
                              </Text>
                            </Flex>
                            <Flex
                              wrap="wrap"
                              gap="8px"
                              border="1px solid"
                              borderColor="border.primary"
                              borderRadius="xl"
                              p="8px"
                              align="center"
                              minH="46px"
                              position="relative"
                            >
                              {draftStatus.length === 0 ? (
                                <Box
                                  cursor="pointer"
                                  display="flex"
                                  alignItems="center"
                                  gap="8px"
                                  px="4px"
                                  onClick={() =>
                                    setActiveDropdown(
                                      activeDropdown === "status"
                                        ? null
                                        : "status",
                                    )
                                  }
                                >
                                  <Icon
                                    as={Plus}
                                    boxSize="16px"
                                    color="text.secondary"
                                  />
                                  <Text
                                    fontSize="14px"
                                    color="text.secondary"
                                    fontWeight="regular"
                                  >
                                    Choose status
                                  </Text>
                                </Box>
                              ) : (
                                <Box
                                  cursor="pointer"
                                  display="flex"
                                  alignItems="center"
                                  p="4px"
                                  onClick={() =>
                                    setActiveDropdown(
                                      activeDropdown === "status"
                                        ? null
                                        : "status",
                                    )
                                  }
                                >
                                  <Icon
                                    as={Plus}
                                    boxSize="16px"
                                    color="text.secondary"
                                  />
                                </Box>
                              )}

                              <AnimatePresence>
                                {activeDropdown === "status" && (
                                  <>
                                    <Box
                                      position="fixed"
                                      top="0"
                                      left="0"
                                      w="100vw"
                                      h="100vh"
                                      zIndex={25}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdown(null);
                                      }}
                                    />
                                    <motion.div
                                      initial={{ opacity: 0, y: -5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -5 }}
                                      transition={{ duration: 0.15 }}
                                      style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        marginTop: "8px",
                                        zIndex: 30,
                                        width: "100%",
                                      }}
                                    >
                                      <Flex
                                        direction="column"
                                        bg="bg.primary"
                                        border="1px solid"
                                        borderColor="border.primary"
                                        borderRadius="xl"
                                        p="6px"
                                        boxShadow="lg"
                                        maxH="200px"
                                        overflowY="auto"
                                        gap="4px"
                                      >
                                        {availableStatuses.filter(
                                          (statusOption) =>
                                            !draftStatus.includes(statusOption),
                                        ).length === 0 ? (
                                          <Text
                                            p="8px"
                                            fontSize="14px"
                                            color="text.secondary"
                                            textAlign="center"
                                          >
                                            No options left
                                          </Text>
                                        ) : (
                                          availableStatuses
                                            .filter(
                                              (statusOption) =>
                                                !draftStatus.includes(
                                                  statusOption,
                                                ),
                                            )
                                            .map((statusOption) => (
                                              <Box
                                                key={statusOption}
                                                px="12px"
                                                py="10px"
                                                borderRadius="lg"
                                                cursor="pointer"
                                                _hover={{ bg: "#f1f1f1" }}
                                                onClick={() => {
                                                  setDraftStatus([
                                                    ...draftStatus,
                                                    statusOption,
                                                  ]);
                                                  setActiveDropdown(null);
                                                }}
                                              >
                                                <Text
                                                  fontSize="14px"
                                                  color="text.primary"
                                                >
                                                  {statusOption}
                                                </Text>
                                              </Box>
                                            ))
                                        )}
                                      </Flex>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>

                              <AnimatePresence>
                                {draftStatus.map((statusItem) => (
                                  <motion.div
                                    key={statusItem}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <HStack
                                      bg="#f1f1f1"
                                      px="10px"
                                      py="6px"
                                      borderRadius="lg"
                                      gap="8px"
                                    >
                                      <Text
                                        fontSize="14px"
                                        fontWeight="medium"
                                        color="text.primary"
                                      >
                                        {statusItem}
                                      </Text>
                                      <Center
                                        bg="#737373"
                                        color="white"
                                        borderRadius="full"
                                        boxSize="14px"
                                        cursor="pointer"
                                        _hover={{ bg: "gray.500" }}
                                        onClick={() =>
                                          setDraftStatus(
                                            draftStatus.filter(
                                              (s) => s !== statusItem,
                                            ),
                                          )
                                        }
                                      >
                                        <Icon
                                          as={X}
                                          boxSize="10px"
                                          strokeWidth={3}
                                        />
                                      </Center>
                                    </HStack>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </Flex>
                          </Box>
                        </Flex>

                        <Flex
                          justify="space-between"
                          align="center"
                          p="16px"
                          borderTop="1px solid"
                          borderColor="border.primary"
                        >
                          <Button
                            onClick={handleResetFilter}
                            variant="outline"
                            borderColor="border.primary"
                            color="text.primary"
                            borderRadius="lg"
                            h="36px"
                            px="16px"
                            fontSize="13px"
                            fontWeight="medium"
                          >
                            Reset
                          </Button>
                          <GlossyButton
                            onClick={handleApplyFilter}
                            colorScheme="pink"
                            h="36px"
                            px="16px"
                            borderRadius="lg"
                            fontSize="14px"
                            fontWeight="medium"
                          >
                            Apply
                          </GlossyButton>
                        </Flex>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
              <Box position="relative">
                <Button
                  variant="outline"
                  h="36px"
                  px="12px"
                  color="text.primary"
                  fontWeight="regular"
                  borderRadius="lg"
                  borderColor="border.primary"
                  onClick={openSortModal}
                >
                  <Icon as={ArrowUpDown} boxSize="16px" /> Sort
                  <AnimatePresence>
                    {activeSortCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        style={{ marginLeft: "4px" }}
                      >
                        <Center
                          bg="brand.primary"
                          color="white"
                          boxSize="20px"
                          borderRadius="full"
                          fontSize="12px"
                          fontWeight="bold"
                        >
                          {activeSortCount}
                        </Center>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: "0px",
                        marginTop: "6px",
                        zIndex: 20,
                      }}
                    >
                      <Box
                        w="420px"
                        bg="bg.primary"
                        border="1px solid"
                        borderColor="border.primary"
                        borderRadius="2xl"
                        shadow="xl"
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          p="16px"
                          borderBottom="1px solid"
                          borderColor="border.primary"
                        >
                          <Text
                            fontSize="18px"
                            fontWeight="bold"
                            color="text.primary"
                          >
                            Sort
                          </Text>
                          <Flex
                            as="button"
                            onClick={() => setIsSortOpen(false)}
                            bg="border.primary"
                            w="28px"
                            h="28px"
                            borderRadius="lg"
                            align="center"
                            justify="center"
                            color="text.primary"
                            _hover={{ bg: "gray.200" }}
                            transition="all 0.2s"
                          >
                            <Icon as={X} boxSize="16px" />
                          </Flex>
                        </Flex>

                        <Flex direction="column" p="16px" gap="12px">
                          <Flex justify="space-between" align="center">
                            <Text fontSize="14px" color="text.secondary">
                              Type
                            </Text>
                            <Text
                              fontSize="14px"
                              color="blue.500"
                              cursor="pointer"
                              onClick={() => {
                                setDraftSortField("Student ID");
                                setDraftSortOrder("");
                              }}
                            >
                              Clear
                            </Text>
                          </Flex>

                          <SimpleGrid columns={2} gap="12px">
                            <Box position="relative">
                              <Flex
                                justify="space-between"
                                align="center"
                                border="1px solid"
                                borderColor="border.primary"
                                borderRadius="xl"
                                px="12px"
                                h="46px"
                                cursor="pointer"
                                onClick={() =>
                                  setActiveSortDropdown(
                                    activeSortDropdown === "field"
                                      ? null
                                      : "field",
                                  )
                                }
                              >
                                <Text
                                  fontSize="14px"
                                  color="text.primary"
                                  fontWeight="medium"
                                >
                                  {draftSortField || "Select field"}
                                </Text>
                                <Icon
                                  as={ChevronDown}
                                  boxSize="16px"
                                  color="text.secondary"
                                />
                              </Flex>

                              {activeSortDropdown === "field" && (
                                <>
                                  <Box
                                    position="fixed"
                                    top="0"
                                    left="0"
                                    w="100vw"
                                    h="100vh"
                                    zIndex={25}
                                    onClick={() => setActiveSortDropdown(null)}
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                      position: "absolute",
                                      top: "100%",
                                      left: 0,
                                      marginTop: "8px",
                                      zIndex: 30,
                                      width: "100%",
                                    }}
                                  >
                                    <Flex
                                      direction="column"
                                      bg="bg.primary"
                                      border="1px solid"
                                      borderColor="border.primary"
                                      borderRadius="xl"
                                      p="6px"
                                      boxShadow="lg"
                                      gap="4px"
                                    >
                                      {sortFields.map((field) => (
                                        <Box
                                          key={field}
                                          px="12px"
                                          py="10px"
                                          borderRadius="lg"
                                          cursor="pointer"
                                          _hover={{ bg: "#f1f1f1" }}
                                          onClick={() => {
                                            setDraftSortField(field);
                                            setActiveSortDropdown(null);
                                          }}
                                        >
                                          <Text
                                            fontSize="14px"
                                            color="text.primary"
                                          >
                                            {field}
                                          </Text>
                                        </Box>
                                      ))}
                                    </Flex>
                                  </motion.div>
                                </>
                              )}
                            </Box>

                            <Box position="relative">
                              <Flex
                                justify="space-between"
                                align="center"
                                border="1px solid"
                                borderColor="border.primary"
                                borderRadius="xl"
                                px="12px"
                                h="46px"
                                cursor="pointer"
                                onClick={() =>
                                  setActiveSortDropdown(
                                    activeSortDropdown === "order"
                                      ? null
                                      : "order",
                                  )
                                }
                              >
                                <Text
                                  fontSize="14px"
                                  color={
                                    draftSortOrder
                                      ? "text.primary"
                                      : "text.secondary"
                                  }
                                >
                                  {draftSortOrder || "Choose here"}
                                </Text>
                                <Icon
                                  as={ChevronDown}
                                  boxSize="16px"
                                  color="text.secondary"
                                />
                              </Flex>

                              {activeSortDropdown === "order" && (
                                <>
                                  <Box
                                    position="fixed"
                                    top="0"
                                    left="0"
                                    w="100vw"
                                    h="100vh"
                                    zIndex={25}
                                    onClick={() => setActiveSortDropdown(null)}
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                      position: "absolute",
                                      top: "100%",
                                      left: 0,
                                      marginTop: "8px",
                                      zIndex: 30,
                                      width: "100%",
                                    }}
                                  >
                                    <Flex
                                      direction="column"
                                      bg="bg.primary"
                                      border="1px solid"
                                      borderColor="border.primary"
                                      borderRadius="xl"
                                      p="6px"
                                      boxShadow="lg"
                                      gap="4px"
                                    >
                                      {sortOrders.map((order) => (
                                        <Box
                                          key={order}
                                          px="12px"
                                          py="10px"
                                          borderRadius="lg"
                                          cursor="pointer"
                                          _hover={{ bg: "#f1f1f1" }}
                                          onClick={() => {
                                            setDraftSortOrder(order);
                                            setActiveSortDropdown(null);
                                          }}
                                        >
                                          <Text
                                            fontSize="14px"
                                            color="text.primary"
                                          >
                                            {order}
                                          </Text>
                                        </Box>
                                      ))}
                                    </Flex>
                                  </motion.div>
                                </>
                              )}
                            </Box>
                          </SimpleGrid>
                        </Flex>

                        <Flex
                          justify="space-between"
                          align="center"
                          p="16px"
                          borderTop="1px solid"
                          borderColor="border.primary"
                        >
                          <Button
                            onClick={handleResetSort}
                            variant="outline"
                            borderColor="border.primary"
                            color="text.primary"
                            borderRadius="lg"
                            h="36px"
                            px="16px"
                            fontSize="13px"
                            fontWeight="medium"
                          >
                            Reset
                          </Button>
                          <GlossyButton
                            onClick={handleApplySort}
                            colorScheme="pink"
                            h="36px"
                            px="16px"
                            borderRadius="lg"
                            fontSize="14px"
                            fontWeight="medium"
                          >
                            Apply
                          </GlossyButton>
                        </Flex>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
              <Flex bg="border.primary" h="36px" p="4px" borderRadius="lg">
                <Button
                  h="28px"
                  variant={view === "list" ? "solid" : "ghost"}
                  bg={view === "list" ? "bg.primary" : "transparent"}
                  color="text.primary"
                  shadow={view === "list" ? "sm" : "none"}
                  borderRadius="md"
                  px="8px"
                  onClick={() => setView("list")}
                >
                  <Icon as={ListIcon} boxSize="14px" /> List
                </Button>
                <Button
                  h="28px"
                  variant={view === "card" ? "solid" : "ghost"}
                  bg={view === "card" ? "bg.primary" : "transparent"}
                  color="text.primary"
                  shadow={view === "card" ? "sm" : "none"}
                  borderRadius="md"
                  px="8px"
                  onClick={() => setView("card")}
                >
                  <Icon as={LayoutGrid} boxSize="14px" /> Card
                </Button>
              </Flex>
            </HStack>
          </MotionFlex>

          <MotionFlex
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            flex="1"
            direction="column"
            px="24px"
            pb="24px"
            overflow="hidden"
          >
            <Flex
              direction="column"
              bg="bg.primary"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.primary"
              overflow="hidden"
              flex="1"
            >
              <Box flex="1" overflowY="auto">
                {view === "list" ? (
                  <Table.Root size="sm" variant="line">
                    <Table.Header>
                      <Table.Row bg="bg.muted">
                        <Table.ColumnHeader py="12px" px="16px" w="1%">
                          <Checkbox.Root
                            defaultChecked
                            size="sm"
                            key="sm"
                            checked={
                              isIndeterminate ? "indeterminate" : isAllSelected
                            }
                            onCheckedChange={toggleSelectAll}
                            colorPalette="pink"
                            variant="solid"
                            cursor="pointer"
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control borderRadius="sm">
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                          </Checkbox.Root>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="16px"
                          fontSize="13px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                        >
                          Student ID
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="16px"
                          fontSize="13px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                        >
                          <HStack gap="8px">
                            <Icon as={Menu} boxSize="16px" />
                            <Text>Name</Text>
                          </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="16px"
                          fontSize="13px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                        >
                          <HStack gap="8px">
                            <Icon as={BookText} boxSize="16px" />
                            <Text>Class</Text>
                          </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="16px"
                          fontSize="13px"
                          fontWeight="medium"
                          color="text.primary"
                          borderRight="1px solid"
                          borderColor="border.primary"
                        >
                          <HStack gap="8px">
                            <Icon as={ListChecks} boxSize="16px" />
                            <Text>Status</Text>
                          </HStack>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                          py="12px"
                          px="16px"
                          fontSize="13px"
                          fontWeight="medium"
                          color="text.primary"
                          w="1%"
                          whiteSpace="nowrap"
                        >
                          <HStack gap="8px">
                            <Icon as={CheckLine} boxSize="16px" />
                            <Text>Action</Text>
                          </HStack>
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {filteredStudents.map((student, i) => (
                        <Table.Row
                          key={i}
                          _hover={{ bg: "bg.muted" }}
                          transition="all 0.2s"
                        >
                          <Table.Cell py="12px" px="16px" w="1%">
                            <Checkbox.Root
                              defaultChecked
                              size="sm"
                              key="sm"
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={() =>
                                toggleSelectStudent(student.id)
                              }
                              colorPalette="pink"
                              variant="solid"
                              cursor="pointer"
                            >
                              <Checkbox.HiddenInput />
                              <Checkbox.Control borderRadius="sm">
                                <Checkbox.Indicator />
                              </Checkbox.Control>
                            </Checkbox.Root>
                          </Table.Cell>
                          <Table.Cell
                            py="12px"
                            px="16px"
                            fontSize="14px"
                            color="text.primary"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            {student.id}
                          </Table.Cell>
                          <Table.Cell
                            py="12px"
                            px="16px"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            <HStack gap="12px">
                              <Avatar.Root size="2xs">
                                <Avatar.Image src={student.avatar} />
                                <Avatar.Fallback name={student.name} />
                              </Avatar.Root>
                              <Text
                                fontSize="14px"
                                fontWeight="regular"
                                color="text.primary"
                              >
                                {student.name}
                              </Text>
                            </HStack>
                          </Table.Cell>
                          <Table.Cell
                            py="12px"
                            px="16px"
                            fontSize="14px"
                            color="text.primary"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            {student.class}
                          </Table.Cell>
                          <Table.Cell
                            py="12px"
                            px="16px"
                            borderRight="1px solid"
                            borderColor="border.primary"
                          >
                            <Badge
                              bg="green.100"
                              color="green.700"
                              px="12px"
                              py="4px"
                              borderRadius="full"
                              fontSize="12px"
                              fontWeight="semibold"
                            >
                              {student.status}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell
                            py="12px"
                            px="16px"
                            w="1%"
                            whiteSpace="nowrap"
                          >
                            <HStack gap="8px" justify="flex-end">
                              <Button
                                size="xs"
                                variant="outline"
                                borderColor="border.primary"
                                borderRadius="lg"
                                color="text.primary"
                                px="2"
                                minW="24px"
                              >
                                <Icon as={MoreHorizontal} boxSize="16px" />
                              </Button>
                              <Button
                                size="xs"
                                variant="outline"
                                borderColor="border.primary"
                                borderRadius="lg"
                                px="12px"
                              >
                                <Text> View </Text>{" "}
                                <Icon as={ChevronRight} boxSize="14px" />
                              </Button>
                            </HStack>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                ) : (
                  <Box p="12px">
                    <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap="16px">
                      {filteredStudents.map((student, i) => (
                        <Box
                          key={i}
                          border="1px solid"
                          borderColor="border.primary"
                          borderRadius="xl"
                          p="16px"
                          _hover={{
                            shadow: "sm",
                            borderColor: "brand.primary",
                          }}
                          transition="all 0.2s"
                        >
                          <HStack align="flex-start" gap="16px" mb="16px">
                            <Avatar.Root size="lg">
                              <Avatar.Image src={student.avatar} />
                              <Avatar.Fallback name={student.name} />
                            </Avatar.Root>
                            <VStack align="start" gap="4px" flex="1">
                              <Text
                                fontSize="16px"
                                fontWeight="semibold"
                                color="text.primary"
                                lineClamp={1}
                              >
                                {student.name}
                              </Text>
                              <Badge
                                bg="green.100"
                                color="green.700"
                                px="8px"
                                py="2px"
                                borderRadius="full"
                                fontSize="12px"
                                fontWeight="semibold"
                              >
                                {student.status}
                              </Badge>
                            </VStack>
                          </HStack>

                          <HStack
                            gap="12px"
                            bg="bg.muted"
                            p="12px"
                            borderRadius="xl"
                            w="full"
                          >
                            <VStack align="start" gap="4px">
                              <Text fontSize="14px" color="text.secondary">
                                Student ID
                              </Text>
                              <Flex
                                bg="bg.primary"
                                border="1px solid"
                                borderColor="border.primary"
                                borderRadius="lg"
                                px="12px"
                                py="4px"
                                w="fit-content"
                                align="center"
                              >
                                <Text
                                  fontSize="14px"
                                  fontWeight="regular"
                                  color="text.primary"
                                >
                                  {student.id}
                                </Text>
                              </Flex>
                            </VStack>

                            <VStack align="start" gap="4px" flex="1">
                              <Text fontSize="14px" color="text.secondary">
                                Class
                              </Text>
                              <HStack
                                bg="bg.primary"
                                border="1px solid"
                                borderColor="border.primary"
                                borderRadius="lg"
                                px="12px"
                                py="4px"
                                w="fit-content"
                                gap="8px"
                              >
                                <Icon
                                  as={BookText}
                                  boxSize="14px"
                                  color="text.primary"
                                />
                                <Text
                                  fontSize="14px"
                                  fontWeight="regular"
                                  color="text.primary"
                                >
                                  {student.class}
                                </Text>
                              </HStack>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
              </Box>

              <Flex
                justify="space-between"
                align="center"
                px="16px"
                py="12px"
                borderTop="1px solid"
                borderColor="border.primary"
                bg="bg.muted"
                flexShrink={0}
              >
                <Text fontSize="13px" color="text.primary">
                  1-10 of 396 items
                </Text>

                <HStack gap="4px">
                  <Button
                    size="xs"
                    variant="ghost"
                    color="text.secondary"
                    fontSize="13px"
                  >
                    « First
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    color="text.secondary"
                    fontSize="13px"
                  >
                    ‹ Back
                  </Button>
                  <Square
                    size="24px"
                    bg="#F165AE"
                    color="white"
                    borderRadius="md"
                    fontSize="13px"
                    fontWeight="medium"
                  >
                    1
                  </Square>
                  <Square
                    size="24px"
                    bg="transparent"
                    color="text.primary"
                    borderRadius="md"
                    fontSize="13px"
                  >
                    2
                  </Square>
                  <Square
                    size="24px"
                    bg="transparent"
                    color="text.primary"
                    borderRadius="md"
                    fontSize="13px"
                  >
                    3
                  </Square>
                  <Square
                    size="24px"
                    bg="transparent"
                    color="text.primary"
                    borderRadius="md"
                    fontSize="13px"
                  >
                    4
                  </Square>
                  <Text fontSize="13px" color="text.primary" mx="4px">
                    ...
                  </Text>
                  <Square
                    size="24px"
                    bg="transparent"
                    color="text.primary"
                    borderRadius="md"
                    fontSize="13px"
                  >
                    10
                  </Square>
                  <Button
                    size="xs"
                    variant="ghost"
                    color="text.primary"
                    fontSize="13px"
                  >
                    Next ›
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    color="text.primary"
                    fontSize="13px"
                  >
                    Last »
                  </Button>
                </HStack>

                <Flex align="center" gap="8px">
                  <Button
                    size="xs"
                    variant="outline"
                    bg="bg.primary"
                    borderColor="border.primary"
                    borderRadius="md"
                  >
                    10 <Icon as={ChevronDown} boxSize="14px" ml="4px" />
                  </Button>
                  <Text fontSize="13px" color="text.primary">
                    Items per page
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </MotionFlex>
        </Flex>
      </MotionFlex>
    </Flex>
  );
}
