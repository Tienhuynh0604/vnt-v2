import React, {useState, useCallback} from 'react';
import {
  Button,
  ModalLayout,
  ModalBody,
  ModalHeader,
  Typography,
} from '@strapi/design-system';
import {useSelector} from 'react-redux';
import {useQueryParams} from '@strapi/helper-plugin';
import SyncCityPopup from "./SyncCityPopup";

const SyncPopup = () => {
  const listViewData = useSelector((state) => state["content-manager_listView"]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [{query}] = useQueryParams();

  if (listViewData.contentType.apiID !== "payment-product"
  ) {
    return <></>;
  }

  const onOpenModal = useCallback(async () => {
    setModalVisible(true);
  }, [query]);

  const onCloseModal = useCallback(async () => {
    setModalVisible(prev => !prev);
  }, [isModalVisible]);

  return <>
    <Button onClick={onOpenModal}> Payment Vns Sync</Button>
    {isModalVisible && <ModalLayout onClose={onCloseModal} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" as="h2" id="title">
          Payment VnSightseeing Sync
        </Typography>
      </ModalHeader>
      <ModalBody>
        <SyncCityPopup isModalVisible={isModalVisible} onCloseModal={onCloseModal} query={query} />
      </ModalBody>
    </ModalLayout>}
  </>
};

export default SyncPopup;
