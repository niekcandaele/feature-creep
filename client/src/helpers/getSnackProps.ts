import { SnackbarProviderProps } from 'notistack';

export function getSnackProps(): Partial<SnackbarProviderProps> {
  return {
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    autoHideDuration: 5000,
    hideIconVariant: true,
  };
};
