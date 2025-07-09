import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/fertilizer.jpg")} // Agricultural background
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradientOverlay}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.appName}>Valu3Chain</Text>
              <Text style={styles.tagline}>Connecting Farms to Future</Text>
            </View>

            <View style={styles.mainContent}>
              <Text style={styles.mainHeading}>
                Transforming Agriculture Through Technology
              </Text>
              <Text style={styles.description}>
                Bridging farmers, extension agents, and investors for
                sustainable agriculture, transparent investments, and improved
                food production.
              </Text>

              <View style={styles.featureGrid}>
                <View style={styles.featureCard}>
                  <FontAwesome5 name="user-tie" size={24} color="#4CAF50" />
                  <Text style={styles.featureText}>Investor Portal</Text>
                </View>
                <View style={styles.featureCard}>
                  <MaterialIcons name="agriculture" size={24} color="#4CAF50" />
                  <Text style={styles.featureText}>Farmer Network</Text>
                </View>
                <View style={styles.featureCard}>
                  <MaterialIcons name="assignment" size={24} color="#4CAF50" />
                  <Text style={styles.featureText}>Agent Tools</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 48,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#4CAF50",
    marginBottom: 4,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mainContent: {
    marginTop: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 16,
    lineHeight: 34,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 32,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featureGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "30%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  featureText: {
    color: "white",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: "white",
  },
});

export default HomeScreen;

// import {
//   View,
//   Text,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require("../assets/images/tractor.jpeg")} // Replace with your image path
//         resizeMode="cover"
//         style={styles.backgroundImage}
//       >
//         <LinearGradient
//           colors={["rgba(0,0,0,0.7)", "transparent", "rgba(0,0,0,0.7)"]}
//           style={styles.gradientOverlay}
//           start={{ x: 0.5, y: 0 }}
//           end={{ x: 0.5, y: 1 }}
//         >
//           <View style={styles.contentContainer}>
//             <View style={styles.textContainer}>
//               <Text style={styles.title}>Welcome to Our App</Text>
//               <Text style={styles.subtitle}>Your Journey Begins Here</Text>
//               <Text style={styles.description}>
//                 Discover amazing features and connect with people around the
//                 world. Join us today and experience something extraordinary.
//               </Text>
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={[styles.button, styles.primaryButton]}
//                 onPress={() => console.log("Login pressed")}
//               >
//                 <Text style={styles.buttonText}>Login</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.button, styles.secondaryButton]}
//                 onPress={() => console.log("Sign Up pressed")}
//               >
//                 <Text style={[styles.buttonText, styles.secondaryButtonText]}>
//                   Sign Up
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </LinearGradient>
//       </ImageBackground>
//     </View>
//   );
// };

// const { width, height } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: width,
//     height: height,
//   },
//   gradientOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: "space-between",
//     paddingVertical: 48,
//   },
//   textContainer: {
//     marginTop: 80,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: "800",
//     color: "white",
//     marginBottom: 12,
//     textShadowColor: "rgba(0,0,0,0.5)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 4,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "rgba(255,255,255,0.9)",
//     marginBottom: 24,
//     textShadowColor: "rgba(0,0,0,0.3)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: "rgba(255,255,255,0.8)",
//     marginBottom: 16,
//     textShadowColor: "rgba(0,0,0,0.3)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   buttonContainer: {
//     width: "100%",
//   },
//   button: {
//     width: "100%",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   primaryButton: {
//     backgroundColor: "#4A80F0",
//   },
//   secondaryButton: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.3)",
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "white",
//   },
//   secondaryButtonText: {
//     color: "white",
//   },
// });

// export default HomeScreen;
