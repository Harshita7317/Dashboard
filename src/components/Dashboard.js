// src/components/Dashboard.js
import React, { useState } from "react";
import dashboardData from "../data";
import Category from "./Category";
import Card from "./Card";

const Dashboard = () => {
  const [categories, setCategories] = useState(dashboardData.categories);
  const [newWidget, setNewWidget] = useState({
    name: "",
    text: "",
    type: "pie",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id || null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const addWidget = () => {
    const updatedCategories = categories.map((category) => {
      if (category.id === selectedCategoryId) {
        const nextId = category.widgets.length + 1;
        const newWidgetObj = { id: nextId, ...newWidget };
        return { ...category, widgets: [...category.widgets, newWidgetObj] };
      }
      return category;
    });
    setCategories(updatedCategories);
    setNewWidget({ name: "", text: "", type: "pie" });
  };

  const removeWidget = (widgetId) => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      widgets: category.widgets.filter((widget) => widget.id !== widgetId),
    }));
    setCategories(updatedCategories);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWidget({ ...newWidget, [name]: value });
  };

  const handleNewCategoryChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const addCategory = () => {
    if (newCategoryName.trim() === "") return;
    const newCategory = {
      id: categories.length + 1,
      name: newCategoryName,
      widgets: [],
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
  };

  const filteredWidgets = categories
    .flatMap((category) => category.widgets)
    .filter(
      (widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="dashboard">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Widgets"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      <h3>Add New Category</h3>
      <input
        type="text"
        placeholder="Category Name"
        value={newCategoryName}
        onChange={handleNewCategoryChange}
      />
      <button onClick={addCategory}>Add Category</button>

      {categories.map((category) => (
        <div key={category.id}>
          <Category category={category} onRemoveWidget={removeWidget} />
        </div>
      ))}

      <h3>Add New Widget</h3>
      <select
        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
        value={selectedCategoryId}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="name"
        placeholder="Widget Name"
        value={newWidget.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="text"
        placeholder="Widget Text"
        value={newWidget.text}
        onChange={handleChange}
      />
      <select name="type" value={newWidget.type} onChange={handleChange}>
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        {/* Add more widget types as needed */}
      </select>
      <button onClick={addWidget}>Add Widget</button>

      <h3>All Widgets</h3>
      <div className="widget-container">
        {filteredWidgets.length > 0 ? (
          filteredWidgets.map((widget) => (
            <Card key={widget.id} widget={widget} onRemove={removeWidget} />
          ))
        ) : (
          <p>No widgets found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
