//planteflic-frontend/src/hooks/useToast.js

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const useToast = () => {
  const { t } = useTranslation();

  const showSuccess = (message, options = {}) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      className: 'toast-success',
      icon: '🌱',
      ...options
    });
  };

  const showError = (message, options = {}) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
      className: 'toast-error',
      icon: '❌',
      ...options
    });
  };

  const showLoading = (message, options = {}) => {
    return toast.loading(message, {
      position: 'top-right',
      className: 'toast-loading',
      icon: '🌿',
      ...options
    });
  };

  const showInfo = (message, options = {}) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#2196f3',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
      },
      ...options
    });
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  return {
    success: showSuccess,
    error: showError,
    loading: showLoading,
    info: showInfo,
    dismiss,
    messages: {
      plantAdded: () => showSuccess(t('toast.plantAdded')),
      plantUpdated: () => showSuccess(t('toast.plantUpdated')),
      plantDeleted: () => showSuccess(t('toast.plantDeleted')),
      loginSuccess: () => showSuccess(t('toast.loginSuccess')),
      registerSuccess: () => showSuccess(t('toast.registerSuccess')),
      logoutSuccess: () => showSuccess(t('toast.logoutSuccess')),
      error: (message) => showError(message || t('toast.error'))
    }
  };
};