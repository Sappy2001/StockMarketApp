import * as  Yup from 'yup';

export const loginvali = Yup.object({
    // name: Yup.string().min(5).required("Please enter the name"),
    email: Yup.string().email("Enter the valid email").required("Enter the email"),
    password: Yup.string().min(8).required("Please enter the password"),
 })
