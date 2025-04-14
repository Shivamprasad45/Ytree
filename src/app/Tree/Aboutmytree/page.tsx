"use client";
import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useAbout_my_treeQuery } from "@/app/Featuers/TreeOrder/TreeOrderServices";
import { useSearchParams } from "next/navigation";
export default function MapVideoForm({ params }: { params: { id: string } }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [customOptions, setCustomOptions] = useState({
    duration: 15,
    includeMusic: true,
    theme: "nature", // Options: nature, modern, dramatic
    effects: "standard", // Options: standard, cinematic, minimal
    includeStats: true,
    includeSeasons: false,
  });
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const Plaintid = searchParams.get("Plaintid");
  const userid = searchParams.get("userid");
  const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { data: treeData, isLoading } = useAbout_my_treeQuery({
    id: search ?? "",
    plantid: Plaintid ?? "",
    userid: userid ?? "",
  });

  console.log(Plaintid);
  // Theme settings
  const themeSettings = {
    nature: {
      backgroundColor: "#003300",
      titleColor: "#f0fff0",
      fontFamily: "Georgia, serif",
      musicTrack: "nature-ambience.mp3",
    },
    modern: {
      backgroundColor: "#121212",
      titleColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
      musicTrack: "modern-ambient.mp3",
    },
    dramatic: {
      backgroundColor: "#000033",
      titleColor: "#ffd700",
      fontFamily: "Impact, sans-serif",
      musicTrack: "dramatic-soundtrack.mp3",
    },
  };

  const selectedTheme =
    themeSettings[customOptions.theme as keyof typeof themeSettings];

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Calculate environmental stats based on tree data
  const calculateEnvironmentalStats = (treeData: any) => {
    // This would ideally use actual data based on tree species, age, etc.
    // For now using estimates for demonstration
    const treeType = treeData?.type || "oak";

    const statsMap: Record<string, any> = {
      oak: {
        co2PerYear: 22, // kg
        oxygenPerYear: 118, // kg
        wildlifeSupported: 284, // species
        lifespanYears: 400,
      },
      maple: {
        co2PerYear: 18,
        oxygenPerYear: 100,
        wildlifeSupported: 225,
        lifespanYears: 300,
      },
      pine: {
        co2PerYear: 15,
        oxygenPerYear: 88,
        wildlifeSupported: 190,
        lifespanYears: 200,
      },
    };

    // Default to oak if tree type isn't found
    return statsMap[treeType] || statsMap.oak;
  };

  const createTextImage = (
    text: string,
    options: {
      bgColor?: string;
      textColor?: string;
      fontSize?: number;
      overlay?: boolean;
      animation?: string;
      frame?: number;
      totalFrames?: number;
    } = {}
  ) => {
    const {
      bgColor = selectedTheme.backgroundColor,
      textColor = selectedTheme.titleColor,
      fontSize = 32,
      overlay = false,
      animation = "none",
      frame = 0,
      totalFrames = 1,
    } = options;

    const canvas = document.createElement("canvas");

    canvas.width = 1080; // Increased from 640
    canvas.height = 1080; // Increased from 640

    const ctx = canvas.getContext("2d")!;

    // Fill background if not an overlay
    if (!overlay) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Set text properties
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px ${selectedTheme.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Handle animations
    let opacity = 1;
    let yOffset = 0;
    let scale = 1;

    if (animation === "fadeIn" && totalFrames > 1) {
      opacity = frame / totalFrames;
    } else if (animation === "slideUp" && totalFrames > 1) {
      yOffset = (1 - frame / totalFrames) * 50;
    } else if (animation === "zoomIn" && totalFrames > 1) {
      scale = 0.5 + (frame / totalFrames) * 0.5;
    }

    // Apply transformations for animations
    ctx.globalAlpha = opacity;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + yOffset);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Word wrapping for long titles
    const words = text.split(" ");
    let line = "";
    const lines = [];
    const maxWidth = canvas.width - 60;

    for (const word of words) {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        lines.push(line);
        line = word + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Draw multiple lines
    const lineHeight = fontSize * 1.5;
    const y = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line.trim(), canvas.width / 2, y + i * lineHeight);
    });

    // Restore context
    ctx.restore();
    ctx.globalAlpha = 1;

    return canvas;
  };

  // Create animated overlays
  const createSeasonalOverlay = (
    season: string,
    frame: number,
    totalFrames: number
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext("2d")!;

    // Different overlay effects based on season
    if (season === "spring") {
      // Green tint with flower petals
      ctx.fillStyle = "rgba(100, 200, 100, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated flower petals
      const petalCount = 15;
      for (let i = 0; i < petalCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * ((frame / totalFrames) * 2);
        const size = 5 + Math.random() * 10;

        ctx.fillStyle = "rgba(255, 192, 203, 0.7)";
        ctx.beginPath();
        ctx.ellipse(
          x,
          y,
          size,
          size * 1.5,
          Math.random() * Math.PI,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    } else if (season === "summer") {
      // Bright sunny effect
      ctx.fillStyle = "rgba(255, 255, 200, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun rays
      const rayCount = 12;
      const centerX = canvas.width / 2;
      const centerY = -50; // Above the canvas
      ctx.fillStyle = "rgba(255, 255, 0, 0.1)";

      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const intensity =
          0.5 + 0.5 * Math.sin((frame / totalFrames) * Math.PI * 2);

        ctx.globalAlpha = 0.1 * intensity;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * canvas.width,
          centerY + Math.sin(angle) * canvas.width
        );
        ctx.lineTo(
          centerX + Math.cos(angle + 0.2) * canvas.width,
          centerY + Math.sin(angle + 0.2) * canvas.width
        );
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    } else if (season === "fall") {
      // Autumn colors overlay
      ctx.fillStyle = "rgba(139, 69, 19, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Falling leaves
      const leafCount = 20;
      for (let i = 0; i < leafCount; i++) {
        const progress = (i / leafCount + frame / totalFrames) % 1;
        const x = Math.random() * canvas.width;
        const y = progress * canvas.height;
        const size = 8 + Math.random() * 12;

        // Random fall colors
        const colors = ["#8B4513", "#CD853F", "#D2691E", "#FF8C00", "#DAA520"];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(progress * Math.PI * 4);

        // Draw a leaf shape
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size / 2, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    } else if (season === "winter") {
      // Snow overlay
      ctx.fillStyle = "rgba(200, 200, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Snowflakes
      const snowCount = 50;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

      for (let i = 0; i < snowCount; i++) {
        const progress = (i / snowCount + frame / totalFrames) % 1;
        const x = Math.random() * canvas.width;
        const y = progress * canvas.height;
        const size = 2 + Math.random() * 4;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Add season label in corner
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(season.charAt(0).toUpperCase() + season.slice(1), 20, 20);

    return canvas;
  };

  // Create wildlife silhouettes
  const createWildlifeOverlay = (frame: number, totalFrames: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext("2d")!;

    // Progress through animation
    const progress = frame / totalFrames;

    // Draw random bird silhouettes
    const birdCount = 5;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";

    for (let i = 0; i < birdCount; i++) {
      const size = 10 + Math.random() * 15;

      // Calculate position based on progress and bird index
      const angle = Math.PI * 2 * (i / birdCount + progress * 0.5);
      const radius = 150 + Math.sin(progress * Math.PI * 2) * 50;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius * 0.5;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);

      // Simple bird silhouette
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(
        size / 2,
        -size * 0.8,
        size,
        -size * 0.6,
        size * 0.8,
        0
      );
      ctx.bezierCurveTo(size, size * 0.6, size / 2, size * 0.8, 0, size);
      ctx.bezierCurveTo(
        -size / 2,
        size * 0.8,
        -size,
        size * 0.6,
        -size * 0.8,
        0
      );
      ctx.bezierCurveTo(-size, -size * 0.6, -size / 2, -size * 0.8, 0, -size);
      ctx.fill();

      ctx.restore();
    }

    // Add small mammals at tree base
    if (progress > 0.5) {
      const squirrelX =
        canvas.width / 2 + Math.sin(progress * Math.PI * 4) * 50;
      const squirrelY = canvas.height * 0.85;

      ctx.fillStyle = "rgba(100, 80, 60, 0.8)";
      ctx.beginPath();
      ctx.ellipse(squirrelX, squirrelY, 15, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(
        squirrelX + 15,
        squirrelY - 8,
        8,
        5,
        Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(squirrelX - 10, squirrelY);
      ctx.quadraticCurveTo(
        squirrelX - 25,
        squirrelY - 20,
        squirrelX - 25 + Math.sin(progress * Math.PI * 8) * 5,
        squirrelY - 15
      );
      ctx.lineTo(squirrelX - 15, squirrelY - 5);
      ctx.closePath();
      ctx.fill();
    }

    return canvas;
  };

  // Create environmental impact visualization
  const createImpactVisualization = (
    stats: any,
    frame: number,
    totalFrames: number
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext("2d")!;

    // Semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Environmental Impact", canvas.width / 2, 60);

    // Animation progress (0 to 1)
    const animProgress = Math.min(1, frame / (totalFrames * 0.8));

    // Draw stats with animated bars
    const startY = 150;
    const barHeight = 40;
    const spacing = 100;
    const maxBarWidth = 400;

    // CO2 Absorption
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "left";
    ctx.fillText("CO₂ Absorbed:", 80, startY);

    ctx.fillStyle = "#44cc44";
    const co2Width = maxBarWidth * animProgress;
    ctx.fillRect(80, startY + 35, co2Width, barHeight);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";
    if (animProgress > 0.9) {
      ctx.fillText(
        `${stats.co2PerYear} kg/year`,
        80 + co2Width - 10,
        startY + 35 + barHeight / 2 + 8
      );
    }

    // Oxygen Production
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.fillText("Oxygen Produced:", 80, startY + spacing);

    ctx.fillStyle = "#4488ff";
    const oxygenWidth = maxBarWidth * animProgress;
    ctx.fillRect(80, startY + spacing + 35, oxygenWidth, barHeight);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";
    if (animProgress > 0.9) {
      ctx.fillText(
        `${stats.oxygenPerYear} kg/year`,
        80 + oxygenWidth - 10,
        startY + spacing + 35 + barHeight / 2 + 8
      );
    }

    // Wildlife Supported
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.fillText("Wildlife Supported:", 80, startY + spacing * 2);

    ctx.fillStyle = "#ffcc44";
    const wildlifeWidth = maxBarWidth * animProgress;
    ctx.fillRect(80, startY + spacing * 2 + 35, wildlifeWidth, barHeight);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";
    if (animProgress > 0.9) {
      ctx.fillText(
        `${stats.wildlifeSupported} species`,
        80 + wildlifeWidth - 10,
        startY + spacing * 2 + 35 + barHeight / 2 + 8
      );
    }

    // Add lifecycle visualization
    if (animProgress > 0.7) {
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.font = "bold 28px Arial";
      ctx.fillText(
        `Expected Lifespan: ${stats.lifespanYears} years`,
        canvas.width / 2,
        startY + spacing * 3 + 20
      );
    }

    return canvas;
  };

  // Create tree growth visualization
  const createGrowthVisualization = (frame: number, totalFrames: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext("2d")!;

    // Semi-transparent background
    ctx.fillStyle = "rgba(0, 30, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Tree Growth Timeline", canvas.width / 2, 40);

    // Draw timeline years
    const years = [1, 5, 10, 25, 50, 100];
    const currentYear = Math.floor((frame / totalFrames) * (years.length - 1));
    const displayYear = years[currentYear];

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Year ${displayYear}`, canvas.width / 2, 100);

    // Ground line
    const groundY = 480;
    ctx.fillStyle = "#663300";
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Tree growth based on current year
    const treeHeight = 50 + (displayYear / 100) * 280;
    const trunkWidth = 10 + (displayYear / 100) * 40;

    // Draw trunk
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(
      canvas.width / 2 - trunkWidth / 2,
      groundY - treeHeight,
      trunkWidth,
      treeHeight
    );

    // Draw canopy
    ctx.fillStyle = "#006400";
    const canopyWidth = trunkWidth * 3 + (displayYear / 100) * 150;
    const canopyHeight = treeHeight * 0.7;

    // Tree shape depends on age
    if (displayYear <= 5) {
      // Young sapling - simple triangle
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, groundY - treeHeight - 50);
      ctx.lineTo(canvas.width / 2 - canopyWidth / 2, groundY - treeHeight + 50);
      ctx.lineTo(canvas.width / 2 + canopyWidth / 2, groundY - treeHeight + 50);
      ctx.closePath();
      ctx.fill();
    } else if (displayYear <= 25) {
      // Adolescent tree - double triangle
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, groundY - treeHeight - 80);
      ctx.lineTo(canvas.width / 2 - canopyWidth / 2, groundY - treeHeight + 10);
      ctx.lineTo(canvas.width / 2 + canopyWidth / 2, groundY - treeHeight + 10);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, groundY - treeHeight - 40);
      ctx.lineTo(
        canvas.width / 2 - canopyWidth / 1.7,
        groundY - treeHeight + 70
      );
      ctx.lineTo(
        canvas.width / 2 + canopyWidth / 1.7,
        groundY - treeHeight + 70
      );
      ctx.closePath();
      ctx.fill();
    } else {
      // Mature tree - rounded canopy
      const centerX = canvas.width / 2;
      const centerY = groundY - treeHeight + canopyHeight / 3;

      ctx.beginPath();
      ctx.arc(centerX, centerY, canopyWidth / 2, 0, Math.PI * 2);
      ctx.fill();

      // Add some irregularity to mature trees
      for (let i = 0; i < 5; i++) {
        const angle = Math.PI * 2 * (i / 5);
        const blobRadius = canopyWidth / 4;
        const blobX = centerX + Math.cos(angle) * ((canopyWidth / 2) * 0.7);
        const blobY = centerY + Math.sin(angle) * ((canopyWidth / 2) * 0.7);

        ctx.beginPath();
        ctx.arc(blobX, blobY, blobRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Add humans for scale if in later years
    if (displayYear >= 10) {
      // Human figure
      ctx.fillStyle = "#000000";
      const humanHeight = 50;
      const humanX = canvas.width / 2 - canopyWidth / 2 - 30;
      const humanY = groundY - humanHeight;

      // Body
      ctx.fillRect(humanX - 5, humanY, 10, humanHeight);

      // Head
      ctx.beginPath();
      ctx.arc(humanX, humanY - 10, 15, 0, Math.PI * 2);
      ctx.fill();

      // Arms
      ctx.fillRect(humanX - 20, humanY + 15, 40, 5);
    }

    // Add shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.ellipse(
      canvas.width / 2,
      groundY - 5,
      canopyWidth / 2,
      20,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    return canvas;
  };

  const updateProgress = (step: string, percentage: number) => {
    setStatusMessage(step);
    setProgress(percentage);
  };

  const downloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement("a");
      const treeName = treeData?.name || "your-tree";
      a.href = videoUrl;
      a.download = `${treeName.replace(/\s+/g, "-").toLowerCase()}-trailer.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setStatusMessage("Preparing to generate video...");

    if (!treeData) {
      alert("Tree data is still loading.");
      setLoading(false);
      return;
    }

    const {
      late: latitude,
      long: longitude,
      Plant_Addresses,
      imageURL,
      name,
    } = treeData;
    const locationText = Plant_Addresses || "Unknown Location";
    const treeName = name || "Your Tree";
    const environmentalStats = calculateEnvironmentalStats(treeData);

    try {
      const ffmpeg = ffmpegRef.current;
      if (!ffmpeg.loaded) {
        updateProgress("Loading video processing tools...", 5);
        await ffmpeg.load();
      }

      const frameRate = 24; // Higher frame rate for smoother animations
      const totalDuration = customOptions.duration;
      const totalFrames = frameRate * totalDuration;
      const minZoom = 5;
      const maxZoom = 18;
      let frameIndex = 0;

      const duplicate = async (blob: Blob, times: number) => {
        for (let i = 0; i < times; i++) {
          const buffer = new Uint8Array(await blob.arrayBuffer());
          await ffmpeg.writeFile(
            `frame${String(frameIndex++).padStart(4, "0")}.png`,
            buffer
          );
        }
      };

      // Animation helper function
      const createAnimatedFrames = async (
        generator: (frame: number, totalFrames: number) => HTMLCanvasElement,
        frameCount: number
      ) => {
        for (let i = 0; i < frameCount; i++) {
          const canvas = generator(i, frameCount);
          const blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => b && resolve(b), "image/png")
          );
          const buffer = new Uint8Array(await blob.arrayBuffer());
          await ffmpeg.writeFile(
            `frame${String(frameIndex++).padStart(4, "0")}.png`,
            buffer
          );
        }
      };

      // 1. Cinematic Intro with Animated Text
      updateProgress("Creating animated intro...", 10);
      const introFrameCount = frameRate * 2.5; // 2.5 seconds

      for (let i = 0; i < introFrameCount; i++) {
        const canvas = createTextImage(`Introducing: ${treeName}`, {
          animation: "fadeIn",
          frame: i,
          totalFrames: introFrameCount,
        });

        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => b && resolve(b), "image/png")
        );
        const buffer = new Uint8Array(await blob.arrayBuffer());
        await ffmpeg.writeFile(
          `frame${String(frameIndex++).padStart(4, "0")}.png`,
          buffer
        );
      }

      // 2. Fade-to-white transition
      updateProgress("Adding transition effects...", 15);
      const transitionFrames = frameRate * 0.5; // 0.5 seconds
      for (let i = 0; i < transitionFrames; i++) {
        const progress = i / transitionFrames;
        const r = Math.round(255 * progress);
        const g = Math.round(255 * progress);
        const b = Math.round(255 * progress);

        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => b && resolve(b), "image/png")
        );
        const buffer = new Uint8Array(await blob.arrayBuffer());
        await ffmpeg.writeFile(
          `frame${String(frameIndex++).padStart(4, "0")}.png`,
          buffer
        );
      }

      // 3. Tree Growth Visualization
      if (customOptions.effects === "cinematic") {
        updateProgress("Creating tree growth animation...", 20);
        // Add tree growth visualization
        await createAnimatedFrames(createGrowthVisualization, frameRate * 5);

        // Add another transition
        for (let i = transitionFrames - 1; i >= 0; i--) {
          const progress = i / transitionFrames;
          const r = Math.round(255 * progress);
          const g = Math.round(255 * progress);
          const b = Math.round(255 * progress);

          const canvas = document.createElement("canvas");
          canvas.width = 640;
          canvas.height = 640;
          const ctx = canvas.getContext("2d")!;
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => b && resolve(b), "image/png")
          );
          const buffer = new Uint8Array(await blob.arrayBuffer());
          await ffmpeg.writeFile(
            `frame${String(frameIndex++).padStart(4, "0")}.png`,
            buffer
          );
        }
      }

      // 4. Map Zoom Frames with Enhanced Effects
      updateProgress("Fetching map images...", 30);

      const totalMapFrames = Math.floor(frameRate * 5); // 5 seconds of map animation
      const mapPauseFrames = Math.floor(frameRate * 1); // 1 second pause at full zoom
      const mapImages = await fetchMapImagesForLocation(
        latitude,
        longitude,
        minZoom,
        maxZoom,
        totalMapFrames
      );

      updateProgress("Creating dynamic map sequence...", 40);

      for (let i = 0; i < mapImages.length; i++) {
        const response = await fetch(mapImages[i].url);
        if (!response.ok)
          throw new Error(`Failed to fetch: ${mapImages[i].url}`);
        const imageBlob = await response.blob();

        // Create a canvas to add effects to the map
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;
        const ctx = canvas.getContext("2d")!;

        // Draw the base map
        const img = await createImageBitmap(imageBlob);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Add location marker that pulses as we zoom in
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const progress = i / mapImages.length;
        const pulseSize = 10 + Math.sin(progress * Math.PI * 8) * 5;

        // Draw outer glow
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          30 + pulseSize
        );
        gradient.addColorStop(0, "rgba(255, 0, 0, 0.6)");
        gradient.addColorStop(0.5, "rgba(255, 100, 0, 0.3)");
        gradient.addColorStop(1, "rgba(255, 200, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30 + pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw pin
        ctx.fillStyle = "#FF3B30";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FF3B30";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Add location info at bottom of map
        if (progress > 0.7) {
          const locationOpacity = (progress - 0.7) / 0.3;

          // Location banner background
          ctx.fillStyle = `rgba(0, 0, 0, ${locationOpacity * 0.7})`;
          ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

          // Location text
          ctx.fillStyle = `rgba(255, 255, 255, ${locationOpacity})`;
          ctx.font = "bold 24px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(locationText, canvas.width / 2, canvas.height - 40);
        }

        const mapBlob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => b && resolve(b), "image/png")
        );
        const buffer = new Uint8Array(await mapBlob.arrayBuffer());
        await ffmpeg.writeFile(
          `frame${String(frameIndex++).padStart(4, "0")}.png`,
          buffer
        );

        // Update progress periodically
        if (i % Math.max(1, Math.floor(mapImages.length / 10)) === 0) {
          const mapProgress = 40 + Math.floor((i / mapImages.length) * 10);
          updateProgress(
            `Processing map frames (${i + 1}/${mapImages.length})...`,
            mapProgress
          );
        }
      }

      // Add some pause frames at max zoom with pulsing animation
      const lastMapImageUrl = mapImages[mapImages.length - 1].url;
      const lastMapResponse = await fetch(lastMapImageUrl);
      const lastMapBlob = await lastMapResponse.blob();
      const lastMapImage = await createImageBitmap(lastMapBlob);

      for (let i = 0; i < mapPauseFrames; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;
        const ctx = canvas.getContext("2d")!;

        // Draw the base map
        ctx.drawImage(lastMapImage, 0, 0, canvas.width, canvas.height);

        // Pulsing animation
        const pulseProgress = i / mapPauseFrames;
        const pulseSize = 20 + Math.sin(pulseProgress * Math.PI * 4) * 10;

        // Draw outer glow
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          40 + pulseSize
        );
        gradient.addColorStop(0, "rgba(255, 0, 0, 0.6)");
        gradient.addColorStop(0.5, "rgba(255, 100, 0, 0.3)");
        gradient.addColorStop(1, "rgba(255, 200, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          40 + pulseSize,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Draw pin
        ctx.fillStyle = "#FF3B30";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 7, 0, Math.PI * 2);
        ctx.fill();

        // Location banner
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

        // Location text
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(locationText, canvas.width / 2, canvas.height - 40);

        const pauseBlob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => b && resolve(b), "image/png")
        );
        const buffer = new Uint8Array(await pauseBlob.arrayBuffer());
        await ffmpeg.writeFile(
          `frame${String(frameIndex++).padStart(4, "0")}.png`,
          buffer
        );
      }

      // 5. Seasonal Views if enabled
      if (customOptions.includeSeasons) {
        updateProgress("Creating seasonal visualizations...", 55);
        const seasons = ["spring", "summer", "fall", "winter"];
        const framesPerSeason = Math.floor(frameRate * 1.5); // 1.5 seconds per season

        // Get base satellite image for seasons overlay
        const satelliteStyle = "mapbox/satellite-v9";
        const accessToken =
          "pk.eyJ1IjoidmFuYWdyb3czNDQ1IiwiYSI6ImNtOThlMTFyZTAxejAya3NlbGRoaHFxOWQifQ.0KYHnJMDy2KXRUkA0CaOlQ";
        const satelliteUrl = `https://api.mapbox.com/styles/v1/${satelliteStyle}/static/${longitude},${latitude},16,0/640x640?access_token=${accessToken}`;
        const satelliteResponse = await fetch(satelliteUrl);
        const satelliteBlob = await satelliteResponse.blob();
        const satelliteImage = await createImageBitmap(satelliteBlob);

        for (let season of seasons) {
          for (let i = 0; i < framesPerSeason; i++) {
            const canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 640;
            const ctx = canvas.getContext("2d")!;

            // Draw satellite base
            ctx.drawImage(satelliteImage, 0, 0, canvas.width, canvas.height);

            // Draw seasonal effect
            const seasonCanvas = createSeasonalOverlay(
              season,
              i,
              framesPerSeason
            );
            ctx.drawImage(seasonCanvas, 0, 0);

            const seasonBlob = await new Promise<Blob>((resolve) =>
              canvas.toBlob((b) => b && resolve(b), "image/png")
            );
            const buffer = new Uint8Array(await seasonBlob.arrayBuffer());
            await ffmpeg.writeFile(
              `frame${String(frameIndex++).padStart(4, "0")}.png`,
              buffer
            );
          }
        }
      }

      // 6. Environmental Impact Statistics if enabled
      if (customOptions.includeStats) {
        updateProgress("Creating environmental impact visuals...", 65);
        const statsFrames = frameRate * 5; // 5 seconds
        await createAnimatedFrames(
          (frame, total) =>
            createImpactVisualization(environmentalStats, frame, total),
          statsFrames
        );
      }

      // 7. Tree Image Sequence with Wildlife Overlay
      updateProgress("Adding tree images with effects...", 75);
      if (imageURL) {
        try {
          const plantResp = await fetch(imageURL);
          if (plantResp.ok) {
            const plantBlob = await plantResp.blob();
            const treeImage = await createImageBitmap(plantBlob);

            const wildlifeFrames = frameRate * 5; // 5 seconds

            for (let i = 0; i < wildlifeFrames; i++) {
              const canvas = document.createElement("canvas");
              canvas.width = 640;
              canvas.height = 640;
              const ctx = canvas.getContext("2d")!;

              // Draw tree image as base
              ctx.drawImage(treeImage, 0, 0, canvas.width, canvas.height);

              // Add wildlife overlay on top
              const wildlifeCanvas = createWildlifeOverlay(i, wildlifeFrames);
              ctx.drawImage(wildlifeCanvas, 0, 0);

              // Add subtle tree name at bottom
              ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
              ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

              ctx.fillStyle = "#FFFFFF";
              ctx.font = "bold 28px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(treeName, canvas.width / 2, canvas.height - 30);

              const frameBlob = await new Promise<Blob>((resolve) =>
                canvas.toBlob((b) => b && resolve(b), "image/png")
              );
              const buffer = new Uint8Array(await frameBlob.arrayBuffer());
              await ffmpeg.writeFile(
                `frame${String(frameIndex++).padStart(4, "0")}.png`,
                buffer
              );
            }
          } else {
            // Create a fallback image if tree image can't be loaded
            const fallbackCanvas = createTextImage("Your Beautiful Tree", {
              animation: "zoomIn",
              frame: 0,
              totalFrames: 1,
            });
            const fallbackBlob = await new Promise<Blob>((resolve) =>
              fallbackCanvas.toBlob((b) => b && resolve(b), "image/png")
            );
            await duplicate(fallbackBlob, frameRate * 3);
          }
        } catch (error) {
          console.error("Failed to load tree image:", error);
          const fallbackCanvas = createTextImage("Your Beautiful Tree", {
            animation: "zoomIn",
            frame: 0,
            totalFrames: 1,
          });
          const fallbackBlob = await new Promise<Blob>((resolve) =>
            fallbackCanvas.toBlob((b) => b && resolve(b), "image/png")
          );
          await duplicate(fallbackBlob, frameRate * 3);
        }
      }

      // 8. Inspirational Outro Text
      updateProgress("Creating outro sequence...", 85);

      // Create fade-in animation for outro text
      const outroFrames = frameRate * 3; // 3 seconds
      for (let i = 0; i < outroFrames; i++) {
        const progress = i / outroFrames;
        const fadeProgress = progress < 0.3 ? progress / 0.3 : 1;

        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;
        const ctx = canvas.getContext("2d")!;

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, selectedTheme.backgroundColor);
        gradient.addColorStop(1, "#000000");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Main text with fade-in
        ctx.globalAlpha = fadeProgress;
        ctx.fillStyle = selectedTheme.titleColor;
        ctx.font = `bold 36px ${selectedTheme.fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Inspirational message
        const message = "Every tree makes a difference";
        ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 40);

        // Location text appears slightly later
        if (progress > 0.4) {
          const locationFade = (progress - 0.4) / 0.3;
          ctx.globalAlpha = Math.min(1, locationFade);
          ctx.font = `italic 28px ${selectedTheme.fontFamily}`;
          ctx.fillText(
            `Planted at ${locationText}`,
            canvas.width / 2,
            canvas.height / 2 + 30
          );
        }

        // Add call to action at the end
        if (progress > 0.7) {
          const ctaFade = (progress - 0.7) / 0.3;
          ctx.globalAlpha = Math.min(1, ctaFade);
          ctx.font = `bold 24px ${selectedTheme.fontFamily}`;
          ctx.fillText(
            "Plant your own tree today",
            canvas.width / 2,
            canvas.height / 2 + 100
          );
        }

        ctx.globalAlpha = 1.0;

        const outroBlob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => b && resolve(b), "image/png")
        );
        const buffer = new Uint8Array(await outroBlob.arrayBuffer());
        await ffmpeg.writeFile(
          `frame${String(frameIndex++).padStart(4, "0")}.png`,
          buffer
        );
      }

      // 9. Compile frames to video
      updateProgress("Compiling video frames...", 90);
      await ffmpeg.exec([
        "-framerate",
        frameRate.toString(),
        "-i",
        "frame%04d.png",
        "-c:v",
        "libx264",
        "-preset",
        "slow", // Use slower preset for better quality
        "-crf",
        "18", // Lower CRF means higher quality (18-23 is visually lossless)
        "-pix_fmt",
        "yuv420p",
        "-vf",
        "scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2",
        "main.mp4",
      ]);

      // 10. Add Music (if selected)
      if (customOptions.includeMusic) {
        updateProgress("Adding background music...", 95);
        try {
          // Use theme-specific music if available, otherwise fallback
          const musicUrl = `/api/music?theme=${customOptions.theme}`;
          const musicResponse = await fetch(musicUrl);
          if (musicResponse.ok) {
            const musicBlob = await musicResponse.blob();
            await ffmpeg.writeFile(
              "bgmusic.mp3",
              new Uint8Array(await musicBlob.arrayBuffer())
            );

            await ffmpeg.exec([
              "-i",
              "main.mp4",
              "-i",
              "bgmusic.mp3",
              "-c:v",
              "copy",
              "-c:a",
              "aac",
              "-shortest",
              "final_with_music.mp4",
            ]);

            const finalData = await ffmpeg.readFile("final_with_music.mp4");
            const finalBlob = new Blob([finalData], { type: "video/mp4" });
            const finalUrl = URL.createObjectURL(finalBlob);
            setVideoUrl(finalUrl);
          } else {
            // If music fails, just use the video without music
            const mainData = await ffmpeg.readFile("main.mp4");
            const mainBlob = new Blob([mainData], { type: "video/mp4" });
            const mainUrl = URL.createObjectURL(mainBlob);
            setVideoUrl(mainUrl);
          }
        } catch (error) {
          console.error("Error adding music:", error);
          // Fallback to video without music
          const mainData = await ffmpeg.readFile("main.mp4");
          const mainBlob = new Blob([mainData], { type: "video/mp4" });
          const mainUrl = URL.createObjectURL(mainBlob);
          setVideoUrl(mainUrl);
        }
      } else {
        // Use video without music if music is disabled
        const mainData = await ffmpeg.readFile("main.mp4");
        const mainBlob = new Blob([mainData], { type: "video/mp4" });
        const mainUrl = URL.createObjectURL(mainBlob);
        setVideoUrl(mainUrl);
      }

      updateProgress("Video complete!", 100);

      // Clean up files to free memory
      const files = await ffmpeg.listDir(".");
      for (const file of files) {
        if (file.name.startsWith("frame")) {
          await ffmpeg.deleteFile(file.name);
        }
      }
    } catch (error) {
      console.error("Error generating video:", error);
      setStatusMessage(
        `Video generation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Tree preview card
  const TreePreviewCard = () => {
    if (!treeData)
      return <div className="p-4 text-center">Loading tree data...</div>;

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          {treeData.name || "Unnamed Tree"}
        </h3>
        {treeData.imageURL && (
          <div className="mb-3">
            <img
              src={treeData.imageURL}
              alt={treeData.name || "Tree"}
              className="w-full h-40 object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.src = "/tree-placeholder.jpg";
              }}
            />
          </div>
        )}
        <div className="text-sm">
          <p>
            <span className="font-medium">Location:</span>{" "}
            {treeData.Plant_Addresses || "Unknown location"}
          </p>
          <p>
            <span className="font-medium">Coordinates:</span> {treeData.late},{" "}
            {treeData.long}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Your Tree Story
          </h2>

          {/* Tree Data Preview Toggle */}
          <button
            onClick={togglePreview}
            className="mb-4 text-blue-600 underline flex items-center"
          >
            {showPreview ? "Hide" : "Show"} Tree Preview
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showPreview ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </button>

          {/* Tree Preview Card */}
          {showPreview && <TreePreviewCard />}

          {/* Options Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Duration (seconds)
                </label>
                <input
                  type="range"
                  min="15"
                  max="30"
                  step="5"
                  value={customOptions.duration}
                  onChange={(e) =>
                    setCustomOptions({
                      ...customOptions,
                      duration: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>15s</span>
                  <span>{customOptions.duration}s</span>
                  <span>30s</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  value={customOptions.theme}
                  onChange={(e) =>
                    setCustomOptions({
                      ...customOptions,
                      theme: e.target.value,
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="nature">Nature</option>
                  <option value="modern">Modern</option>
                  <option value="dramatic">Dramatic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visual Style
                </label>
                <select
                  value={customOptions.effects}
                  onChange={(e) =>
                    setCustomOptions({
                      ...customOptions,
                      effects: e.target.value,
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="standard">Standard</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customOptions.includeMusic}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        includeMusic: e.target.checked,
                      })
                    }
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Include background music
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customOptions.includeStats}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        includeStats: e.target.checked,
                      })
                    }
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Show environmental impact
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customOptions.includeSeasons}
                    onChange={(e) =>
                      setCustomOptions({
                        ...customOptions,
                        includeSeasons: e.target.checked,
                      })
                    }
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Include seasonal views
                  </span>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading
                  ? "Creating Your Tree Story..."
                  : "Generate Cinematic Tree Story"}
              </button>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="mt-4">
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {statusMessage}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Video Preview */}
        {videoUrl && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">
              {treeData?.name || "Your Tree"} Story
            </h2>
            <div className="mb-4">
              <video
                ref={videoRef}
                width="640"
                height="640"
                controls
                autoPlay
                className="mx-auto rounded-lg shadow"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={downloadVideo}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Video
              </button>
              <button
                onClick={() => setVideoUrl(null)}
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 shadow-md"
              >
                Create Another Video
              </button>
            </div>
            <small className="block mt-6 text-gray-500">
              Map data © OpenStreetMap contributors
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

// Fetch Mapbox zoom-in frames
async function fetchMapImagesForLocation(
  latitude: number,
  longitude: number,
  minZoom: number,
  maxZoom: number,
  totalFrames: number
) {
  const images: { url: string; zoomLevel: number }[] = [];
  const zoomRange = maxZoom - minZoom;
  const accessToken =
    "pk.eyJ1IjoidmFuYWdyb3czNDQ1IiwiYSI6ImNtOThlMTFyZTAxejAya3NlbGRoaHFxOWQifQ.0KYHnJMDy2KXRUkA0CaOlQ";
  const style = "mapbox/streets-v11";

  for (let i = 0; i < totalFrames; i++) {
    const progress = i / totalFrames;
    const currentZoom = minZoom + zoomRange * progress;
    const roundedZoom = Math.round(currentZoom * 100) / 100;
    const url = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/${longitude},${latitude},${roundedZoom},0/1080x1080@2x?access_token=${accessToken}`;
    images.push({ url, zoomLevel: roundedZoom });
  }

  return images;
}
