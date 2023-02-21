import Pagination from "react-bootstrap/Pagination";
import Link from "next/link";
import React from "react";
import {Icon} from "@iconify/react";

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
            <span><Icon icon={"material-symbols:chevron-left"} height={30}/></span>
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
            <span><Icon icon={"material-symbols:chevron-right"} height={30}/></span>
        </Link>}
    </Pagination>

};

export default AppPagination;
