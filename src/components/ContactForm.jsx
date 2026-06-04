import { useState } from 'react';
import { Send, CheckCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        // Success explosion of confetti!
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00f0ff', '#bd00ff', '#0072ff', '#39ff14']
        });
        // Reset form
        setForm({ name: '', email: '', message: '' });
      } else {
        console.error('Mail dispatch error:', data.error);
        setStatus('error');
      }
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="terminal-window" style={{ background: 'rgba(5, 3, 20, 0.45)' }}>
      <div className="terminal-header">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '8px', fontFamily: 'monospace' }}>
          janarthanan@workstation:~/contact-form
        </span>
      </div>

      <div className="terminal-body">
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }} className="fade-in-section">
            <CheckCircle size={48} color="var(--accent-green)" style={{ margin: '0 auto 16px auto', display: 'block', filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.3))' }} />
            <h3 style={{ fontFamily: 'Orbitron', marginBottom: '8px', color: '#fff' }}>Message Dispatched!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Thank you! Your connection request has been received. Janarthanan will get back to you shortly.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="badge-cyan"
              style={{ border: '1px solid var(--accent-cyan)', background: 'transparent', cursor: 'pointer', outline: 'none' }}
            >
              <RefreshCw size={14} /> Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {status === 'error' && (
              <div style={{ color: '#ff5f56', background: 'rgba(255, 95, 86, 0.1)', border: '1px solid rgba(255, 95, 86, 0.3)', padding: '12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                <strong>SYSTEM_ERROR:</strong> Message dispatch failed. Please verify your SMTP credentials on Vercel or retry.
              </div>
            )}
            <div>
              <label htmlFor="form-name" className="form-label">IDENTITY / NAME</label>
              <input
                id="form-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. John Doe"
                className="form-input"
                disabled={status === 'sending'}
              />
            </div>

            <div>
              <label htmlFor="form-email" className="form-label">COMMUNICATION VECTOR / EMAIL</label>
              <input
                id="form-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="e.g. john@example.com"
                className="form-input"
                disabled={status === 'sending'}
              />
            </div>

            <div>
              <label htmlFor="form-message" className="form-label">TRANSMISSION DATA / MESSAGE</label>
              <textarea
                id="form-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Write your project details or inquiries here..."
                className="form-input"
                style={{ resize: 'none' }}
                disabled={status === 'sending'}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                background: status === 'sending' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 240, 255, 0.1)',
                border: '1.5px solid var(--accent-cyan)',
                color: 'var(--text-primary)',
                padding: '12px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'Orbitron',
                transition: 'all 0.3s ease',
                boxShadow: status === 'sending' ? 'none' : '0 0 10px rgba(0, 240, 255, 0.15)'
              }}
              onMouseOver={(e) => {
                if (status !== 'sending') {
                  e.currentTarget.style.background = 'var(--accent-cyan)';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
                }
              }}
              onMouseOut={(e) => {
                if (status !== 'sending') {
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.15)';
                }
              }}
            >
              {status === 'sending' ? (
                <>
                  <RefreshCw className="animate-spin-slow" size={18} /> SENDING TRANSMISSION...
                </>
              ) : (
                <>
                  <Send size={18} /> DISPATCH MESSAGE
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
