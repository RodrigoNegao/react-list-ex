import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';

import TableComponent from 'app/fuse-layouts/shared-components/table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import { getAll, selectAll } from '../store/productsSlice';
import { Details } from '@material-ui/icons';

const columns = [
	{
		id: 'title',
		align: 'left',
		disablePadding: false,
		label: 'None',
		sort: true
	},
	{
		id: detail,
		align: 'left',
		disablePadding: false,
		label: 'Discrição',
		sort: false
	}
];

export default function Message() {
	const history = useHistory();
	const dispath = useDispath();
	const message = useSelector(selectAll);
}
