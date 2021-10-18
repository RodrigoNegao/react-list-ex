import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const messageRedux = useSelector(({ message }) => message);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (messageRedux) {
			setMessage(messageRedux);
		}
	}, [messageRedux]);

	return <PageCardedHeader link="/messages" title={message?.title || 'New message'} textBack="Messages" />;
}

export default Header;
