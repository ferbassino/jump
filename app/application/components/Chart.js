import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Chart = ({
  abscisas = [],
  ordenadas1 = [],
  ordenadas2 = [],
  ordenadas3 = [],
  title = "",
}) => {
  return (
    <>
      <Text style={styles.header}>{title}</Text>
      <LineChart
        data={{
          labels: abscisas,
          datasets: [
            {
              data: ordenadas1,
              color: () => "#fc0f03", // optional
              strokeWidth: 2,
            },
            {
              data: ordenadas2,
              color: () => "#232f62",
              // color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
              strokeWidth: 1,
            },
            {
              data: ordenadas3,
              color: () => `#02a114`, // optional
              // color: (opacity = 1) => `rgba(0, 0, 245, ${opacity})`, // optional
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        withDots={false}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLines={true}
        withHorizontalLines={true}
        chartConfig={{
          backgroundColor: "#fcfcfc",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#fcfcfc",
          decimalPlaces: 2,
          color: () => "#232f62",
          // color: (opacity = 255) => `rgba(242, 2, 2, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default Chart;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    marginTop: 16,
    color: "#232f62",
  },
});
