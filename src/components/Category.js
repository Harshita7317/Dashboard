// src/components/Category.js
import React from "react";
import Widget from "./Widget";

const Category = ({ category, onRemoveWidget }) => {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      {category.widgets.map((widget) => (
        <Widget key={widget.id} widget={widget} onRemove={onRemoveWidget} />
      ))}
    </div>
  );
};

export default Category;
