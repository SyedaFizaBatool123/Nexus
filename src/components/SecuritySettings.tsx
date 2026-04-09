import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

const SecuritySettings = () => {
  const [password, setPassword] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Milestone 6.1: Password Strength Logic
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = calculateStrength(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  // Milestone 6.2: 2FA OTP Input Handler
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-10">
      <div className="flex justify-between items-center border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Security & Access Control</h2>
          <p className="text-slate-500 text-sm">Enhance your account protection and authentication</p>
        </div>
        <ShieldCheck className="text-blue-600" size={32} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Password Strength Meter [Milestone 6.1] */}
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Lock size={14} /> Change Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ring-blue-500 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">Security Strength:</span>
              <span className={strength > 0 ? 'text-slate-800' : 'text-slate-300'}>
                {password ? strengthLabels[strength - 1] : 'None'}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full flex gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`h-full flex-1 rounded-full transition-all duration-500 ${
                    strength >= step ? strengthColors[strength - 1] : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-400 italic">
              Use 8+ characters, symbols, and numbers for a "Strong" rating.
            </p>
          </div>
        </div>

        {/* RIGHT: 2FA Mockup [Milestone 6.2] */}
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Smartphone size={14} /> Multi-Step Authentication
          </label>
          
          {!show2FA ? (
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 border-dashed text-center">
              <p className="text-sm text-blue-800 mb-4 font-medium">Add an extra layer of security to your transactions.</p>
              <button 
                onClick={() => setShow2FA(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all"
              >
                Enable 2FA Mockup
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <p className="text-xs text-slate-500 font-bold">Enter the 6-digit code sent to your device:</p>
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    className="w-full h-12 text-center text-xl font-bold bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 ring-blue-100 outline-none"
                  />
                ))}
              </div>
              <button 
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                onClick={() => { alert("Mock 2FA Verified!"); setShow2FA(false); setOtp(['','','','','','']); }}
              >
                Verify Code <CheckCircle size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;