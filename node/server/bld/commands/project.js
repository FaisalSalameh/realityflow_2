"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const project_1 = require("../models/project");
var objectId = mongoose.Types.ObjectId();
class ProjectOperations {
    static createProject(projectInfo, clientInfo, userInfo) {
        console.log('Entering Create Project...');
        var newProjectDoc;
        var newProject = new project_1.Project({
            projectName: projectInfo.projectName,
            owner: userInfo._id,
            clients: [clientInfo._id],
            currentScene: undefined,
            prevScene: undefined,
            nextScene: undefined,
            bookmarks: undefined,
            created: projectInfo.created,
            lastEdit: projectInfo.lastEdit,
            lastEditor: projectInfo.lastEditor
        });
        var promise = newProject.save();
        promise.then(function (doc) {
            console.log('Project ' + projectInfo.projectName + ' added successfully.');
            newProjectDoc = doc;
            newProjectDoc.clients.push(clientInfo._id);
            return newProjectDoc;
        });
        return promise;
    }
    static fetchProjects(userInfo) {
        var projects = [];
        var promise = project_1.Project.find({ owner: userInfo._id }).exec();
        promise.then(function (docs) {
            projects = docs;
            return projects;
        });
        return promise;
    }
    static findProject(projectInfo) {
        var project;
        var promise = project_1.Project.findById(projectInfo._id).exec();
        promise.then(function (doc) {
            project = doc;
            return project;
        });
        return promise;
    }
    static deleteProject(projectInfo) {
        project_1.Project.findByIdAndRemove(projectInfo._id);
    }
}
exports.ProjectOperations = ProjectOperations;
