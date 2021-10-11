import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import FuseAnimate from '@fuse/core/FuseAnimate';

import { Link, useHistory } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Typography, Grid } from '@material-ui/core';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const messageRedux = useSelector(({ message }) => message);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (messageRedux) {
			setMessage(messageRedux);
		}
	}, [messageRedux]);

	return <PageCardedHeader link="/messages" title={message?.title || 'Nova Mensagem'} textBack="Mensagens" />;
}

export default Header;
