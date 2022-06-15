import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <View>
      <Text>order screen</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderScreen;
