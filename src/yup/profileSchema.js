import * as yup from 'yup';

const profileSchema = yup.object().shape({
    avatar: yup.array().required("Field is required !"),
    name: yup.string().required("Field is required !"),
    address: yup.string().required("Field is required !"),
    phone: yup.string().required("Field is required !"),
    email: yup.string().required("Field is required !"),
});



export { profileSchema };