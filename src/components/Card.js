// src/components/Card.js
import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Card = ({ widget, onRemove }) => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  return (
    <MuiCard variant="outlined" className="widget-card">
      <CardContent>
        <div className="card-header">
          <Typography variant="h5" component="div">
            {widget.name}
          </Typography>
          <IconButton onClick={() => onRemove(widget.id)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="text.secondary">
          {widget.text}
        </Typography>
        {widget.type === "pie" && (
          <PieChart width={200} height={100}>
            <Pie
              data={data}
              cx={100}
              cy={50}
              labelLine={false}
              outerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        )}
        {widget.type === "bar" && (
          <BarChart width={200} height={100} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
        {widget.type === "line" && (
          <LineChart width={200} height={100} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
