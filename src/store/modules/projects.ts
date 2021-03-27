/* tslint:disable:no-shadowed-variable ban-types */
import Project from '@/structs/project';
import BufferedSocket from '@/structs/buffered-socket';
//import { Activator, ResponseHandler } from '@/structs/response-handler';
//import { ChatMessage } from '@/structs/chat-message';

// initial state
const state = [] as Project[];

// TODO add this to UML?! (how????
const mutations = {
    /**
     * Add a project
     * @param state Project[]
     * @param callback Function Returns the new project
     */
    addProject(state: Project[], callback: (project: Project) => void): void {
        const project = new Project();
        state.push(project);
        callback(project);
    },
    /**
     * Add a socket to a project
     * @param state Project[]
     * @param callback Function Return the new socket
     */
    addSocket(state: Project[], { projectIndex, callback }: {projectIndex: number, callback: (socket: BufferedSocket) => void}): void {
        const socket = new BufferedSocket();
        state[projectIndex].addSocket(socket);
        callback(socket);
    },
    // Delete a project or socket
    deleteItem(state: Project[], { projectIndex, socket }: {projectIndex: number, socket: BufferedSocket}): void {
        if (socket) {
            state[projectIndex].removeSocket(socket);
        } else {
            state.splice(projectIndex, 1);
        }
    },
};

export default {
    state,
    mutations,
};
