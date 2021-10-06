import * as yup from 'yup';

const loginSchema = yup.object().shape({
    userName: yup.string().required("Field is required !"),
    passWord: yup.string().required("Field is required !"),
});


const defaultValues = {
    userName: '',
    passWord: '',
}
export { loginSchema, defaultValues };