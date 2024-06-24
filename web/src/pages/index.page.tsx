import { PublicLayoutFrontend } from "../layouts/public.client";
import { PublicLayoutBackend } from "../layouts/public.server";

import { useEffect, useState } from "react";
import { client, fetchGQL } from "../utils/apiClient";
import { useForm } from "react-hook-form";
import { getUsersWithHobbies } from "../graphql/users/documents/getUsersWithHobbies";
import { useSSE } from "../utils/lib/useSSE";
import { readdir } from "fs/promises";

interface PageProps {
  files: string[];
}

export default PublicLayoutFrontend.use<PageProps>((args) => {
  const [names, setNames] = useState([] as string[]);

  const FilesLoader = useSSE(async () => {
    if (typeof window === "undefined") {
      const fs = await import("fs/promises");
      return await fs.readdir(process.cwd());
    }
  }, "files");

  console.log(FilesLoader);

  useEffect(() => {
    /**
     * Create a websocket connection to /status and listen to `newLogin` events,
     * adding new username to `names` and print the contents
     */
    const subscription = client["/status"].ws({ path: {} });

    subscription.then((conn) => {
      console.log("Connected to websocket server");
      conn.on("newLogin", async ({ username }) => {
        setNames((a) => [...a, username]);
      });
    });

    return () => subscription.close();
  }, []);

  const Form = useForm<{ username: string }>();

  return {
    children: <div>files: {JSON.stringify(args.files)}</div>,
  };
});

export const getServerSideProps = PublicLayoutBackend.use<PageProps>({
  async getServerSideProps(ctx) {
    const files = await readdir(process.cwd());
    return { props: { files } };
  },
});
