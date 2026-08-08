/**
 * Shared, UI-agnostic constants for the DUIP workflow.
 */

/** Keys used to persist the session in `localStorage`. */
export const STORAGE_KEYS = {
  form: "form",
  profiles: "profiles",
  searchQuery: "search-query",
  profileContent: "profile-content",
  profileSummary: "profile-summary",
  dataAnalystType: "data-analyst-type",
  summaryLens: "summary-lens",
};

export const INITIAL_FORM_DATA = {
  username: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  profession: "",
  organization: "",
  process: "automatic",
};

export const INITIAL_NEW_PROFILE = {
  title: "",
  imageUrl: "",
  url: "",
  isSelected: true,
  isSaved: false,
};

/** The four stages of the workflow, in order. */
export const STEPS = [
  { key: "search", name: "Search", hint: "Identity details" },
  { key: "profiles", name: "Profiles", hint: "Review results" },
  { key: "content", name: "Content", hint: "Assembled text" },
  { key: "summary", name: "Summary", hint: "Analysis" },
];

export const STEP_INDEX = {
  search: 0,
  profiles: 1,
  content: 2,
  summary: 3,
};

/** Fields that make up the search query, in display order. */
export const SEARCH_FIELDS = [
  {
    name: "name",
    label: "Full name",
    placeholder: "Ada Lovelace",
    type: "text",
    icon: "user",
    autoComplete: "name",
  },
  {
    name: "username",
    label: "Username",
    placeholder: "adalovelace",
    type: "text",
    icon: "atSign",
    autoComplete: "username",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "name@example.com",
    type: "email",
    icon: "mail",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "+977 9812345678",
    type: "tel",
    icon: "phone",
    autoComplete: "tel",
  },
  {
    name: "profession",
    label: "Profession",
    placeholder: "Software engineer",
    type: "text",
    icon: "briefcase",
    autoComplete: "organization-title",
  },
  {
    name: "organization",
    label: "Organization",
    placeholder: "Acme Inc.",
    type: "text",
    icon: "building",
    autoComplete: "organization",
  },
  {
    name: "address",
    label: "Location",
    placeholder: "Kathmandu, Nepal",
    type: "text",
    icon: "mapPin",
    autoComplete: "address-level2",
    fullWidth: true,
  },
];

/** Field names that contribute to the Google query. */
export const SEARCH_FIELD_NAMES = SEARCH_FIELDS.map((field) => field.name);

export const PROCESS_MODES = [
  {
    value: "automatic",
    label: "Automatic",
    description:
      "Search, assemble and summarize in one run. Best when you just want the analysis.",
  },
  {
    value: "manual",
    label: "Manual",
    description:
      "Review and curate the results at every stage before the model sees them.",
  },
];

export const DATA_ANALYST_TYPES = [
  {
    value: "researcher",
    label: "Researcher",
    description: "A neutral read on traits, status and background.",
  },
  {
    value: "investor",
    label: "Investor",
    description: "Business track record, ending in an investment call.",
  },
  {
    value: "hr",
    label: "HR",
    description: "Skills and experience, ending in a hiring recommendation.",
  },
  {
    value: "matchmaker",
    label: "Matchmaker",
    description: "Values and history, ending in a compatibility read.",
  },
];

/** Stages reported while the automatic pipeline runs. */
export const PIPELINE_STAGES = [
  {
    key: "searching",
    label: "Searching public sources",
    description: "Running the query and collecting matching profiles.",
  },
  {
    key: "assembling",
    label: "Assembling content",
    description: "Opening each selected profile and extracting readable text.",
  },
  {
    key: "summarizing",
    label: "Generating analysis",
    description: "Your local language model is writing the summary.",
  },
];
