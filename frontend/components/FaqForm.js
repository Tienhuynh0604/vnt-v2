import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {createFaq} from "../services/FaqService";

const FaqForm = ({children, locale = 'vi', className}) => {

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Vui lòng nhập tên trên 3 ký tự")
            .required("Xin vui lòng nhập họ và tên"),
        phone: Yup.string()
            .required("Xin vui lòng nhập số điện thoại"),
        email: Yup.string()
            .email("Vui lòng nhập đúng định dạng email"),
        question: Yup.string()
            .min(20, "Vui lòng nhập nhiều hơn 20 ký tự")
            .required("Vui lòng nhập nội dung câu hỏi"),
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        setIsSuccess(false);
        try {
            const res = await createFaq(values, locale);
            setIsSuccess(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    };

    return <Formik validationSchema={schema}
                   initialValues={{
                       name: '',
                       phone: '',
                       email: '',
                       question: '',
                   }}
                   className={`${className}`}
                   onSubmit={handleSubmit}>
        {({handleSubmit, handleChange, values, touched, isValid, errors}) => (<Form noValidate onSubmit={handleSubmit}>
            {children(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading)}
        </Form>)
        }
    </Formik>
};

export default FaqForm;