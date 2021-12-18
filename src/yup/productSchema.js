import * as yup from 'yup';

const productSchema = yup.object().shape({
    name: yup.string().required("Field is required !"),
    author: yup.string().required("Field is required !"),
    price: yup.number().positive().required("Field is required !").typeError("Type must be a positive number"),
    quantity: yup.number().positive().required("Field is required !").typeError("Type must be a positive number"),
    category: yup.string().required("Field is required !"),
    description: yup.string().required("Field is required !"),
    banner: yup.array().required("Field is required !").typeError("Field is required !"),
    images: yup.array().required("Field is required !").typeError("Field is required !")
});


const defaultValues = {
    name: '',
    author: '',
    price: null,
    quantity: null,
    category: '',
    description: '',
    banner: [],
    images: []
}
export { productSchema, defaultValues };