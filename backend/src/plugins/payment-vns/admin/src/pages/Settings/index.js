import React, {useState, useEffect} from 'react';
import pluginId from "../../pluginId";

import {
  Stack,
  Box,
  ContentLayout,
  Typography,
  HeaderLayout,
  Button,
  Grid,
  GridItem,
  TextInput,
  Tooltip
} from '@strapi/design-system';
import {LoadingIndicatorPage, useNotification, request} from '@strapi/helper-plugin';
import {Check, Information} from '@strapi/icons';

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toggleNotification = useNotification();

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      setIsLoading(true);
      const res = await request(`/${pluginId}/settings`, {
        method: "GET",
      });
      console.log(res);
      setSettings(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setIsSaving(true);
      const res = await request(`/${pluginId}/settings`, {
        method: "PUT",
        body: settings,
      });
      setSettings(res);
      toggleNotification({
        type: 'success',
        message: 'Settings successfully updated',
      });

    } catch (e) {
      console.error(e);
      toggleNotification({
        type: 'danger',
        message: e.message,
      });
    } finally {
      setIsSaving(false);
      setIsLoading(false);
    }
  };

  return <>
    <HeaderLayout
      id="title"
      title="VnSightseeing Settings"
      subtitle="Manage the settings and behaviour of Payment VnSightseeing"
      primaryAction={
        isLoading ? (
          <></>
        ) : (
          <Button
            onClick={handleSubmit}
            startIcon={<Check/>}
            size="L"
            disabled={isSaving}
            loading={isSaving}
          >
            Save
          </Button>
        )
      }
    />
    {isLoading ? (
      <LoadingIndicatorPage/>
    ) : (
      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          paddingTop={6}
          paddingBottom={6}
          paddingLeft={7}
          paddingRight={7}
        >
          <Stack size={3}>
            <Typography>Payment VnSightseeing settings</Typography>
            <Grid gap={6}>
              <GridItem col={12} s={12}>
                <TextInput placeholder="Insert api url"
                           label="Api Url"
                           name="apiUrl"
                           onChange={e => setSettings(prev => ({
                             ...prev,
                             apiUrl: e.target.value
                           }))}
                           value={settings.apiUrl}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <TextInput placeholder="Insert api token"
                           label="Api secret token"
                           name="apiKey"
                           onChange={e => setSettings(prev => ({
                             ...prev,
                             apiKey: e.target.value
                           }))}
                           value={settings.apiKey}
                />
              </GridItem>
            </Grid>
          </Stack>
        </Box>
      </ContentLayout>
    )}
  </>
};

export default Settings;
