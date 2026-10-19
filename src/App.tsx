import { Route, Routes, useParams } from "react-router";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { NewProjectPage } from "./pages/NewProjectPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";

// Table de correspondance URL → page
export default function App() {
  return (
    <Routes>
      {/* Route « parent » : le Layout entoure toutes les pages */}
      <Route element={<Layout />}>
        <Route index element={<ProjectsPage />} />
        <Route path="projects/new" element={<NewProjectPage />} />
        <Route path="projects/:id" element={<ProjectRoute />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

// Lit :id dans l'URL ; key = page neuve à chaque projet
function ProjectRoute() {
  const { id = "" } = useParams();
  return <ProjectPage key={id} id={id} />;
}