import { nextClient } from "@/utils/client";
import { Text, View } from "react-native";
import { useQuery } from "react-query";

export default function () {
  const Loader = useQuery("posts", async () => {
    const { internalProps, serverSideProps } = await nextClient("/index", {});
    serverSideProps.files;
    return serverSideProps;
  });

  return (
    <View>
      <Text>{JSON.stringify(Loader.data)}</Text>
    </View>
  );
}
