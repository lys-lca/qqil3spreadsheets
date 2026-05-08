/**
 * glossary-data.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Shared data for ALL site sections.
 *
 * Each entry:
 *   term         full name shown on card front (concept) or glossary heading
 *   abbr         abbreviation string, or null if none
 *   hint         short nudge: acronym cards → reveals full term in JS (no field needed)
 *                             concept cards → this text shown as hint
 *   def          full definition shown on card back and in glossary
 *   tags         array of category keys — must exist in CATEGORIES
 *   searchable   false → exclude from Wordsearch (slashes, punctuation etc.)
 *                omit or true → included in Wordsearch
 *
 * Images (optional — no field needed in data):
 *   Drop a .png into the images/ folder named after the term or abbreviation.
 *   The JS derives the filename automatically:
 *     abbr exists (no slash) → abbr with non-alphanumeric chars stripped  e.g. CPU.png
 *     abbr has a slash       → falls back to term-based name
 *     no abbr                → term with spaces→underscores, punctuation stripped
 *   Image shows in flashcard answer and glossary card if the file exists.
 *   No image = no placeholder shown.
 *
 * To add a category:
 *   Add an entry to CATEGORIES. Filter buttons appear automatically everywhere.
 * ─────────────────────────────────────────────────────────────
 */

// ── CATEGORY DEFINITIONS ─────────────────────────────────────
const CATEGORIES = {
  hardware: {
    label: "Hardware",
    color: "#ff9f6b",
    border: "rgba(255,159,107,0.25)",
    bg:     "rgba(255,159,107,0.08)"
  },
  software: {
    label: "Software",
    color: "#6b8cff",
    border: "rgba(107,140,255,0.25)",
    bg:     "rgba(107,140,255,0.08)"
  },
  networking: {
    label: "Networking",
    color: "#b06bff",
    border: "rgba(176,107,255,0.25)",
    bg:     "rgba(176,107,255,0.08)"
  },
  internet: {
    label: "Internet",
    color: "#0ea5e9",
    border: "rgba(14,165,233,0.3)",
    bg:     "rgba(14,165,233,0.08)"
  },
  storage: {
    label: "Storage",
    color: "#d4a017",
    border: "rgba(212,160,23,0.3)",
    bg:     "rgba(212,160,23,0.08)"
  },
  input: {
    label: "Input",
    color: "#4fffb0",
    border: "rgba(79,255,176,0.25)",
    bg:     "rgba(79,255,176,0.08)"
  },
  output: {
    label: "Output",
    color: "#ff6b6b",
    border: "rgba(255,107,107,0.25)",
    bg:     "rgba(255,107,107,0.08)"
  },
  security: {
    label: "Security",
    color: "#ef4444",
    border: "rgba(239,68,68,0.25)",
    bg:     "rgba(239,68,68,0.08)"
  },
  data: {
    label: "Data",
    color: "#22c55e",
    border: "rgba(34,197,94,0.3)",
    bg:     "rgba(34,197,94,0.08)"
  },
  cloud: {
    label: "Cloud",
    color: "#38bdf8",
    border: "rgba(56,189,248,0.3)",
    bg:     "rgba(56,189,248,0.08)"
  },
  wordprocessing: {
    label: "Word Processing",
    color: "#e8973a",
    border: "rgba(232,151,58,0.3)",
    bg:     "rgba(232,151,58,0.08)"
  },
  emerging: {
    label: "Emerging Tech",
    color: "#c084fc",
    border: "rgba(192,132,252,0.3)",
    bg:     "rgba(192,132,252,0.08)"
  },
  management: {
    label: "IT Management",
    color: "#94a3b8",
    border: "rgba(148,163,184,0.3)",
    bg:     "rgba(148,163,184,0.08)"
  },
  units: {
    label: "Units",
    color: "#94a3b8",
    border: "rgba(148,163,184,0.2)",
    bg:     "rgba(148,163,184,0.06)"
  }
};

// ── GLOSSARY TERMS ────────────────────────────────────────────

