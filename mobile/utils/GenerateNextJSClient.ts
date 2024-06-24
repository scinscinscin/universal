import { NextParameters, Segment } from "./NextParameters";

type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};

type GetProps<T> = <Path extends keyof T>(
  path: Path,
  params: NextParameters<Extract<Path, string>>
) => Promise<Prettify<T[Path]>>;

interface Opts {
  link: string;
}
const stringifySegments = (segemnts: Segment[]) => segemnts.map((e) => e.toString()).filter((e) => e.length > 0);
export function GenerateNextJSClient<T>(opts: Opts): GetProps<T> {
  // @ts-ignore
  return async (path: string, params: { [key: string]: Segment[] | Segment | false }) => {
    let encodedPath = path;

    for (const [key, value] of Object.entries(params)) {
      if (value === false) encodedPath = encodedPath.replace(`/[[...${key}]]`, "");
      else if (!Array.isArray(value)) encodedPath = encodedPath.replace(`[${key}]`, (value as Segment).toString());
      else {
        const segments = stringifySegments(value).join("/");
        encodedPath = encodedPath.replace(`[...${key}]`, segments).replace(`[[...${key}]]`, segments);
      }
    }

    const url = `${opts.link}${encodedPath.replaceAll("/index", "/")}`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    return await response.json();
  };
}
