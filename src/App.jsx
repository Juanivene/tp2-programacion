import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#ff4081', 
    },
    background: {
      default: '#f5f5f5', 
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
  },
});

const API_WEATHER = 'http://api.weatherapi.com/v1/current.json?key=6e8fade974f0481bb51163733240606&q=';

export default function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    Message: "",
  });
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    icon: "",
    conditionText: "",
  });

  const onsubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError({
      error: false,
      Message: "",
    });

    try {
      if (!city.trim()) throw { Message: "Debe completar el campo ciudad" };
      const response = await fetch(API_WEATHER + city);
      const data = await response.json();

      if (data.error) throw { Message: data.error.message };

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });
      console.log(data);
    } catch (error) {
      setError({
        error: true,
        Message: error.Message,
      });
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    mt: 4,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const paperStyles = {
    p: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={containerStyles}>
        <Paper elevation={3} sx={paperStyles}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            TU CLIMA
          </Typography>
          <Box
            sx={{ display: "grid", gap: 2 }}
            component="form"
            autoComplete="off"
            onSubmit={onsubmit}
          >
            <TextField
              id="city"
              label="Ciudad"
              variant="outlined"
              size="small"
              required
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={error.error}
              helperText={error.Message}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              loadingIndicator="Cargando.."
            >
              Buscar
            </LoadingButton>
          </Box>
          {weather.city && (
            <Box
              sx={{
                mt: 4,
                display: "grid",
                gap: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                {weather.city}, {weather.country}
              </Typography>
              <Box
                component="img"
                alt={weather.conditionText}
                src={weather.icon}
                sx={{ margin: "0 auto", width: '80px' }}
              />
              <Typography variant="h5" component="h3">
                {weather.temp} °C
              </Typography>
              <Typography variant="h6" component="h4">
                {weather.conditionText}
              </Typography>
            </Box>
          )}
          <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
            Powered by:{" "}
            <a href="https://www.weatherapi.com/" title="Weather API">
              WeatherAPI.com
            </a>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

