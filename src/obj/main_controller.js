import {LinSeqGen} from "./util";
import {Project} from "./socket_test";

class ViewController {

    constructor() {
        this.viewProject = null;
        this.viewSocket = null;
    }

    show = (project, socket) => {
        this.viewProject = project;
        this.viewSocket = socket;
        //TODO emit event
    };
}

export default class MainController {
    
    constructor(...args) {

        this.projGuidGenerator = new LinSeqGen();
        this.projects = {};

        this.viewController = new ViewController();
        //TODO load config
        this.onConstructed();
    }

    onExit = () => {

    };

    onConstructed = () => {

    };

    createProject = (name) => {
        let guid = this.projGuidGenerator.getNext();
        this.projects[guid] = new Project(name, guid);
        //TODO emit "project-created-event"
    };


    deleteProject = (guid) => {
        delete this.projects[guid];
        //TODO emit project deleted event
    };
}
