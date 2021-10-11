import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';

import TableComponent from 'app/fuse-layouts/shared-components/table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import { getAll, selectAll } from '../store/messagesSlice';

const columns = [
	{
		id: 'title',
		align: 'left',
		disablePadding: false,
		label: 'None',
		sort: true
	},
	{
		id: 'detail',
		align: 'left',
		disablePadding: false,
		label: 'Discrição',
		sort: false
	}
];

export default function Message() {
	const history = useHistory();
	const dispatch = useDispatch();
	const messagesRedux = useSelector(selectAll);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	function handleClick(value) {
		history.push(`/message/${value.uid}`);
	}

	function handleClickNew() {
		history.push(`message/new`);
	}

	useEffect(() => {
		setLoading(true);
		dispatch(getAll());
		console.log('2', getAll());
	}, []);

	useEffect(() => {
		if (messagesRedux) {
			setLoading(false);
			if (messagesRedux.length) {
				const parseMessages = messagesRedux.map(item => {
					return {
						...item
					};
				});
				setData(parseMessages);
			}
		}
	}, [messagesRedux]);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden rounded-t-12',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 white'
			}}
			header={<PageCardedHeader title="Messagens" buttonTitle="ADICIONAR ITEM" buttonAction={handleClickNew} />}
			content={<TableComponent columns={columns} data={data} action={handleClick} />}
			innerScroll
		/>
	);
}
