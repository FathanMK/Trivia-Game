import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  Spinner,
} from '@gluestack-ui/themed';

interface IAlertDialogLoadingProps {
  isOpen?: boolean;
}

export default function AlertDialogLoading({
  isOpen = false,
}: IAlertDialogLoadingProps) {
  return (
    <AlertDialog isOpen={isOpen}>
      <AlertDialogBackdrop />
      <AlertDialogContent
        w="$16"
        h="$16"
        alignItems="center"
        justifyContent="center">
        <Spinner size="large" color="$backgroundDark950" />
      </AlertDialogContent>
    </AlertDialog>
  );
}
