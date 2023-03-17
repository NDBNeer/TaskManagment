import { Storage } from "expo-storage";

export async function addProjects(projects) {
  console.log(projects);
  try {
    await Storage.setItem({
      key: "projects",
      value: JSON.stringify(projects),
    });
  } catch (error) {
    return false;
  }
}

export async function updateProject(updatedProject, idForUpdatedProject) {
  try {
    var projects = await getProjects();
    projects.forEach((project) => {
      if (project.id === idForUpdatedProject) {
        project.name = updatedProject.name;
        project.description = updatedProject.description;
        project.startDate = updatedProject.startDate;
        project.endDate = updatedProject.endDate;
      }
    });

    await addProjects(projects);
  } catch (error) {
    return false;
  }
}

export async function getProjects() {
  try {
    const value = JSON.parse(await Storage.getItem({ key: "projects" }));
    if (value !== null) {
      return value;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
