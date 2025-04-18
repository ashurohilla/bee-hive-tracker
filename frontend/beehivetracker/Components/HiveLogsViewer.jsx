'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import {getHiveLogs} from "../src/lib/api/hiveService"

export default function HiveLogsViewer() {
  const [logs, setLogs] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const exportToCSV = () => {
    if (logs.length === 0) return;
  
    const headers = ['Hive ID', 'Date Placed', 'Latitude', 'Longitude', 'Colonies'];
    const rows = logs.map(log => [
      log.hiveId,
      log.datePlaced,
      log.latitude,
      log.longitude,
      log.numColonies,
    ]);
  
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hive_logs_${Date.now()}.csv`);
    link.click();
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const data = await getHiveLogs(params);
      setLogs(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Card className="p-4 max-w-4xl mx-auto mt-6 shadow-xl rounded-2xl">
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchLogs();
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              {loading ? 'Loading...' : 'Fetch Logs'}
            </Button>
            <Button
  variant="outline"
  className="mt-4 flex"
  onClick={exportToCSV}
  disabled={logs.length === 0}
>
  Export CSV
</Button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Hive ID</th>
                <th className="p-2 border">Date Placed</th>
                <th className="p-2 border">Latitude</th>
                <th className="p-2 border">Longitude</th>
                <th className="p-2 border">Colonies</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="border-t">
                    <td className="p-2 border">{log.hiveId}</td>
                    <td className="p-2 border">
                      {format(new Date(log.datePlaced), 'yyyy-MM-dd')}
                    </td>
                    <td className="p-2 border">{log.latitude}</td>
                    <td className="p-2 border">{log.longitude}</td>
                    <td className="p-2 border">{log.numColonies}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No hive logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
