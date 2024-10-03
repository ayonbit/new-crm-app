// Dependencise

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-md w-full">
        <DialogTitle className="text-center font-bold">
          Confirm Action
        </DialogTitle>
        <p className="mt-4 text-center">{message}</p>
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            variant="custom"
            className="hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes
          </Button>
          <Button variant="custom" onClick={onClose}>
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
