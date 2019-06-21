import Project from '@/structs/project'
import BufferedSocket from '@/structs/buffered-socket';

import { app, remote, ipcRenderer } from 'electron';
import path from 'path';
import fs from 'fs';

const userDataPath = (app || remote.app).getPath('userData');
const filePath = path.join(userDataPath, 'projects.dude');

// initial state
let state = [] as Project[]

// TODO: create a store class
// load projects
try {
    //@ts-ignore
    let projects = JSON.parse(fs.readFileSync(filePath));
    let serializedProjects = projects.map(project => {
        return Object.assign(new Project(), {
            ...project, sockets: project.sockets.map(socket => {
                return Object.assign(new BufferedSocket, socket);
            }),
        })
    });
    state = serializedProjects;
} catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    console.error('couldn\'t load projects', error);
}

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
}

export default {
    state,
    mutations,
}