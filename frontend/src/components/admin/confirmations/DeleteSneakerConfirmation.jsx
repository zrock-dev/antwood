import XMark from '@/icons/XMark';
import '../../../styles/admin/confirmations.css';
import { deleteSneakerById } from "@/requests/SneakersRequest";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const DeleteSneakerConfirmation = ({ id, sneakerName, closeConfirmation }) => {
	const router = useRouter();
	const deleteSneaker = async () => {
		toast.promise(deleteSneakerById(id), {
			loading: 'Deleting sneaker...',
			success: ()=>{
				closeConfirmation();
				if(window.location.pathname!=="/admin"){
				router.replace("/admin");
				}
				router.refresh();
				return 'Sneaker deleted successfully'
			},
			error: 'Error when deleting sneaker',
		})
	};

	return (
		<div className="modal-confirmation-container">
			<div className="modal-confirmation-sub-container space top">
				<h2 className="modal-confirmation-title">delete {sneakerName}?</h2>
				<button onClick={closeConfirmation}>
					<XMark />
				</button>
			</div>
			<p>
				Deleting this sneaker will result in the permanent loss of all
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
				<button onClick={deleteSneaker} className="general-button auto">
					DELETE
				</button>
			</div>
		</div>
	);
};

export default DeleteSneakerConfirmation;
