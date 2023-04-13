import {
  Text,
  Box,
  Heading,
  HStack,
  Pressable,
  Center,
  Skeleton,
} from "native-base";
import { useEffect, useState } from "react";
import { getStore } from "../libraries/store";

export default function Header(props) {
  var [email, setEmail] = useState(null);
  var [isEmailLoaded, setIsEmailLoaded] = useState(false);
  var [avatar, setAvatar] = useState(null);
  
  useEffect(() => {
    async function fetchEmail() {
      let user = await getStore("user");
      console.log(user);
      if (user.email) {
        setEmail(user.email);
        setAvatar(Array.from(user.email)[0]);
        setIsEmailLoaded(true);
      }
    }
    fetchEmail();
  }, []);

  return (
    <Box>
      <HStack space={3} justifyContent="space-between">
        <Skeleton h="10" isLoaded={isEmailLoaded}>
          <Heading numberOfLines={1}>Hi, {email}</Heading>
        </Skeleton>

        <Pressable rounded="50" w="32px" h="32px" bg="coolGray.100">
          <Center w="32px" h="32px">
            <Skeleton h="10" isLoaded={isEmailLoaded}>
              <Text textTransform={"uppercase"}>{avatar}</Text>
            </Skeleton>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
