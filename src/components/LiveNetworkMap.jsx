import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * LiveNetworkMap
 * 
 * An interactive canvas-based network visualization that simulates
 * a live threat monitoring dashboard. Nodes represent network endpoints,
 * connections show data flow, and hover interactions trigger "scan" effects.
 */
const LiveNetworkMap = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef([]);
  const animationRef = useRef(null);
  const { theme } = useTheme();
  
  // Initialize nodes
  const initNodes = useCallback((width, height) => {
    const nodes = [];
    const nodeCount = Math.floor((width * height) / 15000); // Density based on screen size
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.5,
        baseRadius: Math.random() * 2 + 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
        type: Math.random() > 0.85 ? 'critical' : Math.random() > 0.7 ? 'active' : 'normal',
        scanRadius: 0,
        isScanning: false,
        connections: []
      });
    }
    
    // Pre-calculate potential connections
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 150) {
            node.connections.push(j);
          }
        }
      });
    });
    
    return nodes;
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      nodesRef.current = initNodes(width, height);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Color schemes
    const colors = {
      dark: {
        bg: 'rgba(10, 10, 15, 1)',
        node: 'rgba(0, 102, 255, 0.8)',
        nodeActive: 'rgba(0, 212, 255, 0.9)',
        nodeCritical: 'rgba(255, 51, 102, 0.9)',
        connection: 'rgba(0, 102, 255, 0.15)',
        connectionActive: 'rgba(0, 212, 255, 0.4)',
        scanRing: 'rgba(0, 212, 255, 0.6)',
        glow: 'rgba(0, 102, 255, 0.3)'
      },
      light: {
        bg: 'rgba(248, 250, 252, 1)',
        node: 'rgba(0, 82, 204, 0.7)',
        nodeActive: 'rgba(0, 150, 200, 0.8)',
        nodeCritical: 'rgba(220, 38, 38, 0.8)',
        connection: 'rgba(0, 82, 204, 0.1)',
        connectionActive: 'rgba(0, 150, 200, 0.3)',
        scanRing: 'rgba(0, 150, 200, 0.5)',
        glow: 'rgba(0, 82, 204, 0.2)'
      }
    };
    
    let time = 0;
    
    const draw = () => {
      const currentColors = colors[theme] || colors.dark;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      
      // Clear with background
      ctx.fillStyle = currentColors.bg;
      ctx.fillRect(0, 0, width, height);
      
      // Draw grid pattern
      ctx.strokeStyle = theme === 'dark' ? 'rgba(45, 45, 58, 0.3)' : 'rgba(200, 210, 220, 0.5)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      
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
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position with drift
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        
        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
        
        // Check mouse proximity
        const distToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const hoverRadius = 120;
        const isHovered = distToMouse < hoverRadius;
        
        // Trigger scan effect on hover
        if (isHovered && !node.isScanning) {
          node.isScanning = true;
          node.scanRadius = 0;
        }
        
        // Update scan animation
        if (node.isScanning) {
          node.scanRadius += 3;
          if (node.scanRadius > 100) {
            node.isScanning = false;
            node.scanRadius = 0;
          }
        }
        
        // Pulse effect
        node.pulsePhase += 0.02;
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 1;
        node.radius = node.baseRadius * pulse;
        
        // Expand when hovered
        if (isHovered) {
          node.radius *= 1.5;
        }
        
        // Draw connections
        node.connections.forEach(j => {
          if (j > i) { // Only draw each connection once
            const other = nodes[j];
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            
            if (dist < 150) {
              const opacity = 1 - (dist / 150);
              const isActiveConnection = isHovered || Math.hypot(other.x - mouse.x, other.y - mouse.y) < hoverRadius;
              
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              
              if (isActiveConnection) {
                ctx.strokeStyle = currentColors.connectionActive;
                ctx.lineWidth = 1.5;
                
                // Animated data packet
                const packetPos = (time * 0.01 + i * 0.1) % 1;
                const packetX = node.x + (other.x - node.x) * packetPos;
                const packetY = node.y + (other.y - node.y) * packetPos;
                
                ctx.stroke();
                
                // Draw packet
                ctx.beginPath();
                ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
                ctx.fillStyle = currentColors.nodeActive;
                ctx.fill();
              } else {
                ctx.strokeStyle = `rgba(${theme === 'dark' ? '0, 102, 255' : '0, 82, 204'}, ${opacity * 0.15})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        });
      });
      
      // Draw nodes (second pass for proper layering)
      nodes.forEach((node) => {
        const distToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        const isHovered = distToMouse < 120;
        
        // Draw scan ring
        if (node.isScanning) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.scanRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${theme === 'dark' ? '0, 212, 255' : '0, 150, 200'}, ${1 - node.scanRadius / 100})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Draw glow for hovered/special nodes
        if (isHovered || node.type !== 'normal') {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 4
          );
          
          const glowColor = node.type === 'critical' 
            ? (theme === 'dark' ? '255, 51, 102' : '220, 38, 38')
            : (theme === 'dark' ? '0, 102, 255' : '0, 82, 204');
          
          gradient.addColorStop(0, `rgba(${glowColor}, 0.4)`);
          gradient.addColorStop(1, `rgba(${glowColor}, 0)`);
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        let nodeColor;
        if (node.type === 'critical') {
          nodeColor = currentColors.nodeCritical;
        } else if (node.type === 'active' || isHovered) {
          nodeColor = currentColors.nodeActive;
        } else {
          nodeColor = currentColors.node;
        }
        
        ctx.fillStyle = nodeColor;
        ctx.fill();
        
        // Inner highlight
        ctx.beginPath();
        ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      });
      
      // Draw mouse interaction zone
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 120
        );
        gradient.addColorStop(0, `rgba(${theme === 'dark' ? '0, 212, 255' : '0, 150, 200'}, 0.1)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, initNodes]);
  
  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};

export default LiveNetworkMap;
