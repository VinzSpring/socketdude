import Project from '@/structs/project'
import BufferedSocket from '@/structs/buffered-socket';

// initial state
const state = [] as Project[]

const mutations = {
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
    addSocket(state: Project[], {projectIndex, callback}) {
        const socket = new BufferedSocket();
        state[projectIndex].addSocket(socket);
        callback(socket);
    },
    /**
     * Delete a project or socket
     * @param state Project[]
     * @param {...object}
     */
    deleteItem(state: any, {projectIndex, socket}) {
        if(socket) {
            state[projectIndex].removeSocket(socket);
        } else {
            state.splice(projectIndex, 1);
        }
    },
}

export default {
    state,
    mutations,
}