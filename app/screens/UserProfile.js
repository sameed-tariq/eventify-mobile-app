import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

const user = {
  name: "Salman Shahid",
  userName: "@maanxheikh_",
  email: "S@s.com",
  phone: "03111479996",
  cnic: "35202-3559476-5",
  score: 76,
  profilePicture:
    "https://s3-alpha-sig.figma.com/img/fa4a/171e/1da72e03bf818de831b38711a600bbf6?Expires=1685318400&Signature=TSkzuXzQJG6YKROtQ29cq7ViQ~vPTis4sDdFZlbjFaz7h2Gws1VG1ZC4LkGvcJbXaR~d1~stgdY~5R07FG5knjMJH4kV8bZy4Y4E~GJJ1CEc4kHkB9LhI~BT~1NjuR2nvCOeG3yA0fNUaiG26UFj-O3nN0MKnJKClagI3i9lqYGl3RUqy4QpoTNxuk9pHlay1G08o8T6lLDvVHUCDR5QtQQVUZtsa5izJnjhVpKlhiN9jhfn05LD~18ea5ZoFV530VK9a1YEWABPB0O36W9XlAlShnPo9nsArSWbGiRt-JHhsSOLAZkclh5mkzQ7b7~kU-n7e3uHVUwZ8CQ3c6sNDQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
};

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [edit, setEdit] = useState(false);
  const navigation = useNavigation();

  const signOutUser = async () => {
    await signOut(auth);
  };
  return (
    <View style={styles.container}>
      <Icon
        name="left"
        color="white"
        size={35}
        style={{ position: "absolute", left: "4%%", top: "6%" }}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.nameContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={{
            height: 150,
            width: 150,
            borderRadius: 100,
            marginBottom: "5%",
          }}
        />
        <Text style={styles.nameText}>{user.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        {!edit ? (
          <Icon
            name="edit"
            color="rgba(255, 255, 255, 0.6)"
            size={23}
            style={{ position: "absolute", left: "90%", top: "4%" }}
            onPress={() => setEdit(true)}
          />
        ) : (
          <Icon
            name="close"
            color="rgba(255, 255, 255, 0.6)"
            size={23}
            style={{ position: "absolute", left: "90%", top: "4%" }}
            onPress={() => setEdit(false)}
          />
        )}
        <View style={styles.detailsField}>
          <Icon name="user" color="rgba(255, 255, 255, 0.3)" size={35} />
          <Text style={styles.detailsFieldText}>{user.userName}</Text>
        </View>
        <View style={styles.detailsField}>
          <Icon name="mail" color="rgba(255, 255, 255, 0.3)" size={35} />
          {!edit ? (
            <Text style={styles.detailsFieldText}>{user.email}</Text>
          ) : (
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
          )}
        </View>
        <View style={styles.detailsField}>
          <Icon name="mobile1" color="rgba(255, 255, 255, 0.3)" size={35} />
          {!edit ? (
            <Text style={styles.detailsFieldText}>{user.phone}</Text>
          ) : (
            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={styles.input}
            />
          )}
        </View>
        <View style={styles.detailsField}>
          <Icon name="idcard" color="rgba(255, 255, 255, 0.3)" size={35} />
          <Text style={styles.detailsFieldText}>{user.cnic}</Text>
        </View>
      </View>

      <View style={styles.logoutBtn}>
        <Icon
          onPress={() => signOutUser()}
          name="logout"
          color="#3F2E65"
          size={35}
        />
        <Text
          style={{
            fontSize: 24,
            color: "white",
            fontWeight: 600,
            marginLeft: "5%",
          }}
        >
          Logout
        </Text>
      </View>

      <View style={{ alignItems: "center", top: "85%" }}>
        <TouchableOpacity style={{ alignItems: "center", marginBottom: 50 }}>
          <View style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Update</Text>
            <Icon name="reload1" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BF5AE0",
  },
  detailsContainer: {
    // flex: 1,
    height: "25%",
    width: "80%",
    backgroundColor: "rgba(168, 17, 218, 0.5)",
    borderRadius: 20,
    position: "absolute",
    top: "45%",
    marginHorizontal: "10%",
    justifyContent: "space-evenly",
  },
  nameContainer: {
    position: "absolute",
    top: "15%",
    marginHorizontal: "12%",
    width: "30%",
  },
  nameText: {
    fontSize: 38,
    color: "white",
    flexWrap: "wrap",
  },
  detailsField: {
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  detailsFieldText: {
    fontSize: 16,
    fontWeight: 600,
    marginLeft: "5%",
    color: "rgba(255, 255, 255, 0.6)",
  },
  input: {
    fontSize: 16,
    // fontWeight: 600,
    marginLeft: "5%",
    // color: "rgba(255, 255, 255, 0.6)",
  },
  logoutBtn: {
    flexDirection: "row",
    // backgroundColor: "red",
    position: "absolute",
    top: "75%",
    marginHorizontal: "10%",
    alignItems: "center",
  },
  joinButtonText: {
    fontSize: 30,
    color: "white",
    marginRight: "3%",
  },
  joinButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8A1AAF",
    position: "absolute",
    width: 260,
    height: 74,
    borderRadius: 25,
  },
});
