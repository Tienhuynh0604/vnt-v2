import React, {memo} from "react";
import Nav from 'react-bootstrap/Nav';
import {useRouter} from "next/router";
import {useAppContext} from "../../layouts/AppLayout";

const NavigateSideBarWidget = (props) => {
    const {className} = props;
    const appContext = useAppContext();
    const {headerMenus = []} = appContext;

    const router = useRouter();
    const {asPath} = router;
    const urlPaths = asPath.split("/");

    let activeRoute = null;
    if (urlPaths.length <= 1) {
        activeRoute = "";
    } else if (urlPaths.length > 1) {
        activeRoute = urlPaths[1];
    }

    const menuIndex = headerMenus.findIndex(item => item.path === `/${activeRoute}`);
    const currentMenu = menuIndex >= 0 ? headerMenus[menuIndex] : {
        items: []
    };

    const getMenu = () => {
        return currentMenu.items.map(item => (
            <Nav.Link key={`nswg${item.id}`}
                      href={`${item.path}`}>
                {item.title}
            </Nav.Link>
        ));
    };

    return (
        <div className={`${className} nav-sidebar-wg`}>
            <h6 className="fw-bold text-uppercase">{currentMenu.title}</h6>
            <Nav className='flex-column' defaultActiveKey={`/${activeRoute}`}>
                {getMenu()}
            </Nav>
        </div>
    );
};


export default memo(NavigateSideBarWidget);