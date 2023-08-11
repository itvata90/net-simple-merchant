import { AxiosResponse } from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { AiOutlineEye, AiOutlineUser } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import merchantService from 'src/api/merchant-service';
import Button from 'src/core/components/button/button';
import Container from 'src/core/components/container/container';
import Stack from 'src/core/components/stack/stack';
import Table from 'src/core/components/table-data/table-data';
import useSearch from 'src/core/hooks/use-search';
import { Column } from 'src/core/interfaces/components';
import { IMerchant } from 'src/interfaces/merchant';
import DeleteButton from 'src/shared/demo-management/delete-button';
import MerchantFormDialog, { ACTIONS } from 'src/shared/demo-management/merchant-form-dialog';
import MerchantMemberListDialog from 'src/shared/demo-management/merchant-member-list-dialog';

const MerchantManagement = (props: any) => {
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
    handleLimitChange,
    handleDataChange,
    handleReload,
  } = useSearch<AxiosResponse<Array<IMerchant>>>(merchantService.get, {
    getPaginationString: (page: any, limit: any) => `offset=${(page - 1) * limit}&limit=${limit}`,
    getSortingString: (fields) =>
      Object.entries(fields).reduce(
        (acc, [fieldName, orderBy]) => (acc += 'sortBy=' + fieldName + '&order=' + orderBy),
        '',
      ),
    limit: 5,
    page: 1,
  });

  const rows = useMemo(() => data?.data ?? [], [data]);
  const count = typeof data?.headers?.get === 'function' ? data.headers.get('X-Total-Count') : 0;
  const maxPage = useMemo(() => (!count ? 1 : Math.ceil(Number(count) / limit)), [count]);

  const columns: Column[] = [
    { name: 'Id', field: 'id' },
    { name: 'Name', field: 'name' },
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
    },
    {
      name: '',
      field: '',

      renderFunction: (row: any) => (
        <Stack direction="row" spacing={1} justifyContent={'end'}>
          <Button
            role="edit-button"
            onClick={handleOpenDetailMerchantDialog(ACTIONS.EDIT, row.id)}
            color="primary"
            className="d-flex"
          >
            <AiOutlineEye />
          </Button>
          <DeleteButton fieldId={row.id} onDelete={handleReload} fetcher={merchantService.remove} />
          <Button
            role="open-member-button"
            onClick={() => setOpenMemberListDialog(true)}
            color="primary"
            className="d-flex"
          >
            <AiOutlineUser />
          </Button>
        </Stack>
      ),
    },
  ];

  const pageLimits = useMemo(() => [5, 10, 15], []);

  const handleOpenDetailMerchantDialog = (action: ACTIONS, id?: string | number) => () => {
    setOpenDialog(true);
    setAction(action);
    setSelected(id);
  };

  const onSubmitSuccess = useCallback(
    (responseData: any, _error?: string) => {
      let temp = [...rows];
      let editedIndex = temp.findIndex((value) => value.id === responseData.id);
      if (editedIndex !== -1) {
        temp[editedIndex] = {
          id: responseData.id,
          name: responseData.name,
          status: responseData.status,
        };
        handleDataChange({ ...data, data: [...temp] } as AxiosResponse<Array<IMerchant>>);
      } else {
        handleReload();
      }
      setOpenDialog(false);
    },
    [rows],
  );

  if (loadingError && !data) {
    return <div {...props}>{loadingError}</div>;
  }
  return (
    <Container style={{ marginTop: 16 }} {...props}>
      <Stack direction="row" spacing={2} style={{ marginBottom: 16 }} alignItems="center" justifyContent="between">
        <h4 className="h4">Merchant Management</h4>
        <Button
          role="add-button"
          onClick={() => handleOpenDetailMerchantDialog(ACTIONS.ADD)()}
          color="primary"
          className="d-flex align-items-center gap-1"
        >
          <BsPlusCircle />
          <span>Add</span>
        </Button>
      </Stack>

      <Table
        inlineEditing={false}
        renderHeader={() => <></>}
        currentPage={page}
        loading={loading}
        indexField="id"
        columns={columns}
        rows={rows}
        pageLimits={pageLimits}
        pageCount={maxPage}
        onPageChange={(page) => handlePageChange(+page)}
        onLimitChange={(limit) => {
          handleLimitChange(+limit);
        }}
        fixedNumberRows
        filterOnChange
        hover
      />
      <MerchantFormDialog
        fieldId={selected}
        action={action}
        openDialog={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmitSuccess={onSubmitSuccess}
      />
      {openMemberListDialog && (
        <MerchantMemberListDialog
          merchantId={1}
          openDialog={openMemberListDialog}
          onClose={() => setOpenMemberListDialog(false)}
        />
      )}
    </Container>
  );
};

export default MerchantManagement;
