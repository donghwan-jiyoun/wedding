import DearAll from './component/DearAll';
import MainSection from './component/MainSection';
import Timeline from './component/Timeline';
import Interview from './component/Interview';
import Gallery from './component/Gallery';
import Wedding from './component/Wedding';
import './App.css';

function App() {
  return (
    <article className="donghwan-jiyoun">
      <MainSection />
      <DearAll />
      <Gallery />
      <Timeline />
      <Interview />
      <Wedding />
    </article>
  );
}

export default App;
