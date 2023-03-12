import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootNavigator";
import { TabStackParamList } from "../navigators/TabNavigator";
import { Input } from "@rneui/base";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import CustomerCard from "../components/CustomerCard";

export type CustomersScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProps>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  // when UI mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    // ScrollView -> make page scrollable
    <ScrollView style={tw("bg-[#59C1CC]")}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        style={tw("w-full h-64")}
      />
      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        style={tw("bg-white flex-1 p-4  rounded-md")}
      />
      <View>
        {data?.getCustomers
          ?.filter((customer: CustomerList) =>
            customer.value.name.includes(input)
          )
          .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
            <CustomerCard key={ID} email={email} name={name} userId={ID} />
          ))}
      </View>
    </ScrollView>
  );
};

export default CustomersScreen;
