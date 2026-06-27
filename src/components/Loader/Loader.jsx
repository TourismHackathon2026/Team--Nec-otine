import './Loader.css';

function Loader({ fullScreen = false }) {
  return (
    <div className="loader-container" style={fullScreen ? { height: '100vh' } : {}}>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;