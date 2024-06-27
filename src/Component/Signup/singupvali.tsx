import * as  Yup from 'yup';

export const signupvali = Yup.object({
    email: Yup.string().email("Enter the valid email").required("Enter the email"),
    mobileno: Yup.number().required("Enter the mobile number"),
    password: Yup.string().min(8).required("Please enter the password"),
    cpassword: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match").required("Please enter the password")
 })
