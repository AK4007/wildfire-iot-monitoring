import React from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';

const FireMapPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <AnimatedNavbar />

      <div className="px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">Live Fire Risk Map</h1>
        <p className="text-center mb-10 max-w-2xl mx-auto">
          View real-time wildfire incidents and sensor-detected alerts across monitored regions.
          This map is powered by geolocation data from IoT sensors and live reports.
        </p>

        <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-white">
          {/* Replace this with an actual interactive map like Leaflet or Google Maps */}
          <iframe
            title="Fire Map"
            src="https://www.openstreetmap.org/export/embed.html"
            className="w-full h-full border-none"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FireMapPage;
