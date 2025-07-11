"use client";

import React, { useState } from "react";
import { parseDXF, ParsedDXFData } from "@/lib/dxfParser";
import { generateParkingLotModels, ParkingLotModel, DesignConstraints } from "@/lib/layoutGenerator";
import { generateDXF } from "@/lib/dxfExporter";

const defaultConstraints: DesignConstraints = {
  slotWidth: 2.5,
  slotLength: 5,
  aisleWidth: 6,
  angles: [90, 60, 45],
  turningRadius: 6,
};

const ParkingLotDesigner: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedDXFData | null>(null);
  const [constraints, setConstraints] = useState<DesignConstraints>(defaultConstraints);
  const [models, setModels] = useState<ParkingLotModel[]>([]);
  const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === "string") {
          try {
            const data = parseDXF(text);
            setParsedData(data);
            setModels([]);
            setSelectedModelIndex(null);
          } catch {
            alert("Failed to parse DXF file.");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const generateLayout = () => {
    if (!parsedData || parsedData.polygons.length === 0) {
      alert("Please upload a valid DXF file with lot boundary.");
      return;
    }
    const lotPolygon = { points: parsedData.polygons[0].points };
    const obstacles = parsedData.obstacles.map((o) => ({ points: o.points }));
    const generatedModels = generateParkingLotModels(lotPolygon, obstacles, constraints);
    setModels(generatedModels);
    setSelectedModelIndex(0);
  };

  const exportSelectedModelDXF = () => {
    if (selectedModelIndex === null) {
      alert("No model selected for export.");
      return;
    }
    const model = models[selectedModelIndex];
    const dxfContent = generateDXF(model.slots);
    const blob = new Blob([dxfContent], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "parking_lot_layout.dxf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Parking Lot Layout Designer</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload AutoCAD DXF File</h2>
        <input type="file" accept=".dxf" onChange={handleFileUpload} className="mb-4" />
        {parsedData && (
          <div className="mb-4">
            <p>Parsed {parsedData.polygons.length} lot boundary polygon(s), {parsedData.obstacles.length} obstacle(s), and {parsedData.entryPoints.length} entry/exit point(s).</p>
          </div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Design Constraints</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateLayout();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-medium mb-1">Slot Width (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.slotWidth}
              onChange={(e) =>
                setConstraints({ ...constraints, slotWidth: parseFloat(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Slot Length (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.slotLength}
              onChange={(e) =>
                setConstraints({ ...constraints, slotLength: parseFloat(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Aisle Width (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.aisleWidth}
              onChange={(e) =>
                setConstraints({ ...constraints, aisleWidth: parseFloat(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Allowed Angles (degrees, comma separated)</label>
            <input
              type="text"
              value={constraints.angles.join(", ")}
              onChange={(e) => {
                const angles = e.target.value
                  .split(",")
                  .map((a) => parseInt(a.trim()))
                  .filter((a) => !isNaN(a));
                setConstraints({ ...constraints, angles });
              }}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Turning Radius (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.turningRadius}
              onChange={(e) =>
                setConstraints({ ...constraints, turningRadius: parseFloat(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Generate Layout
          </button>
        </form>
      </section>

      {models.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Generated Parking Lot Models</h2>
          <ul className="space-y-2">
            {models.map((model, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 rounded border ${
                    selectedModelIndex === index ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedModelIndex(index)}
                >
                  Model {index + 1} - Slots: {model.totalSlots}
                </button>
              </li>
            ))}
          </ul>
          {selectedModelIndex !== null && (
            <div className="mt-4">
              <button
                onClick={exportSelectedModelDXF}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Export Selected Model as DXF
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ParkingLotDesigner;
