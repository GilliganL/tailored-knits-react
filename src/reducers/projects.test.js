import {
    projectsRequest,
    projectsSuccess,
    projectSuccess,
    projectsError,
    updateSuccess,
    setEditing,
    addProject,
    removeProject,
    imagesRequest,
    imagesSuccess,
    imagesError,
    saveImage,
    clearImage,
    activeTab,
    editNotes
} from '../actions/projects';

import { projectsReducer } from './index';

describe('projectsReducer', () => {



    const project1 = { id: '1', name: 'project 1' };
    const project2 = { id: '2', name: 'project 2' };
    const project3 = { id: '3', name: 'project 3' };
    const projects1 = [project1, project2];
    const image1 = 'image 1';
    const image2 = 'image 2';
    const message = 'a message';
    const errorMessage = 'error message';
    const editType1 = 'editPattern';
    const croppedImage = { image: 'cropped image' };
    const croppedFile = { file: 'cropped File' };
    const activeTab1 = 'label';

    it('Should set initial state when nothing is passed in', () => {
        const state = projectsReducer(undefined, { type: '_UNKNOWN' });
        expect(state).toEqual({
            projects: '',
            project: '',
            editing: false,
            editProject: false,
            editPattern: false,
            editUser: false,
            loading: false,
            message: '',
            error: null,
            image: '',
            croppedImage: '',
            croppedFile: '',
            activeTab: 'stitches',
            editingNotes: false,
            currentIndex: 0,
            translateValue: 0
        });
    });

    it('Should return the current state of an unknown action', () => {
        let currentState = {};
        const state = projectsReducer(currentState, { type: '_UNKNOWN' });
        expect(state).toBe(currentState);
    });


    describe('projectsRequest', () => {
        it('Should request projects', () => {
            let state;
            state = projectsReducer(state, projectsRequest());
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false,
                currentIndex: 0,
                translateValue: 0
            });
        });
    });

    describe('projectsSuccess', () => {
        it('Should save projects to state', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, projectsSuccess(projects1));
            expect(state).toEqual({
                projects: projects1,
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('projectSuccess', () => {
        it('Should save a project to state', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, projectSuccess(project1));
            expect(state).toEqual({
                projects: '',
                project: project1,
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('updateSuccess', () => {
        it('Should reset image and stop loading', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: image1,
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, updateSuccess(project1));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('projectsError', () => {
        it('Should save the error', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, projectsError(errorMessage));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: errorMessage,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('setEditing', () => {
        it('Should update editing and editType in state', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, setEditing(true, editType1));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: true,
                editProject: false,
                editPattern: true,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('addProject', () => {
        it('Should add new project to project array in state', () => {
            let state = ({
                projects: projects1,
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, addProject(project3));
            expect(state.projects.length).toEqual(3);
            expect(state).toEqual({
                projects: [...projects1, project3],
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('removeProject', () => {
        it('Should remove the deleted project from state', () => {
            let state = ({
                projects: [...projects1, project3],
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, removeProject('3', message));
            expect(state).toEqual({
                projects: projects1,
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message,
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            expect(state.projects.length).toEqual(2);
        });
    });

    describe('imagesRequest', () => {
        it('Should set loading to true', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, imagesRequest());
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('imagesSuccess', () => {
        it('Should save new the image to state', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, imagesSuccess(image1));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: image1,
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('imagesError', () => {
        it('Should save the error message to state', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: true,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, imagesError(errorMessage));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: errorMessage,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('saveImage', () => {
        it('Should save the cropped image and file', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, saveImage(croppedImage, croppedFile));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage,
                croppedFile,
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('clearImage', () => {
        it('Should reset croppedImage and croppedFile in state', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage,
                croppedFile,
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, clearImage());
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
        });
    });

    describe('activeTab', () => {
        it('Should change the active tab', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, activeTab(activeTab1));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: activeTab1,
                editingNotes: false
            });
        });
    });

    describe('editNotes', () => {
        it('Should change editing notes between true and false', () => {
            let state = ({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: false
            });
            state = projectsReducer(state, editNotes(true));
            expect(state).toEqual({
                projects: '',
                project: '',
                editing: false,
                editProject: false,
                editPattern: false,
                editUser: false,
                loading: false,
                message: '',
                error: null,
                image: '',
                croppedImage: '',
                croppedFile: '',
                activeTab: 'stitches',
                editingNotes: true
            });
        });
    });

});
