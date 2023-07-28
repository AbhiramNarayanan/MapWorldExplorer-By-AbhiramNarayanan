import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const regionInfoMap = {
  India: {
    currencySymbol: '₹',
    speedUnit: 'km/h',
    distanceUnit: 'km',
    volumeUnit: 'liters',
    timezone: 'Asia/Kolkata',
  },
  'United States': {
    currencySymbol: '$',
    speedUnit: 'mph',
    distanceUnit: 'miles',
    volumeUnit: 'gallons',
    timezone: 'America/New_York',
  },
  'United Kingdom': {
    currencySymbol: '£',
    speedUnit: 'mph',
    distanceUnit: 'miles',
    volumeUnit: 'liters',
    timezone: 'Europe/London',
  },
};

const RegionInfo = () => {
  const region = useSelector((state) => state.region);
  const selectedRegionInfo = regionInfoMap[region];
  const [contentToSpeak, setContentToSpeak] = useState('');

  
  useEffect(() => {
    if (selectedRegionInfo) {
      const countryNameToSpeak = `Country ${region}: `;
      const textToSpeak = Object.entries(selectedRegionInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join('. ');
      setContentToSpeak(countryNameToSpeak + textToSpeak);
    }
  }, [selectedRegionInfo, region]);

 
  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(contentToSpeak);
      window.speechSynthesis.speak(utterance);
    }
  };


  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

 
  useEffect(() => {
    if (contentToSpeak) {
      speakText();
    }
    return () => {
     
      stopSpeech();
    };
  }, [contentToSpeak]);

  if (!selectedRegionInfo) {
    return null;
  }

  return (
    <div className="RegionInfo">
      <p>Currency Symbol: {selectedRegionInfo.currencySymbol}</p>
      <p>Speed Unit: {selectedRegionInfo.speedUnit}</p>
      <p>Distance Unit: {selectedRegionInfo.distanceUnit}</p>
      <p>Volume Unit: {selectedRegionInfo.volumeUnit}</p>
      <p>Timezone: {selectedRegionInfo.timezone}</p>
    </div>
  );
};

export default RegionInfo;
