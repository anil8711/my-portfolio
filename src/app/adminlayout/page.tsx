'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null); // for edit mode

  // Fetch all contacts
  const fetchContacts = async () => {
    const res = await fetch('/api/contact');
    const result = await res.json();
    setData(result.data || []);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle Delete
  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    await fetch(`/api/contact/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });
    fetchContacts();
  };

  // Handle Save Update
  const handleUpdate = async () => {
    await fetch(`/api/contact/${editing._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchContacts();
  };

  return (
    <div className="container mx-auto px-1 ">
    <h1 className="text-3xl font-bold text-center ">Contact Submissions</h1>
<div className='justify-end flex'>
   <Link
            href="/#contact"
            className="inline-block mb-3 bg-blue-400 p-2 font-semibold rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Add Contact
          </Link>
</div>
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Mobile</th>
            <th className="py-3 px-4 text-left">Message</th>
            <th className="py-3 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item) =>
            editing?._id === item._id ? (
              <tr key={item._id} className="border-b border-gray-200 bg-yellow-50">
                <td className="py-3 px-6">
                  <input
                    className="border px-2 py-1 w-full"
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    className="border px-2 py-1 w-full"
                    value={editing.email}
                    onChange={(e) =>
                      setEditing({ ...editing, email: e.target.value })
                    }
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    className="border px-2 py-1 w-full"
                    value={editing.subject}
                    onChange={(e) =>
                      setEditing({ ...editing, subject: e.target.value })
                    }
                  />
                </td>
                <td className="py-3 px-6">
                  <textarea
                    className="border px-2 py-1 w-full"
                    value={editing.message}
                    onChange={(e) =>
                      setEditing({ ...editing, message: e.target.value })
                    }
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.email}</td>
                <td className="py-3 px-6">{item.subject}</td>
                <td className="py-3 px-6">{item.message}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center gap-2">
                    <button
                      onClick={() => setEditing(item)}
                      className="w-6 h-6 text-blue-500 hover:scale-110 transform"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-6 h-6 text-red-500 hover:scale-110 transform"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);
  
}
