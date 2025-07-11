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

  const containerStyle = {
    maxWidth: "768px",
    margin: "0 auto",
    padding: "40px 20px"
  };

  const h1Style = {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "24px",
    textAlign: "center" as const
  };

  const h2Style = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px"
  };

  const sectionStyle = {
    marginBottom: "40px"
  };

  const labelStyle = {
    display: "block",
    fontWeight: "500",
    marginBottom: "4px"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "16px"
  };

  const buttonStyle = {
    backgroundColor: "#111827",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    marginRight: "8px"
  };

  const buttonSecondaryStyle = {
    backgroundColor: "#ffffff",
    color: "#111827",
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "8px",
    marginRight: "8px"
  };

  const buttonSelectedStyle = {
    ...buttonSecondaryStyle,
    backgroundColor: "#111827",
    color: "#ffffff"
  };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Parking Lot Layout Designer</h1>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Upload AutoCAD DXF File</h2>
        <input 
          type="file" 
          accept=".dxf" 
          onChange={handleFileUpload} 
          style={inputStyle}
        />
        {parsedData && (
          <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Parsed {parsedData.polygons.length} lot boundary polygon(s), {parsedData.obstacles.length} obstacle(s), and {parsedData.entryPoints.length} entry/exit point(s).
            </p>
          </div>
        )}
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Design Constraints</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateLayout();
          }}
        >
          <div>
            <label style={labelStyle}>Slot Width (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.slotWidth}
              onChange={(e) =>
                setConstraints({ ...constraints, slotWidth: parseFloat(e.target.value) })
              }
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Slot Length (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.slotLength}
              onChange={(e) =>
                setConstraints({ ...constraints, slotLength: parseFloat(e.target.value) })
              }
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Aisle Width (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.aisleWidth}
              onChange={(e) =>
                setConstraints({ ...constraints, aisleWidth: parseFloat(e.target.value) })
              }
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Allowed Angles (degrees, comma separated)</label>
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
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Turning Radius (m)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={constraints.turningRadius}
              onChange={(e) =>
                setConstraints({ ...constraints, turningRadius: parseFloat(e.target.value) })
              }
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Generate Layout
          </button>
        </form>
      </section>

      {models.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Generated Parking Lot Models</h2>
          <div style={{ marginBottom: "16px" }}>
            {models.map((model, index) => (
              <button
                key={index}
                style={selectedModelIndex === index ? buttonSelectedStyle : buttonSecondaryStyle}
                onClick={() => setSelectedModelIndex(index)}
              >
                Model {index + 1} - Slots: {model.totalSlots}
              </button>
            ))}
          </div>
          {selectedModelIndex !== null && (
            <div>
              <button onClick={exportSelectedModelDXF} style={buttonStyle}>
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
