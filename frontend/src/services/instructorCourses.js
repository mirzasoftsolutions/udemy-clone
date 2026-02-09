import api from './api';

export const getModules = (courseId) =>
  api.get(`/instructor/courses/${courseId}/modules`);

export const createModule = (courseId, data) =>
  api.post(`/instructor/courses/${courseId}/modules`, data);

export const deleteModule = (moduleId) =>
  api.delete(`/instructor/modules/${moduleId}`);

export const createLesson = (moduleId, data) =>
  api.post(`/instructor/modules/${moduleId}/lessons`, data);

export const deleteLesson = (lessonId) =>
  api.delete(`/instructor/lessons/${lessonId}`);

export const courseName = (courseId) =>
  api.get(`/instructor/courses/${courseId}`).then((res) => res.data.title);
