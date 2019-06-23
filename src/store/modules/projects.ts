import Project from '@/structs/project';
import BufferedSocket from '@/structs/buffered-socket';
import ElectronStore from '@/util/electronStore';
import { Activator, ResponseHandler } from '@/structs/response-handler';
import { ChatMessage } from '@/structs/chat-message';

const electronStore = new ElectronStore();

// initial state
const state = [] as Project[];

const mutations = {
    loadProjects(state: Project[], projects: Project[]) {
        // merge with state to prevent conflicts
        Object.assign(state, [...state, ...projects])
    },
    /**
     * Add a project
     * @param state Project[]
     * @param callback Function Returns the new project
     */
    addProject(state: Project[], callback: Function) {
        const project = new Project();
        state.push(project);
        callback(project);
    },
    /**
     * Add a socket to a project
     * @param state Project[]
     * @param callback Function Return the new socket
     */
    addSocket(state: Project[], { projectIndex, callback }) {
        const socket = new BufferedSocket();
        state[projectIndex].addSocket(socket);
        callback(socket);
    },
    /**
     * Delete a project or socket
     * @param state Project[]
     * @param {...object}
     */
    deleteItem(state: any, { projectIndex, socket }) {
        if (socket) {
            state[projectIndex].removeSocket(socket);
        } else {
            state.splice(projectIndex, 1);
        }
    },
};

const actions = {
    loadProjects(context) {
        return new Promise(async (resolve, reject) => {
            // load projects
            try {
                let projects = await electronStore.read();
                let serializedProjects = projects.map(project => {
                    return Object.assign(new Project(), {
                        ...project, sockets: project.sockets.map(socket => {
                            return Object.assign(new BufferedSocket, {
                                ...socket,
                                //@ts-ignore
                                messages: socket.messages.map(message => Object.assign(new ChatMessage(), { ...message, date: Object.assign(new Date(), message.date), dateSent: Object.assign(new Date(), message.dateSent) })),
                                //@ts-ignore
                                activators: socket.activators.map(activator => Object.assign(new Activator(), { ...activator, handler: Object.assign(new ResponseHandler(), activator.handler) })),
                            });
                        }),
                    })
                });
                context.commit('loadProjects', serializedProjects)
                resolve()
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default {
    state,
    mutations,
    actions,
};
