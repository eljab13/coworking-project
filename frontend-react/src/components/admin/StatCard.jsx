import React from "react";

const colorMap = {
  blue: {
    border: "border-l-blue-500",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
  },
  green: {
    border: "border-l-green-500",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
  },
  yellow: {
    border: "border-l-yellow-500",
    iconBg: "bg-yellow-100",
    iconText: "text-yellow-600",
  },
  purple: {
    border: "border-l-purple-500",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
  },
  red: {
    border: "border-l-red-500",
    iconBg: "bg-red-100",
    iconText: "text-red-600",
  },
  indigo: {
    border: "border-l-indigo-500",
    iconBg: "bg-indigo-100",
    iconText: "text-indigo-600",
  },
};

const StatCard = ({ title, value, icon, color = "blue" }) => {
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${colors.border} p-5 hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-start justify-between">
        {/* Text content */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>

        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-lg ${colors.iconBg} flex items-center justify-center`}
        >
          <span className={`${colors.iconText} w-5 h-5`}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
