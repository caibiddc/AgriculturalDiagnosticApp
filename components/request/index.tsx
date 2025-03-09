import React, {createContext, useContext} from 'react';
import {useToast} from '../ui/toast'; // 引入 Toast

const RequestContext = createContext<{
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
  const toast = useToast();

  return (
    <RequestContext.Provider value={{toast}}>
      {children}
    </RequestContext.Provider>
  );
};
