import React, {createContext, useContext, useState} from 'react';
import {Spinner} from '../ui/spinner';
import {useToast} from '../ui/toast'; // 引入 Toast

const RequestContext = createContext<{
  loading: (loading: boolean) => void;
  toast: ReturnType<typeof useToast>; // 添加 toast 的类型
} | null>(null);

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (!context)
    throw new Error('useLoading must be used within a LoadingProvider');
  return context;
};

export type RequestProviderProps = {
  children: React.ReactNode;
};

export const RequestProvider: React.FC<RequestProviderProps> = ({children}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  return (
    <RequestContext.Provider value={{loading: setLoading, toast}}>
      {loading && <Spinner />}
      {children}
    </RequestContext.Provider>
  );
};
