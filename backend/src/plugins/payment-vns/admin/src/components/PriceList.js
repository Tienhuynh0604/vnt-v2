import React, { memo, useCallback, useEffect, useState } from 'react';
import { Stack, Checkbox, Field, FieldLabel, FieldInput, Button, Grid, GridItem } from '@strapi/design-system';
import pluginId from "../pluginId";
import { request, useNotification, useCMEditViewDataManager } from '@strapi/helper-plugin';


const PriceList = ({ value }) => {

    const [paymentProduct, setPaymentProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const toggleNotification = useNotification();
    const [priceList, setPriceList] = useState(value ? value : [])

    const { initialData, modifiedData } = useCMEditViewDataManager();

    useEffect(() => {
        if (modifiedData.paymentProduct[0]) {
            getServices(modifiedData.paymentProduct[0].id);
        }
    }, [modifiedData]);

    const getServices = async (id) => {
        try {
            setLoading(true);
            const res = await request(`/${pluginId}/get-service/${id}`, {
                method: "GET",
            });
            setPaymentProduct(res);
            console.log(res);
        } catch (e) {
            console.error(e);
            toggleNotification({
                type: 'danger',
                message: `Lấy dịch vụ thất bại: ${e.message}`,
            });
        } finally {
            setLoading(false);
        }
    }

    const onChangeOptLbl = (idx, value) => {
        priceList[idx].optName = value;
        setPriceList([...priceList]);
    }

    const onChangeChecked = (parentIdx, checked, value) => {
        const idx = priceList[parentIdx].priceList.findIndex(item => item.price_id === value.price_id);
        if (idx <= -1) {
            priceList[parentIdx].priceList.push(value);
        } else {
            priceList[parentIdx].priceList.splice(idx, 1);
        }
        setPriceList([...priceList]);
    }

    const onClickAddPrice = () => {
        const newPriceList = [...priceList];
        newPriceList.push({
            optName: "",
            priceList: [],
            routerId: paymentProduct?.routerId,
        })
        setPriceList(newPriceList);
    }

    const onClickRemovePrice = (idx) => {
        priceList.splice(idx, 1);
        setPriceList([...priceList]);
    }

    const renderAgeGroup = (ageGroup) => {
        return ageGroup === 1 ? "Trẻ con" : "Người lớn";
    }

    const renderPriceList = (parentIdx, item, parentPriceList) => {
        const idx = parentPriceList.findIndex(pItem => pItem.price_id === item.price_id);
        return (
            <Checkbox
                key={`p${item.price_id}`}
                checked={idx > -1}
                onChange={e => onChangeChecked(parentIdx, e.target.value, item)}
            >
                {renderAgeGroup(item.age_group)} : {item.price} VND - ${item.usd_price}
            </Checkbox>
        )
    }

    const renderPriceOpt = (item, idx) => {
        return <div key={`popt${idx}`}>
            <Field name="priceOpt" style={{ marginBottom: "0.5rem" }}>
                <FieldLabel>Name</FieldLabel>
                <FieldInput type="text" placeholder="Price option name"
                    value={item.optName}
                    onChange={(e) => { onChangeOptLbl(idx, e.target.value) }}
                />
            </Field>
            <Field name="priceList" style={{ marginBottom: "0.5rem" }}>
                <FieldLabel>Choose PriceList</FieldLabel>
                <Grid gap={3}>
                    {paymentProduct?.priceList?.map(pl => (
                        <GridItem col={4}>
                            {renderPriceList(idx, pl, item.priceList)}
                        </GridItem>
                    ))}
                </Grid>
            </Field>
            <Button
                size="S"
                variant='danger'
                onClick={() => onClickRemovePrice(idx)}>
                Remove
            </Button>
        </div>
    }

    return (
        <Stack spacing={3}>
            <FieldLabel>Price List</FieldLabel>
            {paymentProduct ? <Button onClick={() => onClickAddPrice()}>Thêm giá</Button> : <i>No payment product selected</i>}
            {priceList.map((item, idx) => {
                return (
                    renderPriceOpt(item, idx)
                )
            })}
        </Stack>
    )
}

export default PriceList;