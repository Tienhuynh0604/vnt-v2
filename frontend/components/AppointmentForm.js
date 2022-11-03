import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {callPost} from "../ulti/helper";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = ({children, locale = 'vi', className}) => {

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const schema = Yup.object().shape({
        fullname: Yup.string()
            .min(3, "Vui lòng nhập tên trên 3 ký tự")
            .required("Xin vui lòng nhập họ và tên"),
        mobile: Yup.string()
            .min(8, "Số điện thoại từ 8 ký tự")
            .required("Xin vui lòng nhập số điện thoại"),
        bookingDate: Yup.string()
            .required("Vui lòng chọn ngày khám"),
        bookingTime: Yup.string()
            .required("Vui lòng chọn giờ khám"),
        retail: Yup.string()
            .required("Vui lòng chọn cơ sở"),
        specialist: Yup.string()
            .required("Vui lòng chọn chuyên khoa"),
    });

    const handleSubmit = async (values) => {
        console.log(values);
        setLoading(true);
        setIsSuccess(false);
        try {
            const res = await callPost(`/appointments`, values, locale);
            setIsSuccess(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    };

    return <Formik validationSchema={schema}
                   initialValues={{
                       fullname: '',
                       mobile: '',
                       bookingDate: new Date(),
                       bookingTime: '',
                       retail: '',
                       specialist: '',
                       note: ''
                   }}
                   className={`${className}`}
                   onSubmit={handleSubmit}>
        {({handleSubmit, handleChange, values, touched, isValid, errors, setFieldTouched, setFieldValue}) => (<Form noValidate onSubmit={handleSubmit}>
            {children(handleSubmit, handleChange, values, touched, isValid, errors, setFieldTouched, setFieldValue, isSuccess, loading)}
        </Form>)
        }
    </Formik>
};

export default AppointmentForm;