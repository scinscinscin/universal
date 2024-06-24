import { Client } from "@scinorandex/rpscin/dist/client";
import { Browser } from "@scinorandex/rpscin/dist/envs/browser";
import { type AppRouter } from "../../web/src/server";
import { type Pages } from "../../web/routes";
import axios from "axios";
import { GenerateNextJSClient } from "./GenerateNextJSClient";

const HOSTNAME = `192.168.1.107:8000`;

export const api = Client<AppRouter, WebSocket>({
  serializer: Browser.serializer,
  apiLink: `http://${HOSTNAME}/api`,
  wsClient: Browser.generateWebSocketClient(`ws://${HOSTNAME}`),
  createAxiosInstance: (opts) => axios.create(opts),
});

export const nextClient = GenerateNextJSClient<Pages>({ link: `http://${HOSTNAME}` });
