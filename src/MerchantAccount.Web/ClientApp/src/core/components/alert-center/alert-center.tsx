import CloseButton from 'src/core/components/close-button/close-button';
import Toast from 'src/core/components/toast/toast';
import { useAlert } from 'src/core/hooks/alert-context';

const AlertCenter = () => {
  const { show, setShow, message, type } = useAlert();
  return (
    <Toast
      placement={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      className="mt-3"
      open={show}
      delay={1000}
      onClose={() => setShow(false)}
      color={type as any}
      autoHide
    >
      <Toast.Header>
        Action <CloseButton className="ms-auto" dismiss="toast" />
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default AlertCenter;
