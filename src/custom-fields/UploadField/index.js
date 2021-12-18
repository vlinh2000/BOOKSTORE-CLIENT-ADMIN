import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FileDoneOutlined, UploadOutlined } from '@ant-design/icons';
import { FormItemStyled } from 'assets/styles/globalStyled';
import { Button, message, Upload } from 'antd';
import styled from 'styled-components';

UploadField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    handleReadFile: PropTypes.func,

    maxCount: PropTypes.number,
};

UploadField.defaultProps = {
    name: '',
    label: '',
    handleReadFile: null,

    maxCount: 1,
};
const UploadStyled = styled(Upload)`
    button {
       height:45px;
       width:50px;
       border-radius:4px;
    }

`;

function UploadField(props) {
    const { name, label, control, maxCount, handleReadFile, listType, options, setListRemove, setValue } = props;

    const [listFile, setListFile] = React.useState([]);


    const beforeUpload = (file) => {
        const isValid = file.type === ('image/png' || 'image/jpeg');
        if (!isValid) {
            message.error("You can only upload JPNG or PNG or JPG file");
            return true;
        }
        return false;
    }

    React.useEffect(() => {
        console.log({ options })
        const list = options ? options?.map((option, index) => ({ uid: index, name: `Image ${index + 1}`, status: 'done', url: option })) : [];
        setListFile(list);
    }, [options]);


    //set value after listFile change
    React.useEffect(() => {
        const value = listFile.length < 1 ? null : listFile;
        console.log(value)
        setValue(name, value);
    }, [listFile])

    const onChange = e => {
        const { file, fileList } = e;
        const isValid = file.type === ('image/png' || 'image/jpeg');

        if (!isValid) return;

        setListFile(fileList)

        if (handleReadFile) {

            const readFile = async (file) => {
                const src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
                handleReadFile(src);
            }
            readFile(fileList[0]);
        }
        return;
    }

    const onRemove = item => {
        const list = listFile.filter(file => file.uid !== item.uid);
        setListFile(list);
        setListRemove && setListRemove(prev => item.status ? { ...prev, [name]: [...prev[name], item.url] } : { ...prev });
    }


    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors }, formState }) => {

                return <FormItemStyled
                    validateStatus={errors[field.name] && 'error'}
                    help={errors[field.name]?.message}
                    label={label}>
                    <UploadStyled
                        onRemove={onRemove}
                        multiple={true}
                        listType={listType}
                        fileList={listFile}
                        beforeUpload={beforeUpload}
                        onChange={onChange}
                        maxCount={maxCount}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            type="text" />
                    </UploadStyled>
                </FormItemStyled>
            }} />);
}

export default UploadField;