const GLOSSARY = [

  // ── HARDWARE / GENERAL COMPUTING ──────────────────────────
  {
    "term": "Central Processing Unit",
    "abbr": "CPU",
    "hint": "Think of it as the 'brain' — it executes all instructions.",
    "def": "The main chip in a computer that carries out instructions and processes data. Often called the 'brain' of the computer.",
    "tags": [
      "hardware"
    ]
  },
  {
    "term": "Personal Computer",
    "abbr": "PC",
    "hint": "A computer designed for one person to use at home or work.",
    "def": "A general-purpose computer designed for individual use, typically running an operating system like Windows or macOS.",
    "tags": [
      "hardware"
    ]
  },
  {
    "term": "Visual Display Unit",
    "abbr": "VDU",
    "hint": "Another name for the screen you look at.",
    "def": "The screen or monitor used to display output from a computer. Also called a monitor.",
    "tags": [
      "hardware",
      "output"
    ]
  },
  {
    "term": "Monitor",
    "abbr": null,
    "hint": "The output screen on your desk — modern ones are flat panel.",
    "def": "The screen device that displays text, images and video output from a computer. Modern monitors are LCD or OLED.",
    "tags": [
      "hardware",
      "output"
    ]
  },
  {
    "term": "Cathode Ray Tube",
    "abbr": "CRT",
    "hint": "The old bulky monitor technology — no longer common.",
    "def": "An older type of monitor that used a vacuum tube to project images on screen. Now replaced by flat-panel LCD/OLED displays.",
    "tags": [
      "hardware",
      "output"
    ]
  },
  {
    "term": "Pixel",
    "abbr": null,
    "hint": "The tiny dots that make up every image on a screen.",
    "def": "The smallest individual element of a digital image or screen display. Short for 'picture element'. Screen resolution is measured in pixels.",
    "tags": [
      "hardware",
      "output"
    ]
  },
  {
    "term": "Resolution",
    "abbr": null,
    "hint": "Measured in pixels — higher means a clearer image.",
    "def": "The number of pixels on a screen, measured as width × height (e.g. 1920×1080). Higher resolution means sharper, more detailed images.",
    "tags": [
      "hardware",
      "output"
    ]
  },
  {
    "term": "Dots Per Inch",
    "abbr": "DPI",
    "hint": "A measure of sharpness for printing or screens.",
    "def": "A measure of print or screen resolution — how many individual dots fit in one inch. Higher DPI means sharper output.",
    "tags": [
      "hardware",
      "output"
    ]
  },
  {
    "term": "Computer Speed",
    "abbr": null,
    "hint": "Measured in GHz — related to how quickly the CPU works.",
    "def": "How fast a computer can process instructions, measured in MHz (megahertz) or GHz (gigahertz). Affected by CPU speed and RAM.",
    "tags": [
      "hardware"
    ]
  },
  {
    "term": "Ergonomics",
    "abbr": null,
    "hint": "About designing workspaces to keep your body comfortable.",
    "def": "The study of designing computer equipment and workspaces to suit the human body, reducing strain and injury for users.",
    "tags": [
      "hardware"
    ]
  },
  {
    "term": "Megahertz",
    "abbr": "MHz",
    "hint": "A unit of CPU speed — one million cycles per second.",
    "def": "A unit of processor clock speed equal to one million cycles per second. Modern computers are measured in GHz (gigahertz).",
    "tags": [
      "hardware",
      "units"
    ]
  },
  {
    "term": "Hardware",
    "abbr": null,
    "hint": "If you can touch it, it's this — the physical parts.",
    "def": "The physical components of a computer system that you can touch — CPU, RAM, keyboard, monitor, hard drive etc.",
    "tags": [
      "hardware"
    ]
  },
  {
    "term": "Uninterruptible Power Supply",
    "abbr": "UPS",
    "hint": "A battery backup that keeps computers on during a power cut.",
    "def": "A battery backup providing emergency power to computers and networking equipment during power outages or surges, giving time to save work and shut down safely.",
    "tags": [
      "hardware"
    ]
  },
  {
    "term": "Network Attached Storage",
    "abbr": "NAS",
    "hint": "A shared storage box plugged into the office network.",
    "def": "A dedicated file storage device connected to a network, allowing multiple users to store and access data from a centralised location. Cost-effective shared storage for small to medium offices.",
    "tags": [
      "hardware",
      "storage",
      "networking"
    ]
  },
  {
    "term": "Random Access Memory",
    "abbr": "RAM",
    "hint": "Temporary memory — lost when you switch the computer off.",
    "def": "Temporary (volatile) memory that a computer uses to store data currently in use. Contents are lost when the computer is switched off. More RAM allows running more applications simultaneously.",
    "tags": [
      "hardware",
      "storage"
    ]
  },
  {
    "term": "Read Only Memory",
    "abbr": "ROM",
    "hint": "Permanent memory that survives power-off — holds startup code.",
    "def": "Non-volatile memory that holds permanent instructions (like startup code). Contents are kept when power is off and cannot normally be changed.",
    "tags": [
      "hardware",
      "storage"
    ]
  },
  {
    "term": "Memory",
    "abbr": null,
    "hint": "The general term covering both RAM and ROM.",
    "def": "The storage space inside a computer for holding data and programs. Includes RAM (temporary) and ROM (permanent).",
    "tags": [
      "hardware",
      "storage"
    ]
  },
  {
    "term": "Main Memory",
    "abbr": null,
    "hint": "The RAM the CPU uses directly to run current programs.",
    "def": "The primary working memory of a computer, usually RAM. Directly accessible by the CPU for currently running programs.",
    "tags": [
      "hardware",
      "storage"
    ]
  },
  {
    "term": "Volatile / Non-Volatile",
    "abbr": null,
    "hint": "Think: does the memory survive being switched off?",
    "def": "Volatile memory (e.g. RAM) loses its data when power is off. Non-volatile memory (e.g. ROM, SSD, hard disk) keeps data without power.",
    "tags": [
      "storage"
    ],
    "searchable": false
  },
  {
    "term": "Bit",
    "abbr": "b",
    "hint": "The very smallest unit of data — just a 0 or a 1.",
    "def": "The smallest unit of digital data — either a 0 or a 1 (binary digit).",
    "tags": [
      "storage",
      "units"
    ]
  },
  {
    "term": "Kilobyte",
    "abbr": "KB",
    "hint": "1,024 bytes — good for tiny text files.",
    "def": "A unit of digital storage equal to 1,024 bytes. Used to measure small files.",
    "tags": [
      "storage",
      "units"
    ]
  },
  {
    "term": "Megabyte",
    "abbr": "MB",
    "hint": "About one million bytes — used for photos and documents.",
    "def": "A unit of digital storage equal to approximately one million bytes (1,024 KB). Used for documents and images.",
    "tags": [
      "storage",
      "units"
    ]
  },
  {
    "term": "Gigabyte",
    "abbr": "GB",
    "hint": "About one billion bytes — USB sticks and phone storage.",
    "def": "A unit of digital storage equal to approximately one billion bytes (1,024 MB). Used for hard drives and USB sticks.",
    "tags": [
      "storage",
      "units"
    ]
  },
  {
    "term": "Terabyte",
    "abbr": "TB",
    "hint": "1,024 GB — the unit for large hard drives.",
    "def": "A unit of digital storage equal to 1,024 GB. Used for large hard drives and cloud storage.",
    "tags": [
      "storage",
      "units"
    ]
  },
  {
    "term": "Storage Device",
    "abbr": null,
    "hint": "Any device that holds data permanently — drive, USB, disc.",
    "def": "Any device used to store data permanently, such as a hard drive, SSD, USB stick, or optical disc.",
    "tags": [
      "storage"
    ]
  },
  {
    "term": "Hard Disk Drive",
    "abbr": "HDD",
    "hint": "Uses spinning magnetic platters — older and slower than SSD.",
    "def": "A traditional magnetic storage device using spinning disks. Slower than SSDs but offers higher capacity for lower cost. Widely used for backups and bulk storage.",
    "tags": [
      "storage",
      "hardware"
    ]
  },
  {
    "term": "Solid State Drive",
    "abbr": "SSD",
    "hint": "No moving parts — much faster than a traditional hard drive.",
    "def": "A modern storage device with no moving parts that uses flash memory. Significantly faster than HDDs, improving boot times and application loading. The preferred choice for business computers.",
    "tags": [
      "storage",
      "hardware"
    ]
  },
  {
    "term": "CD-ROM",
    "abbr": "CD-ROM",
    "hint": "An optical disc you can read from but not write to.",
    "def": "Compact Disc Read-Only Memory. An optical disc that stores data and can be read but not written to by standard drives.",
    "tags": [
      "storage"
    ]
  },
  {
    "term": "WORM CD",
    "abbr": "WORM",
    "hint": "You can write to it exactly once — read-only forever after.",
    "def": "Write Once, Read Many. An optical disc where data can be written once and then only read. Used for archiving.",
    "tags": [
      "storage"
    ]
  },
  {
    "term": "USB Flash Drive",
    "abbr": "USB",
    "hint": "The small portable storage stick you plug into a port.",
    "def": "A portable storage device that plugs into a USB port. Also called a memory stick or pen drive. Replaced floppy disks for portable storage.",
    "tags": [
      "storage"
    ]
  },
  {
    "term": "Cloud Storage",
    "abbr": null,
    "hint": "Your files on someone else's server — accessible anywhere.",
    "def": "Storing files on remote servers accessed over the internet (e.g. Google Drive, OneDrive, iCloud). Files are available from any device and protected against local hardware failure.",
    "tags": [
      "storage",
      "cloud"
    ]
  },
  {
    "term": "Computer Backup",
    "abbr": null,
    "hint": "A spare copy of data kept somewhere safe.",
    "def": "A copy of important data stored separately (e.g. on an external drive or cloud) to protect against data loss from hardware failure, ransomware or accidental deletion.",
    "tags": [
      "storage"
    ]
  },
  {
    "term": "Format",
    "abbr": null,
    "hint": "Wiping a drive clean — or setting a document's layout.",
    "def": "To prepare a storage device for use by creating a file system, which erases all existing data. Also refers to the layout and presentation of a document.",
    "tags": [
      "storage",
      "software"
    ]
  },
  {
    "term": "Operating System",
    "abbr": "OS",
    "hint": "Windows and macOS are examples — it manages the hardware.",
    "def": "The core software that manages all hardware and other software on a computer. The foundation everything else runs on. Examples: Windows, macOS, Android, iOS, Linux.",
    "tags": [
      "software"
    ]
  },
  {
    "term": "Software",
    "abbr": null,
    "hint": "The programs you can't touch — opposite of hardware.",
    "def": "Programs and applications that run on a computer. Divided into system software (OS) and application software (Word, Excel etc.).",
    "tags": [
      "software"
    ]
  },
  {
    "term": "Programme / Application",
    "abbr": null,
    "hint": "A set of coded instructions — also called an app.",
    "def": "A set of instructions written in a programming language that tells the computer what to do. Also called software or an app.",
    "tags": [
      "software"
    ],
    "searchable": false
  },
  {
    "term": "What You See Is What You Get",
    "abbr": "WYSIWYG",
    "hint": "The screen shows exactly how the printed page will look.",
    "def": "A word-processing feature where the screen shows exactly how the printed document will look, including fonts, sizes and layout.",
    "tags": [
      "software",
      "wordprocessing"
    ]
  },
  {
    "term": "App / Mobile Application",
    "abbr": null,
    "hint": "Downloaded from App Store or Google Play — runs on phone.",
    "def": "Software designed for smartphones and tablets. Apps are downloaded from stores like the Apple App Store or Google Play.",
    "tags": [
      "software"
    ],
    "searchable": false
  },
  {
    "term": "Open Source",
    "abbr": null,
    "hint": "The code is freely available for anyone to see or change.",
    "def": "Software with source code freely available for anyone to view, modify and distribute. Often free or low-cost, with community-driven development. Examples: Linux, WordPress, Firefox.",
    "tags": [
      "software"
    ]
  },
  {
    "term": "Proprietary Software",
    "abbr": null,
    "hint": "Owned by a company — you need a licence, can't see code.",
    "def": "Software owned by a company with restricted access to source code, typically requiring paid licences to use. Usually includes vendor support. Examples: Microsoft Windows, Adobe Creative Suite.",
    "tags": [
      "software"
    ]
  },
  {
    "term": "Security Patch",
    "abbr": null,
    "hint": "A software update that plugs a security hole.",
    "def": "A software update released by a vendor to fix security vulnerabilities or bugs. Unpatched systems are a top entry point for cyberattacks — regular patching is essential.",
    "tags": [
      "software",
      "security"
    ]
  },
  {
    "term": "Input Device",
    "abbr": null,
    "hint": "Any device used to get data INTO the computer.",
    "def": "Any hardware used to enter data into a computer. Examples: keyboard, mouse, touchscreen, scanner, microphone, webcam.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Keyboard",
    "abbr": null,
    "hint": "The most common way to type text into a computer.",
    "def": "The most common input device, used to type text and commands into a computer. Can be physical or on-screen (virtual).",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Mouse",
    "abbr": null,
    "hint": "You move it to control the cursor and click to select.",
    "def": "A pointing device used to move a cursor on screen and select items by clicking. Can be wired, wireless or a trackpad.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Touchscreen",
    "abbr": null,
    "hint": "The screen is also the input — you tap directly on it.",
    "def": "A display screen that acts as both output and input — the user interacts directly by touching the screen with fingers or a stylus.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Light Pen",
    "abbr": null,
    "hint": "Shaped like a pen — detects light on the screen surface.",
    "def": "An input device shaped like a pen that can detect light on a screen, used to draw or select items directly on a monitor.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Scanner",
    "abbr": null,
    "hint": "Converts a paper document into a digital file.",
    "def": "An input device that converts a physical document or image into digital format so it can be stored or edited on a computer.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Barcode / Wand Reader",
    "abbr": null,
    "hint": "Reads the striped pattern on products at a checkout.",
    "def": "An input device that reads the black and white stripes (barcode) on products to retrieve stored information about price or stock.",
    "tags": [
      "input",
      "hardware"
    ],
    "searchable": false
  },
  {
    "term": "Microphone",
    "abbr": null,
    "hint": "Converts your voice or sound into digital data.",
    "def": "An input device that converts sound into digital data. Used for voice calls, voice recognition, recording audio and online meetings.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Webcam",
    "abbr": null,
    "hint": "A small camera on your computer for video calls.",
    "def": "A camera connected to or built into a computer used to capture video and images, commonly for video conferencing.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Optical Character Recognition",
    "abbr": "OCR",
    "hint": "Turns a scanned image of text into editable digital text.",
    "def": "Software that reads printed or handwritten text from a scanned image and converts it into editable digital text.",
    "tags": [
      "input",
      "software"
    ]
  },
  {
    "term": "Magnetic Ink Character Recognition",
    "abbr": "MICR",
    "hint": "Used on bank cheques — reads special magnetic ink.",
    "def": "A technology that reads special magnetic ink characters, commonly found on bank cheques to identify account numbers.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Multiple Choice Question",
    "abbr": "MCQ",
    "hint": "A question where you pick from several given options.",
    "def": "A type of question with several possible answers to choose from. Common in computerised tests and assessments.",
    "tags": [
      "input"
    ]
  },
  {
    "term": "Point of Sale Terminal",
    "abbr": "POS",
    "hint": "The till system at a shop checkout.",
    "def": "The electronic system at a shop checkout used to process sales, including card payments and stock management.",
    "tags": [
      "input",
      "hardware"
    ]
  },
  {
    "term": "Output Device",
    "abbr": null,
    "hint": "Any device that gets data OUT of the computer to you.",
    "def": "Any hardware that presents processed data to the user. Examples: monitor, printer, speakers, projector.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Impact Printer",
    "abbr": null,
    "hint": "Physically strikes the paper to print — noisy but cheap.",
    "def": "A printer that forms characters by physically striking an ink ribbon against paper. Example: dot matrix printer. Noisy but cheap to run.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Non-Impact Printer",
    "abbr": null,
    "hint": "Prints without physically touching the paper.",
    "def": "A printer that forms images without striking the paper. Examples: inkjet and laser printers. Quieter and higher quality.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Dot Matrix Printer",
    "abbr": null,
    "hint": "Uses tiny pins to form letters from dots — very noisy.",
    "def": "An impact printer that creates characters from a grid of dots using tiny pins. Can print multi-part forms. Now mostly obsolete.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Inkjet Printer",
    "abbr": null,
    "hint": "Sprays tiny ink droplets — common for home colour printing.",
    "def": "A printer that sprays tiny droplets of ink onto paper. Affordable and good for colour printing at home.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Laser Printer",
    "abbr": null,
    "hint": "Uses a laser and toner powder — fast, sharp, office use.",
    "def": "A high-speed printer that uses a laser beam and toner powder to produce sharp, high-quality output. Common in offices.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Thermal Printer",
    "abbr": null,
    "hint": "Uses heat on special paper — used for shop receipts.",
    "def": "A printer that uses heat to produce an image on special heat-sensitive paper. Used for receipts and labels.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "3D Printer",
    "abbr": null,
    "hint": "Builds solid objects layer by layer from a digital design.",
    "def": "A device that creates three-dimensional solid objects layer by layer from a digital design. Used in engineering, medicine and design.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Plotter",
    "abbr": null,
    "hint": "Draws on paper using a moving pen — for large plans.",
    "def": "An output device that draws vector graphics using a pen moving over paper. Used for large technical drawings and engineering plans.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Pages Per Minute",
    "abbr": "PPM",
    "hint": "How many pages a printer produces every minute.",
    "def": "A measure of printer speed — how many pages a printer can produce in one minute.",
    "tags": [
      "output",
      "units"
    ]
  },
  {
    "term": "Speakers",
    "abbr": null,
    "hint": "Convert digital audio signals into sound you can hear.",
    "def": "Output devices that convert digital audio signals into sound. Built into most laptops, phones and monitors.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Projector",
    "abbr": null,
    "hint": "Throws a large image onto a wall — common in classrooms.",
    "def": "An output device that projects a computer screen image onto a wall or screen. Widely used in classrooms and presentations.",
    "tags": [
      "output",
      "hardware"
    ]
  },
  {
    "term": "Data",
    "abbr": null,
    "hint": "Raw facts with no context — numbers or words alone.",
    "def": "Raw facts and figures that have no meaning on their own, e.g. '27, Red, 9'. Data becomes information when given context.",
    "tags": [
      "data"
    ]
  },
  {
    "term": "Information",
    "abbr": null,
    "hint": "Data given context so it actually means something.",
    "def": "Data that has been processed and given context so it is meaningful and useful, e.g. 'Order No. 27: 9 red items'.",
    "tags": [
      "data"
    ]
  },
  {
    "term": "Database",
    "abbr": null,
    "hint": "An organised electronic collection of searchable records.",
    "def": "An organised collection of structured data stored electronically, managed by software to allow easy access, management and updating. Foundation of most business applications.",
    "tags": [
      "data",
      "software"
    ]
  },
  {
    "term": "Spreadsheet",
    "abbr": null,
    "hint": "Excel is the most famous example — rows, columns, formulas.",
    "def": "A software application (e.g. Microsoft Excel) that organises data in rows and columns, used for calculations, charts and analysis.",
    "tags": [
      "data",
      "software"
    ]
  },
  {
    "term": "Data Breach",
    "abbr": null,
    "hint": "When private data is accessed by someone unauthorised.",
    "def": "Unauthorised access to confidential data, resulting in information being viewed, stolen or used without permission. Can cause major financial loss, legal liability and reputational damage.",
    "tags": [
      "data",
      "security"
    ]
  },
  {
    "term": "General Data Protection Regulation",
    "abbr": "GDPR",
    "hint": "The EU law governing how companies handle personal data.",
    "def": "European Union regulation governing how businesses collect, store and use personal data. Affects any organisation dealing with EU customers, with significant fines for non-compliance.",
    "tags": [
      "data",
      "security"
    ]
  },
  {
    "term": "Network",
    "abbr": null,
    "hint": "Two or more computers linked to share files and resources.",
    "def": "Two or more computers connected together to share resources, files and an internet connection.",
    "tags": [
      "networking"
    ]
  },
  {
    "term": "Local Area Network",
    "abbr": "LAN",
    "hint": "A network within one building — a school or office.",
    "def": "A network connecting computers in a small area such as a school, home or office building.",
    "tags": [
      "networking"
    ]
  },
  {
    "term": "Wide Area Network",
    "abbr": "WAN",
    "hint": "Spans cities or countries — the internet is the biggest.",
    "def": "A network connecting computers over a large geographical area, such as different cities or countries. The internet is the largest WAN.",
    "tags": [
      "networking"
    ]
  },
  {
    "term": "Server",
    "abbr": null,
    "hint": "A powerful computer that serves files to others.",
    "def": "A powerful computer that processes requests and delivers data to other computers over a network. Hosts websites, stores files, runs applications and manages network resources.",
    "tags": [
      "networking",
      "hardware"
    ]
  },
  {
    "term": "Router",
    "abbr": null,
    "hint": "The box connecting your network to the internet.",
    "def": "A networking device that connects your local network to the internet and directs data between networks. The central hub for home and office internet connections.",
    "tags": [
      "networking",
      "hardware"
    ]
  },
  {
    "term": "Switch",
    "abbr": null,
    "hint": "Like a smarter hub — sends data only where it's needed.",
    "def": "A networking device that connects multiple devices on a local network and forwards data only to the specific device that needs it. More efficient than older hubs.",
    "tags": [
      "networking",
      "hardware"
    ]
  },
  {
    "term": "Wi-Fi",
    "abbr": null,
    "hint": "Wireless internet access using radio waves.",
    "def": "A wireless networking technology that allows devices to connect to a network and the internet without cables, using radio waves. Common standards include Wi-Fi 5 and Wi-Fi 6.",
    "tags": [
      "networking"
    ]
  },
  {
    "term": "Bluetooth",
    "abbr": null,
    "hint": "Short-range wireless — think headphones to a phone.",
    "def": "A short-range wireless technology used to connect devices (e.g. phones to headphones, keyboards to computers) over about 10 metres.",
    "tags": [
      "networking"
    ]
  },
  {
    "term": "Video Conferencing",
    "abbr": null,
    "hint": "Online meetings with video — Zoom is a famous example.",
    "def": "Using the internet to hold real-time meetings with video and audio between people in different locations. Examples: Zoom, Microsoft Teams, Google Meet.",
    "tags": [
      "networking",
      "internet"
    ]
  },
  {
    "term": "Bandwidth",
    "abbr": null,
    "hint": "How much data can flow — measured in Mbps.",
    "def": "The maximum amount of data that can be transmitted over an internet connection in a given time, measured in Mbps or Gbps. Determines how fast data is downloaded or uploaded.",
    "tags": [
      "networking",
      "units"
    ]
  },
  {
    "term": "IP Address",
    "abbr": "IP",
    "hint": "Every device's unique address on a network.",
    "def": "A unique numerical label assigned to every device connected to a network, like a mailing address for internet communications. Allows devices to find and communicate with each other.",
    "tags": [
      "networking",
      "internet"
    ]
  },
  {
    "term": "Domain Name System",
    "abbr": "DNS",
    "hint": "Translates website names into numbers computers use.",
    "def": "The 'phone book' of the internet, translating human-readable domain names (like google.com) into IP addresses that computers use. Makes the internet usable without memorising numbers.",
    "tags": [
      "networking",
      "internet"
    ]
  },
  {
    "term": "Latency",
    "abbr": null,
    "hint": "The delay in a connection — high causes video call lag.",
    "def": "The delay between sending a request and receiving a response, measured in milliseconds. Low latency is critical for video conferencing, gaming and online collaboration tools.",
    "tags": [
      "networking",
      "units"
    ]
  },
  {
    "term": "Virtual Private Network",
    "abbr": "VPN",
    "hint": "An encrypted tunnel for traffic — great for remote workers.",
    "def": "A secure, encrypted connection between your device and the internet, routing traffic through a private server. Protects sensitive data when employees work remotely or use public Wi-Fi.",
    "tags": [
      "networking",
      "security"
    ]
  },
  {
    "term": "Internet",
    "abbr": null,
    "hint": "The worldwide network of networks — billions of devices.",
    "def": "A global network of networks connecting billions of computers worldwide, allowing data, email, websites and services to be shared.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "World Wide Web",
    "abbr": "WWW",
    "hint": "Web pages and websites — part of the internet.",
    "def": "A system of web pages and websites accessed through the internet using a web browser. The web is part of the internet — not the same thing.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "HyperText Markup Language",
    "abbr": "HTML",
    "hint": "The coding language used to build web pages.",
    "def": "The standard language used to create and structure web pages. Defines headings, paragraphs, links and images on a page.",
    "tags": [
      "internet",
      "software"
    ]
  },
  {
    "term": "HyperText Transfer Protocol",
    "abbr": "HTTP / HTTPS",
    "hint": "Rules for sending web pages — HTTPS is the secure version.",
    "def": "The set of rules (protocol) used to transfer web pages from a server to a browser. HTTPS is the secure encrypted version — indicated by a padlock in your browser.",
    "tags": [
      "internet",
      "security"
    ],
    "searchable": false
  },
  {
    "term": "Uniform Resource Locator",
    "abbr": "URL",
    "hint": "The full web address you type into a browser.",
    "def": "The complete web address of a page on the internet, e.g. https://www.scoilnet.ie. Tells a browser exactly where to find a resource.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Internet Service Provider",
    "abbr": "ISP",
    "hint": "The company you pay for broadband.",
    "def": "A company that provides customers with access to the internet, e.g. Eir, Virgin Media, Three. You pay them for a broadband or mobile data plan.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Modem",
    "abbr": "MODEM",
    "hint": "Connects to the internet via the phone line.",
    "def": "A device that connects a computer to the internet through a telephone line. Stands for Modulator-Demodulator. Modern broadband routers typically include modem functionality.",
    "tags": [
      "internet",
      "hardware",
      "networking"
    ]
  },
  {
    "term": "Uploading",
    "abbr": null,
    "hint": "Sending something FROM your device TO the internet.",
    "def": "Sending a file from your device to a server or website on the internet, e.g. uploading a photo to social media or submitting an assignment online.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Downloading",
    "abbr": null,
    "hint": "Getting something FROM the internet ONTO your device.",
    "def": "Copying or receiving a file from a server or the internet onto your device, e.g. downloading a song, app or document.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Email",
    "abbr": null,
    "hint": "Electronic messages sent over the internet.",
    "def": "Electronic mail. Messages sent and received over the internet. Can include attachments like documents or images. One of the most widely used internet services.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Social Media",
    "abbr": null,
    "hint": "Instagram, TikTok, Facebook — platforms for sharing.",
    "def": "Online platforms where users create, share and interact with content. Examples: Instagram, TikTok, X (Twitter), Facebook, LinkedIn.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Podcast",
    "abbr": null,
    "hint": "Like a radio show, but on-demand on the internet.",
    "def": "A digital audio programme available on the internet for streaming or download. Often released as a series of episodes on topics from education to entertainment.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Streaming",
    "abbr": null,
    "hint": "Watch or listen without a full download first.",
    "def": "Playing audio or video content directly from the internet without fully downloading it first. Examples: Netflix, Spotify, YouTube.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Search Engine",
    "abbr": null,
    "hint": "Google is the most famous — finds web pages for you.",
    "def": "A web service that indexes the internet and returns relevant results to a user's query. Examples: Google, Bing, DuckDuckGo.",
    "tags": [
      "internet"
    ]
  },
  {
    "term": "Cookie",
    "abbr": null,
    "hint": "A tiny file a website stores on your device.",
    "def": "A small file stored on your device by a website to remember preferences, login details or browsing behaviour. Under GDPR, websites must ask permission before storing non-essential cookies.",
    "tags": [
      "internet",
      "security"
    ]
  },
  {
    "term": "Cloud Computing",
    "abbr": null,
    "hint": "Using someone else's servers over the internet.",
    "def": "Delivering computing services (servers, storage, databases, software) over the internet instead of from local computers. Allows businesses to access technology without major upfront hardware investment.",
    "tags": [
      "cloud"
    ]
  },
  {
    "term": "Virtual Machine",
    "abbr": "VM",
    "hint": "A software computer running inside a real computer.",
    "def": "A software-based computer running inside a physical computer, with its own operating system and applications isolated from other VMs. Allows multiple 'computers' to run on one physical server.",
    "tags": [
      "cloud",
      "software"
    ]
  },
  {
    "term": "Backup and Disaster Recovery",
    "abbr": "BDR",
    "hint": "Copying data AND the plan to restore it after disaster.",
    "def": "Systems and processes for copying data (backup) and restoring operations (disaster recovery) after data loss, system failure or disaster. Protects businesses from ransomware and prolonged downtime.",
    "tags": [
      "cloud",
      "storage",
      "security"
    ]
  },
  {
    "term": "Virus",
    "abbr": null,
    "hint": "Malicious software that spreads by attaching to files.",
    "def": "Malicious software that attaches itself to files and spreads between computers, corrupting data or causing damage.",
    "tags": [
      "security",
      "software"
    ]
  },
  {
    "term": "Malware",
    "abbr": null,
    "hint": "The umbrella term for ALL malicious software.",
    "def": "Short for malicious software — any program intentionally designed to cause damage, steal data or gain unauthorised access. Includes viruses, ransomware, spyware and trojans.",
    "tags": [
      "security",
      "software"
    ]
  },
  {
    "term": "Ransomware",
    "abbr": null,
    "hint": "Locks your files and demands payment to get them back.",
    "def": "Malicious software that encrypts your files and demands payment to restore access. One of the most damaging cyber threats, potentially locking businesses out of critical data for days or weeks.",
    "tags": [
      "security",
      "software"
    ]
  },
  {
    "term": "Phishing",
    "abbr": null,
    "hint": "Fake emails tricking you into giving away passwords.",
    "def": "Fraudulent emails, texts or messages designed to trick people into revealing passwords or financial details. The number one method cybercriminals use to breach organisations.",
    "tags": [
      "security"
    ]
  },
  {
    "term": "Firewall",
    "abbr": null,
    "hint": "A security barrier between your network and the internet.",
    "def": "A security system that monitors and controls incoming and outgoing network traffic. Acts as a barrier between your trusted internal network and untrusted external networks like the internet.",
    "tags": [
      "security",
      "networking"
    ]
  },
  {
    "term": "Encryption",
    "abbr": null,
    "hint": "Scrambles data so only someone with the key can read it.",
    "def": "Converting data into a coded format that can only be read by someone with the decryption key. Ensures that even if data is stolen, it remains unreadable. Used in HTTPS, emails and stored files.",
    "tags": [
      "security"
    ]
  },
  {
    "term": "Password",
    "abbr": null,
    "hint": "A secret code used to prove who you are.",
    "def": "A secret string of characters used to verify identity and control access to systems, accounts or devices.",
    "tags": [
      "security"
    ]
  },
  {
    "term": "Two-Factor Authentication",
    "abbr": "2FA",
    "hint": "Login requires two steps — password PLUS a phone code.",
    "def": "A security process requiring two verification methods — something you know (password) plus something you have (phone code) or are (fingerprint). Dramatically reduces the risk of unauthorised access.",
    "tags": [
      "security"
    ]
  },
  {
    "term": "Multi-Factor Authentication",
    "abbr": "MFA",
    "hint": "Like 2FA but can use more than two verification steps.",
    "def": "A security process requiring two or more verification methods before granting access. Similar to 2FA but can involve more than two factors. Significantly reduces breach risk.",
    "tags": [
      "security"
    ]
  },
  {
    "term": "Remote Monitoring and Management",
    "abbr": "RMM",
    "hint": "IT staff can watch and fix computers remotely.",
    "def": "Software allowing IT providers to monitor and manage client systems remotely, detecting and often fixing issues before users notice. Enables proactive IT support and reduces downtime.",
    "tags": [
      "management",
      "software"
    ]
  },
  {
    "term": "Help Desk",
    "abbr": null,
    "hint": "The team or system you contact with a tech problem.",
    "def": "A resource providing information and IT support to users, handling technical problems and questions. A single point of contact for IT issues, improving response times and user satisfaction.",
    "tags": [
      "management"
    ]
  },
  {
    "term": "Word Processor",
    "abbr": null,
    "hint": "Microsoft Word is the most famous example.",
    "def": "Software used to create, edit and format text documents. Examples include Microsoft Word and Google Docs.",
    "tags": [
      "software",
      "wordprocessing"
    ]
  },
  {
    "term": "Word Wrap",
    "abbr": null,
    "hint": "Text moves to the next line automatically — no Enter needed.",
    "def": "A feature of word processors that automatically moves text to the next line when it reaches the right margin.",
    "tags": [
      "wordprocessing",
      "software"
    ]
  },
  {
    "term": "Spell Check",
    "abbr": null,
    "hint": "The red underline feature — finds spelling mistakes.",
    "def": "A word-processing tool that checks text for spelling errors and suggests corrections.",
    "tags": [
      "wordprocessing",
      "software"
    ]
  },
  {
    "term": "Mail Merge",
    "abbr": null,
    "hint": "Combines a template letter with a list for personalised copies.",
    "def": "A feature that combines a standard document (like a letter) with a data list (like addresses) to produce personalised copies automatically.",
    "tags": [
      "wordprocessing",
      "software"
    ]
  },
  {
    "term": "Justify",
    "abbr": null,
    "hint": "Both edges line up perfectly — like a newspaper column.",
    "def": "A text alignment setting that spaces words so both the left and right edges of a paragraph form a straight, even line.",
    "tags": [
      "wordprocessing"
    ]
  },
  {
    "term": "Font",
    "abbr": null,
    "hint": "The style of letters — Arial and Times New Roman are examples.",
    "def": "A set of characters in a particular design or typeface, e.g. Arial, Times New Roman. Can be changed in size, style and colour.",
    "tags": [
      "wordprocessing"
    ]
  },
  {
    "term": "Bold / Italic / Underline",
    "abbr": "B / I / U",
    "hint": "Three ways to emphasise text — heavier, slanted, or lined.",
    "def": "Text formatting styles: bold makes text heavier, italic slants it, underline adds a line below. Used for emphasis.",
    "tags": [
      "wordprocessing"
    ],
    "searchable": false
  },
  {
    "term": "Copy and Paste",
    "abbr": null,
    "hint": "Duplicates text — original stays, copy goes elsewhere.",
    "def": "A function that duplicates selected text or objects and places them elsewhere in a document or another application.",
    "tags": [
      "wordprocessing",
      "software"
    ],
    "searchable": false
  },
  {
    "term": "Cut and Paste",
    "abbr": null,
    "hint": "Moves text — original removed and placed elsewhere.",
    "def": "A function that removes selected text or objects from one location and places them in another.",
    "tags": [
      "wordprocessing",
      "software"
    ],
    "searchable": false
  },
  {
    "term": "Find and Replace",
    "abbr": null,
    "hint": "Searches for a word and swaps it with another throughout.",
    "def": "A word-processing tool that searches for a specific word and replaces it with another throughout a document automatically.",
    "tags": [
      "wordprocessing",
      "software"
    ],
    "searchable": false
  },
  {
    "term": "Footer / Header",
    "abbr": null,
    "hint": "Content repeating at the top or bottom of every page.",
    "def": "Text or images that appear automatically at the bottom (footer) or top (header) of every page in a document.",
    "tags": [
      "wordprocessing"
    ],
    "searchable": false
  },
  {
    "term": "Portrait / Landscape",
    "abbr": null,
    "hint": "The two page orientations — upright or sideways.",
    "def": "Page orientations: portrait is taller than wide (standard for documents), landscape is wider than tall (useful for tables and images).",
    "tags": [
      "wordprocessing"
    ],
    "searchable": false
  },
  {
    "term": "Artificial Intelligence",
    "abbr": "AI",
    "hint": "Machines that learn and decide — ChatGPT is an example.",
    "def": "Computer systems capable of performing tasks that typically require human intelligence, such as learning, reasoning and problem-solving. Transforming business operations through automation. Examples: ChatGPT, Microsoft Copilot.",
    "tags": [
      "emerging",
      "software"
    ]
  },
  {
    "term": "Machine Learning",
    "abbr": "ML",
    "hint": "AI that learns from data without being explicitly programmed.",
    "def": "A subset of AI allowing systems to learn and improve from experience without being explicitly programmed. Powers recommendation engines, fraud detection and predictive maintenance.",
    "tags": [
      "emerging",
      "software"
    ]
  },
  {
    "term": "Internet of Things",
    "abbr": "IoT",
    "hint": "Everyday objects connected to the internet — smart devices.",
    "def": "A network of physical devices embedded with sensors and software that connect and exchange data over the internet. Enables smart buildings, asset tracking and predictive maintenance. Examples: smart thermostats, security cameras.",
    "tags": [
      "emerging",
      "networking"
    ]
  },
  {
    "term": "Blockchain",
    "abbr": null,
    "hint": "A tamper-proof digital ledger spread across many computers.",
    "def": "A decentralised, distributed digital ledger recording transactions across many computers, making records nearly impossible to alter. Provides transparency and security without intermediaries. Best known use: cryptocurrency.",
    "tags": [
      "emerging",
      "security"
    ]
  }
];
