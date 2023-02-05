import React, {memo, useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {Modal} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import TicketBookingStep from "./TicketBookingStep";
import {callGet} from "../../ulti/helper";
import Skeleton from 'react-loading-skeleton';
import {toast} from "react-toastify";

const BookingModal = (props) => {
    const {t} = useTranslation("common");
    const {} = props;
    const {bookingModal, setBookingModal} = useAppContext();

    return <Modal show={bookingModal.isVisible}
                  centered
                  size="lg"
                  onHide={() => setBookingModal({
                      ...bookingModal,
                      isVisible: false
                  })}>
        <TicketBookingStep productId={bookingModal?.productId}/>
    </Modal>
};

export default memo(BookingModal);