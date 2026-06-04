import { useProgress } from '@react-three/drei';
import { Cpu, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CustomLoader() {
  const { active, progress } = useProgress();
  const [show, setShow] = useState(true);
  const [logs, setLogs] = useState([]);

  // Generate mock system loading text logs for that retro-terminal feel
  useEffect(() => {
    const bootLogs = [
      'INITIALIZING PORTFOLIO CORES...',
      'MOUNTING THREE.JS GL COMPILER...',
      'GENERATING BACKGROUND NEBULA STARS...',
      'COMPILING CYBER ENERGY CORE MESH...',
      'SYNCING CONTACT PORT FREQUENCIES...',
      'BOOT SYSTEM ONLINE.'
    ];

    if (active) {
      const interval = setInterval(() => {
        setLogs((prev) => {
          if (prev.length < bootLogs.length) {
            return [...prev, bootLogs[prev.length]];
          }
          return prev;
        });
      }, 400);
      return () => clearInterval(interval);
    } else {
      // Add final log and fade out
      setLogs(bootLogs);
      const timer = setTimeout(() => {
        setShow(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#030014',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        transition: 'opacity 0.6s ease',
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        fontFamily: 'monospace'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '90%',
          maxWidth: '450px',
          padding: '36px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          boxShadow: '0 0 40px rgba(0, 240, 255, 0.1)'
        }}
      >
        <div style={{ position: 'relative', width: '70px', height: '70px' }}>
          <div
            className="animate-spin-slow"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '3px dashed var(--accent-cyan)',
              borderRadius: '50%',
              boxShadow: 'var(--glow-cyan)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'var(--accent-purple)'
            }}
          >
            <Cpu size={28} className="animate-float" />
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', letterSpacing: '2px', color: '#fff', marginBottom: '6px' }}>
            LOADING_SYSTEM
          </h2>
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-cyan)' }}>
            {Math.round(progress)}%
          </span>
        </div>

        {/* Diagnostic logs */}
        <div
          style={{
            width: '100%',
            height: '110px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '12px',
            textAlign: 'left',
            fontSize: '0.75rem',
            overflowY: 'hidden',
            color: '#c7d2fe',
            fontWeight: 600,
            lineHeight: '1.5'
          }}
        >
          {logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
