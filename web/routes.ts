// THIS CODE IS AUTOGENERATED, DO NOT MODIFY IT DIRECTLY
import { GetServerSidePropsResult } from "next";
import { getServerSideProps as SrcPagesIndexPage } from "./src/pages/index.page"
import { getServerSideProps as SrcPagesLoginPage } from "./src/pages/login.page"

type UnNextify<T> = T extends Promise<GetServerSidePropsResult<infer R>> ? R : never;

export type Pages = {
  "/index": UnNextify<ReturnType<typeof SrcPagesIndexPage>>;
  "/login": UnNextify<ReturnType<typeof SrcPagesLoginPage>>;
}
