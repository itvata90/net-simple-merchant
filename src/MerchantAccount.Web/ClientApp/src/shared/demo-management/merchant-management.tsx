import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { AiOutlineEye, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { ResponseListDataType } from 'src/api/http-client-setup';
import merchantService from 'src/api/merchant-service';
import Button from 'src/core/components/button/button';
import Container from 'src/core/components/container/container';
import Stack from 'src/core/components/stack/stack';
import Table from 'src/core/components/table/table-data';
import useSearch from 'src/core/hooks/use-search';
import { Column } from 'src/core/interfaces/components';
import { IMerchant } from 'src/interfaces/merchant';
import DeleteButton from 'src/shared/demo-management/delete-button';
import MerchantFormDialog, { ACTIONS } from 'src/shared/demo-management/merchant-form-dialog';
import MerchantMemberListDialog from 'src/shared/demo-management/merchant-member-list-dialog';

const MerchantManagement = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | number | undefined>(undefined);
  const [action, setAction] = useState<ACTIONS>(ACTIONS.ADD);
  const [openMemberListDialog, setOpenMemberListDialog] = useState<boolean>(false);

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
  } = useSearch<AxiosResponse<Array<IMerchant>>>(merchantService.get, undefined, (fields) =>
    Object.entries(fields).reduce(
      (acc, [fieldName, orderBy]) => (acc += 'sortBy=' + fieldName + '&order=' + orderBy),
      '',
    ),
  );

  const rows = data?.data ?? [];
  const count = typeof data?.headers?.get === 'function' ? data.headers.get('X-Total-Count') : 0;
  const maxPage = !count ? 1 : Math.ceil(Number(count) / limit);

  const columns: Column[] = [
    { name: 'Id', field: 'id', searchable: true, sortable: true, filterable: true },
    { name: 'Name', field: 'name', searchable: true, sortable: true, filterable: true },
    {
      name: 'Status',
      field: 'status',
      renderFunction: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              marginRight: 5,
              width: 15,
              height: 15,
              borderRadius: 15,
              background: row.status === 'A' ? '#8ceb34' : row.status === 'I' ? '#ebbd34' : 'red',
            }}
          />
          ({row.status})
        </div>
      ),
      filterable: true,
      searchable: true,
      sortable: true,
    },
    {
      name: '',
      field: '',

      renderFunction: (row: any) => (
        <Stack direction="row" spacing={1}>
          <Button onClick={handleOpenDetailMerchantDialog(ACTIONS.EDIT, row.id)} color="primary">
            <AiOutlineEye />
          </Button>
          <DeleteButton fieldId={row.id} onDelete={handleReload} fetcher={merchantService.remove} />
          <Button onClick={() => setOpenMemberListDialog(true)} color="primary">
            <AiOutlineUser />
          </Button>
        </Stack>
      ),
    },
  ];

  const handleOpenDetailMerchantDialog = (action: ACTIONS, id?: string | number) => () => {
    setOpenDialog(true);
    setAction(action);
    setSelected(id);
  };

  const onSubmitSuccess = (responseData: any, error?: string) => {
    let temp = [...rows];
    let editedIndex = temp.findIndex((value) => value.id === responseData.id);
    if (editedIndex !== -1) {
      temp[editedIndex] = {
        id: responseData.id,
        name: responseData.name,
        status: responseData.status,
      };
    }
    handleDataChange({ ...data, data: [...temp] } as AxiosResponse<Array<IMerchant>>);
    setOpenDialog(false);
  };
  if (loadingError && !rows) {
    return <div>{loadingError}</div>;
  }
  return (
    <Container style={{ marginTop: 16 }}>
      <Stack direction="row" spacing={2} style={{ marginBottom: 16 }} alignItems="center">
        <h4 className="h4">Merchant Management</h4>
        <Button onClick={() => handleOpenDetailMerchantDialog(ACTIONS.ADD)()} color="primary">
          <AiOutlinePlus />
          <span style={{ textTransform: 'none', marginLeft: 2 }}>Add</span>
        </Button>
      </Stack>

      <Table
        loading={loading}
        indexField="id"
        columns={columns}
        rows={rows}
        // onAddSortByAsc={(field: string) => handleAddSort(field)}
        // onAddSortByDesc={(field: string) => handleAddSort(field, true)}
        // onRemoveSortBy={handleRemoveSort}
        // onSearch={handleSearch}
        hover
      />
      <MerchantFormDialog
        fieldId={selected}
        action={action}
        openDialog={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmitSuccess={onSubmitSuccess}
      />
      <MerchantMemberListDialog
        merchantId={1}
        openDialog={openMemberListDialog}
        onClose={() => setOpenMemberListDialog(false)}
      />
    </Container>
  );
};

export default MerchantManagement;
