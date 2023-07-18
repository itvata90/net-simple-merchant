import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { AiOutlineEye, AiOutlinePlus } from 'react-icons/ai';
import memberService from 'src/api/member-service';
import Button from 'src/core/components/button/button';
import Container from 'src/core/components/container/container';
import Stack from 'src/core/components/stack/stack';
import Table from 'src/core/components/table/table-data';
import useSearch from 'src/core/hooks/use-search';
import { Column } from 'src/core/interfaces/components';
import { IMember } from 'src/interfaces/member';
import DeleteButton from 'src/shared/demo-management/delete-button';
import MemberFormDialog, { ACTIONS } from 'src/shared/demo-management/member-form-dialog';

const MemberManagement = () => {
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
    handleAddSort,
    handleRemoveSort,
    handleSearch: handleFilter,
    handleDataChange,
    handleReload,
    handleLimitChange,
  } = useSearch<AxiosResponse<Array<IMember>>>(
    memberService.get,
    (page: any, limit: any) => `offset=${(page - 1) * limit}&limit=${limit}`,
    (fields) =>
      Object.entries(fields).reduce(
        (acc, [fieldName, orderBy]) => (acc += 'sortBy=' + fieldName + '&order=' + orderBy),
        '',
      ),
  );
  const rows = data?.data ?? [];
  const count = typeof data?.headers?.get === 'function' ? data.headers.get('X-Total-Count') : 0;
  const maxPage = !count ? 1 : Math.ceil(Number(count) / limit);

  console.log(count, maxPage);
  const columns: Array<Column> = [
    { name: 'Id', field: 'id', searchable: true, sortable: true, filterable: true },
    { name: 'Username', field: 'username', searchable: true, sortable: true, filterable: true },
    {
      name: 'First Name',
      field: 'firstName',
      searchable: true,
      sortable: true,
      filterable: true,
      editable: true,
      type: 'date',
    },
    {
      name: 'Last Name',
      field: 'lastName',
      searchable: true,
      sortable: true,
      filterable: true,
    },

    {
      name: '',
      field: '',
      searchable: false,
      sortable: false,
      renderFunction: (row: any) => (
        <Stack direction="row" spacing={1}>
          <Button onClick={handleOpenDetailMemberDialog(ACTIONS.EDIT, row.id)} color="primary">
            <AiOutlineEye />
          </Button>
          <DeleteButton fieldId={row.id} onDelete={handleReload} fetcher={memberService.remove} />
        </Stack>
      ),
    },
  ];
  const handleOpenDetailMemberDialog = (action: ACTIONS, id?: string | number) => () => {
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
        username: responseData.username,
        firstName: responseData.firstName,
        lastName: responseData.lastName,
      };
    }
    handleDataChange({ ...data, data: [...temp] } as AxiosResponse<Array<IMember>>);
    setOpenDialog(false);
  };

  if (loadingError && !rows) {
    return <div>{loadingError}</div>;
  }

  return (
    <Container style={{ marginTop: 16 }}>
      <Stack direction="row" spacing={2} style={{ marginBottom: 16 }} alignItems="center">
        <h4 className="h4">Member Management</h4>
        <Button onClick={() => handleOpenDetailMemberDialog(ACTIONS.ADD)()} color="primary">
          <AiOutlinePlus />
          <span style={{ textTransform: 'none', marginLeft: 2 }}>Add</span>
        </Button>
      </Stack>

      <Table
        loading={loading}
        indexField="id"
        columns={columns}
        rows={rows}
        onSortChange={(field, action) =>
          action === 'none' ? handleRemoveSort(String(field)) : handleAddSort(String(field), action === 'desc')
        }
        pageLimits={[3, 4, 5, 6]}
        pageCount={maxPage}
        onPageChange={(page) => handlePageChange(+page)}
        onLimitChange={(limit) => {
          handleLimitChange(+limit);
        }}
        onFilterChange={(field, keyword) =>
          handleFilter(field, keyword instanceof Date ? keyword.toISOString() : JSON.stringify(keyword))
        }
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
