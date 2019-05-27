import Project from '@/structs/project'

// initial state
const state = [] as Project[]

const mutations = {
    addProject(state, project) {
        state.push(project);
    },
    addSocket(state: any, { projectIndex, socket }) {
        state[projectIndex].sockets.push(socket);
    },
    renameProject(state: any, index: number) {
        if (state[index].name === "")
            state[index].name = `project-${index}`

        state[index].rename = false
    },
    renameSocket(state: any, { projectIndex, socketIndex }) {
        if (state[projectIndex].sockets[socketIndex].name === "")
            state[projectIndex].sockets[
                socketIndex
            ].name = `socket-${socketIndex}`;

        state[projectIndex].sockets[socketIndex].rename = false;
    },
    renameItem(state: any, { type, projectIndex, socketIndex }) {
        if (type === 0) {
            state[projectIndex].rename = true;
        } else if (type == 1) {
            state[projectIndex].sockets[
                socketIndex
            ].rename = true;
        }
    },
    deleteItem(state: any, { type, projectIndex, socketIndex }) {
        if (type === 0) {
            state = [
                ...state.slice(0, projectIndex),
                ...state.slice(projectIndex + 1)
            ];
        } else if (type === 1) {
            state = state.map((project: Object, index: Number) => {
                if (index !== projectIndex) return project;

                return {
                    ...project,
                    sockets: [
                        ...project.sockets.slice(0, socketIndex),
                        ...project.sockets.slice(socketIndex + 1)
                    ]
                };
            });
        }
    },
}

export default {
    state,
    mutations,
}