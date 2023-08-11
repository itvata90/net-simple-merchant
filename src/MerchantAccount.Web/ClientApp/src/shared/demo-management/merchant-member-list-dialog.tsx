import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import merchantService from 'src/api/merchant-service';
import Button from 'src/core/components/button/button';
import Modal from 'src/core/components/modal/modal';
import Stack from 'src/core/components/stack/stack';
import Table from 'src/core/components/table-data/table-data';
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
    handleLimitChange,
  } = useSearch<AxiosResponse<Array<IMember>>>(
    (url: string, config: any) => merchantService.getMembers(merchantId, url, config),
    {
      getPaginationString: (page: any, limit: any) => `offset=${(page - 1) * limit}&limit=${limit}`,
      getSortingString: (fields) =>
        Object.entries(fields).reduce(
          (acc, [fieldName, orderBy]) => (acc += 'sortBy=' + fieldName + '&order=' + orderBy),
          '',
        ),
      limit: 5,
      page: 1,
    },
  );

  const rows = data?.data ?? [];
  const count = typeof data?.headers?.get === 'function' ? data.headers.get('X-Total-Count') : 0;
  const maxPage = !count ? 1 : Math.ceil(Number(count) / limit);

  const columns = [
    { name: 'Id', field: 'id' },
    { name: 'Username', field: 'username' },
    {
      name: 'First Name',
      field: 'firstName',
    },
    {
      name: 'Last Name',
      field: 'lastName',
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

  const pageLimits = useMemo(() => [5, 10, 15], []);
  return (
    <Modal data-testid="merchant-member-list" open={openDialog} onClose={onClose} animation backdrop size="lg">
      <Modal.Header className="d-flex">
        <h5 className="m-0">Members list</h5>{' '}
        <Button onClick={onClose} type="button" className="btn-close" aria-label="Close" size="sm" />
      </Modal.Header>

      <Modal.Body>
        <Table
          inlineEditing={false}
          renderHeader={() => <></>}
          currentPage={page}
          loading={loading}
          indexField="id"
          columns={columns}
          rows={rows}
          pageCount={maxPage}
          pageLimits={pageLimits}
          onPageChange={(page) => handlePageChange(+page)}
          onLimitChange={(limit) => {
            handleLimitChange(+limit);
          }}
          fixedNumberRows
          filterOnChange
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
