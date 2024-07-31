import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Share,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import Button from "./../Button";
import ButtonCito from "../ButtonCito";
import JumpResults from "../JumpResults";
import HorizontalLine2 from "../../../login/components/HorizontalLine2";
import { ConfirmProvider, useConfirm } from "react-native-confirm-dialog";
import CustomActions from "../CustomActions";
import { useLogin } from "../../../login/context/LoginProvider";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as WebBrowser from "expo-web-browser";
import DeleteButton from "../DeleteButon";

export default function App({
  weight,
  motionType,
  testTimeInput,
  accY,
  setValidated,
}) {
  const { setLoginPending, profile, setVisible } = useLogin();
  const stringAccY = JSON.stringify(accY);
  const [db, setDb] = useState(SQLite.openDatabase("jump01.db"));
  const [isLoading, setIsLoading] = useState(true);
  const [jumps, setJumps] = useState([]);
  const [email, setEmail] = useState("");

  const [currentDBJump, setCurrentDBJump] = useState({
    accY: [],
    email: "",
    weight: 0,
    motionType: "",
    testTimeInput: 0,
  });
  const [date, setDate] = useState("");
  const newDate = new Date();
  const [currentJumpVisible, setCurrentJumpVisible] = useState(false);
  const [showsJumpsVisible, setShowJumpsVisible] = useState(true);
  const [addJumpVisible, setAddJumpVisible] = useState(false);
  const [currentStringJump, setCurrentStringJump] = useState("");

  useEffect(() => {
    if (accY.length !== 0) {
      setAddJumpVisible(true);
    }
    setDate(newDate.toLocaleDateString());

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS jumps (id INTEGER PRIMARY KEY AUTOINCREMENT, jump TEXT, email TEXT, weight INTEGER, testTimeInput INTEGER, motionType TEXT, stringAccY TEXT, date TEXT)"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM jumps",
        null,
        (txObj, resultSet) => setJumps(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [db]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading jumps...</Text>
      </View>
    );
  }

  const addJump = () => {
    setLoginPending(true);
    setAddJumpVisible(false);
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO jumps ( email, weight, testTimeInput, motionType, stringAccY, date) values (?,?,?,?,?,?)",
        [email, weight, testTimeInput, motionType, stringAccY, date],
        (txObj, resultSet) => {
          let existingJumps = [...jumps];
          existingJumps.push({
            email: email,
            id: resultSet.insertId,
            weight: weight,
            testTimeInput: testTimeInput,
            motionType: motionType,
            stringAccY: stringAccY,
            date: date,
          });

          setJumps(existingJumps);
        },
        (txObj, error) => console.log(error)
      );
    });
    setTimeout(() => {
      setLoginPending(false);
    }, 1000);
  };

  const deleteJump = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM jumps WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingJumps = [...jumps].filter((jump) => jump.id !== id);
            setJumps(existingJumps);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const gotoJump = (jump) => {
    setLoginPending(true);
    if (profile.roles === "editor") {
      setShowJumpsVisible(false);
      const accY = jump.stringAccY.split(",");

      setCurrentDBJump({
        email: jump.email,
        date: jump.date,
        motionType: jump.motionType,
        weight: jump.weight,
        testTimeInput: jump.testTimeInput,
        accY: accY,
      });
      setCurrentJumpVisible(true);
      setLoginPending(false);
    } else {
      setVisible((prev) => ({
        ...prev,
        premium: true,
        premiumMessageSubTitle:
          "To see the tests you must share them and then upload them to the kinApp website",
        premiumMessageTitle:
          "Become a full kinApp user to analyze on your device",
      }));
      setTimeout(() => {
        setVisible((prev) => ({
          ...prev,
          premium: false,
          premiumMessageSubTitle: "",
          premiumMessageTitle: "",
        }));
      }, 8000);
    }
  };

  const ConfirmableButton = ({ jump }) => {
    const confirm = useConfirm();
    const handlePress = () => {
      confirm({
        actions: (dismiss) => (
          <CustomActions
            onCompleted={() => deleteJump(jump.id)}
            dismiss={dismiss}
          />
        ),
        body: "If you press 'Delete', the saved data will be deleted",
        confirmLabel: "Delete",
      });
    };

    return <DeleteButton onPress={handlePress} title="Delete" />;
  };

  const onShare = async (jump) => {
    const stringJump = JSON.stringify(jump);

    const url = "https://kinappweb.vercel.app/imu_analysis";
    try {
      const filePath = `${FileSystem.documentDirectory}mi-archivo.txt`;
      await FileSystem.writeAsStringAsync(filePath, stringJump);

      await Sharing.shareAsync(filePath, {
        mimeType: "text/plain",
      });
    } catch (error) {
      console.error("Error al compartir el archivo:", error);
    }
  };
  const handleView = () => {
    setShowJumpsVisible(true);
    setCurrentJumpVisible(false);
  };
  const handleComeBackCurrentTest = () => {
    if (accY.length === 0) {
      setVisible((prev) => ({
        ...prev,
        saveDevice: false,
        selector: true,
        reTestButton: false,
      }));
    } else {
      setVisible((prev) => ({
        ...prev,
        saveDevice: false,
        jumpResult: true,
      }));
    }
  };

  return (
    <>
      <ScrollView>
        {addJumpVisible ? (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={email}
                placeholder="Enter an identifier..."
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.container}>
              <Button title="Add Jump" onPress={addJump} />
            </View>
            <View style={{ marginTop: 60 }}>
              <Button
                title={"GO BACK TEST"}
                onPress={handleComeBackCurrentTest}
              />
            </View>
          </>
        ) : null}

        {showsJumpsVisible ? (
          <>
            {jumps.length === 0 ? (
              <>
                <View style={styles.noSavedTextContainer}>
                  <Text style={styles.noSavedText}>
                    No saved evaluations on device
                  </Text>
                </View>
                <View style={{ marginTop: 60 }}>
                  <Button
                    title={"GO BACK TEST"}
                    onPress={handleComeBackCurrentTest}
                  />
                </View>
              </>
            ) : (
              <>
                {jumps.map((jump) => (
                  <View key={jump.id} style={styles.listContainer}>
                    <View style={styles.leftColumn}>
                      <Text style={styles.text}>{jump.email}</Text>
                      <Text style={styles.text}>{jump.motionType}</Text>
                      <Text style={styles.text}>{jump.date}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                      <TouchableOpacity
                        onPress={() => gotoJump(jump)}
                        style={styles.button}
                      >
                        <Text style={styles.buttonText}>Go jump</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => onShare(jump)}
                        style={styles.button}
                      >
                        <Text style={styles.buttonText}>Share</Text>
                      </TouchableOpacity>
                      <ConfirmProvider
                        config={{
                          theme: { primaryColor: "#8f0000" },
                          confirmButtonStyle: { backgroundColor: "black" },
                        }}
                      >
                        <ConfirmableButton jump={jump} />
                      </ConfirmProvider>
                    </View>
                  </View>
                ))}
              </>
            )}
          </>
        ) : null}
        {currentJumpVisible ? (
          <>
            <JumpResults
              accY={currentDBJump.accY}
              testTimeInput={currentDBJump.testTimeInput}
              motionType={currentDBJump.motionType}
              weight={currentDBJump.weight}
              setValidated={setValidated}
            />
            <View style={{ marginTop: 50 }}>
              <Button title={"All jumps"} onPress={handleView} />
            </View>
          </>
        ) : null}
      </ScrollView>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  textInput: {
    fontSize: 30,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderWidth: 2,
    borderColor: "#ccc",
    marginHorizontal: 15,
    height: 50,
  },

  listTest: {
    flexDirection: "row",
    fontSize: 22,
  },

  noSavedTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noSavedText: {
    fontSize: 28,
    color: "#0f0c2e",
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    flexDirection: "row",
    backgroundColor: "#1b1b33",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 16,
  },
  rightColumn: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  buttonTextDelete: {
    color: "#8f0000",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#0f0c2e",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
