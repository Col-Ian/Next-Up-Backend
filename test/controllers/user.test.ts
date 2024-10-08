import * as UserController from '../../src/controllers/user';
import { Request, Response } from 'express';

const mockRequest = (body: any) => {
	return {
		body: body,
	} as unknown as Request;
};

const mockResponse = () => {
	let res = {
		status: jest.fn(),
		json: jest.fn(),
	};
	res.status.mockReturnValue(res);
	res.json.mockReturnValue(res);
	return res as unknown as Response;
};

//
describe('createUser', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Will create user and return 200', () => {
		let req = mockRequest({ name: 'John Doe', email: 'john@doe.ca' });
		let res = mockResponse();

		const id = Math.floor(0.5 * 1000000);
		jest.spyOn(Math, 'random').mockReturnValue(0.5);

		UserController.createUser(req, res);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			status: 'success',
			data: {
				email: 'john@doe.ca',
				id: id,
				name: 'John Doe',
			},
		});
	});

	it('Will not create user and return 400 if no email is specified in the request', () => {
		let req = mockRequest({ name: 'John Doe' });
		let res = mockResponse();

		UserController.createUser(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'User data is not formatted correctly',
		});
	});
});

describe('deleteUser', () => {
	let req = mockRequest({ name: 'Testing Delete', email: 'test@delete.ca' });
	let res = mockResponse();

	const id = Math.floor(0.5 * 1000000);
	jest.spyOn(Math, 'random').mockReturnValue(0.5);

	beforeEach(() => {
		jest.clearAllMocks();
		UserController.createUser(req, res);
	});

	it('Will delete the user and return 200 if the user exists.', () => {
		UserController.deleteUser(req, res);
		expect(res.status).toHaveBeenCalledWith(204);
	});

	it.todo('Will return 400 if the id is invalid.');

	it.todo("Will return 400 if the user doesn't exist.");
});
