import XMark from "@/icons/XMark";
import "../../../styles/admin/confirmations.css";
import { deleteSneakerColorById } from "@/requests/SneakersRequest";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const DeleteSneakerColorConfirmation = ({ id, sneakerColorName, closeConfirmation }) => {
  const router = useRouter();
  const deleteSneakerColor = async() => {
    toast.promise(deleteSneakerColorById(id), {
      loading: 'Deleting sneaker color...',
      success: ()=>{
        closeConfirmation();
        location.reload();
        return 'Sneaker color deleted successfully'
      },
      error: 'Error when deleting sneaker color',
    })
  };

  return (
    <div className="modal-confirmation-container">
      <div className="modal-confirmation-sub-container space top">
        <h2 className="modal-confirmation-title">delete {sneakerColorName}?</h2>
        <button onClick={closeConfirmation}>
          <XMark />
        </button>
      </div>
      <p>
        Deleting this sneaker color will result in the permanent loss of all
        associated information. There will be no chance to recover the data once
        the deletion is completed.
      </p>
      <div className="modal-confirmation-sub-container right">
        <button
          className="general-button white auto"
          onClick={closeConfirmation}
        >
          CANCEL
        </button>
        <button onClick={deleteSneakerColor} className="general-button auto">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default DeleteSneakerColorConfirmation;
