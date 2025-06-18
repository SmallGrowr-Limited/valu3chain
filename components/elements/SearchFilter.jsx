import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const SearchFilter = ({
  onSearch,
  onFilterChange,
  initialFilters = {
    status: null,
    type: null,
    category: null,
    dateRange: null,
  },
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = ["completed", "pending", "failed"];
  const typeOptions = ["credit", "debit"];
  const categoryOptions = [
    "inputs",
    "returns",
    "equipment",
    "insurance",
    "fees",
  ];
  const dateRangeOptions = [
    "last 7 days",
    "last 30 days",
    "last 90 days",
    "this year",
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterApply = () => {
    onFilterChange(filters);
    setShowFilters(false);
  };

  const handleFilterReset = () => {
    const resetFilters = {
      status: null,
      type: null,
      category: null,
      dateRange: null,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    setShowFilters(false);
  };

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={Colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color={Colors.textOnPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name="filter"
            size={20}
            color={
              filters.status ||
              filters.type ||
              filters.category ||
              filters.dateRange
                ? Colors.primary
                : Colors.textOnPrimary
            }
          />
        </TouchableOpacity>
      </View>

      {/* Active Filters Display */}
      {(filters.status ||
        filters.type ||
        filters.category ||
        filters.dateRange) && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.activeFiltersContainer}
        >
          {filters.status && (
            <View style={styles.activeFilter}>
              <Text style={styles.activeFilterText}>
                Status: {filters.status}
              </Text>
              <TouchableOpacity
                onPress={() => toggleFilter("status", filters.status)}
              >
                <Ionicons name="close" size={16} color={Colors.textOnPrimary} />
              </TouchableOpacity>
            </View>
          )}
          {filters.type && (
            <View style={styles.activeFilter}>
              <Text style={styles.activeFilterText}>Type: {filters.type}</Text>
              <TouchableOpacity
                onPress={() => toggleFilter("type", filters.type)}
              >
                <Ionicons name="close" size={16} color={Colors.textOnPrimary} />
              </TouchableOpacity>
            </View>
          )}
          {filters.category && (
            <View style={styles.activeFilter}>
              <Text style={styles.activeFilterText}>
                Category: {filters.category}
              </Text>
              <TouchableOpacity
                onPress={() => toggleFilter("category", filters.category)}
              >
                <Ionicons name="close" size={16} color={Colors.textOnPrimary} />
              </TouchableOpacity>
            </View>
          )}
          {filters.dateRange && (
            <View style={styles.activeFilter}>
              <Text style={styles.activeFilterText}>
                Date: {filters.dateRange}
              </Text>
              <TouchableOpacity
                onPress={() => toggleFilter("dateRange", filters.dateRange)}
              >
                <Ionicons name="close" size={16} color={Colors.textOnPrimary} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <View style={styles.filterPanel}>
          <ScrollView>
            {/* Status Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Transaction Status</Text>
              <View style={styles.filterOptions}>
                {statusOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filters.status === option && styles.filterOptionSelected,
                    ]}
                    onPress={() => toggleFilter("status", option)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.status === option &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Type Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Transaction Type</Text>
              <View style={styles.filterOptions}>
                {typeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filters.type === option && styles.filterOptionSelected,
                    ]}
                    onPress={() => toggleFilter("type", option)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.type === option &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.filterOptions}>
                {categoryOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filters.category === option &&
                        styles.filterOptionSelected,
                    ]}
                    onPress={() => toggleFilter("category", option)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.category === option &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Date Range</Text>
              <View style={styles.filterOptions}>
                {dateRangeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      filters.dateRange === option &&
                        styles.filterOptionSelected,
                    ]}
                    onPress={() => toggleFilter("dateRange", option)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.dateRange === option &&
                          styles.filterOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Filter Actions */}
          <View style={styles.filterActions}>
            <TouchableOpacity
              style={[styles.filterActionButton, styles.resetButton]}
              onPress={handleFilterReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterActionButton, styles.applyButton]}
              onPress={handleFilterApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.primaryText,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  filterButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
  },
  activeFiltersContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  activeFilter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  activeFilterText: {
    color: Colors.textOnPrimary,
    marginRight: 6,
    fontSize: 14,
  },
  filterPanel: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    maxHeight: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryText,
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  filterOption: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary,
  },
  filterOptionText: {
    color: Colors.primaryText,
  },
  filterOptionTextSelected: {
    color: Colors.textOnPrimary,
  },
  filterActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  filterActionButton: {
    borderRadius: 8,
    padding: 12,
    flex: 1,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: Colors.lightGray,
    marginRight: 8,
  },
  resetButtonText: {
    color: Colors.primaryText,
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: Colors.primary,
  },
  applyButtonText: {
    color: Colors.textOnPrimary,
    fontWeight: "600",
  },
});

export default SearchFilter;
