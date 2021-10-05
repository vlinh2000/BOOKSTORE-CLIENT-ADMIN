import * as yup from 'yup';

const categorySchema = yup.object().shape({
    name: yup.string().required("Field is required !"),
});


const defaultValues = {
    name: '',
}
export { categorySchema, defaultValues };