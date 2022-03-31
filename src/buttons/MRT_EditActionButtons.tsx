import React, { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';
import { RowValues } from '@tanstack/react-table';

interface Props<D extends Record<string, any> = {}> {
  row: MRT_Row<D>;
}

export const MRT_EditActionButtons: FC<Props> = ({ row }) => {
  const {
    icons: { CancelIcon, SaveIcon },
    localization,
    onRowEditSubmit,
    setCurrentEditingRow,
    tableInstance: { getState },
  } = useMRT();

  const handleCancel = () => {
    row.values = (row.original as RowValues) ?? {};
    setCurrentEditingRow(null);
  };

  const handleSave = async () => {
    await onRowEditSubmit?.(getState().currentEditingRow ?? row);
    setCurrentEditingRow(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '0.75rem' }}>
      <Tooltip arrow title={localization.cancel}>
        <IconButton aria-label={localization.cancel} onClick={handleCancel}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={localization.save}>
        <IconButton
          aria-label={localization.save}
          color="info"
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
