import { AxiosResponse } from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import memberService from 'src/api/member-service';
import Button from 'src/core/components/button/button';
import Container from 'src/core/components/container/container';
import Stack from 'src/core/components/stack/stack';
import Table from 'src/core/components/table-data/table-data';
import useSearch from 'src/core/hooks/use-search';
import { Column } from 'src/core/interfaces/components';
import { IMember } from 'src/interfaces/member';
import DeleteButton from 'src/shared/demo-management/delete-button';
import MemberFormDialog, { ACTIONS } from 'src/shared/demo-management/member-form-dialog';

const MemberManagement = (props: any) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | number | undefined>(undefined);
  const [action, setAction] = useState<ACTIONS>(ACTIONS.ADD);

  const {
    data,
    error: loadingError,
    loading,
    page,
    limit,
    handlePageChange,
    handleDataChange,
    handleReload,
    handleLimitChange,
  } = useSearch<AxiosResponse<Array<IMember>>>(memberService.get, {
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

  const columns: Array<Column> = [
    { name: 'Id', field: 'id' },
    { name: 'Username', field: 'username' },
    {
      name: 'First Name',
      field: 'firstName',

      editable: true,
      type: 'date',
    },
    {
      name: 'Last Name',
      field: 'lastName',
    },

    {
      name: '',
      field: '',
      renderFunction: (row: any) => (
        <Stack direction="row" spacing={1} justifyContent={'end'}>
          <Button
            role="edit-button"
            onClick={handleOpenDetailMemberDialog(ACTIONS.EDIT, row.id)}
            color="primary"
            className="d-flex"
          >
            <AiOutlineEye />
          </Button>
          <DeleteButton fieldId={row.id} onDelete={handleReload} fetcher={memberService.remove} />
        </Stack>
      ),
    },
  ];

  const pageLimits = useMemo(() => [5, 10, 15], []);

  const handleOpenDetailMemberDialog = (action: ACTIONS, id?: string | number) => () => {
    setOpenDialog(true);
    setAction(action);
    setSelected(id);
  };

  const onSubmitSuccess = useCallback(
    (responseData: any, error?: string) => {
      let temp = [...rows];
      let editedIndex = temp.findIndex((value) => value.id === responseData.id);
      if (editedIndex !== -1) {
        temp[editedIndex] = {
          id: responseData.id,
          username: responseData.username,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
        };
        handleDataChange({ ...data, data: [...temp] } as AxiosResponse<Array<IMember>>);
      } else {
        handleReload();
      }
      setOpenDialog(false);
    },
    [rows],
  );

  if (loadingError) {
    return <div {...props}>{loadingError}</div>;
  }
  return (
    <Container style={{ marginTop: 16 }} {...props}>
      <Stack direction="row" spacing={2} style={{ marginBottom: 16 }} alignItems="center" justifyContent="between">
        <h4>Member Management</h4>
        <Button
          role="add-button"
          onClick={() => handleOpenDetailMemberDialog(ACTIONS.ADD)()}
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
      <MemberFormDialog
        fieldId={selected}
        action={action}
        openDialog={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmitSuccess={onSubmitSuccess}
      />
    </Container>
  );
};

export default MemberManagement;
