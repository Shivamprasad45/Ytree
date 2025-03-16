import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Users, Award } from "lucide-react";

interface LanternProps {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

interface SkyLanternReferralProps {
  referralCount?: number;
  targetCount?: number;
}

const SkyLanternReferral: React.FC<SkyLanternReferralProps> = ({
  referralCount = 10,
  targetCount = 10,
}) => {
  const [lanterns, setLanterns] = useState<LanternProps[]>([]);

  // Create lanterns based on referral count
  useEffect(() => {
    const newLanterns: LanternProps[] = [];
    const colors = ["amber", "orange", "rose", "purple", "blue"];

    for (let i = 0; i < Math.min(referralCount, 50); i++) {
      newLanterns.push({
        id: i,
        x: 20 + Math.random() * 60, // Random x position (20-80%)
        y: 100 - (i / referralCount) * 80, // Distribute vertically
        color: colors[i % colors.length],
        size: 12 + Math.random() * 8, // Random size between 12-20
        delay: i * 0.5, // Staggered animation delay
      });
    }

    setLanterns(newLanterns);
  }, [referralCount]);

  // Calculate progress percentage
  const progressPercentage = Math.min((referralCount / targetCount) * 100, 100);

  // Determine milestone achievements
  const milestones = [
    { count: Math.ceil(targetCount * 0.25), label: "Rising Start" },
    { count: Math.ceil(targetCount * 0.5), label: "Sky Brightener" },
    { count: Math.ceil(targetCount * 0.75), label: "Light Bringer" },
    { count: targetCount, label: "Festival Master" },
  ];

  const currentMilestone = milestones
    .filter((m) => referralCount >= m.count)
    .pop();

  return (
    <>
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
          100% {
            transform: translateY(-40px) rotate(-1deg);
          }
        }
        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 3px rgba(255, 200, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 200, 0, 0.8));
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes celebrate {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        .lantern {
          animation: float 8s ease-in-out infinite, glow 3s ease-in-out infinite;
        }
        .star {
          animation: twinkle 3s ease-in-out infinite;
        }
        .celebrate {
          animation: celebrate 1s ease-in-out infinite;
        }
      `}</style>

      <Card className="mb-8 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-amber-500">
              <Users size={20} />
            </span>
            Sky Lantern Festival
          </CardTitle>
          <CardDescription>
            Watch the night sky fill with lanterns as you refer friends!
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative h-80 w-full bg-gradient-to-b from-indigo-950 via-purple-900 to-blue-900 overflow-hidden">
            {/* Stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute bg-white rounded-full star"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              ></div>
            ))}

            {/* Moon */}
            <div className="absolute top-6 right-8">
              <div className="w-12 h-12 rounded-full bg-amber-100 shadow-[0_0_20px_rgba(254,243,199,0.8)]"></div>
            </div>

            {/* Lanterns */}
            {lanterns.map((lantern) => (
              <div
                key={`lantern-${lantern.id}`}
                className="absolute lantern"
                style={{
                  left: `${lantern.x}%`,
                  bottom: `${lantern.y}%`,
                  animationDelay: `${lantern.delay}s`,
                }}
              >
                {/* Lantern body */}
                <div
                  className={`w-${lantern.size} h-${lantern.size} relative`}
                  style={{
                    width: `${lantern.size}px`,
                    height: `${lantern.size}px`,
                  }}
                >
                  <div
                    className={`rounded-full bg-${lantern.color}-500 bg-opacity-80 w-full h-full`}
                  ></div>
                  <div
                    className={`absolute inset-1 rounded-full bg-${lantern.color}-300 bg-opacity-60`}
                  ></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-2 bg-amber-800"></div>
                </div>
              </div>
            ))}

            {/* Silhouette of people */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 400 50" className="w-full">
                <path
                  d="M0,50 L400,50 L400,40 C360,42 340,30 320,35 C300,25 280,30 260,28 C240,35 220,30 200,35 C180,25 160,30 140,28 C120,35 100,30 80,35 C60,25 40,30 20,28 L0,40 Z"
                  fill="black"
                />
                {/* Simple person silhouettes */}
                <circle cx="50" cy="32" r="3" fill="black" />
                <rect x="47" y="35" width="6" height="8" fill="black" />

                <circle cx="150" cy="32" r="3" fill="black" />
                <rect x="147" y="35" width="6" height="8" fill="black" />

                <circle cx="250" cy="32" r="3" fill="black" />
                <rect x="247" y="35" width="6" height="8" fill="black" />

                <circle cx="350" cy="32" r="3" fill="black" />
                <rect x="347" y="35" width="6" height="8" fill="black" />
              </svg>
            </div>

            {/* Progress indicator */}
            <div className="absolute top-4 left-4 bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1 backdrop-blur-sm">
              <span>Progress:</span>
              <span className="font-bold">
                {referralCount}/{targetCount}
              </span>
            </div>

            {/* Achievement badge if milestone reached */}
            {currentMilestone && (
              <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-300 to-amber-600 p-2 rounded-full celebrate">
                <Award size={18} className="text-white" />
              </div>
            )}

            {/* Special effects for milestones */}
            {referralCount >= targetCount && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`firework-${i}`}
                    className="absolute"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${10 + Math.random() * 40}%`,
                      transformOrigin: "center",
                      animation: `celebrate 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 to-red-500 opacity-30 blur-md"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between bg-gray-50 p-4">
          {/* Message based on progress */}
          <p className="text-sm text-gray-600">
            {referralCount === 0 && "Invite friends to light up the night sky!"}
            {referralCount > 0 &&
              referralCount < targetCount * 0.25 &&
              "You've started your lantern festival! Keep inviting!"}
            {referralCount >= targetCount * 0.25 &&
              referralCount < targetCount * 0.5 &&
              "The sky is beginning to glow. Beautiful start!"}
            {referralCount >= targetCount * 0.5 &&
              referralCount < targetCount * 0.75 &&
              "Halfway there! The festival is getting brighter!"}
            {referralCount >= targetCount * 0.75 &&
              referralCount < targetCount &&
              "Almost there! Just a few more lanterns to complete the festival!"}
            {referralCount >= targetCount &&
              "Magnificent! You've created a stunning lantern festival!"}
          </p>

          {/* Current milestone display */}
          {currentMilestone && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-600 font-semibold">
                {currentMilestone.label}
              </span>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default SkyLanternReferral;
