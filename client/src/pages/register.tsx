import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper";
import React from "react";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
interface registerProps {}
import { useRouter } from "next/router";

const Register: React.FC<registerProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          // ERROR HANDLING
          const response = await register(values);
          if (response.data?.register.errors) {
            // if there is an error use toErrorMap to format shape of error to match that from graphql
            setErrors(toErrorMap(response.data.register.errors));
            // if no error and you get the user as a response push to home page
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
