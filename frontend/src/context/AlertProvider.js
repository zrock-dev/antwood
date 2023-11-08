'use client';
import { createContext, useState, useEffect } from 'react';

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
	const alertTypes = {
		DANGER: 'danger',
		WARNING: 'warning',
		SUCCESS: 'success'
	};

	const [alert, setAlert] = useState({
		message: null,
		type: alertTypes.SUCCESS
	});

	const setDangerAlert = (message) => {
		setAlert({
			message,
			type: alertTypes.DANGER
		});
	};

	const setWaringAlert = (message) => {
		setAlert({
			message,
			type: alertTypes.WARNING
		});
	};

	const setSuccessAlert = (message) => {
		setAlert({
			message,
			type: alertTypes.SUCCESS
		});
	};

	useEffect(() => {
		if (document && alert.message) {
			const element = document.createElement('div');
			element.className = `alert ${alert.type}`;
			element.innerHTML = alert.message;
			document.body.appendChild(element);
			setTimeout(function () {
				element.style.display = 'none';
				setAlert({
					...alert,
					message: null
				});
			}, 4000);
		}
	}, [alert]);

	return (
		<AlertContext.Provider
			value={{
				setDangerAlert,
				setWaringAlert,
				setSuccessAlert
			}}
		>
			{children}
		</AlertContext.Provider>
	);
};

export default AlertProvider;
