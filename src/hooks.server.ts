import { Server as SocketIO } from 'socket.io';
import type { Handle } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('./treeData.json');
let treeData: (null | [string, string, string])[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.io) {
		const io = new SocketIO(event.locals.server);

		io.on('connection', (socket) => {
			socket.emit('init', treeData);

			socket.on('placeTree', ({ index, uuid, name, pfp }) => {
				if (treeData[index] === null) {
					treeData[index] = [uuid, name, pfp];
					fs.writeFileSync(DATA_FILE, JSON.stringify(treeData, null, 2));
					io.emit('treePlaced', { index, uuid });
				}
			});
		});

		event.locals.io = io;
	}

	return resolve(event);
};
