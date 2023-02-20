import React from "react";
import EmptyLayout from "../layouts/EmptyLayouts";
import ErrorComponent from "../components/ErrorComponent";

const Error = (props) => {
    return (
        <ErrorComponent />
    )
};

Error.getLayout = (page, props) => {
    return <EmptyLayout {...props}>
        {page}
    </EmptyLayout>
};

export default Error