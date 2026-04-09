import React, { useState, useRef } from 'react';
import { FileText, Upload, PenTool, X, Eye } from 'lucide-react';

const DocumentChamber = () => {
  const [status, setStatus] = useState<'Draft' | 'In Review' | 'Signed'>('Draft');
  const [isSigning, setIsSigning] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  // Create a reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      
      // Create a temporary URL for the real PDF content
      if (file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
      }
      
      setStatus('In Review');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Document Processing Chamber</h2>
          <p className="text-slate-500 text-sm">Milestone 4: Secure Contract Management</p>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${
          status === 'Signed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          <div className={`w-2 h-2 rounded-full ${status === 'Signed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          STATUS: {status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: UPLOAD SECTION */}
        <div className="space-y-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf" 
            className="hidden" 
          />
          
          <div 
            onClick={handleUploadClick}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-700">Click to upload PDF</p>
            <p className="text-xs text-slate-400 mt-1">Select Investment Term Sheet</p>
          </div>

          {uploadedFile && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4 animate-in slide-in-from-left">
              <div className="bg-red-100 p-2 rounded-lg text-red-600"><FileText /></div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-slate-800">{uploadedFile}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Ready for signature</p>
              </div>
              <button 
                onClick={() => setShowPreview(true)} 
                className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Eye size={14} /> Review
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: SIGNATURE SECTION */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-inner">
          <div className="flex items-center gap-2 mb-4">
            <PenTool size={18} className="text-blue-400" />
            <h3 className="font-bold">E-Signature Pad</h3>
          </div>

          <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
            {isSigning ? (
              <div className="text-center animate-fade-in">
                <p className="font-serif italic text-4xl text-blue-300 select-none">Sarah Johnson</p>
                <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Digitally Verified</p>
              </div>
            ) : (
              <button 
                disabled={!uploadedFile}
                onClick={() => { setIsSigning(true); setStatus('Signed'); }}
                className={`px-8 py-2 rounded-full font-bold text-sm transition-all ${
                  uploadedFile 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-105 active:scale-95' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {uploadedFile ? 'Apply Digital Signature' : 'Upload File First'}
              </button>
            )}
          </div>
          <p className="text-[10px] text-slate-500 mt-4 text-center italic">
            Secure e-signature powered by Business Nexus Trust
          </p>
        </div>
      </div>

      {/* PDF PREVIEW MODAL (Real Browser Preview) */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-10">
          <div className="bg-white w-full max-w-5xl h-full rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="text-red-600" />
                <span className="font-bold text-slate-700 truncate max-w-[200px] sm:max-w-md">{uploadedFile}</span>
              </div>
              <button 
                onClick={() => setShowPreview(false)} 
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 bg-slate-500">
              {fileUrl ? (
                <iframe
                  src={`${fileUrl}#toolbar=0`}
                  className="w-full h-full border-none"
                  title="PDF Preview"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white italic">
                  Unable to load PDF preview
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t flex justify-end gap-3">
              <button 
                onClick={() => setShowPreview(false)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg font-bold transition-colors"
              >
                Finish Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentChamber;