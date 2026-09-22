"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  VStack,
  HStack,
  Center,
} from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LayoutGrid,
  Lock,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  PieChart,
  Settings,
  UserCheck,
  Users,
  ChevronsUpDown,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  hasChevron?: boolean;
  badge?: number;
};

const sections: { title: string; items: NavItem[] }[] = [
  {
    title: "Main",
    items: [
      { label: "Overview", icon: LayoutGrid, active: true },
      { label: "Students", icon: Users },
      { label: "Classes & Curriculum", icon: BookOpen },
      { label: "Staff & Teachers", icon: UserCheck },
    ],
  },
  {
    title: "Financial Management",
    items: [
      { label: "Transactions", icon: CreditCard },
      { label: "Budget Management", icon: PieChart, hasChevron: true },
      { label: "Approvals", icon: CheckCircle, badge: 4 },
    ],
  },
  {
    title: "Asset & Resources",
    items: [{ label: "Inventory Management", icon: Package }],
  },
  {
    title: "Settings",
    items: [
      { label: "Settings", icon: Settings },
      { label: "Users & Permissions", icon: Lock },
      { label: "Help", icon: CircleHelp },
    ],
  },
];

function NavButton({
  item,
  isCollapsed,
}: {
  item: NavItem;
  isCollapsed: boolean;
}) {
  return (
    <Box
      as="button"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="10px"
      py="8px"
      borderRadius="xl"
      transition="all 0.2s"
      bg={item.active ? "brand.primary" : "transparent"}
      color={item.active ? "white" : "text.primary"}
      _hover={{
        bg: item.active ? "brand.primary" : "gray.200",
      }}
      role="group"
      title={isCollapsed ? item.label : undefined}
    >
      <HStack gap="12px" minW={0}>
        <Icon
          as={item.icon}
          boxSize="18px"
          strokeWidth={item.active ? 2 : 1.5}
          color={item.active ? "white" : "text.secondary"}
          _groupHover={{ color: item.active ? "white" : "gray.700" }}
          flexShrink={0}
        />
        {!isCollapsed && (
          <Text fontSize="14px" fontWeight="400" truncate>
            {item.label}
          </Text>
        )}
      </HStack>

      {!isCollapsed && (
        <Box>
          {item.badge ? (
            <Center
              h="20px"
              minW="20px"
              bg="bg.primary"
              color="text.primary"
              borderRadius="full"
              border="1px solid"
              borderColor="border.primary"
              fontSize="12px"
              fontWeight="bold"
              px="6px"
            >
              {item.badge}
            </Center>
          ) : item.hasChevron ? (
            <Icon as={ChevronRight} boxSize="16px" color="text.secondary" />
          ) : null}
        </Box>
      )}
    </Box>
  );
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Flex
      as="aside"
      direction="column"
      h="100vh"
      w={isCollapsed ? "72px" : "260px"}
      bg="bg.muted"
      transition="width 0.4s ease-in-out"
      flexShrink={0}
    >
      <Flex
        align="center"
        justify={isCollapsed ? "center" : "space-between"}
        px="16px"
        pt="24px"
        pb="16px"
        borderBottom="1px solid"
        borderColor="border.primary"
      >
        <HStack gap="12px" display={isCollapsed ? "none" : "flex"}>
          <Image
            src="/logo-arkana.png"
            alt="Arkana Logo"
            boxSize="32px"
            objectFit="contain"
          />
          <Text
            fontSize="24px"
            fontWeight="bold"
            letterSpacing="-0.03em"
            color="text.primary"
          >
            Arkana
          </Text>
        </HStack>
        <Flex
          as="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle menu"
          h="28px"
          w="28px"
          align="center"
          justify="center"
          borderRadius="md"
          border="1px solid"
          borderColor="border.primary"
          bg="bg.primary"
          color="text.secondary"
          transition="background 0.2s"
          _hover={{ bg: "bg.muted" }}
          flexShrink={0}
        >
          <Icon
            as={isCollapsed ? PanelLeftOpen : PanelLeftClose}
            boxSize="16px"
          />
        </Flex>
      </Flex>

      <Box
        flex="1"
        overflowY="auto"
        py="24px"
        px="16px"
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            background: "bg.muted",
            borderRadius: "24px",
          },
        }}
      >
        <VStack align="stretch" gap="16px">
          {sections.map((section, index) => (
            <Box
              key={section.title}
              pt={index > 0 ? "16px" : "0"}
              borderTop={index > 0 ? "1px solid" : "none"}
              borderColor="border.primary"
            >
              {!isCollapsed && (
                <Text
                  mb="4px"
                  px="10px"
                  fontSize="12px"
                  fontWeight="400"
                  color="text.secondary"
                >
                  {section.title}
                </Text>
              )}
              <VStack align="stretch" gap="0px">
                {section.items.map((item) => (
                  <NavButton
                    key={item.label}
                    item={item}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>

      <Box p="12px" borderTop="1px solid" borderColor="border.primary">
        <Flex
          as="button"
          w="full"
          align="center"
          justify={isCollapsed ? "center" : "space-between"}
          p="6px"
          borderRadius="xl"
          transition="background 0.2s"
          _hover={{ bg: "gray.200" }}
        >
          <HStack gap="12px">
            <Image
              src="https://i.pravatar.cc/150?u=dadang"
              alt="Dadang Jordan"
              boxSize="36px"
              borderRadius="full"
              objectFit="cover"
              border="1px solid"
              borderColor="border.primary"
              flexShrink={0}
            />
            {!isCollapsed && (
              <Box textAlign="left">
                <Text
                  fontSize="14px"
                  fontWeight="semibold"
                  lineHeight="tight"
                  color="gray.900"
                >
                  Dadang Jordan
                </Text>
                <Text fontSize="12px" color="text.secondary">
                  Administrator
                </Text>
              </Box>
            )}
          </HStack>
          {!isCollapsed && (
            <Icon as={ChevronsUpDown} boxSize="16px" color="text.secondary" />
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
