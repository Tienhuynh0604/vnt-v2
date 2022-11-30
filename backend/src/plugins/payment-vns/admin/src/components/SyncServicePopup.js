import React, {memo, useCallback, useEffect, useState} from 'react';
import pluginId from "../pluginId";
import {
  Box,
  Button,
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Typography,
  EmptyStateLayout,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th
} from '@strapi/design-system';
import {request, useNotification} from '@strapi/helper-plugin';

const SyncServicePopup = ({isModalVisible, query, onCloseModal, city}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const toggleNotification = useNotification();

  useEffect(() => {
    if (isModalVisible && city) {
      getServices();
    }
  }, [
    isModalVisible, query, city
  ]);


  const getServices = async () => {
    try {
      setIsLoading(true);
      let locale = query.plugins?.i18n?.locale ? query.plugins.i18n.locale : "vi";
      const res = await request(`/${pluginId}/get-services`, {
        method: "GET",
        params: {
          locale,
          city_id: city.id
        }
      });
      console.log(res);
      setServices(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const syncServices = async () => {
    try {
      setIsLoading(true);
      let locale = query.plugins?.i18n?.locale ? query.plugins.i18n.locale : "vi";
      const res = await request(`/${pluginId}/sync-services`, {
        method: "POST",
        body: {
          locale,
          city_id: city.id
        }
      });
      console.log(res);
      toggleNotification({
        type: 'success',
        message: "Đồng bộ thành công, F5 refresh trang",
      });
    } catch (e) {
      console.error(e);
      toggleNotification({
        type: 'danger',
        message: `Đồng bộ Thất bại: ${e.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createTable = useCallback(() => {
    if ((!services || services.length === 0)) {
      return <EmptyStateLayout content="You don't have any content yet..."/>
    }
    return <Stack spacing={2} paddind={0}>
      {services.map((item, idx) => {
        return <Box padding={2} key={`ser_${idx}`} background={`${idx % 2 ? "neutral100" : ""}`}>
          <Stack spacing={2}>
            <Typography variant="delta">
              {item.name}
            </Typography>
            <Typography variant="pi">
              {item.description}
            </Typography>
            <Typography variant="pi">
              Start point: {item.startpoint}
            </Typography>
            <Typography variant="pi">
              Type: {item.type}
            </Typography>
            <Typography variant="pi" fontWeight="bold">
              Prices:
            </Typography>
            {item.prices &&
            <Table rowCount={item.prices.length} colCount={7}>
              <Thead>
                <Tr>
                  <Th><Typography variant="sigma">Loại tuổi</Typography></Th>
                  <Th><Typography variant="sigma">Nhóm</Typography></Th>
                  <Th><Typography variant="sigma">Thời gian</Typography></Th>
                  <Th><Typography variant="sigma">Chỗ ngồi</Typography></Th>
                  <Th><Typography variant="sigma">ID giá</Typography></Th>
                  <Th><Typography variant="sigma">Giá</Typography></Th>
                  <Th><Typography variant="sigma">Giá USD</Typography></Th>
                </Tr>
              </Thead>
              <Tbody>
                {item.prices.map((price, idx) => {
                  return <Tr key={`p_t_${idx}`}>
                    <Td>{price.age_group === 1 ? "Trẻ con" : "Người lớn"}</Td>
                    <Td>{price.group}</Td>
                    <Td>{price.time_using}</Td>
                    <Td>{price.seat}</Td>
                    <Td>{price.price_id}</Td>
                    <Td>{price.price ? price.price.toLocaleString("en-US") : "null"}</Td>
                    <Td>{price.usd_price}</Td>
                  </Tr>
                })}
              </Tbody>
            </Table>
            }
          </Stack>
        </Box>
      })}
    </Stack>
  }, [services]);

  return (
    <ModalLayout onClose={onCloseModal} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" as="h2" id="title">
          Payment VnSightseeing Service
        </Typography>
      </ModalHeader>
      <ModalBody>
        {createTable()}
      </ModalBody>
      <ModalFooter
        startActions={<Button onClick={onCloseModal} variant="tertiary">
          Cancel
        </Button>}
        endActions={<>
          <Button onClick={syncServices} variant="secondary" loading={isLoading}>
            Đồng bộ
          </Button>
        </>}/>
    </ModalLayout>
  );
};

export default memo(SyncServicePopup);
