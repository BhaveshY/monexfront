import { ChevronLeftIcon, Button, Select, Text, Alert, TextArea, Input, Box, Pressable, HStack, AddIcon, Badge, SmallCloseIcon } from "native-base";
import { useToast } from 'native-base';
import { useState } from "react";
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import useAPI from "../hooks/useAPI";
import { getStore } from "../libraries/store";

export default function AddTransaction({ navigation }) {
    const toast = useToast();
    const transactionSchema = yup.object().shape({
        amount: yup.number().required('Amount is required').positive(),
        transactionType: yup.number().required('Select a transaction type'),
        memo: yup.string(),
        category: yup.number(),
    });
    const additionalTags = ['Subscription', 'Rent', 'Gaming'];
    const [selectedAdditionalTags, setSelectedAdditionalTags] = useState([])
    const { call } = useAPI('https://monex-server.vercel.app/transaction')
    function handleAdditionalTagsChange(itemValue) {
        let tags = [...selectedAdditionalTags]
        tags.push(itemValue)
        setSelectedAdditionalTags(tags)
    }
    function handleAdditionalTagBadgePress(value) {
        let tags = [...selectedAdditionalTags]
        tags.splice(tags.indexOf(value), 1);
        setSelectedAdditionalTags(tags)
    }

    async function createTransaction(values) {
        toast.show({
            render: () => {
                return <Alert variant="subtle" bg="#BFDBFE" >
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text >
                            Transaction added!
                        </Text>
                    </HStack>
                </Alert>;
            }
        });
        console.log(values)
        values.type = values.transactionType

        let user = await getStore('user');
        values.user = user.userId
        let res = await call(values)
        if (res.success) {
            toast.show({
                render: () => {
                    return <Alert variant="subtle" bg="#BFDBFE" >
                        <HStack space={2} flexShrink={1} alignItems="center">
                            <Alert.Icon />
                            <Text >
                                Transaction added!
                            </Text>
                        </HStack>
                    </Alert>;
                }
            });
        }
    }



    return (
        <Box bg="#fff" h="100%">
            <Box padding="24px">

                <HStack alignItems="center">
                    <Button rounded="50" padding="0" onPress={() => navigation.goBack()} variant="ghost">
                        <ChevronLeftIcon ></ChevronLeftIcon>
                    </Button>
                    <Text fontSize={'20px'} marginLeft="24px">Add transaction</Text>
                </HStack>


                <Formik initialValues={{ amount: '', transactionType: '', memo: '', category: '' }} onSubmit={createTransaction} validationSchema={transactionSchema}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <Box>
                            <Box mt='24px'>
                                <Text fontSize="16px">Amount</Text>
                                <Input keyboardType="numeric" mt='12px'
                                    onChangeText={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                    value={values.amount}
                                    size="md" variant='outline' placeholder='Amount'></Input>
                                <Box color="red.500" mt='2px'>
                                    <ErrorMessage name="amount">
                                    { msg => <Text>{msg}</Text> }
                                    </ErrorMessage>
                                </Box>
                            </Box>

                            <Box mt='24px'>
                                <Text fontSize="16px">Transaction Type</Text>
                                <Select mt='12px' accessibilityLabel="Transaction Type" placeholder="Transaction Type"
                                    onValueChange={handleChange('transactionType')}
                                    onBlur={handleBlur('transactionType')}
                                    value={values.transactionType}>
                                    <Select.Item label="Credit" value="1" />
                                    <Select.Item label="Debit" value="0" />
                                </Select>
                                <Box color="red.500" mt='2px'>
                                <ErrorMessage name="transactionType">
                                    { msg => <Text>{msg}</Text> }
                                    </ErrorMessage>
                               
                                </Box>
                            </Box>

                            <Box mt='24px'>
                                <Text fontSize="16px">Memo</Text>
                                <TextArea
                                    onChangeText={handleChange('memo')}
                                    onBlur={handleBlur('memo')}
                                    value={values.memo}
                                    mt='12px' h={20} placeholder="e.g. Milk" />
                                <Box color="red.500" mt='2px'>
                                <ErrorMessage name="memo">
                                    { msg => <Text>{msg}</Text> }
                                    </ErrorMessage>
                                </Box>
                            </Box>

                            <Box mt='24px'>
                                <Text fontSize="16px">Category</Text>
                                <Select mt='12px' accessibilityLabel="Category" placeholder="Category"
                                    onValueChange={handleChange('category')}
                                    onBlur={handleBlur('category')}
                                    value={values.category} >
                                    <Select.Item label="Food" value="0" />
                                    <Select.Item label="Investment" value="1" />
                                    <Select.Item label="Travelling" value="2" />
                                    <Select.Item label="Entertainment" value="3" />
                                </Select>
                                <Box color="red.500" mt='2px'>
                                <ErrorMessage name="category">
                                    { msg => <Text>{msg}</Text> }
                                    </ErrorMessage>
                                </Box>
                            </Box>


                            <Box mt='24px'>
                                <Text fontSize="16px">Additional Tags</Text>
                                <HStack mt="12px">
                                    {
                                        selectedAdditionalTags.map(key =>
                                            <Pressable key={key} onPress={() => handleAdditionalTagBadgePress(key)}>
                                                <Badge rounded="50" mr="2" alignSelf="center" variant="solid">
                                                    <HStack alignItems="center">
                                                        <Text color="white">{key} </Text> <SmallCloseIcon color="white" />
                                                    </HStack>
                                                </Badge>
                                            </Pressable>
                                        )
                                    }
                                </HStack>
                                <Select mt='12px' accessibilityLabel="Transaction Type" placeholder="Additional Tags"
                                    onValueChange={handleAdditionalTagsChange} >
                                    {additionalTags && additionalTags.filter(x => !selectedAdditionalTags.includes(x)).map(key =>
                                        <Select.Item label={key} value={key} key={key} />
                                    )}

                                </Select>
                            </Box>

                            <Button bg="#2563EB" mt='24px' onPress={handleSubmit} endIcon={<AddIcon />}> Add Transaction  </Button>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Box >
    )
}