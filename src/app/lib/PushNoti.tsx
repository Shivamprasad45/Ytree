// components/PushNotifications.tsx
"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Allow_Notification } from "../Featuers/TreeOrder/TreeOrderSlice";
import { CustomSubscription } from "../../../type";

const PushNotifications: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const askPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.error("Permission not granted for Notification");
      } else {
        const registerServiceWorker = async () => {
          const registration = await navigator.serviceWorker.register(
            "/service-worker.js"
          );
          const subscription: PushSubscription =
            await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey:
                "BNkXUDivzy5aHZv0A1GZcrlG2mjX9hs00LHhy0YILw0Q9NXUS2JgpjB3fqR_2KSnkDeim7x8egVUzsDQbRJLy58",
            });
          console.log(subscription, "Subscription");

          const customSubscription: CustomSubscription = {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: {
              p256dh: subscription.toJSON().keys?.p256dh || "",
              auth: subscription.toJSON().keys?.auth || "",
            },
          };

          dispatch(Allow_Notification(customSubscription));
          // Send subscription to backend
          // await fetch("http://localhost:3001/subscribe", {
          //   method: "POST",
          //   body: JSON.stringify(customSubscription),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // });
        };

        if ("serviceWorker" in navigator) {
          registerServiceWorker().catch((error) => console.error(error));
        }
      }
    };

    askPermission();
  }, [dispatch]);

  return null;
};

export default PushNotifications;
