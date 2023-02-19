import React, {createRef, useState} from "react";
import {Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useTranslation} from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import {createOrder} from "../../services/OrderService";
import {useAppContext} from "../../layouts/AppLayout";
import {toast} from "react-toastify";

const CheckoutForm = ({children, className, initialValue}) => {

    const reCaptchaRef = createRef();
    const {t} = useTranslation("common");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const {locale, setCheckOutItems} = useAppContext();

    const schema = Yup.object().shape({
        fullname: Yup.string()
            .min(3, t("form.inValid.min3char"))
            .required(t("form.inValid.name")),
        phone: Yup.string()
        // .matches(/^(((\+|)84)|0)((3|5|7|8|9){1})([0-9]{8})\b$/, t("form.inValid.phone"))
            .required(t("form.required.input")),
        email: Yup.string()
            .email(t("form.required.email"))
            .required(t("form.required.input")),
        countryCode: Yup.string()
            .required(t("form.required.input")),
        paymentType: Yup.string()
            .required(t("form.required.input")),
        agreeWithTerm: Yup.bool()
            .oneOf([true], t("co.agree.term")),
        recaptcha: Yup.string().required(t("form.required.recaptcha")),
        order: Yup.array().min(1, t("form.required.array")),
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        setIsSuccess(false);
        try {
            console.log(values);
            const res = await createOrder(values, locale);
            console.log(res.data);
            window.location.href = res.data.url;
        } catch (e) {
            console.error(e.response?.data || e.message);
            toast(e.message, {
                type: "error"
            });
            setLoading(false)
        }
    };

    return <Formik validationSchema={schema}
                   initialValues={{
                       fullname: '',
                       phone: '',
                       email: '',
                       countryCode: "+84",
                       paymentType: null,
                       agreeWithTerm: false,
                       ...initialValue
                   }}
                   validateOnBlur={false}
                   className={`${className}`}
                   onSubmit={handleSubmit}>
        {({handleSubmit, setSubmitting, handleChange, handleBlur, values, touched, isValid, errors, setFieldValue, isSubmitting}) => {
            const handleBlur2 = (e) => {
                if (!values.recaptcha) {
                    reCaptchaRef.current.execute();
                    setSubmitting(true);
                }
                handleBlur(e);
            };

            return (<Form noValidate onSubmit={handleSubmit}>
                {children(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading, isSubmitting, handleBlur2)}
                <Form.Control.Feedback type="invalid">
                    {errors.recaptcha}
                </Form.Control.Feedback>
                <ReCAPTCHA
                    ref={reCaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT}
                    onChange={(value) => {
                        setFieldValue("recaptcha", value);
                        setSubmitting(false);
                    }}
                    size="invisible"
                    badge="bottomleft"
                />
            </Form>)
        }}
    </Formik>
};

export default CheckoutForm;