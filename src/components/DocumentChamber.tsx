import React, { useState, useRef } from 'react';
import { FileText, Upload, PenTool, X, CheckCircle, Trash2 } from 'lucide-react';

interface DocumentFile {
  id: string;
  name: string;
  status: 'Draft' | 'In Review' | 'Signed';
  url: string;
}

const DocumentChamber = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: DocumentFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        status: 'In Review',
        url: URL.createObjectURL(file),
      }));
      setDocuments((prev) => [...prev, ...newFiles]);
      if (!selectedDocId) setSelectedDocId(newFiles[0].id);
    }
  };

  const signDocument = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: 'Signed' } : doc
      )
    );
  };

  const selectedDoc = documents.find(d => d.id === selectedDocId);

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Document Processing Chamber</h2>
          <p className="text-slate-500 text-sm">Manage and sign multiple investment documents</p>
        </div>
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
          {documents.length} FILES
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: FILE LIST (5 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" multiple className="hidden" />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
          >
            <Upload className="text-blue-600 mx-auto mb-2 w-5 h-5" />
            <p className="text-sm font-bold text-slate-700">Upload New Documents</p>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                  selectedDocId === doc.id ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <FileText className={doc.status === 'Signed' ? 'text-green-500' : 'text-red-500'} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{doc.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${doc.status === 'Signed' ? 'text-green-600' : 'text-blue-500'}`}>
                    {doc.status}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowPreview(true); }}
                    className="text-xs font-bold text-blue-600 hover:underline px-2 py-1"
                  >
                    Review
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setDocuments(prev => prev.filter(d => d.id !== doc.id)); }}>
                    <Trash2 size={14} className="text-slate-300 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: DYNAMIC SIGNATURE PAD (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 rounded-2xl p-6 text-white h-full flex flex-col shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <PenTool size={18} className="text-blue-400" />
              <h3 className="font-bold">E-Signature Pad</h3>
            </div>

            <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[200px] p-4 text-center">
              {!selectedDoc ? (
                <p className="text-slate-500 text-sm italic">Select a document from the list to sign</p>
              ) : selectedDoc.status === 'Signed' ? (
                <div className="animate-fade-in">
                   <p className="font-serif italic text-4xl text-blue-300 mb-2">AGREED</p>
                   <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest">
                     <CheckCircle size={14} /> Digitally Signed
                   </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-400 text-xs uppercase tracking-tighter">Signing: {selectedDoc.name}</p>
                  <button 
                    onClick={() => signDocument(selectedDoc.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-bold shadow-lg transition-transform active:scale-95"
                  >
                    Apply Signature
                  </button>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-4 text-center">
              Securely signing as <span className="text-slate-300 font-bold">Sarah Johnson</span>
            </p>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-10">
          <div className="bg-white w-full max-w-5xl h-full rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <span className="font-bold text-slate-700">{selectedDoc.name}</span>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-1 bg-slate-500">
              <iframe src={selectedDoc.url} className="w-full h-full border-none" />
            </div>
            <div className="p-4 bg-white border-t flex justify-end">
              <button onClick={() => { signDocument(selectedDoc.id); setShowPreview(false); }} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
                {selectedDoc.status === 'Signed' ? 'Close Preview' : 'Sign & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentChamber;