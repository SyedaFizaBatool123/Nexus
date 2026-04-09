import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, ArrowRight, DollarSign, CheckCircle } from 'lucide-react';

const PaymentPortal = () => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success'>('idle');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulating a secure API call
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('success');
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Secure Payment Portal</h2>
          <p className="text-slate-500 text-sm">Direct Investment & Escrow Management</p>
        </div>
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck size={16} /> SSL Encrypted
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Payment Form */}
        <div className="space-y-6">
          {paymentStatus === 'success' ? (
            <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-green-800">Transfer Successful</h3>
              <p className="text-green-600 text-sm mt-2">Funds are now held in secure Escrow and will be released upon document verification.</p>
              <button 
                onClick={() => setPaymentStatus('idle')}
                className="mt-6 text-sm font-bold text-green-700 underline"
              >
                Make another transfer
              </button>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Investment Amount (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="number" 
                    placeholder="50,000" 
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                  />
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl text-white space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <CreditCard className="text-blue-400" />
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-slate-700 rounded" />
                    <div className="w-8 h-5 bg-slate-700 rounded" />
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  className="w-full bg-transparent border-b border-slate-700 py-2 outline-none text-sm tracking-widest" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="bg-transparent border-b border-slate-700 py-2 outline-none text-sm" />
                  <input type="password" placeholder="CVC" className="bg-transparent border-b border-slate-700 py-2 outline-none text-sm" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {isProcessing ? "Processing Securely..." : `Confirm Investment of $${amount || '0'}`}
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        {/* RIGHT: Security Info & Trust */}
        <div className="space-y-6">
          <div className="p-6 border border-blue-100 bg-blue-50/50 rounded-2xl">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Lock size={16} className="text-blue-600" />
              How our Escrow works
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-600">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                Investor commits funds via this secure portal.
              </li>
              <li className="flex gap-3 text-sm text-slate-600">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                Funds are held in a 256-bit encrypted Nexus Vault.
              </li>
              <li className="flex gap-3 text-sm text-slate-600">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">3</div>
                Funds released to Startup ONLY when all Milestone 4 documents are signed.
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 grayscale opacity-50">
             {/* Replace these with real logos or text icons */}
             <span className="text-xs font-black">VISA</span>
             <span className="text-xs font-black">STRIPE</span>
             <span className="text-xs font-black">PAYPAL</span>
             <span className="text-xs font-black">MASTERCARD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;