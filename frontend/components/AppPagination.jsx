import Pagination from "react-bootstrap/Pagination";
import Link from "next/link";
import React from "react";

const AppPagination = ({
                           baseUrl,
                           query,
                           page = 1,
                           pageSize = 0,
                           pageCount = 20,
                           total = 4,
                           size = 'sm',
                           className = ''
                       }) => {
    return <Pagination size={size} className={`${className}`}>
        {page > 1 && <Link href={{
            pathname: baseUrl,
            query: {
                ...query,
                page: page - 1
            }
        }}
        >
            <Pagination.Prev/>
        </Link>}
        <Pagination.Item active>{page}</Pagination.Item>
        {page < pageCount && <Link href={{
            pathname: baseUrl,
            query: {
                ...query,
                page: page + 1
            }
        }}
        >
            <Pagination.Next/>
        </Link>}
    </Pagination>

};

export default AppPagination;
