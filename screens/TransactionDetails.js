import {
  Text,
  Box,
  HStack,
  Button,
  ChevronLeftIcon,
  VStack,
  Badge,
  Divider,
  AlertDialog,
  Alert,
  useToast,
} from 'native-base';
import moment from 'moment';
import {useState} from 'react';
import post from '../libraries/post';
import {getStore} from '../libraries/store';
import {StyleSheet} from 'react-native';

export default function TransactionDetails({navigation, route}) {
  const transaction = route.params.transaction;
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const onClose = async () => {
    async function getUserId() {
      let user = await getStore('user');
      return user.userId;
    }
    var userId = await getUserId();
    var deleted = await post(
      `https://monex-server.vercel.app/transaction/delete`,
      {transactionId: transaction._id, userId},
    );
    deleted = await deleted.json();
    if (deleted.success && deleted.result.deletedCount) {
      toast.show({
        render: () => {
          return (
            <Alert variant="subtle" bg="#BFDBFE">
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text>Transaction deleted!</Text>
              </HStack>
            </Alert>
          );
        },
      });
      navigation.navigate('Home');
    } else {
      toast.show({
        render: () => {
          return (
            <Alert variant="subtle" status={'error'}>
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text>Error deleting transaction.</Text>
              </HStack>
            </Alert>
          );
        },
      });
    }
  };
  return (
    <Box bg="#fff" h="100%" padding="24px">
      <HStack alignItems="center">
        <Button
          rounded="50"
          padding="0"
          onPress={() => navigation.goBack()}
          variant="ghost">
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Text fontSize={'20px'} marginLeft="24px">
          Transaction Details
        </Text>
      </HStack>
      <VStack mt="24px" alignItems={'center'}>
        <Text fontSize={'36px'}>₹{transaction.amount.$numberDecimal}</Text>
        <Badge mt="24px" colorScheme={transaction.type ? 'success' : 'error'}>
          {transaction.type ? 'Credited' : 'Debited'}
        </Badge>
        <Divider width={'50%'} mt="24px"></Divider>
        <Text mt="24px">
          {moment(transaction.createdAt).format('DD MMM YYYY HH:mm A')}
        </Text>
      </VStack>
      <Box
        mt="24px"
        padding={'16px'}
        rounded="5"
        style={styles.descriptionStyle}>
        <Text fontWeight={'medium'}>Description</Text>
        <Text color={'#404040'}>{transaction.memo}</Text>
      </Box>
      <HStack
        left="0"
        right="0"
        padding="24px"
        position={'absolute'}
        bottom="0">
        <Button
          variant={'outline'}
          borderColor="#DC2626"
          colorScheme="error"
          flexGrow={'1'}
          marginRight="8px"
          onPress={() => setIsOpen(true)}>
          Delete
        </Button>
        <Button
          variant={'outline'}
          borderColor="#000"
          colorScheme="black"
          flexGrow={'1'}
          marginLeft="8px"
          onPress={() => {
            navigation.navigate('EditTransaction', {transaction: transaction});
          }}>
          <Text>Edit</Text>
        </Button>
      </HStack>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>Delete</AlertDialog.Header>
          <AlertDialog.Body>Are you sure you want to delete ?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
}

const styles = StyleSheet.create({
  descriptionStyle: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
  },
});
