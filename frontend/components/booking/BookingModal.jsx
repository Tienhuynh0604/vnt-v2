import React, {memo} from "react";
import {useTranslation} from "next-i18next";
import {Modal} from "react-bootstrap";
import {useAppContext} from "../../layouts/AppLayout";
import TicketBookingStep from "./TicketBookingStep";

const BookingModal = () => {
    const {t} = useTranslation("common");
    const {bookingModal, setBookingModal} = useAppContext();

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