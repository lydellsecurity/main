import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const LiveNetworkMap = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef([]);
  const animationRef = useRef(null);
  const themeRef = useRef('dark');
  const { theme } = useTheme();
  
  // Keep theme in sync via ref so animation loop sees updates
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    
    const initNodes = () => {
      const nodes = [];
      const nodeCount = Math.floor((width * height) / 12000);
      
      for (let i = 0; i < Math.min(nodeCount, 150); i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          baseRadius: Math.random() * 2.5 + 2,
          radius: Math.random() * 2.5 + 2,
          pulsePhase: Math.random() * Math.PI * 2,
          type: Math.random() > 0.88 ? 'critical' : Math.random() > 0.7 ? 'active' : 'normal',
          scanRadius: 0,
          isScanning: false
        });
      }
      nodesRef.current = nodes;
    };
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initNodes();
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    let time = 0;
    
    const draw = () => {
      const isDark = themeRef.current === 'dark';
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      
      // Colors with better contrast for light mode
      const colors = isDark ? {
        bg: '#0A0A0F',
        grid: 'rgba(50, 50, 70, 0.4)',
        node: 'rgba(0, 102, 255, 0.9)',
        nodeActive: 'rgba(0, 212, 255, 1)',
        nodeCritical: 'rgba(255, 51, 102, 1)',
        connection: 'rgba(0, 102, 255, 0.2)',
        connectionActive: 'rgba(0, 212, 255, 0.6)',
        glowRgb: '0, 102, 255',
        glowActiveRgb: '0, 212, 255',
        glowCriticalRgb: '255, 51, 102'
      } : {
        bg: '#E2E8F0', // Darker light mode background for contrast
        grid: 'rgba(71, 85, 105, 0.3)',
        node: 'rgba(30, 58, 138, 1)', // Dark blue
        nodeActive: 'rgba(6, 95, 70, 1)', // Teal
        nodeCritical: 'rgba(153, 27, 27, 1)', // Dark red
        connection: 'rgba(30, 58, 138, 0.35)',
        connectionActive: 'rgba(6, 95, 70, 0.7)',
        glowRgb: '30, 58, 138',
        glowActiveRgb: '6, 95, 70',
        glowCriticalRgb: '153, 27, 27'
      };
      
      // Clear
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      
      // Grid
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      const hoverRadius = 150;
      
      // Update and draw connections
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
        
        const distToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const isHovered = distToMouse < hoverRadius;
        
        if (isHovered && !node.isScanning) {
          node.isScanning = true;
          node.scanRadius = 0;
        }
        
        if (node.isScanning) {
          node.scanRadius += 4;
          if (node.scanRadius > 80) {
            node.isScanning = false;
            node.scanRadius = 0;
          }
        }
        
        node.pulsePhase += 0.03;
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 1;
        node.radius = node.baseRadius * pulse * (isHovered ? 1.8 : 1);
        
        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          
          if (dist < 180) {
            const otherDist = Math.hypot(other.x - mouse.x, other.y - mouse.y);
            const isActive = isHovered || otherDist < hoverRadius;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            
            if (isActive) {
              ctx.strokeStyle = colors.connectionActive;
              ctx.lineWidth = 2;
              ctx.stroke();
              
              // Packet
              const pos = (time * 0.015 + i * 0.1) % 1;
              ctx.beginPath();
              ctx.arc(node.x + (other.x - node.x) * pos, node.y + (other.y - node.y) * pos, 3, 0, Math.PI * 2);
              ctx.fillStyle = colors.nodeActive;
              ctx.fill();
            } else {
              ctx.strokeStyle = `rgba(${colors.glowRgb}, ${(1 - dist / 180) * (isDark ? 0.3 : 0.5)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      });
      
      // Draw nodes
      nodes.forEach((node) => {
        const distToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const isHovered = distToMouse < hoverRadius;
        
        // Scan ring
        if (node.isScanning) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.scanRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.glowActiveRgb}, ${1 - node.scanRadius / 80})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
        
        // Glow
        if (isHovered || node.type !== 'normal') {
          const glowSize = node.radius * (isHovered ? 6 : 4);
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
          const rgb = node.type === 'critical' ? colors.glowCriticalRgb : isHovered ? colors.glowActiveRgb : colors.glowRgb;
          gradient.addColorStop(0, `rgba(${rgb}, ${isDark ? 0.5 : 0.35})`);
          gradient.addColorStop(0.5, `rgba(${rgb}, ${isDark ? 0.2 : 0.12})`);
          gradient.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'critical' ? colors.nodeCritical : (node.type === 'active' || isHovered) ? colors.nodeActive : colors.node;
        ctx.fill();
        
        // Highlight
        ctx.beginPath();
        ctx.arc(node.x - node.radius * 0.25, node.y - node.radius * 0.25, node.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      });
      
      // Mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, hoverRadius);
        gradient.addColorStop(0, `rgba(${colors.glowActiveRgb}, ${isDark ? 0.15 : 0.08})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, hoverRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      time++;
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} style={{ touchAction: 'none' }} />;
};

export default LiveNetworkMap;
