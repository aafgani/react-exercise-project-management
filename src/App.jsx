import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    projects: [],
    selectedProjectId: undefined,
    tasks: [],
  });

  const handleAddTask = (taskText) => {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: taskText,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  };

  const handleDeleteTask = () => {};

  const handleStartAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleOnProjectAdded = (newProject) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const handleSelectProject = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  const selectedTasks = projectState.tasks.find(
    (task) => task.projectId === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleOnProjectAdded}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleStartAddProject} />;
  }

  console.log(projectState);

  return (
    <main className="h-screen my-8 flex gap-8">
      {/* Full height with vertical margin */}
      <ProjectSidebar
        onAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
