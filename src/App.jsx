import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";

function App() {
  const [projectState, setProjectState] = useState({
    projects: [],
    selectedProjectId: undefined,
  });

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

  console.log(projectState);

  let content;
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

  return (
    <main className="h-screen my-8 flex gap-8">
      {/* Full height with vertical margin */}
      <ProjectSidebar
        onAddProject={handleStartAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
