import React, {memo, useCallback, useEffect, useState} from 'react';
import pluginId from "../pluginId";
import {
  Button,
  ModalLayout,
  ModalBody,
  ModalHeader,
  Typography,
  Flex,
  EmptyStateLayout,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th
} from '@strapi/design-system';
import {request} from '@strapi/helper-plugin';
import SyncServicePopup from "./SyncServicePopup";

const SyncCityPopup = ({isModalVisible, query, onCloseModal}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectCity, setSelectedCity] = useState(null);
  const [isShowService, setIsShowService] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      getCities();
    }
  }, [
    isModalVisible, query
  ]);

  const getCities = useCallback(async () => {
    try {
      setIsLoading(true);
      let locale = query.plugins?.i18n?.locale ? query.plugins.i18n.locale : "vi";
      const res = await request(`/${pluginId}/get-cities`, {
        method: "GET",
        params: {
          locale
        }
      });
      setCities(res);
    } catch (e) {
      console.error("error", e);
    } finally {
      setIsLoading(false);
    }
  }, [
    query
  ]);

  const onCloseServices = useCallback(async () => {
    setIsShowService(false);
  }, [isShowService]);

  const createTable = useCallback(() => {
    if ((!cities || cities.length === 0)) {
      return <EmptyStateLayout content="You don't have any content yet..."/>
    }
    return <Table rowCount={cities.length} colCount={3}>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">ID</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Địa danh</Typography>
          </Th>
          <Th>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {cities.map((item, idx) => {
          return <Tr key={`c_${idx}`}>
            <Td>
              #{item.id}
            </Td>
            <Td>
              {item.name}
            </Td>
            <Td>
              <Flex>
                <Button onClick={() => {
                  setSelectedCity(item);
                  setIsShowService(true);
                }}>
                  Lấy dịch vụ
                </Button>
              </Flex>
            </Td>
          </Tr>
        })
        }
      </Tbody>
    </Table>
  }, [cities]);

  return <>
    isModalVisible && (
    <ModalLayout onClose={onCloseModal} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" as="h2" id="title">
          Payment VnSightseeing City Sync
        </Typography>
      </ModalHeader>
      <ModalBody>
        {createTable()}
      </ModalBody>
    </ModalLayout>)
    {isShowService && <SyncServicePopup isModalVisible={isShowService}
                                        onCloseModal={onCloseServices}
                                        city={selectCity}
                                        query={query}/>
    }
  </>;
};

export default memo(SyncCityPopup);
