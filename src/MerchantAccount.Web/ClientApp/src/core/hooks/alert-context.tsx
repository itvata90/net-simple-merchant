import { createContext, useContext, useState } from 'react';

export const enum STATES {
  SUCCESS = 'success',
  ERROR = 'danger',
}

interface ContextProps {
  type: STATES;
  show: boolean;
  setShow: (value: boolean) => void;
  message: string;
  showMessage: (incomingMessage: string, type: STATES) => void;
}

const AlertContext = createContext<ContextProps>({
  type: STATES.SUCCESS,
  show: false,
  setShow: (value: boolean) => {},
  message: '',
  showMessage: (incomingMessage: string, type: STATES) => {},
});

export const AlertProvider = ({ children }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<STATES>(STATES.SUCCESS);
  const [message, setMessage] = useState<string>('');

  const showMessage = (incomingMessage: string, type: STATES) => {
    setMessage(incomingMessage);
    setType(type);
    setShow(true);
  };

  return (
    <AlertContext.Provider
      value={{
        type,
        show,
        setShow,
        message,
        showMessage,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
