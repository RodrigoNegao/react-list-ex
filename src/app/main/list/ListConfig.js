import { authRoles } from 'app/auth';
import React from 'react';

const ListConfig = {
	settings: {
		layout: {
			config: {
				mode: 'fullwidth',
				scroll: 'content',
				navbar: {
					display: true,
					folded: false,
					position: 'left'
				},
				toolbar: {
					display: true,
					style: 'fixed',
					position: 'below'
				},
				footer: {
					display: false,
					style: 'fixed',
					position: 'below'
				}
			}
		}
	},
	// auth: authRoles.admin,
	routes: [
		{
			path: '/list/:id',
			component: React.lazy(() => import('./show/List'))
		},
		{
			path: '/list',
			exact: true,
			component: React.lazy(() => import('./list/List'))
		}
	]
};

export default ListConfig;
