import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import FuseAnimate from '@fuse/core/FuseAnimate';

import { Link, useHistory } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Typography, Grid } from '@material-ui/core';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const listRedux = useSelector(({ list }) => list);
	const [list, setList] = useState({});

	useEffect(() => {
		if (listRedux) {
			setList(listRedux);
		}
	}, [listRedux]);

	return <PageCardedHeader link="/list" title={list?.title || 'Novo Item'} textBack="Lista" />;
}

export default Header;
