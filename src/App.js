import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Container } from "react-bootstrap";
import './App.css';
import WeatherSection from './features/weather/components/WeatherSection';

function App() {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container className="cont">
          <Navbar.Brand>Weather App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="cont">
        <WeatherSection />
      </Container>
    </div>
  );
}

export default App;