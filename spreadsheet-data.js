/**
 * spreadsheet-data.js
 * ─────────────────────────────────────────────────────────────
 * LCA Spreadsheets — Shared data for ALL site sections.
 *
 * Each entry:
 *   term         : full name (card front / glossary heading)
 *   abbr         : abbreviation string, or null
 *   hint         : short nudge shown in flashcards
 *   def          : full definition
 *   tags         : array of category keys (must exist in CATEGORIES)
 *   searchable   : false → exclude from Wordsearch
 *                  omit or true → included
 *
 * Images (optional — no field needed):
 *   Drop a .png into images/ named after abbr or term.
 *   e.g. Cell.png, Formula.png, AutoSum.png
 * ─────────────────────────────────────────────────────────────
 */

// ── CATEGORY DEFINITIONS ─────────────────────────────────────
const CATEGORIES = {
  basic: {
    label:  "Basic Terms",
    color:  "#4fffb0",
    border: "rgba(79,255,176,0.25)",
    bg:     "rgba(79,255,176,0.08)"
  },
  formulas: {
    label:  "Functions & Formulas",
    color:  "#7b9fff",
    border: "rgba(123,159,255,0.25)",
    bg:     "rgba(123,159,255,0.08)"
  },
  tools: {
    label:  "Tools & Features",
    color:  "#ff9f6b",
    border: "rgba(255,159,107,0.25)",
    bg:     "rgba(255,159,107,0.08)"
  },
  practical: {
    label:  "Practical Examples",
    color:  "#c084fc",
    border: "rgba(192,132,252,0.25)",
    bg:     "rgba(192,132,252,0.08)"
  }
};

