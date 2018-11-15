import {
    PROJECTS_REQUEST, projectsRequest,
    PROJECTS_SUCCESS, projectsSuccess,
    PROJECT_SUCCESS, projectSuccess,
    UPDATE_SUCCESS, updateSuccess,
    PROJECTS_ERROR, projectsError,
    SET_EDITING, setEditing,
    ADD_PROJECT, addProject,
    REMOVE_PROJECT, removeProject,
    IMAGES_REQUEST, imagesRequest,
    IMAGES_SUCCESS, imagesSuccess,
    IMAGES_ERROR, imagesError,
    SAVE_IMAGE, saveImage,
    CLEAR_IMAGE, clearImage,
    ACTIVE_TAB, activeTab,
    EDIT_NOTES, editNotes
} from './projects';


describe('projectsRequest', () => {
    it('Should return the action', () => {
        const action = projectsRequest();
        expect(action.type).toEqual(PROJECTS_REQUEST);
    });
});

describe('projectsSuccess', () => {
    it('Should return the action', () => {
        const projects = 'Projects';
        const action = projectsSuccess(projects);
        expect(action.type).toEqual(PROJECTS_SUCCESS);
        expect(action.projects).toEqual(projects);
    });
});

describe('projectSuccess', () => {
    it('Should return the action', () => {
        const project = 'A project';
        const action = projectSuccess(project);
        expect(action.type).toEqual(PROJECT_SUCCESS);
        expect(action.project).toEqual(project);
    });
});

describe('updateSuccess', () => {
    it('Should return the action', () => {
        const action = updateSuccess();
        expect(action.type).toEqual(UPDATE_SUCCESS);
    });
});

describe('projectsError', () => {
    it('Should return the action', () => {
        const error = 'projects error';
        const action = projectsError(error);
        expect(action.type).toEqual(PROJECTS_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('setEdting', () => {
    it('Should return the action', () => {
        const editing = true;
        const editType = 'project';
        const action = setEditing(editing, editType);
        expect(action.type).toEqual(SET_EDITING);
        expect(action.editing).toEqual(editing);
        expect(action.editType).toEqual(editType);
    });
});

describe('addProject', () => {
    it('Should return the action', () => {
        const project = 'A project';
        const action = addProject(project);
        expect(action.type).toEqual(ADD_PROJECT);
        expect(action.project).toEqual(project);
    });
});

describe('removeProject', () => {
    it('Should return the action', () => {
        const message = 'A message';
        const action = removeProject(3, message);
        expect(action.type).toEqual(REMOVE_PROJECT);
        expect(action.message).toEqual(message);
    });
});


describe('imagesRequest', () => {
    it('Should return the action', () => {
        const action = imagesRequest();
        expect(action.type).toEqual(IMAGES_REQUEST);
    });
});

describe('imagesSuccess', () => {
    it('Should return the action', () => {
        const image = 'Image';
        const action = imagesSuccess(image);
        expect(action.type).toEqual(IMAGES_SUCCESS);
        expect(action.image).toEqual(image);
    });
});


describe('imagesError', () => {
    it('Should return the action', () => {
        const error = 'images error';
        const action = imagesError(error);
        expect(action.type).toEqual(IMAGES_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('saveImage', () => {
    it('Should return the action', () => {
        const croppedImage = 'cropped image';
        const croppedFile = 'cropped file';
        const action = saveImage(croppedImage, croppedFile);
        expect(action.type).toEqual(SAVE_IMAGE);
        expect(action.croppedImage).toEqual(croppedImage);
        expect(action.croppedFile).toEqual(croppedFile);
    });
});

describe('clearImage', () => {
    it('Should return the action', () => {
        const action = clearImage();
        expect(action.type).toEqual(CLEAR_IMAGE);
    });
});

describe('activeTab', () => {
    it('Should return the action', () => {
        const display = 'display';
        const action = activeTab(display);
        expect(action.type).toEqual(ACTIVE_TAB);
        expect(action.display).toEqual(display);
    });
});

describe('editNotes', () => {
    it('Should return the action', () => {
        const editingNotes = true;
        const action = editNotes(editingNotes);
        expect(action.type).toEqual(EDIT_NOTES);
        expect(action.editingNotes).toEqual(editingNotes);
    });
});