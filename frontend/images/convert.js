const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function convertSvgToPng() {
  const canvas = createCanvas(128, 128);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = '#1a4d4d';
  ctx.fillRect(0, 0, 128, 128);
  
  // Draw tree trunk
  ctx.strokeStyle = '#7cbd7c';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(64, 90);
  ctx.lineTo(64, 65);
  ctx.stroke();
  
  // Main branches
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(64, 65);
  ctx.lineTo(50, 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(64, 65);
  ctx.lineTo(78, 50);
  ctx.stroke();
  
  // Left side branches
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(38, 38);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(45, 35);
  ctx.stroke();
  
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(38, 38);
  ctx.lineTo(30, 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(38, 38);
  ctx.lineTo(35, 28);
  ctx.stroke();
  
  // Right side branches
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(78, 50);
  ctx.lineTo(90, 38);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(78, 50);
  ctx.lineTo(83, 35);
  ctx.stroke();
  
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(90, 38);
  ctx.lineTo(98, 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(90, 38);
  ctx.lineTo(93, 28);
  ctx.stroke();
  
  // Connection points
  ctx.fillStyle = '#7cbd7c';
  [[30, 30], [35, 28], [45, 35], [83, 35], [93, 28], [98, 30]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Resistor 1
  ctx.strokeStyle = '#7cbd7c';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(42, 44);
  ctx.lineTo(46, 42.5);
  ctx.stroke();
  ctx.strokeStyle = '#d4a574';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(46, 41, 8, 3);
  ctx.strokeStyle = '#7cbd7c';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(54, 42.5);
  ctx.lineTo(58, 41);
  ctx.stroke();
  
  // Resistor 2
  ctx.beginPath();
  ctx.moveTo(70, 41);
  ctx.lineTo(74, 42.5);
  ctx.stroke();
  ctx.strokeStyle = '#d4a574';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(74, 41, 8, 3);
  ctx.strokeStyle = '#7cbd7c';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(82, 42.5);
  ctx.lineTo(86, 44);
  ctx.stroke();
  
  // Resistor 3
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(32, 34);
  ctx.lineTo(33, 32);
  ctx.stroke();
  ctx.strokeStyle = '#d4a574';
  ctx.lineWidth = 1;
  ctx.strokeRect(33, 28, 5, 2);
  ctx.strokeStyle = '#7cbd7c';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(38, 29);
  ctx.lineTo(39, 31);
  ctx.stroke();
  
  // Text
  ctx.fillStyle = '#7cbd7c';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('LIANA', 64, 110);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('liana.png', buffer);
  console.log('PNG created successfully!');
}

convertSvgToPng().catch(console.error);
