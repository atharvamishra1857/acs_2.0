export const machinesDB = {
  "double-column": {
    title: "Double Column Bandsaws",
    subtitle: "Heavy Duty High Speed Bandsaw Machines",
    description: "Designed for unyielding rigidity and maximum cutting rates. Our double-column architecture eliminates vibration and ensures absolute precision across all automation levels.",
    products: [
      {
        id: "dc-auto",
        name: "Fully Automatic Double Column Bandsaw",
        type: "Automatic",
        image: "/images/products/ACS machine.jpeg",
        features: [
          "High Efficiency Power Transmission through HELICAL GEARED MOTOR.",
          "Double Acting Hydraulic Cylinder for Main Vice and shuttle vice.",
          "State of art Hydraulic Blade Tensioning.",
          "Hydro-Mechanical Sensor for sensing hard layers and controlling feed.",
          "Infinitely Variable Feed Control Valve for setting the cutting rate.",
          "Rapid approach of saw frame to save idle time.",
          "Auto indexing shuttle with stroke length of 450mm synchronized with auto cycle.",
          "Adjustable Dovetail type Heavy duty Movable Blade Guide.",
          "Specially designed Fixed Blade guide with internal coolant flow.",
          "Cycle sequencing through PLC with Length setting through Digital SIKO Meter.",
          "Automatic Machine SWITCH OFF in case of Blade Breakage."
        ]
      },
      {
        id: "dc-semi",
        name: "Semi Automatic Double Column Bandsaw",
        type: "Semi-Automatic",
        image: "/images/products/ACS machine.jpeg",
        features: [
          "LMG Guided Double Column Construction.",
          "High Efficiency Power Transmission through HELICAL GEARED MOTOR.",
          "Double Acting Hydraulic Cylinder for Main Vice.",
          "State of art Hydraulic Blade Tensioning.",
          "Infinitely Variable Feed Control Valve for setting the cutting rate.",
          "Rapid approach of saw frame to save idle time.",
          "Friction type rotating cleaning wire brush.",
          "Adjustable Heavy duty Movable Blade Guide.",
          "Lubrication system by hand operated pump for main columns.",
          "Automatic Machine SWITCH OFF in case of Blade Breakage."
        ]
      },
      {
        id: "dc-manual",
        name: "Manual Double Column Bandsaw",
        type: "Manual",
        image: "/images/products/ACS machine.jpeg",
        features: [
          "LMG Guided Double Column Construction.",
          "Manual Arrangement for clamping Main Vice.",
          "Infinitely variable Feed Control Valve for Setting the Cutting Rate.",
          "Adjustable Heavy-duty movable blade guide with tungsten carbide wear pads.",
          "Manual arrangement for blade tensioning.",
          "Gear motor with VFD to set the band speed through control panel.",
          "Ergonomically designed Electrical Control Panel.",
          "Automatic Machine OFF in case of Blade Breakage."
        ]
      },
      {
        id: "dc-mitre",
        name: "Double Column Mitre Bandsaw",
        type: "Specialized",
        image: "/images/products/ACS machine.jpeg",
        features: [
          "Specially Designed for MITRE (Degree Cutting): +45° to -60° positioning.",
          "LMG Guided Double Column Construction guaranteeing vibration free operation.",
          "Motorized/ Manual MITRE positioning.",
          "Efficient guiding of the band by tungsten carbide inserts and pre-straightening rollers.",
          "Hydraulic blade tension.",
          "Automatic Job Height Adjustment.",
          "HMI to set cutting parameters through PLC.",
          "Automatic Machine Switch Off in case of Blade Breakage."
        ]
      }
    ]
  },
  "vertical-column": {
    title: "Vertical Column Bandsaws",
    subtitle: "Precision Upright Cutting Solutions",
    description: "Engineered for complex contours and vertical precision cutting applications.",
    products: [] // Ready for your next batch of data
  },
  "circular-saw": {
    title: "Circular Saws",
    subtitle: "High-Speed Circular Cold Saws",
    description: "Maximum efficiency for rapid, clean cuts on tubes, pipes, and solid profiles.",
    products: [] // Ready for your next batch of data
  }
};