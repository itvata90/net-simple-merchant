import { AxiosResponse } from 'axios';
import React from 'react';
import merchantService from 'src/api/merchant-service';
import Button from 'src/core/components/button/button';
import Modal from 'src/core/components/modal/modal';
import Stack from 'src/core/components/stack/stack';
import Table from 'src/core/components/table/table-data';
import useSearch from 'src/core/hooks/use-search';
import { IMember } from 'src/interfaces/member';
import DeleteButton from 'src/shared/demo-management/delete-button';

interface MerchantMemberListDialogProps {
  merchantId: string | number;
  openDialog: boolean;
  onClose: () => void;
}

const MerchantMemberListDialog = ({ merchantId, openDialog, onClose }: MerchantMemberListDialogProps) => {
  const {
    data,
    error: loadingError,
    loading,
    page,
    limit,
    handlePageChange,
    handleAddSort,
    handleRemoveSort,
    handleSearch,
    handleDataChange,
    handleReload,
  } = useSearch<AxiosResponse<Array<IMember>>>(
    (url: string, config: any) => merchantService.getMembers(url + merchantId, config),
    undefined,
    (fields) =>
      Object.entries(fields).reduce(
        (acc, [fieldName, orderBy]) => (acc += 'sortBy=' + fieldName + '&order=' + orderBy),
        '',
      ),
  );

  const rows = data?.data ?? [];
  const count = typeof data?.headers?.get === 'function' ? data.headers.get('X-Total-Count') : 0;
  const maxPage = !count ? 1 : Math.ceil(Number(count) / limit);

  const columns = [
    { name: 'Id', field: 'id', searchable: true, sortable: true },
    { name: 'Username', field: 'username', searchable: true, sortable: true },
    { name: 'Email', field: 'email', searchable: true, sortable: true },
    {
      name: 'First Name',
      field: 'firstName',
      searchable: true,
      sortable: true,
    },
    {
      name: 'Last Name',
      field: 'lastName',
      searchable: true,
      sortable: true,
    },

    {
      name: '',
      field: '',
      renderFunction: (row: any) => (
        <Stack direction="row" spacing={1}>
          <DeleteButton fieldId={row.id} fetcher={() => {}} />
        </Stack>
      ),
    },
  ];
  return (
    <Modal open={openDialog} onClose={onClose} animation backdrop size="lg">
      <Modal.Header as="h5">Members list</Modal.Header>

      <Modal.Body>
        <Table
          loading={loading}
          indexField="id"
          columns={columns}
          rows={rows}
          // onAddSortByAsc={(field: string) => handleAddSort(field)}
          // onAddSortByDesc={(field: string) => handleAddSort(field, true)}
          // onRemoveSortBy={handleRemoveSort}
          // onSearch={handleSearch}
          // pageLimits={[5, 10]}
          hover
        />
      </Modal.Body>
      <Modal.Footer divider>
        <Button onClick={onClose} color="danger">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MerchantMemberListDialog;
