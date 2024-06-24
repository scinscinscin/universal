type GeneralParams = {
  [key: string]: string | string[] | undefined;
};

export type Segment = number | string;

// prettier-ignore
type ProcessOptionalParam<Param extends string> = string extends Param ? {}
  : Param extends `...${infer Catchall}`
    ? { [key in Catchall]: Segment[] | false }
  : { [key in Param]: Segment | false };

// prettier-ignore
type ProcessRequiredParam<Param extends string> = string extends Param ? {}
  : Param extends `...${infer Catchall}`
    ? { [key in Catchall]: Segment[] }
  : { [key in Param]: Segment };

// prettier-ignore
export type NextParameters<Route extends string> = string extends Route ? GeneralParams
  : Route extends `${infer Prefix}/[[${infer Param extends string}]]${infer Suffix}`
    ? ProcessOptionalParam<Param> & NextParameters<`${Prefix}${Suffix}`>
  : Route extends `${infer Prefix}/[${infer Param extends string}]${infer Suffix}` 
    ? ProcessRequiredParam<Param> & NextParameters<`${Prefix}${Suffix}`>
  : {};
