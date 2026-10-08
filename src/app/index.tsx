import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

type Contact = {
  id: string;
  name: string;
  job: string;
  initial: string;
  color: string;
};

const contacts: Contact[] = [
  {
    id: "1",
    name: "Vaastav Parikh",
    job: "Jr Product Manager",
    initial: "V",
    color: "#173B50",
  },
  {
    id: "2",
    name: "Jane Cooper",
    job: "Web Designer",
    initial: "J",
    color: "#1E5B7A",
  },
  {
    id: "3",
    name: "Eleanor Pena",
    job: "Marketing Coordinator",
    initial: "E",
    color: "#49A77A",
  },
  {
    id: "4",
    name: "Darlene Robertson",
    job: "President of Sales",
    initial: "D",
    color: "#C9503E",
  },
  {
    id: "5",
    name: "Jerome Bell",
    job: "Nursing Assistant",
    initial: "J",
    color: "#713A9B",
  },
  {
    id: "6",
    name: "Robert Fox",
    job: "Dog Trainer",
    initial: "R",
    color: "#B83F6D",
  },
  {
    id: "7",
    name: "Savannah Nguyen",
    job: "Medical Assistant",
    initial: "S",
    color: "#173B50",
  },
  {
    id: "8",
    name: "Jenny Wilson",
    job: "Jr Product Manager",
    initial: "J",
    color: "#34739A",
  },
   {
    id: "9",
    name: "Etieno Uoyen",
    job: "Mobile Developer",
    initial: "E",
    color: "#9bb4c4",
  },
   {
    id: "10",
    name: "Saviour Udoyen",
    job: "Mechanial Engineer",
    initial: "S",
    color: "#349a39",
  },
   {
    id: "11",
    name: "Anita Esara",
    job: "Nurse",
    initial: "A",
    color: "#9a3481",
  },
   {
    id: "12",
    name: "Faustina Esara",
    job: "Teaher",
    initial: "F",
    color: "#012236",
  },
   {
    id: "13",
    name: "Mmedara Udoyen",
    job: "Lecturer",
    initial: "M",
    color: "#34829a",
  },
   {
    id: "14",
    name: "Abasifreke Edem",
    job: "Electrical Engineer",
    initial: "A",
    color: "#9a3489",
  },
   {
    id: "15",
    name: "Idara Etim",
    job: "Fashion Designer",
    initial: "I",
    color: "#9a7134",
  },
   {
    id: "16",
    name: "Mkpouto Uko",
    job: "Software Engineer",
    initial: "M",
    color: "#849a34",
  },
   {
    id: "17",
    name: "Marvelous Donatus",
    job: "Lawyer",
    initial: "M",
    color: "#349a62",
  },
   {
    id: "18",
    name: "Aniebiet Udoyen",
    job: "Cyber Security Engineer",
    initial: "A",
    color: "#343b9a",
  },
  {
    id: "19",
    name: "Inemesit Oku",
    job: "Graphics Designer",
    initial: "I",
    color: "#8e349a",
  },
  {
    id: "20",
    name: "Esther Akpan",
    job: "Hair Stylist",
    initial: "E",
    color: "#767ff7",
  },
];

export default function Index() {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      {/* Initial Circle */}
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: item.color,
          },
        ]}
      >
        <Text style={styles.avatarText}>{item.initial}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>

        <Text style={styles.contactJob}>{item.job}</Text>
      </View>

      {/* Phone Button */}
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call-outline" size={21} color="#53666F" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>All Contact</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#B5B9BC" />

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#B5B9BC"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Contact List - GREEN SECTION */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={35} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Header
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#222222",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
  },

  // Search
  searchContainer: {
    height: 42,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 8,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333333",
  },

  // FlatList
  listContent: {
    paddingBottom: 100,
  },

  // Each contact row
  contactItem: {
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  // Avatar
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
  },

  // Name + job
  contactInfo: {
    flex: 1,
    marginLeft: 14,
  },

  contactName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222222",
    marginBottom: 5,
  },

  contactJob: {
    fontSize: 13,
    color: "#555555",
  },

  // Phone icon
  callButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F4F6F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // Floating + button
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 25,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#173B50",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
});