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
        image: "/images/products/double_column_miter.png",
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
    description: "Engineered for complex contours, plate slitting, and structural block trimming. The vertical design maximizes space and provides an optimal viewing angle for intricate toolroom and production work.",
    products: [
      {
        id: "vc-auto",
        name: "Fully Automatic Vertical Bandsaw",
        type: "Automatic",
        image: "/images/products/vertical_bandsaw.png",
        features: [
          "Heavy duty plate welded structural frame minimizing deflection under load.",
          "Automatic hydraulic table feed synchronized with material indexing systems.",
          "Programmable Logic Controller (PLC) with user-friendly HMI touchscreen interface.",
          "Infinitely variable blade speed controlled via high-torque AC Variable Frequency Drive (VFD).",
          "Hydraulic blade tensioning system with auto-pressure calibration.",
          "Carbide blade guide inserts with integrated high-pressure fluid lubrication slots.",
          "Laser line indicator for fast, accurate manual indexing validation.",
          "Powered chip conveyor system paired with automated flush hose assemblies.",
          "Instantaneous automatic machine shut-off sensor triggered by blade breakage or slippage."
        ]
      },
      {
        id: "vc-semi",
        name: "Semi Automatic Vertical Bandsaw",
        type: "Semi-Automatic",
        image: "/images/products/vertical_bandsaw.png",
        features: [
          "Rigid upright column construction ensuring perfect structural alignment.",
          "Hydraulically operated stroke feed table with precision flow control valve adjustment.",
          "Ergonomically positioned physical control desk with standalone status indicators.",
          "Dual-direction manual/hydraulic table tilting mechanism for bevel cutting capabilities.",
          "Interchangeable hardened ground insert plates within the worktable assembly.",
          "Manual blade tensioning system coupled with a highly visible safety pressure gauge.",
          "Friction-driven rotary wire wheel brush for aggressive chip removal.",
          "Built-in heavy-duty flood coolant circulation tank and pump system."
        ]
      },
      {
        id: "vc-manual",
        name: "Manual Toolroom Vertical Bandsaw",
        type: "Manual",
        image: "/images/products/vertical_bandsaw_edited3.png",
        features: [
          "Compact industrial footprint optimized for die-shop and toolroom requirements.",
          "Manual hand-feed workspace with balanced, smooth-glide material pushing attachments.",
          "Mechanical variable speed pulley system for quick material cutting adaptations.",
          "Inbuilt post-weld blade grinding and annealing attachment for custom internal loop cutting.",
          "Adjustable height blade guide arm ensuring minimum exposed blade during operation.",
          "Tungsten carbide wear pads and dual-roller bearings for dependable blade stability.",
          "Removable heavy metal chip collection box underneath the primary workspace drive.",
          "Low-voltage workstation working lamp for precise line-of-cut illumination."
        ]
      }
    ]
  },
  "circular-saw": {
    title: "High-Speed Circular Saws",
    subtitle: "High-Efficiency Circular Cold Saws",
    description: "The ultimate solution for rapid, burr-free linear cutting of pipes, tubes, bars, and solid structural solid steel profiles. Engineered with solid cast iron bases to maintain processing speed without sacrificing surface finish quality.",
    products: [
      {
        id: "cs-auto",
        name: "Fully Automatic CNC Circular Cold Saw",
        type: "Automatic",
        image: "/images/products/ACS machine.jpeg",
        features: [
          "Ultra-fast processing cycle designed specifically for TCT (Tungsten Carbide Tipped) blades.",
          "Servo-motor driven ball screw material indexing mechanism ensuring ±0.1mm linear repeatability.",
          "Multi-stage automated sorting chute separating product trim-cuts from completed batches.",
          "Heavy-duty oil-bath gear transmission box maximizing torque output efficiency.",
          "Pneumatic or hydraulic horizontal and vertical split clamping vices securing raw stock.",
          "Advanced HMI system allowing pre-programmed multi-length nested cutting routines.",
          "Controlled micro-mist blade lubrication system preventing component over-saturation.",
          "Full enclosure sheet metal safety shielding guarding operator workspace entirely."
        ]
      },
      {
        id: "cs-semi",
        name: "Semi Automatic Pneumatic Circular Saw",
        type: "Semi-Automatic",
        image: "/images/products/ACS machine.jpeg",
        features: [
          "Pneumatic toggle mechanism activating raw material clamping and saw-head downward feed.",
          "High-strength cast-iron saw head assembly mounted on a dual-pillar guidance track.",
          "Two-speed heavy duty induction motor selectable via rotary panel switch settings.",
          "Dual-sided self-centering material vice keeping bars stable across variable sizes.",
          "Adjustable positive hard-stops for controlling cutting depth and vertical cycle stroke return.",
          "High-capacity electric flood coolant pump delivering fluid straight to the blade edge.",
          "Foot pedal actuation options minimizing physical operator interaction requirements."
        ]
      },
      {
        id: "cs-manual",
        name: "Manual Pivot Industrial Circular Saw",
        type: "Manual",
        image: "/images/products/ACS machine.jpeg",
        features: [
          "Manual downward pull lever with integrated low-voltage on/off deadman trigger switch.",
          "Movable miter head swiveling up to 45 degrees left or right for quick angular cuts.",
          "Quick-clamping mechanical screw vice with adjustable counter-jaw alignments.",
          "High-precision HSS (High Speed Steel) saw blade integration optimized for general engineering profiles.",
          "Integrated material support arm extending out to prevent long-bar drop distortions.",
          "Sturdy steel floor pedestal storage stand housing coolant catch basins internally.",
          "Spring-loaded counterbalanced head design minimizing physical pull force required."
        ]
      }
    ]
  }
};