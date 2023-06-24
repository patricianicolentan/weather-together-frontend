import { City } from "../interfaces";

const filterCities = (cities: City[], inputValue: string): City[] => {
  const filtered = cities.filter((city) => {
    const cityNameLowercase = city.city.toLowerCase()
    const searchValueLowercase = inputValue.toLowerCase()
    return cityNameLowercase.includes(searchValueLowercase)
  });
  return filtered
}

export default filterCities
