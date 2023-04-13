import React from "react";
import {
  Box,
  HStack,
  Icon,
  Text,
  Button,
  AddIcon,
  Image,
  Heading,
  Stack,
  IconButton,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";

export default function Menu({ navigation }) {
  const [clickable, setClickable] = React.useState(false);

  return (
    <Box padding="24px" backgroundColor="white">
      <HStack space="20">
        <Image
          size={75}
          borderRadius={100}
          marginTop="-2"
          marginBottom="5"
          marginLeft="2"
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
        />
        <Text bold marginTop="4">
          Bhavesh Yeole
        </Text>
      </HStack>
      <HStack
        marginBottom="30px"
        shadow={6}
        padding="8px"
        borderWidth="2"
        paddingLeft="16px"
        alignItems="center"
        rounded="6px"
        borderColor="trueGray.200"
      >
        <Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="xl" ml="-1">
                The Garden City
              </Heading>
            </Stack>

            <Text fontSize="lg" bold>
              {/* <SpendCard></SpendCard> */}
            </Text>
          </Stack>
        </Box>
        <IconButton
          icon={<Icon as={MaterialIcons} name="arrow-forward" />}
          width="8"
          height="8"
          rounded="100%"
          variant="subtle"
          colorScheme="gray"
          shadow={2}
          marginLeft="38"
          // alignItems="center"
          // justifyContent="center"
        ></IconButton>
      </HStack>
      <HStack
        marginBottom="15px"
        shadow={6}
        padding="8px"
        borderWidth="2"
        paddingLeft="16px"
        alignItems="center"
        rounded="6px"
        borderColor="trueGray.200"
      >
        <AddIcon marginRight="16px"></AddIcon>
        <Box>
          <Text fontWeight="500">Settings</Text>
          <Text>This is the text for settings</Text>
        </Box>
      </HStack>
      <HStack
        marginBottom="15px"
        shadow={6}
        padding="8px"
        borderWidth="2"
        paddingLeft="16px"
        alignItems="center"
        rounded="6px"
        borderColor="trueGray.200"
      >
        <Box marginRight="16px">
          <MaterialIcons size={30} name="history" />
        </Box>
        <Box>
          <Text fontWeight="500">Transactions</Text>
          <Text>This is the text for settings</Text>
        </Box>
      </HStack>
      <HStack
        marginBottom="15px"
        shadow={6}
        padding="8px"
        borderWidth="2"
        paddingLeft="16px"
        alignItems="center"
        rounded="6px"
        borderColor="trueGray.200"
      >
        <Box marginRight="16px">
          <MaterialIcons size={30} name="settings" />
        </Box>
        <Box>
          <Text fontWeight="500">Settings</Text>
          <Text>This is the text for settings</Text>
        </Box>
      </HStack>
      <HStack>
        <Button
          variant="outline"
          marginBottom="15px"
          shadow={3}
          width="364"
          height="66"
          borderWidth="2"
          borderColor="black"
          paddingLeft="16px"
          alignItems="center"
          rounded="6px"
          marginTop="5"
        >
          Logout
        </Button>
      </HStack>
    </Box>
  );
}
