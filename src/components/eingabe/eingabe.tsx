import React, { useState, useEffect } from 'react';

export default function Eingabe() {
  const [position, setPosition] = useState('');
  const [fuelType, setFuelType] = useState('');

  const handlePositionChange = () => {
    // Użyj Geolokalizacji, aby pobrać aktualną pozycję
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition(`Szerokość: ${latitude}, Długość: ${longitude}`);
        console.log(position)
      });
    } else {
      setPosition("Geolokalizacja nie jest obsługiwana w przeglądarce.");
    }
  };

  const handleFuelTypeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFuelType(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Position:', position);
    console.log('Spritsorte:', fuelType);
  };

  useEffect(() => {
    // Pobierz i ustaw aktualną pozycję przy załadowaniu komponentu
    handlePositionChange();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="position" className="block text-gray-600">Deine Position:</label>
        <input
          type="text"
          id="position"
          name="position"
          placeholder="Position eingeben"
          value={position}
          readOnly // Ustaw pole jako tylko do odczytu
          className="w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handlePositionChange}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Dein Position ubernehmen?
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="fuelType" className="block text-gray-600">Spritsorte:</label>
        <select
          id="fuelType"
          name="fuelType"
          value={fuelType}
          onChange={handleFuelTypeChange}
          className="z-50 text-black w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 appearance-none">
          <option className='text-black' value="benzin">Benzin</option>
          <option className='text-black' value="diesel">Diesel</option>
          <option className='text-black' value="super">Super</option>
          {/* Weitere Optionen hier hinzufügen */}
        </select>
        
      </div>
      <button
        type="submit"
        className=" text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Suchen
      </button>
    </form>
  );
}
