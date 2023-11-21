import XMark from '@/icons/XMark';

const DeleteSneakerConfirmation = ({ id, sneakerName, closeConfirmation }) => {
	const deleteSneaker = () => {
		// delete sneaker using id
	};

	return (
		<div>
			<div>
				<h2>delete {sneakerName}?</h2>
				<button onClick={closeConfirmation}>
					<XMark />
				</button>
			</div>
			<p>
				Deleting this sneaker will result in the permanent loss of all
				associated information. There will be no chance to recover the data once
				the deletion is completed.
			</p>
			<div>
				<button onClick={closeConfirmation}>CANCEL</button>
				<button>DELETE</button>
			</div>
		</div>
	);
};

export default DeleteSneakerConfirmation;
