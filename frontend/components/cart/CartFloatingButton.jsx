import React from "react";
import FloatingButton from "../FloatingButton";
import {useAppContext} from "../../layouts/AppLayout";

const CartFloatingButton = () => {
    const {cartModal, setCartModal} = useAppContext();

    return <>
        <FloatingButton icon={"material-symbols:shopping-cart-outline"}
                        className="circle"
                        badgeNum={cartModal.items.length}
                        onClick={() => setCartModal(prevState => ({
                            ...prevState,
                            isVisible: true,
                        }))}/>
    </>
};

export default CartFloatingButton;