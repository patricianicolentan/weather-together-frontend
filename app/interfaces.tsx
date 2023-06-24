export interface City {
  city: string;
  lat: string;
  lng: string;
  country: string;
  id: string;
}

export interface WeatherData {
  apparentTemperatureMax: number;
  apparentTemperatureMin: number;
  cityID: string;
  date: Date;
  precipitationProbabilityMean: number;
  temperature2mMax: number;
  temperature2mMin: number;
  temperatureScale: string;
  weathercode: number;
  windspeed10mMax: number;
}

export interface WeatherCodeMapping {
  [code: number]: {
    icon: string;
    description: string;
  };
}
