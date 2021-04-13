/* eslint-disable */
import Project from '@/structs/project';
import BufferedSocket from '@/structs/buffered-socket';
import { Activator, ResponseHandler } from '@/structs/response-handler';
import { ChatMessage } from '@/structs/chat-message';
import { Store } from 'vuex'

// @ts-ignore
const ipcRenderer = window.ipcRenderer;

// TODO: autoload last file
class VuexStore {
    private store: Store<any>;

    constructor(store: Store<any>) {
        this.store = store;
        // register listener only when ipcRenderer is defined
        if(ipcRenderer) {
            this.registerListener();
        }
    }

    private registerListener() {
        // listen for open event trigged through electron menu
        ipcRenderer.on('open', async () => {
            // check if has changed, save already opened file
            if (this.store.state.filePath) {
                // already opended file
                const hasChanged = await this.hasChanged(this.store.state.projects, this.store.state.filePath);
                if (hasChanged) {
                    ipcRenderer.send('vuex-electron', {type: 'SAVE_DIALOG_BEFORE_OPEN'})
                }
            } else {
                if (this.store.state.projects.length > 0) {
                    ipcRenderer.send('vuex-electron', {type: 'SAVE_DIALOG_BEFORE_OPEN'})
                }
            }


            ipcRenderer.send('vuex-electron', {type: 'SHOW_OPEN_DIALOG'})
        });

        ipcRenderer.on('vuex-electron', async (_event: Event, {type, payload}: {type: string, payload: any}) => {
            let buttonIndex
            let path
            let projects
            switch(type) {
                case 'SAVE_DIALOG_BEFORE_OPEN':
                    buttonIndex = payload;
                    if (buttonIndex === 2) {
                        this.save();
                    }
                    break;
                case 'SAVE_DIALOG_BEFORE_CLOSE':
                    buttonIndex = payload;
                    console.log(buttonIndex)
                    switch (buttonIndex) {
                        case 0:
                            return ipcRenderer.send('vuex-electron', {type: 'CLOSE_WIN'});
                        case 2:
                            // TODO: async save and then close
                            this.save();
                            return ipcRenderer.send('vuex-electron', {type: 'CLOSE_WIN'});
                    }
                case 'SHOW_SAVE_DIALOG':
                    path = payload
                    projects = this.deserialize(this.store.state.projects);
                    ipcRenderer.send('vuex-electron', {type: 'WRITE', payload: {data: projects, path}});
                    return this.store.replaceState({...this.store.state, filePath: path});
                case 'SHOW_OPEN_DIALOG':
                    path = payload
                    if (path) {
                        path = path[0];
                        // load projects
                        ipcRenderer.send('vuex-electron', {type: 'READ', payload: { path }});
                    }
                case 'READ':
                    projects = payload
                    const serializedProjects = this.serialize(projects);
                    this.store.replaceState({ ...this.store.state, projects: serializedProjects, filePath: path });
            }
        }) 

        // listen for save event trigged through electron menu
        ipcRenderer.on('save', () => {
            this.save();
        });

        //
        window.onbeforeunload = async (event: Event) => {
            event.returnValue = false;

            // check if file is opened
            if (this.store.state.filePath) {
                // already opended file
                const hasChanged = await this.hasChanged(this.store.state.projects, this.store.state.filePath);
                if (hasChanged) {
                    ipcRenderer.send('vuex-electron', {type: 'SAVE_DIALOG_BEFORE_CLOSE'});
                } else {
                    ipcRenderer.send('vuex-electron', {type: 'CLOSE_WIN'});
                }
                // this.save();
            } else {
                if (this.store.state.projects.length > 0) {
                    ipcRenderer.send('vuex-electron', {type: 'SAVE_DIALOG_BEFORE_CLOSE'});
                } else {
                    ipcRenderer.send('vuex-electron', {type: 'CLOSE_WIN'});
                }
            }
        };

    }

    private hasChanged(data: any, path: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            ipcRenderer.send('vuex-electron', {type: 'READ', payload: {
                path,
                callback: (fileData: any) => {
                    console.log(fileData)
                    resolve(JSON.stringify(JSON.parse(JSON.stringify(fileData))) !== JSON.stringify(JSON.parse(JSON.stringify(this.deserialize(data)))));
                }
            }});
        });
    }

    private save() {
        const path = this.store.state.filePath;
        if(path) {
            const projects = this.deserialize(this.store.state.projects);
            ipcRenderer.send('vuex-electron', {type: 'WRITE', payload: {data: projects, path}});
            this.store.replaceState({...this.store.state, filePath: path});
        } else {
            ipcRenderer.send('vuex-electron', {type: 'SHOW_SAVE_DIALOG'});
        }
    }

    // TODO verify type!
    private deserialize(data: any): Project {
        // deep clone store
        return JSON.parse(JSON.stringify(data.map((project: Project) => ({
            ...project,
            sockets: project.sockets.map((socket: BufferedSocket) => ({
                ...socket,
                activators: socket.activators.map((activator: Activator) => ({
                    ...activator,
                    regex: activator.regex?.toString(),
                })),
            })),
        }))))
    }

    // TODO verify type!
    private serialize(data: Project[]): Project[] {
        return data.map((project: Project) => {
            return Object.assign(new Project(), {
                ...project, sockets: project.sockets?.map((socket) => {
                    // tslint:disable-next-line
                    return Object.assign(new BufferedSocket, {
                        ...socket,
                        // @ts-ignore
                        messages: socket.messages.map((message) => Object.assign(new ChatMessage(), {
                            ...message,
                            //date: Object.assign(new Date(), message.date),
                            dateSent: Object.assign(new Date(),
                            message.dateSent),
                        })),
                        activators: socket.activators.map((activator) => {
                            const regexStr = activator.regex?.toString();
                            const regex = regexStr ? new RegExp(regexStr.slice(1, regexStr.length - 1)) : null;
                            const handler = Object.assign(new ResponseHandler(), activator.handler);
                            handler.setMode(handler.mode)
                            // @ts-ignore
                            return Object.assign(new Activator(), {
                                ...activator,
                                regex,
                                handler,
                            });
                        }),
                    });
                }),
            });
        });
    }
}

export default () => {
    return (store: Store<any>): void => {
        new VuexStore(store);
    };
};
