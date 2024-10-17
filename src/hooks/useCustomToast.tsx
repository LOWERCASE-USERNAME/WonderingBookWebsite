import { toast, Toaster } from 'react-hot-toast';

const useCustomToast = () => {
  const showToast = (variant: 'success' | 'error' | 'loading', message: string) => {
    switch (variant) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'loading':
        toast.loading(message);
        break;
    }
  };

  const getToaster = () => {
    return (
      <Toaster position="top-right" containerStyle={{
        textAlign: 'left',
      }} />
    )
  }

  return { showToast, getToaster };
};

export default useCustomToast;