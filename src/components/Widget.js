// src/components/Widget.js
import React from "react";
import Card from "./Card";

const Widget = ({ widget, onRemove }) => {
  return <Card widget={widget} onRemove={onRemove} />;
};

export default Widget;
