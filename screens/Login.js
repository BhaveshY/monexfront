import React, { } from "react";
import { Input,Icon,Pressable,Button,Box,Text,Link, } from "native-base";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import * as yup from 'yup';
import { ErrorMessage, Formik } from 'formik'
import post from '../libraries/post'
import {setStore} from "../libraries/store";
import { auth } from "../firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [show, setShow] = React.useState(false);

  let userLoginSchema = yup.object().shape({
    password: yup.string().required("Please enter a password").min(6),
    email: yup.string().email().required("Email is required"),
  });


  async function login(values) {
    var fbObject = await signInWithEmailAndPassword(auth, values.email, values.password);
    if(!fbObject.user) { 
      console.log('Error'); 
      return
    }
    var userId = fbObject.user.uid;
      var user = {
        email : values.email,
        userId
      }
      await setStore('userLoggedIn', true)
      await setStore('user',user)
      navigation.navigate('HomeTabs')
    }
  

  return (
    <Box bg="#2563EB" h="100%" display="flex" flexDirection="column">
      <Text margin="24px" fontSize="28px" fontWeight="medium" color="#FAFAFA">Sign In</Text>
      <Box h="100%" bg="#FAFAFA" padding="24px" borderTopLeftRadius="25px" borderTopRightRadius="25px">
        <Formik onSubmit={login} initialValues={{  email: '', password: ''}} validationSchema={userLoginSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <Box  h="100%">
              <Box>
                <Input
                  borderColor={errors.email ? 'red.500' : 'muted.300'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                />
                <Box mt="2px" fontSize="sm" color="red.400">
                  <ErrorMessage name="email" />
                </Box>
              </Box>

              <Box mt="16px">
                <Input
                  borderColor={errors.password ? 'red.500' : 'muted.300'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                  placeholder="Password"
                />
                <Box mt="2px" fontSize="sm" color="red.400">
                  <ErrorMessage name="password" />
                </Box>
              </Box>

              <Button mt="24px" bg="#2563EB" onPress={handleSubmit}>Login</Button>

              <Link mt="24px" onPress={() => navigation.navigate('Registration')}>Register</Link>

            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
