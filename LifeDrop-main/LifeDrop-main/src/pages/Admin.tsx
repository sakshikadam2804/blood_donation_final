// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Papa from 'papaparse';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donors' | 'receivers'>('donors');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const colRef = collection(db, activeTab);
    const snapshot = await getDocs(colRef);
    const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(entries);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeTab}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'donors' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('donors')}
        >
          Donors
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'receivers' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('receivers')}
        >
          Receivers
        </button>
        <button
          onClick={exportToCSV}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <p>Loading {activeTab}...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                {data.length > 0 && Object.keys(data[0]).map(key => (
                  <th key={key} className="px-3 py-2 border text-left text-sm font-semibold">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index} className="border-t">
                  {Object.values(entry).map((val, i) => (
                    <td key={i} className="px-3 py-2 text-sm border">{val?.toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
