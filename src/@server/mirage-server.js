/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { createServer, Model } from 'miragejs';

export default function makeServer({ environment = 'test' } = {}) {
	const server = createServer({
		environment,

		models: {
			user: Model,
			products: Model
		},

		seeds(server) {
			server.create('user', {
				id: 1,
				name: 'Administrator',
				login: 'admin@admin.com',
				password: '123123',
				shortcuts: []
			});

			server.create('product', {
				id: 1,
				title: 'Programa Starter FullStack',
				description: 'Programa para se tornar um desenvolvedor fullstack.',
				price: 1000,
				access_token: 'kjhasdkasdhiuhkajsb987gxs7'
			});
		},

		routes() {
			this.namespace = 'api';

			this.get('/users', schema => {
				return schema.users.all();
			});

			this.post('/login', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				const result = schema.users.findBy({ login: attrs.login, password: attrs.password });
				if (result) {
					return { success: true, data: { user: result, access_token: result.access_token } };
				}
				return { success: false, data: 'USER NOT FOUD' };
			});

			this.post('/auth/access-token', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				const result = schema.users.findBy({ access_token: attrs.access_token });
				if (result) {
					return { success: true, data: { user: result, access_token: result.access_token } };
				}
				return { success: false, data: 'USER NOT FOUD' };
			});

			this.post('/products', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);

				const result = schema.products.create(attrs);

				return { success: true, data: { product: result }, message: 'Produto cadastro com sucesso.' };
			});

			this.get('/products', schema => {
				const result = schema.products.all();
				return { success: true, data: { products: result.models } };
			});

			this.get('/products/:id', (schema, request) => {
				const { id } = request.params;

				const result = schema.products.find(id);
				if (result) {
					return { success: true, data: { product: result } };
				}
				return { success: false, data: 'PRODUCT NOT FOUD' };
			});

			this.put('/products/:id', (schema, request) => {
				const newAttrs = JSON.parse(request.requestBody);
				const { id } = request.params;
				const product = schema.products.find(id);

				product.update(newAttrs);
				if (product) {
					return { success: true, data: { product } };
				}
				return { success: false, data: 'PRODUCT NOT FOUD' };
			});
		}
	});

	return server;
}
