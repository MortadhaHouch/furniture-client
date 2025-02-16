import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Notification as NotificationType } from "../../../utils/types";

export default function Notification({
  notification,
}: {
  notification: NotificationType;
}) {
  // Determine background color based on notification type
  let bgColor: string = "";
  switch (notification.type) {
    case "ORDER_PLACED":
      bgColor = "bg-green-100 border-l-4 border-green-500";
      break;
    case "PRODUCT_ADDED":
      bgColor = "bg-yellow-100 border-l-4 border-yellow-500";
      break;
    case "ORDER_CANCELED":
      bgColor = "bg-red-100 border-l-4 border-red-500";
      break;
    case "REVIEW_ADDED":
      bgColor = "bg-blue-100 border-l-4 border-blue-500";
      break;
    default:
      bgColor = "bg-gray-100 border-l-4 border-gray-500";
  }

  return (
    <Card
      className={`${bgColor} w-[250px] aspect-square shadow-sm hover:shadow-md transition-shadow overflow-hidden relative`}
    >
      <CardHeader className="pb-2 w-full flex flex-col justify-start items-start">
        <h3 className="text-lg font-semibold capitalize text-slate-800 w-full">
          {notification.type.split("_").join(" ")}
        </h3>
        <p className="text-sm text-gray-500 rounded-md w-full">
          {new Date(notification.createdAt).toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-800">{notification.message}</p>
        {notification.product && (
          <div className="mt-2 text-sm text-gray-600">
            <p>
              <strong>Product:</strong> {notification.product.name}
            </p>
            <p>
              <strong>Price:</strong> ${notification.product.price.toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
