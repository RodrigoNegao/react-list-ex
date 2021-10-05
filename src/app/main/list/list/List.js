import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';

import currencyFormatter from 'app/utils/formatter/currencyBrl';

import TableComponent from 'app/fuse-layouts/shared-components/table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import { getAll, selectAll } from '../store/listsSlice';

const columns = [
	{
		id: 'title',
		align: 'left',
		disablePadding: false,
		label: 'Nome',
		sort: true
	},
	{
		id: 'description',
		align: 'left',
		disablePadding: false,
		label: 'Descrição',
		sort: false
	},
	{
		id: 'price',
		align: 'left',
		disablePadding: false,
		label: 'Preço',
		sort: false
	}
];

export default function Lists() {
	const history = useHistory();
	const dispatch = useDispatch();
	const listsRedux = useSelector(selectAll);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	function handleClick(value) {
		history.push(`/list/${value.id}`);
	}

	function handleClickNew() {
		history.push(`/list/new`);
	}

	useEffect(() => {
		setLoading(true);
		dispatch(getAll());
	}, []);

	useEffect(() => {
		if (listsRedux) {
			setLoading(false);
			if (listsRedux.length) {
				const parseLists = listsRedux.map(item => {
					return {
						...item,
						price: currencyFormatter.format(item.price)
					};
				});
				setData(parseLists);
			}
		}
	}, [listsRedux]);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden rounded-t-12',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 white'
			}}
			header={<PageCardedHeader title="Lista" buttonTitle="ADICIONAR ITEM" buttonAction={handleClickNew} />}
			content={<TableComponent columns={columns} data={data} action={handleClick} />}
			innerScroll
		/>
	);
}
