import React, { useState } from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, Clock, Plus, Minus, Send, X } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdraw' | 'Transfer';
  amount: number;
  sender: string;
  receiver: string;
  status: 'Completed' | 'In Escrow' | 'Pending';
  date: string;
}

const InvestmentLedger = () => {
  // Milestone 5.3: Wallet and Escrow Balance State
  const [balance, setBalance] = useState(124500);
  const [escrow, setEscrow] = useState(40500);
  
  // Transaction History State
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-9021', type: 'Deposit', amount: 50000, sender: 'Nexus Capital', receiver: 'Sarah Johnson', status: 'In Escrow', date: '2026-04-09' },
    { id: 'TX-8842', type: 'Withdraw', amount: 12000, sender: 'Sarah Johnson', receiver: 'HBL Bank', status: 'Completed', date: '2026-04-05' },
  ]);

  // Form State
  const [actionAmount, setActionAmount] = useState('');
  const [targetParty, setTargetParty] = useState(''); // Tracks the 'other' person/entity
  const [activeAction, setActiveAction] = useState<'Deposit' | 'Withdraw' | 'Transfer' | null>(null);

  const handleFinancialAction = () => {
    const val = parseFloat(actionAmount);
    // Validation: Ensure amount is positive and target party is named
    if (isNaN(val) || val <= 0 || !targetParty) return;

    let senderName = 'Sarah Johnson';
    let receiverName = 'Sarah Johnson';

    // Professional Logic: System infers user and asks for the target party
    if (activeAction === 'Deposit') {
      senderName = targetParty;        // User enters where money comes from
      receiverName = 'Sarah Johnson';  // Money goes to the user
    } else if (activeAction === 'Withdraw' || activeAction === 'Transfer') {
      senderName = 'Sarah Johnson';    // Money comes from the user
      receiverName = targetParty;      // User enters where money goes
    }

    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      type: activeAction!,
      amount: val,
      sender: senderName,
      receiver: receiverName,
      status: activeAction === 'Deposit' ? 'In Escrow' : 'Completed',
      date: new Date().toISOString().split('T')[0]
    };

    // Update Ledger and Balances
    setTransactions([newTx, ...transactions]);
    
    if (activeAction === 'Deposit') {
      setBalance(prev => prev + val);
      setEscrow(prev => prev + val);
    } else {
      setBalance(prev => prev - val);
    }

    // Reset Form
    setTargetParty('');
    setActionAmount('');
    setActiveAction(null);
  };

  return (
    <div className="space-y-6">
      {/* 💳 WALLET DISPLAY SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg border border-slate-700">
          <p className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wider">Total Wallet Balance</p>
          <h3 className="text-3xl font-black">${balance.toLocaleString()}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase mb-1 tracking-wider">Escrow Funds</p>
            <h3 className="text-2xl font-bold text-blue-600">${escrow.toLocaleString()}</h3>
          </div>
          <Clock className="text-blue-100" size={40} />
        </div>

        {/* QUICK ACTIONS BAR */}
        <div className="bg-blue-600 p-4 rounded-2xl flex items-center justify-around shadow-md">
          <button onClick={() => setActiveAction('Deposit')} className="flex flex-col items-center text-white hover:scale-110 transition-transform">
            <Plus size={20}/><span className="text-[10px] font-bold mt-1">Deposit</span>
          </button>
          <button onClick={() => setActiveAction('Withdraw')} className="flex flex-col items-center text-white hover:scale-110 transition-transform">
            <Minus size={20}/><span className="text-[10px] font-bold mt-1">Withdraw</span>
          </button>
          <button onClick={() => setActiveAction('Transfer')} className="flex flex-col items-center text-white hover:scale-110 transition-transform">
            <Send size={20}/><span className="text-[10px] font-bold mt-1">Transfer</span>
          </button>
        </div>
      </div>

      {/* 🛠 DYNAMIC ACTION INPUT (Milestone 5.1 Simulation) */}
      {activeAction && (
        <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4 text-blue-800">
            <h4 className="font-bold uppercase text-xs tracking-widest">Execute {activeAction}</h4>
            <button onClick={() => setActiveAction(null)} className="hover:rotate-90 transition-transform">
              <X size={20}/>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder={activeAction === 'Deposit' ? "Sender (e.g., Bank Name)" : "Receiver (e.g., Entity Name)"}
              className="p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 ring-blue-400 bg-white"
              value={targetParty}
              onChange={(e) => setTargetParty(e.target.value)}
            />
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Amount" 
                className="flex-1 p-3 rounded-xl border border-blue-200 outline-none font-bold bg-white"
                value={actionAmount}
                onChange={(e) => setActionAmount(e.target.value)}
              />
              <button 
                onClick={handleFinancialAction} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-bold shadow-lg transition-colors active:scale-95"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📜 TRANSACTION TABLE (Milestone 5.2) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Live Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Receiver</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-sm hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">{tx.type}</td>
                  <td className="px-6 py-4 font-black text-slate-900">${tx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{tx.sender}</td>
                  <td className="px-6 py-4 text-slate-600">{tx.receiver}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tight ${
                      tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestmentLedger;