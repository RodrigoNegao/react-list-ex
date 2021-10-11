import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import _ from '@lodash';

import Formsy from 'formsy-react';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeepCompareEffect } from '@fuse/hooks';

import { showMessage } from 'app/store/fuse/messageSlice';

import objectsKeysEquals from 'app/utils/validations/objectsKeysEquals';
import ButtonDefault from 'app/fuse-layouts/shared-components/button-default/ButtonDeafault';
import { Grid, InputAdornment, MenuItem } from '@material-ui/core';

import { saveOne, newData, getOne, updateOne, updateResponse, updateLoading } from '../store/messageSlice';

function Content() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const history = useHistory();
	const messageRedux = useSelector(({ message }) => message);

	const [contents, setContents] = useState([]);
	const [selectedContents, setSelectedContents] = useState([]);
	const [isFormValid, setIsFormValid] = useState(false);
	const [loading, setLoading] = useState(false);

	// console.log('routeParams', routeParams);

	useDeepCompareEffect(() => {
		function updateState() {
			const { id } = routeParams;
			if (id === 'new') {
				dispatch(newData());
			} else {
				setLoading(true);
				dispatch(getOne(id));
			}
		}

		updateState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (messageRedux) {
			if (loading) {
				setLoading(messageRedux.loading);
			}
		}
	}, [messageRedux]);

	useEffect(() => {
		function clear() {
			const { id } = routeParams;
			setIsFormValid(false);

			if (id === 'new') {
				dispatch(newData());
				history.push('/messages/new');
			} else {
				dispatch(updateResponse({ message: '', success: false }));
			}
		}

		if (messageRedux?.message && !messageRedux?.success) {
			dispatch(
				showMessage({
					message: messageRedux?.message,
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'error'
				})
			);

			clear();
		}
		if (messageRedux?.message && messageRedux?.success) {
			dispatch(
				showMessage({
					message: messageRedux?.message,
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'success'
				})
			);

			clear();
		}
	}, [messageRedux.success, messageRedux.message]);

	function canBeSubmitted(modal) {
		if (modal) {
			let diff = false;

			if (modal === true) {
				diff = isFormValid;
			} else {
				diff = objectsKeysEquals(modal, messageRedux);
			}
			const diffContents = messageRedux?.contents?.length !== selectedContents.length;

			if ((diff || diffContents) && !isFormValid) {
				setIsFormValid(true);
			}

			if (!diff && !diffContents && isFormValid) {
				setIsFormValid(false);
			}

			if ((diff && !diffContents) || (!diff && diffContents && !isFormValid)) {
				setIsFormValid(true);
			}
		}
	}

	function handleSubmit(modal) {
		setLoading(true);
		dispatch(updateLoading(true));

		if (messageRedux?.id !== 'new') {
			dispatch(updateOne({ data: modal, id: messageRedux?.id }));
		} else {
			dispatch(saveOne(modal));
		}
	}

	function handleSelect(value) {
		setSelectedContents(value);
	}
	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	if (!messageRedux?.id && loading) {
		return <FuseLoading />;
	}

	return (
		<Grid container item xs={12}>
			<Grid item xs={12}>
				<Formsy
					onValidSubmit={handleSubmit}
					onChange={canBeSubmitted}
					onValid={enableButton}
					onInvalid={disableButton}
				>
					<TextFieldFormsy
						className="mb-16 w-full"
						label="Nome"
						type="text"
						name="title"
						value={messageRedux.title}
						variant="outlined"
						validations={{ minLength: 3 }}
						validationErrors={{ minLength: 'Preencha o campo com o nome' }}
						fullWidth
						autoFocus
						required
					/>
					<TextFieldFormsy
						className="mb-16 w-full"
						label="Descrição"
						type="text"
						name="detail"
						value={messageRedux.detail}
						variant="outlined"
						validations={{ minLength: 3 }}
						validationErrors={{ minLength: 'Preencha o campo com a descrição' }}
						fullWidth
						required
					/>
					<Grid container item className="flex justify-end items-end">
						<Grid item xs={7} sm={5} md={4} lg={3} xl={2}>
							<ButtonDefault
								fullWidth
								type="submit"
								title="Salvar"
								loading={loading}
								disabled={!isFormValid}
							/>
						</Grid>
					</Grid>
				</Formsy>
			</Grid>
		</Grid>
	);
}

export default Content;
