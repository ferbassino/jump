import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useLogin } from "./context/LoginProvider";
import { signOut } from "../api/user";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import Home from "../application/Home";
import Test from "../application/views/Test";
import SearchClient from "../application/views/SearchClient";
import SaveNewClient from "../application/views/SaveNewClient";
import SaveOldClient from "../application/views/SaveOldClient";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { setIsLoggedIn, profile, setLoginPending } = useLogin();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#f6f6f6",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 20 }}>{profile.userName}</Text>
            <Text style={{ fontSize: 20 }}>{profile.email}</Text>
          </View>

          <Image
            source={{
              uri:
                profile.avatar ||
                "https://storage.googleapis.com/movile-kinapp-login/profile/perfil_anonimo.jpg",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
        onPress={async () => {
          setLoginPending(true);
          const isLoggedOut = await signOut();
          if (isLoggedOut) {
            setIsLoggedIn(false);
          }
          setLoginPending(false);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <SimpleLineIcons name="logout" size={24} color="rgba(27,27,51,1)" />
          <Text style={{ marginLeft: 30, fontSize: 22 }}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: { fontSize: 20 },
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        component={Home}
        name="Home"
        options={{
          drawerIcon: () => (
            <Ionicons name="home-outline" size={26} color="rgba(27,27,51,1)" />
          ),
        }}
      />

      {/* <Drawer.Screen
        component={Test}
        name="Test"
        options={{
          drawerIcon: () => (
            <SimpleLineIcons
              name="speedometer"
              size={22}
              color="rgba(27,27,51,1)"
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        component={SearchClient}
        name="SearchClient"
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={SaveNewClient}
        name="SaveNewClient"
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={SaveOldClient}
        name="SaveOldClient"
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
