import React, { useRef, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";
import FormHeader from "./FormHeader";
import FormSelectorBtn from "./FormSelectorBtn";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

import AppLoader from "../loader/AppLoader";
import { useLogin } from "../../context/LoginProvider";
import HorizontalLine from "../HorizontalLine";

const { width } = Dimensions.get("window");

export default function AppForm({ navigation }) {
  //

  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const { loginPending } = useLogin();

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(15,12,46,1)", "rgba(15,12,46,0.4)"],
  });

  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(15,12,46,0.4)", "rgba(15,12,46,1)"],
  });

  return (
    <>
      <View style={{ flex: 1, paddingTop: 60 }}>
        <HorizontalLine />
        <View style={{ height: 80 }}>
          <FormHeader heading={"jump"} subHeading={"by kinApp"} />
        </View>
        <HorizontalLine />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <FormSelectorBtn
            backgroundColor={loginColorInterpolate}
            title="Login"
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          />
          <FormSelectorBtn
            backgroundColor={signupColorInterpolate}
            title="Sign up"
            onPress={() => scrollView.current.scrollTo({ x: width })}
          />
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false }
          )}
        >
          <ScrollView>
            <LoginForm navigation={navigation} />
          </ScrollView>
          <ScrollView>
            <SignUpForm navigation={navigation} />
          </ScrollView>
        </ScrollView>
      </View>
      {loginPending ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
