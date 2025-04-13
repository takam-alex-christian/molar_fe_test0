import jsonData from "../../data/testData.json";

type EntryType = (typeof jsonData.entryTypes)[number];

export type { EntryType };
