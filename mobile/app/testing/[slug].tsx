import { api } from "@/utils/client";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useQuery } from "react-query";
import { type Post } from "..";

export default function Page() {
  const { slug } = useLocalSearchParams();
  const Loader = useQuery(["post", slug], async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + slug);
    return (await response.json()) as Post;
  });

  if (!Loader.data) return null;
  return (
    <>
      <Stack.Screen options={{ title: Loader.data?.title }} />
      <Text>{JSON.stringify(Loader.data)}</Text>
    </>
  );
}
