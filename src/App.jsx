import { useState, Suspense } from 'react';
import ThreeScene from './components/ThreeScene';
import HudOverlay from './components/HudOverlay';
import CustomLoader from './components/CustomLoader';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(null);

  // Set project selections and synchronize navigation section if project clicked directly in 3D scene
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setActiveSection('projects');
  };

  const handleSelectSkillCategory = (cat) => {
    setSelectedSkillCategory(cat);
    setActiveSection('skills');
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* 3D Canvas Render Layer */}
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      {/* Cyber HUD UI Overlay Layer */}
      <HudOverlay
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedSkillCategory={selectedSkillCategory}
        setSelectedSkillCategory={setSelectedSkillCategory}
      />

      {/* Cybernetic Progress Loader */}
      <CustomLoader />
    </div>
  );
}

export default App;
