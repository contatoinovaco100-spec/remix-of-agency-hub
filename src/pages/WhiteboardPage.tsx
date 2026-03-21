import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pencil, 
  Eraser, 
  Trash2, 
  Download, 
  Circle, 
  Square, 
  Undo2, 
  Maximize2,
  Minimize2,
  Palette
} from 'lucide-react';

const COLORS = [
  '#ffffff', // Branco
  '#bff720', // Verde Limão Inova
  '#3b82f6', // Azul
  '#ef4444', // Vermelho
  '#f59e0b', // Amarelo/Laranja
  '#8b5cf6', // Roxo
];

const STROKE_WIDTHS = [2, 4, 8, 12];

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#bff720');
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.putImageData(tempImage, 0, 0);
      
      // Default settings
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#0a0a0a' : color;
    ctx.lineWidth = lineWidth;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `whiteboard-${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative h-[calc(100vh-8rem)] w-full bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col ${isFullscreen ? 'h-screen rounded-none' : ''}`}
    >
      {/* Workspace Area */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="flex-1 cursor-crosshair touch-none"
      />

      {/* Floating Toolbar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50"
      >
        {/* Tools */}
        <div className="flex items-center gap-1 border-r border-white/10 pr-2">
          <ToolButton 
            active={tool === 'pen'} 
            onClick={() => setTool('pen')} 
            icon={<Pencil className="w-5 h-5" />} 
            label="Caneta"
          />
          <ToolButton 
            active={tool === 'eraser'} 
            onClick={() => setTool('eraser')} 
            icon={<Eraser className="w-5 h-5" />} 
            label="Borracha"
          />
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2 border-r border-white/10 px-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setTool('pen');
              }}
              className={`w-6 h-6 rounded-full transition-all duration-200 ${color === c && tool === 'pen' ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'hover:scale-110'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Thickness */}
        <div className="flex items-center gap-2 border-r border-white/10 px-2">
          {STROKE_WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => setLineWidth(w)}
              className={`flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/5 transition-colors ${lineWidth === w ? 'text-[#bff720] bg-white/10' : 'text-white/40'}`}
            >
              <div 
                className="rounded-full bg-current" 
                style={{ width: w, height: w }} 
              />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 pl-2">
          <ToolButton onClick={clearCanvas} icon={<Trash2 className="w-5 h-5" />} label="Limpar" className="hover:text-red-500" />
          <ToolButton onClick={downloadImage} icon={<Download className="w-5 h-5" />} label="Baixar" />
          <ToolButton onClick={toggleFullscreen} icon={isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />} label="Tela Cheia" />
        </div>
      </motion.div>

      {/* Top Indicators */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#bff720] animate-pulse" />
          <span className="text-white/60 text-xs font-medium uppercase tracking-widest">Whiteboard Ativo</span>
        </div>
      </div>
    </div>
  );
}

function ToolButton({ 
  active, 
  onClick, 
  icon, 
  label, 
  className 
}: { 
  active?: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`p-2.5 rounded-xl transition-all duration-200 group relative ${active ? 'bg-[#bff720] text-black' : 'text-white/60 hover:text-white hover:bg-white/5'} ${className}`}
    >
      {icon}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-tighter">
        {label}
      </span>
    </button>
  );
}
