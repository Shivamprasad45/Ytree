// components/PushNotifications.tsx
"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Allow_Notification } from "../Featuers/TreeOrder/TreeOrderSlice";
import { CustomSubscription } from "../../type";
const PushNotifications: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const askPermission = async () => {
      try {
        // Request permission for notifications
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.error("Permission not granted for Notification");
          return;
        }

        // Register service worker and subscribe to push notifications
        const registerServiceWorker = async () => {
          try {
            const registration = await navigator.serviceWorker.register(
              "/service-worker.js"
            );
            const subscription: PushSubscription =
              await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey:
                  "BBPuBPUtiQ9XMcGyj_fAuupMTl_-pishcrf2Sk6HVLyQ8E3aJhvDNeiLznsSmmxT-BK52HT-hxLJqzdij23dxuk",
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
            console.log(customSubscription, "Custom Subscription");
            dispatch(Allow_Notification(customSubscription));
          } catch (error) {
            console.error(
              "Error during service worker registration or push subscription:",
              error
            );
          }
        };

        if ("serviceWorker" in navigator) {
          await registerServiceWorker();
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };

    askPermission();
  }, [dispatch]);

  return null;
};

export default PushNotifications;
