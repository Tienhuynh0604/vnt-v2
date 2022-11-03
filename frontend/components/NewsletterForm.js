import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {callPost} from "../ulti/helper";
import "react-datepicker/dist/react-datepicker.css";

const NewsletterForm = ({children, locale = 'vi', className}) => {

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Vui lòng nhập đúng định dạng")
            .min(3, "Vui lòng nhập tên trên 3 ký tự")
            .required("Xin vui lòng nhập email"),
        topic: Yup.array()
            .required("Vui lòng chọn chuyên đề quan tâm"),
        optionTopic: Yup.string(),
        acceptReceiveUpdate: Yup.boolean(),
    });

    const handleSubmit = async (values) => {
        console.log(values);
        setLoading(true);
        setIsSuccess(false);
        if (values.topic) {
            values.topic = values.topic.join(",")
        }
        try {
            await callPost(`/newsletters`, values, locale);
            setIsSuccess(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    };

    return <Formik validationSchema={schema}
                   initialValues={{
                       email: '',
                       topic: ['Thông tin chung'],
                       optionTopic: 'Tất cả',
                       acceptReceiveUpdate: true
                   }}
                   className={`${className}`}
                   onSubmit={handleSubmit}>
        {({handleSubmit, handleChange, values, touched, isValid, errors, setFieldTouched, setFieldValue}) => (
            <Form noValidate onSubmit={handleSubmit}>
                {children(handleSubmit, handleChange, values, touched, isValid, errors, setFieldTouched, setFieldValue, isSuccess, loading)}
            </Form>)
        }
    </Formik>
};

export default NewsletterForm;