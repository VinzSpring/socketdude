import { ipcRenderer, remote } from 'electron';
import Project from '@/structs/project';
import BufferedSocket from '@/structs/buffered-socket';
import { Activator, ResponseHandler } from '@/structs/response-handler';
import { ChatMessage } from '@/structs/chat-message';
import fs from 'fs';

const win = remote.getCurrentWindow();


// TODO: autoload last file
class VuexStore {
    private store: any;

    constructor(store: any) {
        this.store = store;
        this.registerListener();
    }

    private registerListener() {
        // listen for open event trigged through electron menu
        ipcRenderer.on('open', async () => {
            // check if has changed
            if (this.store.state.filePath) {
                // already opended file
                const hasChanged = await this.hasChanged(this.store.state.projects, this.store.state.filePath);
                if (hasChanged) {
                    const buttonIndex = remote.dialog.showMessageBox({
                        title: 'SocketDude',
                        message: 'Do you want to save the changes you made?',
                        buttons: ['Don\'t Save', 'Cancel', 'Save'],
                    });
                    if (buttonIndex === 2) {
                        await this.save();
                    }
                }
            } else {
                if (this.store.state.projects.length > 0) {
                    const buttonIndex = remote.dialog.showMessageBox({
                        title: 'SocketDude',
                        message: 'Do you want to save the changes you made?',
                        buttons: ['Don\'t Save', 'Cancel', 'Save'],
                    });
                    if (buttonIndex === 2) {
                        await this.save();
                    }
                }
            }


            let path = remote.dialog.showOpenDialog({ properties: ['openFile'] });
            if (path) {
                // @ts-ignore
                path = path[0];
                // load projects
                try {
                    // @ts-ignore
                    const projects = await this.read(path);
                    const serializedProjects = this.serialize(projects);
                    this.store.replaceState({ ...this.store.state, projects: serializedProjects, filePath: path });
                } catch (error) {
                    // failed
                }
            }
        });

        // listen for save event trigged through electron menu
        ipcRenderer.on('save', (event, filename) => {
            this.save();
        });

        //
        window.onbeforeunload = async (event) => {
            event.returnValue = false;

            // check if file is opened
            if (this.store.state.filePath) {
                // already opended file
                const hasChanged = await this.hasChanged(this.store.state.projects, this.store.state.filePath);
                if (hasChanged) {
                    const buttonIndex = remote.dialog.showMessageBox({
                        title: 'SocketDude',
                        message: 'Do you want to save the changes you made?',
                        buttons: ['Don\'t Save', 'Cancel', 'Save'],
                    });
                    switch (buttonIndex) {
                        case 0:
                            win.destroy();
                            break;
                        case 2:
                            // TODO: async save and then close
                            await this.save();
                            win.destroy();
                            break;
                        default:
                        // nothing
                    }
                } else {
                    win.destroy();
                }
                // this.save();
            } else {
                if (this.store.state.projects.length > 0) {
                    const buttonIndex = remote.dialog.showMessageBox({
                        title: 'SocketDude',
                        message: 'Do you want to save the changes you made?',
                        buttons: ['Don\'t Save', 'Cancel', 'Save'],
                    });
                    switch (buttonIndex) {
                        case 0:
                            win.destroy();
                            break;
                        case 2:
                            // TODO: async save and then close
                            await this.save();
                            win.destroy();
                            break;
                        default:
                        // nothing
                    }
                } else {
                    win.destroy();
                }
            }
        };

    }

    private hasChanged(data: any, path: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            const fileData = await this.read(path);
            resolve(JSON.stringify(fileData) !== JSON.stringify(this.deserialize(data)));
        });
    }

    private read(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) { reject(err); }
                try {
                    resolve(JSON.parse(data.toString()));
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    private write(data: any, path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(data), (err) => {
                if (err) { reject(err); }
                resolve();
            });
        });
    }

    private save() {
        const existingFilePath = this.store.state.filePath;
        const path = existingFilePath ? existingFilePath : remote.dialog.showSaveDialog({});
        const projects = this.deserialize(this.store.state.projects);
        this.write(projects, path);
        this.store.replaceState({...this.store.state, filePath: path});
    }
    // TODO verify type!
    private deserialize(data: any): Project {
        return data.map((project) => ({
            ...project, sockets: project.sockets.map((socket) => ({
                ...socket, activators: socket.activators.map((activator) => {
                    if (activator.regex) { return { ...activator, regex: activator.regex.toString() }; }
                    return activator;
                }),
            })),
        }));
    }
    // TODO verify type!
    private serialize(data: any): Project {
        return data.map((project) => {
            return Object.assign(new Project(), {
                ...project, sockets: project.sockets.map((socket) => {
                    // tslint:disable-next-line
                    return Object.assign(new BufferedSocket, {
                        ...socket,
                        // @ts-ignore
                        messages: socket.messages.map((message) => Object.assign(new ChatMessage(), {
                            ...message,
                            date: Object.assign(new Date(), message.date),
                            dateSent: Object.assign(new Date(),
                            message.dateSent),
                        })),
                        // @ts-ignore
                        activators: socket.activators.map((activator) => {
                            const regexStr = activator.regex;
                            // @ts-ignore
                            return Object.assign(new Activator(), {
                                ...activator,
                                regex: regexStr ? new RegExp(regexStr.slice(1, regexStr.length - 1)) : null,
                                handler: Object.assign(new ResponseHandler(), activator.handler),
                            });
                        }),
                    });
                }),
            });
        });
    }
}

export default () => {
    return (store) => {
        const vuexStore = new VuexStore(store);
    };
};
