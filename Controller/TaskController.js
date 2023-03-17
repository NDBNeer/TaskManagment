import { Storage } from "expo-storage";
import { getProjects } from "./ProjectController";

export async function addTaskToLocal(task, projectId) {
  try {
    const projects = await getProjects();
    const project = projects.find((project) => project.id === projectId);
    project.tasks.push(task);
    await Storage.setItem({
      key: "projects",
      value: JSON.stringify(projects),
    });
  } catch (error) {
    return false;
  }
}

export async function updateTask(updatedTask, projectId, taskId) {
  try {
    const projects = await getProjects();
    const project = projects.find((project) => project.id === projectId);
    project.tasks.forEach((task) => {
      if (task.id === taskId) {
        task.name = updatedTask.name;
        task.description = updatedTask.description;
        task.startDate = updatedTask.startDate;
        task.endDate = updatedTask.endDate;
        task.status = updatedTask.status;
        task.assignee = updatedTask.assignee;
        task.totalHoursWorked = updatedTask.totalHoursWorked;
        task.hourlyRate = updatedTask.hourlyRate;
      }
    });
    console.log(updatedTask);
    console.log(project.tasks);

    await Storage.setItem({
      key: "projects",
      value: JSON.stringify(projects),
    });
  } catch (error) {
    return false;
  }
}

export async function deleteTask(projectId, taskId) {
  try {
    const projects = await getProjects();
    const project = projects.find((project) => project.id === projectId);
    project.tasks = project.tasks.filter((task) => task.id !== taskId);
    console.log(project.tasks);

    await Storage.setItem({
      key: "projects",
      value: JSON.stringify(projects),
    });
  } catch (error) {
    return false;
  }
}