// ── GLOSSARY TERMS ────────────────────────────────────────────
const GLOSSARY = [

  // ── BASIC TERMS ───────────────────────────────────────────
  {
    term: "Spreadsheet",
    abbr: null,
    hint: "A big table used to work with numbers and data — think Excel.",
    def:  "A big table used to organise and work with numbers, words, and data. Microsoft Excel and Google Sheets are examples.",
    tags: ["basic"]
  },
  {
    term: "Cell",
    abbr: null,
    hint: "The single box where you type data — identified by a letter and number.",
    def:  "A single box in the spreadsheet table where you type data. Each cell has a unique reference based on its column letter and row number (e.g. A1).",
    tags: ["basic"]
  },
  {
    term: "Row",
    abbr: null,
    hint: "Goes left to right across the spreadsheet — identified by a number.",
    def:  "A horizontal line of cells that goes from left to right. Rows are numbered (1, 2, 3…).",
    tags: ["basic"]
  },
  {
    term: "Column",
    abbr: null,
    hint: "Goes top to bottom down the spreadsheet — identified by a letter.",
    def:  "A vertical line of cells that goes from top to bottom. Columns are labelled with letters (A, B, C…).",
    tags: ["basic"]
  },
  {
    term: "Sheet",
    abbr: null,
    hint: "One page within a spreadsheet file — you can have several.",
    def:  "One page of a spreadsheet. A single file can contain many sheets, visible as tabs at the bottom of the screen.",
    tags: ["basic"]
  },
  {
    term: "Workbook",
    abbr: null,
    hint: "The whole file that holds all your sheets together.",
    def:  "The whole spreadsheet file that contains one or more sheets. When you save an Excel file, you are saving a workbook.",
    tags: ["basic"]
  },
  {
    term: "Data",
    abbr: null,
    hint: "The information you type into the cells — numbers, words or dates.",
    def:  "Information entered into a spreadsheet, such as numbers, words, or dates. Data must be entered before formulas can calculate anything.",
    tags: ["basic"]
  },

  // ── FUNCTIONS & FORMULAS ──────────────────────────────────
  {
    term: "Formula",
    abbr: null,
    hint: "A calculation you write in a cell — always starts with an equals sign.",
    def:  "A maths calculation you create in a cell. Formulas always start with an = sign (e.g. =A1+A2 adds the values in cells A1 and A2).",
    tags: ["formulas"]
  },
  {
    term: "Function",
    abbr: null,
    hint: "A ready-made formula built into the spreadsheet — like SUM or AVERAGE.",
    def:  "A special built-in command that performs a calculation or task quickly. Functions are used inside formulas, e.g. =SUM(A1:A5) adds all values from A1 to A5.",
    tags: ["formulas"]
  },
  {
    term: "SUM",
    abbr: null,
    hint: "The function that adds numbers together.",
    def:  "A function that adds together all the numbers in a selected range of cells. Example: =SUM(A1:A10) adds all values from A1 to A10.",
    tags: ["formulas"]
  },
  {
    term: "AVERAGE",
    abbr: null,
    hint: "The function that finds the middle (mean) value of a range.",
    def:  "A function that calculates the mean value of a selected range of cells by adding them all up and dividing by how many there are. Example: =AVERAGE(B1:B5).",
    tags: ["formulas"]
  },
  {
    term: "AutoSum",
    abbr: null,
    hint: "A shortcut button that automatically writes a SUM formula for you.",
    def:  "A button in the spreadsheet toolbar that automatically creates a SUM formula to add up a row or column of numbers. Saves time when totalling data.",
    tags: ["formulas"],
    searchable: false
  },
  {
    term: "Cell Reference",
    abbr: null,
    hint: "The address of a cell — column letter followed by row number.",
    def:  "The unique address of a cell in a spreadsheet, made up of its column letter and row number (e.g. A1, B5, C12). Used in formulas to point to specific cells.",
    tags: ["basic", "tools"],
    searchable: false
  },

  // ── TOOLS & FEATURES ──────────────────────────────────────
  {
    term: "Format",
    abbr: null,
    hint: "Changing how data looks — bold, colour, currency symbols etc.",
    def:  "Changing the appearance of data in a cell without changing its value. Examples include making text bold, changing font colour, or applying a currency symbol.",
    tags: ["tools"]
  },
  {
    term: "Sort",
    abbr: null,
    hint: "Putting data in order — smallest to largest, or A to Z.",
    def:  "Organising data in a spreadsheet into a chosen order, such as smallest to largest, largest to smallest, or alphabetically (A to Z or Z to A).",
    tags: ["tools"]
  },
  {
    term: "Filter",
    abbr: null,
    hint: "Showing only certain rows while hiding the rest.",
    def:  "A feature that shows only the rows of data that match certain conditions, hiding the rest. Useful for finding specific records in a large spreadsheet.",
    tags: ["tools"]
  },
  {
    term: "Chart",
    abbr: null,
    hint: "A visual picture of your data — like a bar chart or pie chart.",
    def:  "A visual way to display spreadsheet data as a graph or diagram. Common types include bar charts, pie charts, and line graphs. Charts make data easier to understand.",
    tags: ["tools"]
  },
  {
    term: "Gridlines",
    abbr: null,
    hint: "The faint lines that divide the spreadsheet into individual cells.",
    def:  "The lines that form the grid of a spreadsheet, separating each cell from its neighbours. Gridlines make the table structure visible on screen and can be shown or hidden.",
    tags: ["tools"]
  },
  {
    term: "Highlight",
    abbr: null,
    hint: "Selecting or colouring a cell to make it stand out.",
    def:  "Selecting one or more cells to work with them, or applying a background colour to make them stand out visually from the rest of the spreadsheet.",
    tags: ["tools"]
  },
  {
    term: "Drop-Down Menu",
    abbr: null,
    hint: "A list of choices that appears when you click a cell.",
    def:  "A small list of options that appears when you click on a cell or button, allowing you to choose from preset values. Used in data validation to control what can be entered.",
    tags: ["tools"],
    searchable: false
  },

  // ── PRACTICAL EXAMPLES ────────────────────────────────────
  {
    term: "Table",
    abbr: null,
    hint: "Data arranged in rows and columns — a core layout in spreadsheets.",
    def:  "A way to arrange data in rows and columns for better organisation. In Excel, a Table (Insert → Table) also adds automatic sorting, filtering and formatting features.",
    tags: ["practical"]
  },
  {
    term: "Budget",
    abbr: null,
    hint: "A spreadsheet used to plan and track income and spending.",
    def:  "A spreadsheet used to plan and manage money by listing expected income and expenses. Budgets help track whether spending is within limits.",
    tags: ["practical"]
  },
  {
    term: "Inventory",
    abbr: null,
    hint: "A spreadsheet that keeps track of stock or items.",
    def:  "A list of items or stock, often managed using a spreadsheet. An inventory tracks quantities, descriptions, and sometimes prices of goods held by a business.",
    tags: ["practical"]
  }

];
