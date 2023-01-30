import React, {memo, useEffect} from "react";
import {useTranslation} from "next-i18next";
import {Modal} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import TicketBookingStep from "./TicketBookingStep";

const BookingModal = (props) => {
    const {t} = useTranslation("common");
    const {bookingModal, setBookingModal} = useAppContext();

    useEffect(() => {
        if (bookingModal.productId) {

        }
    }, bookingModal);

    const getPaymentDetail = async () => {

    };

    return <Modal show={bookingModal.isVisible}
                  centered
                  size="lg"
                  onHide={() => setBookingModal({
                      ...bookingModal,
                      isVisible: false
                  })}>
        <TicketBookingStep/>
    </Modal>
};

export default memo(BookingModal);