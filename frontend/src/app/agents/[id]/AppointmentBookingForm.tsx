'use client';

import { useState } from 'react';

export default function AppointmentBookingForm({ agentId }: { agentId: number }) {
  const [therapistName, setTherapistName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${url}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: agentId,
          therapist_name: therapistName,
          datetime: datetime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to book appointment');
      }

      setStatus('success');
      setTherapistName('');
      setDatetime('');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <article>
      <header><strong>Book an Appointment</strong></header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="therapist">Therapist Name</label>
        <select 
          id="therapist" 
          value={therapistName} 
          onChange={(e) => setTherapistName(e.target.value)} 
          required
        >
          <option value="" disabled>Select a therapist...</option>
          <option value="Dr. Lovelace">Dr. Lovelace</option>
          <option value="Dr. Turing">Dr. Turing</option>
          <option value="Dr. Hopper">Dr. Hopper</option>
        </select>

        <label htmlFor="datetime">Date & Time</label>
        <input 
          type="datetime-local" 
          id="datetime" 
          value={datetime} 
          onChange={(e) => setDatetime(e.target.value)} 
          required 
        />

        <button type="submit" aria-busy={status === 'loading'}>Book Appointment</button>

        {status === 'success' && (
          <p style={{ color: 'var(--pico-ins-color)', marginTop: '1rem' }}>Appointment booked successfully!</p>
        )}
        {status === 'error' && (
          <p style={{ color: 'var(--pico-del-color)', marginTop: '1rem' }}>Error: {errorMessage}</p>
        )}
      </form>
    </article>
  );
}
