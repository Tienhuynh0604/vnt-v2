import React, {memo} from "react";
import {Button, Table} from "react-bootstrap";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {toast} from "react-toastify";
import {useAppContext} from "../../layouts/AppLayout";

const BookingConfirmStep = ({onBack}) => {

    const {setBookingModal} = useAppContext();

    return <div className="booking-form-wrap">
        <h1 className="h1-title"><span>Ticket Information</span></h1>
        <Table className="mt-4 booking-table" striped responsive>
            <tr>
                <th>Ha Noi Double – Decker Bus</th>
                <th className="text-end">Quantity</th>
            </tr>
            <tr>
                <td>
                    Date
                </td>
                <td className="text-end">
                    <strong>30/10/2022</strong>
                </td>
            </tr>
            <tr>
                <td>
                    Ticket Type:
                </td>
                <td className="text-end">
                    <strong>4 hours</strong>
                </td>
            </tr>
            <tr>
                <td>
                    Quantity:
                </td>
                <td className="text-end">
                    <div>
                        <span>Adult:</span><strong className="ms-3">2 x $23.00</strong>
                    </div>
                    <div>
                        <span>Child:</span><strong className="ms-3">1 x $15.00</strong>
                    </div>
                </td>
            </tr>
        </Table>
        <div className="d-flex justify-content-between">
            <strong>Sub total:</strong>
            <span className="sub-total">$60.00</span>
        </div>
        <div className="mt-3 d-flex justify-content-center booking-btn-list" style={{columnGap: "20px"}}>
            <Button type="button" variant="link" onClick={() => onBack()}
                    className="px-md-5 py-md-2">
                <span className="d-none d-md-block">Back</span>
                <Icon icon={"eva:arrow-ios-back-fill"} className="d-sm-block d-md-none" height={24}/>
            </Button>
            <Link href="/check-out"
                  onClick={() => {
                      setBookingModal(prevState => ({
                          ...prevState,
                          isVisible: false
                      }))
                  }}
            >
                <Button type="button" variant="outline-primary" className="px-md-3 py-md-2">Check out
                    now</Button>
            </Link>
            <Button type="button"
                    className="cart-btn px-md-5 py-md-2"
                    onClick={() => {
                        toast("Item added to Cart");
                        setBookingModal(prevState => ({
                            ...prevState,
                            isVisible: false
                        }))
                    }}
            >
                <span className="d-none d-lg-block">Add to cart</span>
                <Icon icon={"bi:cart-plus-fill"} className="d-sm-block d-lg-none" height={24}/>
            </Button>
        </div>
    </div>
};

export default memo(BookingConfirmStep);