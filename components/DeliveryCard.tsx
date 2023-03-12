import { View, Text } from "react-native";
import React from "react";
import { Card, Divider, Icon } from "@rneui/base";
import { useTailwind } from "tailwind-rn/dist";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  const tw = useTailwind();

  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? "rounded-none m-2" : "rounded-lg"} mt-2 -mb-2 -mx-2`),
        {
          backgroundColor: fullWidth ? "#EB6A7C" : "#59C1CC",
          padding: 0,
          paddingTop: 16,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}
    >
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" color={"white"} />

        <Text style={tw("text-xs text-center uppercase text-white font-bold")}>
          {order.carrier}-{order.trackingId}
        </Text>
        <Text style={tw("text-lg text-center text-white font-bold")}>
          Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
        </Text>

        <View style={tw("mx-auto pb-5")}>
          <Text style={tw("text-base text-center text-white font-bold mt-5")}>
            Address
          </Text>
          <Text style={tw("text-sm text-center text-white")}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tw("text-sm text-center text-white")}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
        <Divider color="white" />
        <View style={tw("p-5")}>
          {order.trackingitems.items.map((item) => (
            <View
              key={item.item_id}
              style={tw("flex-row justify-between items-center")}
            >
              <Text style={tw("text-sm italic text-white")}>{item.name}</Text>
              <Text style={tw("text-xl text-white")}>x {item.quantity}</Text>
            </View>
          ))}
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[tw("w-full"), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{
                latitude: order.Lat,
                longitude: order.Lng,
              }}
              title="Delivery Location"
              description={order.Address}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
