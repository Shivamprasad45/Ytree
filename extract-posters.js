// extract-posters.js
// Quick script to extract poster frames from videos using FFmpeg
// Run: node extract-posters.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, 'public', 'story');
const posterDir = path.join(__dirname, 'public', 'posters');

// Create posters directory if it doesn't exist
if (!fs.existsSync(posterDir)) {
    fs.mkdirSync(posterDir, { recursive: true });
}

const videos = [
    { file: 'A_healthy_green_202602080953_521i6.mp4', output: 'scene1.jpg', time: '00:00:02' },
    { file: 'A_once_green_202602080955_rqb3w.mp4', output: 'scene2.jpg', time: '00:00:02' },
    { file: 'Dark_storm_clouds_202602081001_vqwmc.mp4', output: 'scene3.jpg', time: '00:00:02' },
    { file: 'A_forest_being_202602081006_82hdc.mp4', output: 'scene4.jpg', time: '00:00:02' },
    { file: 'A_cracked_and_202602081027_2flfi.mp4', output: 'scene5.jpg', time: '00:00:02' },
];

console.log('🎬 Extracting poster images from videos...\n');

videos.forEach(({ file, output, time }) => {
    const inputPath = path.join(videoDir, file);
    const outputPath = path.join(posterDir, output);

    if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Video not found: ${file}`);
        return;
    }

    try {
        console.log(`📸 Extracting ${output}...`);

        // FFmpeg command to extract a high-quality frame
        execSync(
            `ffmpeg -i "${inputPath}" -ss ${time} -frames:v 1 -q:v 2 "${outputPath}" -y`,
            { stdio: 'inherit' }
        );

        console.log(`✅ Created ${output}\n`);
    } catch (error) {
        console.log(`❌ Failed to extract ${output}: ${error.message}\n`);
    }
});

console.log('🎉 Done! Poster images are ready in public/posters/');
