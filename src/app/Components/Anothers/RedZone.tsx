const RedZoneLegend = () => (
  <div className="leaflet-bottom leaflet-right bg-white p-4 rounded shadow-md mr-4 mb-4">
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2"></div>
      <div className="border-t pt-2">
        <div className="text-sm font-bold">Oxygen Facts</div>
        <div className="text-xs">
          Daily oxygen need per person: <strong>~500 L</strong>
        </div>
        <div className="text-xs">
          Oxygen produced by one tree: <strong>~226 L/day</strong>
        </div>
        <div className="text-xs">
          Trees needed per person: <strong>~3 trees</strong>
        </div>
      </div>
    </div>
  </div>
);

export default RedZoneLegend;
