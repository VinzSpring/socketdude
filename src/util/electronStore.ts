import { app, remote, ipcRenderer } from 'electron';
import path from 'path';
import fs from 'fs';

export default class ElectronStore {
    private path: string;

    constructor() {
        const userDataPath = (app || remote.app).getPath('userData');
        this.path = path.join(userDataPath, 'projects.dude');
    }

    public write(data: object): void {
        fs.writeFileSync(this.path, JSON.stringify(data));
    }

    public read(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, (err, data) => {
                if (err) reject(err);
                try {
                    resolve(JSON.parse(data.toString()));
                } catch(err) {
                    reject(err);
                }
            });
        });
    }
}