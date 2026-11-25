/**
 * Interprets the free-text WordPress vacancy location ("London",
 * "Manchester, UK", "USA, UK, Nigeria", "United States / Canada") without
 * guessing: a place whose country cannot be established has no `countryCode`.
 */
export interface VacancyPlace {
  /** Filter label: a canonical country name, or the place as supplied. */
  label: string;
  /** Town, city or region; absent when the place is a whole country. */
  locality?: string;
  /** ISO 3166-1 alpha-2 code; absent when the country is not known. */
  countryCode?: string;
}

const COUNTRY_CODES =
  "AE AT AU BE BR BW CA CH CI CM CN CZ DE DK EG ES ET FI FR GB GH GR HK HU ID IE IL IN IT JP KE KR LU MA MX MY NG NL NO NZ PH PK PL PT QA RO RW SA SE SG SN TH TR TZ UG US VN ZA ZM ZW".split(" ");

const displayNames = new Intl.DisplayNames(["en-GB"], { type: "region" });

const ALIASES: Record<string, string> = {
  uk: "GB",
  "u.k.": "GB",
  "great britain": "GB",
  us: "US",
  usa: "US",
  "u.s.": "US",
  "u.s.a.": "US",
  "united states of america": "US",
  uae: "AE",
  "the netherlands": "NL",
  "ivory coast": "CI",
  turkey: "TR",
  "hong kong": "HK",
};

/** UK nations and the approved `/locations/` catalogue, for entries with no country. */
const UK_PLACES = new Set([
  "england", "scotland", "wales", "northern ireland",
  "london", "manchester", "birmingham", "leeds", "bristol", "edinburgh", "glasgow", "nottingham",
  "newcastle", "warwickshire", "worcester", "yorkshire", "staffordshire", "liverpool", "oxford", "leicester",
]);

const normalise = (value: string) => value.trim().toLocaleLowerCase("en-GB");

const codeByName = new Map<string, string>([
  ...COUNTRY_CODES.map((code): [string, string] => [normalise(displayNames.of(code) ?? code), code]),
  ...Object.entries(ALIASES),
]);

function countryName(code: string): string {
  return displayNames.of(code) ?? code;
}

function parsePlace(text: string): VacancyPlace {
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
  const countryCode = codeByName.get(normalise(parts.at(-1) ?? ""));

  if (countryCode && parts.length === 1) return { label: countryName(countryCode), countryCode };
  if (countryCode) return { label: text, locality: parts.slice(0, -1).join(", "), countryCode };
  return {
    label: text,
    locality: text,
    ...(parts.some((part) => UK_PLACES.has(normalise(part))) ? { countryCode: "GB" } : {}),
  };
}

export function parseVacancyLocations(location: string): VacancyPlace[] {
  const groups = location.split(/[/;|]/).map((group) => group.trim()).filter(Boolean);
  const places = groups.flatMap((group) => {
    const parts = group.split(",").map((part) => part.trim()).filter(Boolean);
    // Commas separate countries only when every part is one; otherwise "City, Country" is a single place.
    const isCountryList = parts.length > 1 && parts.every((part) => codeByName.has(normalise(part)));
    return isCountryList ? parts.map(parsePlace) : [parsePlace(group)];
  });
  return [...new Map(places.map((place) => [normalise(place.label), place])).values()];
}

/** True when the vacancy covers the selected label; the full original text still matches older filter links. */
export function vacancyMatchesLocation(location: string, selected: string): boolean {
  const wanted = normalise(selected);
  if (!wanted || normalise(location) === wanted) return true;
  const wantedLabels = parseVacancyLocations(selected).map((place) => normalise(place.label));
  return (
    wantedLabels.length === 1 &&
    parseVacancyLocations(location).some((place) => normalise(place.label) === wantedLabels[0])
  );
}
