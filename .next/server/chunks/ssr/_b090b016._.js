module.exports = {

"[project]/src/lib/dxfParser.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// DXF parsing utility to extract polygon boundaries, obstacles, and entry/exit points
// This is a simplified parser using 'dxf-parser' npm package (to be installed in environment)
// Since 'dxf-parser' is not installed and types are missing, we will create a mock parser function
// that simulates parsing for demonstration purposes.
__turbopack_context__.s({
    "parseDXF": (()=>parseDXF)
});
function parseDXF(_dxfText) {
    // Mock implementation: returns empty arrays
    return {
        polygons: [],
        obstacles: [],
        entryPoints: []
    };
}
}}),
"[project]/src/lib/layoutGenerator.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Layout generation utility to create parking lot models based on input polygon, obstacles, and constraints
// This is a simplified placeholder implementation
__turbopack_context__.s({
    "generateParkingLotModels": (()=>generateParkingLotModels)
});
function generateParkingLotModels(_lotPolygon, _obstacles, _constraints) {
    // Placeholder: generate one simple model with no slots
    // Real implementation would generate multiple models maximizing slot count
    return [
        {
            slots: [],
            totalSlots: 0
        }
    ];
}
}}),
"[project]/src/lib/dxfExporter.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Simple DXF export utility for parking lot layout rectangles
__turbopack_context__.s({
    "generateDXF": (()=>generateDXF)
});
function generateDXF(rectangles) {
    const header = `0
SECTION
2
HEADER
0
ENDSEC
0
SECTION
2
TABLES
0
ENDSEC
0
SECTION
2
BLOCKS
0
ENDSEC
0
SECTION
2
ENTITIES
`;
    const footer = `0
ENDSEC
0
EOF
`;
    let entities = "";
    rectangles.forEach((rect)=>{
        // Calculate the four corners of the rectangle with rotation
        const rad = rect.angle * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const bl = rect.bottomLeft;
        const br = {
            x: bl.x + rect.width * cos,
            y: bl.y + rect.width * sin
        };
        const tr = {
            x: br.x - rect.length * sin,
            y: br.y + rect.length * cos
        };
        const tl = {
            x: bl.x - rect.length * sin,
            y: bl.y + rect.length * cos
        };
        // DXF POLYLINE for rectangle
        entities += `0
POLYLINE
8
ParkingSlots
66
1
70
1
0
VERTEX
8
ParkingSlots
10
${bl.x.toFixed(3)}
20
${bl.y.toFixed(3)}
30
0.0
0
VERTEX
8
ParkingSlots
10
${br.x.toFixed(3)}
20
${br.y.toFixed(3)}
30
0.0
0
VERTEX
8
ParkingSlots
10
${tr.x.toFixed(3)}
20
${tr.y.toFixed(3)}
30
0.0
0
VERTEX
8
ParkingSlots
10
${tl.x.toFixed(3)}
20
${tl.y.toFixed(3)}
30
0.0
0
SEQEND
`;
    });
    return header + entities + footer;
}
}}),
"[project]/src/components/ParkingLotDesigner.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dxfParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dxfParser.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$layoutGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/layoutGenerator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dxfExporter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dxfExporter.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const defaultConstraints = {
    slotWidth: 2.5,
    slotLength: 5,
    aisleWidth: 6,
    angles: [
        90,
        60,
        45
    ],
    turningRadius: 6
};
const ParkingLotDesigner = ()=>{
    const [parsedData, setParsedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [constraints, setConstraints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultConstraints);
    const [models, setModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedModelIndex, setSelectedModelIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleFileUpload = (e)=>{
        const file = e.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event)=>{
                const text = event.target?.result;
                if (typeof text === "string") {
                    try {
                        const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dxfParser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseDXF"])(text);
                        setParsedData(data);
                        setModels([]);
                        setSelectedModelIndex(null);
                    } catch  {
                        alert("Failed to parse DXF file.");
                    }
                }
            };
            reader.readAsText(file);
        }
    };
    const generateLayout = ()=>{
        if (!parsedData || parsedData.polygons.length === 0) {
            alert("Please upload a valid DXF file with lot boundary.");
            return;
        }
        const lotPolygon = {
            points: parsedData.polygons[0].points
        };
        const obstacles = parsedData.obstacles.map((o)=>({
                points: o.points
            }));
        const generatedModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$layoutGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateParkingLotModels"])(lotPolygon, obstacles, constraints);
        setModels(generatedModels);
        setSelectedModelIndex(0);
    };
    const exportSelectedModelDXF = ()=>{
        if (selectedModelIndex === null) {
            alert("No model selected for export.");
            return;
        }
        const model = models[selectedModelIndex];
        const dxfContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dxfExporter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateDXF"])(model.slots);
        const blob = new Blob([
            dxfContent
        ], {
            type: "application/dxf"
        });
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
        textAlign: "center"
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: containerStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: sectionStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: h2Style,
                        children: "Upload AutoCAD DXF/DWG File"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        accept: ".dxf,.dwg",
                        onChange: handleFileUpload,
                        style: inputStyle
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    parsedData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "16px",
                            padding: "12px",
                            backgroundColor: "#f9fafb",
                            borderRadius: "6px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: 0,
                                fontSize: "14px"
                            },
                            children: [
                                "Parsed ",
                                parsedData.polygons.length,
                                " lot boundary polygon(s), ",
                                parsedData.obstacles.length,
                                " obstacle(s), and ",
                                parsedData.entryPoints.length,
                                " entry/exit point(s)."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: sectionStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: h2Style,
                        children: "Design Constraints"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: (e)=>{
                            e.preventDefault();
                            generateLayout();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "Slot Width (m)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.1",
                                        min: "1",
                                        value: constraints.slotWidth,
                                        onChange: (e)=>setConstraints({
                                                ...constraints,
                                                slotWidth: parseFloat(e.target.value)
                                            }),
                                        style: inputStyle,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "Slot Length (m)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.1",
                                        min: "1",
                                        value: constraints.slotLength,
                                        onChange: (e)=>setConstraints({
                                                ...constraints,
                                                slotLength: parseFloat(e.target.value)
                                            }),
                                        style: inputStyle,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "Aisle Width (m)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.1",
                                        min: "1",
                                        value: constraints.aisleWidth,
                                        onChange: (e)=>setConstraints({
                                                ...constraints,
                                                aisleWidth: parseFloat(e.target.value)
                                            }),
                                        style: inputStyle,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "Allowed Angles (degrees, comma separated)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: constraints.angles.join(", "),
                                        onChange: (e)=>{
                                            const angles = e.target.value.split(",").map((a)=>parseInt(a.trim())).filter((a)=>!isNaN(a));
                                            setConstraints({
                                                ...constraints,
                                                angles
                                            });
                                        },
                                        style: inputStyle,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "Turning Radius (m)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.1",
                                        min: "1",
                                        value: constraints.turningRadius,
                                        onChange: (e)=>setConstraints({
                                                ...constraints,
                                                turningRadius: parseFloat(e.target.value)
                                            }),
                                        style: inputStyle,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                style: buttonStyle,
                                children: "Generate Layout"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            models.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: sectionStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: h2Style,
                        children: "Generated Parking Lot Models"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "16px"
                        },
                        children: models.map((model, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: selectedModelIndex === index ? buttonSelectedStyle : buttonSecondaryStyle,
                                onClick: ()=>setSelectedModelIndex(index),
                                children: [
                                    "Model ",
                                    index + 1,
                                    " - Slots: ",
                                    model.totalSlots
                                ]
                            }, index, true, {
                                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    selectedModelIndex !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: exportSelectedModelDXF,
                            style: buttonStyle,
                            children: "Export Selected Model as DXF"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                            lineNumber: 263,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                        lineNumber: 262,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParkingLotDesigner.tsx",
                lineNumber: 248,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ParkingLotDesigner.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ParkingLotDesigner;
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),

};

//# sourceMappingURL=_b090b016._.js.map