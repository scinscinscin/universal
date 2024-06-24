import { Fonts, useFonts } from "@/hooks/useFonts";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const defaultTextStyle = StyleSheet.create({
  text: { fontFamily: Fonts.Inter_500Medium, fontSize: 16 },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts();
  if (!fontsLoaded || fontError != null) return null;

  // @ts-ignore
  const oldRender = Text.render;
  // @ts-ignore
  Text.render = function (props: { children: string; style: object }, ...rest) {
    return oldRender.call(this, { ...props, style: [defaultTextStyle.text, props.style] }, ...rest) as any;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1e1e1e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Posts" }} />
        <Stack.Screen name="testing/[slug]" options={{ title: "Loading Post...z" }} />
      </Stack>
    </QueryClientProvider>
  );
}
