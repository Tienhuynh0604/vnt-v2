import React, {createRef, useState} from "react";
import {Form} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {createContact} from "../../services/ContactService";
import {useTranslation} from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

const SearchArticleForm = ({children, className}) => {

    const reCaptchaRef = createRef();
    const {t} = useTranslation("common");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const schema = Yup.object().shape({
        s: Yup.string()
            .min(3, t("form.inValid.min3char"))
            .required(t("form.inValid.search")),
        // recaptcha: Yup.string().required(t("form.required.recaptcha")),
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        setIsSuccess(false);
        try {
            // const res = await createContact(values);
            setIsSuccess(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    };

    return <Formik validationSchema={schema}
                   initialValues={{
                       s: '',
                   }}
                   validateOnBlur={false}
                   className={`${className}`}
                   onSubmit={handleSubmit}>
        {({handleSubmit, setSubmitting, handleChange, handleBlur, values, touched, isValid, errors, setFieldValue, isSubmitting}) => {
            const handleBlur2 = (e) => {
                // if (!values.recaptcha) {
                //     reCaptchaRef.current.execute();
                //     setSubmitting(true);
                // }
                handleBlur(e);
            };

            return (<Form noValidate onSubmit={handleSubmit}>
                {children(handleSubmit, handleChange, values, touched, isValid, errors, isSuccess, loading, isSubmitting, handleBlur2)}
                {/*<Form.Control.Feedback type="invalid">*/}
                {/*    {errors.recaptcha}*/}
                {/*</Form.Control.Feedback>*/}
                {/*<ReCAPTCHA*/}
                {/*    ref={reCaptchaRef}*/}
                {/*    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT}*/}
                {/*    onChange={(value) => {*/}
                {/*        setFieldValue("recaptcha", value);*/}
                {/*        setSubmitting(false);*/}
                {/*    }}*/}
                {/*    size="invisible"*/}
                {/*    badge="bottomleft"*/}
                {/*/>*/}
            </Form>)
        }}
    </Formik>
};

export default SearchArticleForm;