import React from 'react'

export type WeatherIconProps = {
  weatherIcon: string;
};

export function WeatherIcon ({ weatherIcon }: WeatherIconProps) {
  return weatherIcon
    ? (
      <img src={`/images/weather_icons/${weatherIcon}.png`} alt="Weather Icon" />
      )
    : null
}
