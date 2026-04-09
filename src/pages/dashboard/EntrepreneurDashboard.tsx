import InvestmentLedger from '../../components/InvestmentLedger' ;
import PaymentPortal from '../../components/PaymentPortal';
import DocumentChamber from '../../components/DocumentChamber';
import MeetingCalendar from '../../components/MeetingCalendar';
import VideoCall from '../../components/VideoCall';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));
  
  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);
  
  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status } : req
      )
    );
  };
  
  if (!user) return null;
  
  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');
  
  return (
    <div className="space-y-10 animate-fade-in p-6 max-w-7xl mx-auto">
      
      {/* SECTION 1: HEADER & STATS */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="text-gray-600">Here's the latest update on your startup portal.</p>
          </div>
          <Link to="/investors">
            <Button leftIcon={<PlusCircle size={18} />}>Find Investors</Button>
          </Link>
        </div>

        {/* Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-primary-50 border-primary-100">
            <CardBody className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4"><Bell size={20} className="text-primary-700" /></div>
              <div><p className="text-xs font-medium text-primary-700">Pending Requests</p><h3 className="text-xl font-bold text-primary-900">{pendingRequests.length}</h3></div>
            </CardBody>
          </Card>
          <Card className="bg-secondary-50 border-secondary-100">
            <CardBody className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4"><Users size={20} className="text-secondary-700" /></div>
              <div><p className="text-xs font-medium text-secondary-700">Connections</p><h3 className="text-xl font-bold text-secondary-900">{collaborationRequests.filter(req => req.status === 'accepted').length}</h3></div>
            </CardBody>
          </Card>
          <Card className="bg-accent-50 border-accent-100">
            <CardBody className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4"><Calendar size={20} className="text-accent-700" /></div>
              <div><p className="text-xs font-medium text-accent-700">Meetings</p><h3 className="text-xl font-bold text-accent-900">2</h3></div>
            </CardBody>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardBody className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4"><TrendingUp size={20} className="text-green-700" /></div>
              <div><p className="text-xs font-medium text-green-700">Profile Views</p><h3 className="text-xl font-bold text-green-900">24</h3></div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* SECTION 2: CALENDAR & INVESTORS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <MeetingCalendar />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Recommended Investors</h2>
              <Link to="/investors" className="text-xs text-primary-600">View all</Link>
            </CardHeader>
            <CardBody className="space-y-4">
              {recommendedInvestors.map(inv => <InvestorCard key={inv.id} investor={inv} showActions={false} />)}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* SECTION 3: MILESTONE 3 - VIDEO CONFERENCE (WIDE) */}
      <section id="video-call-section" className="scroll-mt-20">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Video Conference Room</h2>
              <p className="text-slate-500 text-sm">Join secure investment strategy sessions.</p>
            </div>
            <Badge variant="success" className="animate-pulse">● Network: Strong</Badge>
          </div>
          <div className="max-w-4xl mx-auto">
            <VideoCall />
          </div>
        </div>
      </section>

      {/* SECTION 4: MILESTONE 4 - DOCUMENT CHAMBER (WIDE) */}
      <section id="document-section" className="pt-10 border-t border-slate-200">
        <DocumentChamber />
      </section>

      // Inside your EntrepreneurDashboard.tsx return statement:

{/* Milestone 5: Payment, Wallet & History Section */}
<section className="mt-12 space-y-8">
  <div className="flex items-center gap-4">
    <div className="h-[2px] flex-1 bg-slate-100"></div>
    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Financial Suite</h2>
    <div className="h-[2px] flex-1 bg-slate-100"></div>
  </div>

  {/* Wallet Balance & History  */}
  <InvestmentLedger />

  {/* Secure Transfer & Escrow  */}
  <PaymentPortal />
</section>

  

      {/* SECTION 5: COLLABORATION REQUESTS LIST */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Recent Collaboration Requests</h2>
          <Badge variant="primary">{pendingRequests.length} Pending</Badge>
        </CardHeader>
        <CardBody>
          {collaborationRequests.length > 0 ? (
            <div className="space-y-4">
              {collaborationRequests.map(request => (
                <CollaborationRequestCard key={request.id} request={request} onStatusUpdate={handleRequestStatusUpdate} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No requests available yet.</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};