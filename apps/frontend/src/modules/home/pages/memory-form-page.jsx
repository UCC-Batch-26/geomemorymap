import { useState, useEffect } from 'react';
import MapView from '@/modules/common/components/map-view';

function MemoryFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [_memories, setMemories] = useState([]);

  // Fetch memories from backend
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/memories', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch memories');
        const data = await res.json();
        setMemories(data);
      } catch (error) {
        console.error('Error fetching memories', error);
      }
    };

    fetchMemories();
  }, []);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = { title, description };

    try {
      const token = localStorage.getItem('token'); // Get token for Authorization

      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData), // Send title & description
      });

      if (!res.ok) throw new Error('Failed to add memory');

      const newMemory = await res.json(); // Get the memory returned from backend
      setMemories((prev) => [newMemory, ...prev]); // Add new memory to state
      setTitle('');
      setDescription('');
      alert('Memory added successfully!');
    } catch (error) {
      console.error('Error adding memory:', error);
      alert('Failed to add memory. Please try again.');
    }
  };

  return (
    <div className="bg-[url(@/assets/geo-memory-map-bg.png)] bg-no-repeat bg-center">
      <section className="flex items-center justify-center bg-[#526b5c]/80 h-screen pl-5 bg-auto bg-no-repeat bg-center">
        <div className="grid grid-cols-2 grid-rows-[500,auto] gap-4 w-[80vw]">
          <div className="bg-white/50 rounded-lg shadow-lg pb-5">
            <h1 className="font-display pt-5 pl-5 text-3xl">Add New Memory</h1>
            {/* FORM STARTS HERE */}
            <form action="" method="post" className="ml-5 rounded-lg" onSubmit={handleSubmit}>
              <h2 className="font-display p-2 text-2xl">Title</h2>

              <input
                type="text"
                placeholder="Title of your memory..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-2 bg-white/20  w-full max-w-2xl min-w-1 rounded-sm"
                required
              />

              <h2 className="font-display p-2 text-2xl">Description</h2>

              <textarea
                className="ml-2 block w-full bg-white/20 rounded-sm min-w-1  max-w-2xl h-full min-h-50"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-2 my-2 "
              >
                Submit
              </button>

              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2"
              >
                Upload
              </button>
            </form>
          </div>
          <div className="place-items-center">
            <MapView />
          </div>
          <h1 className="font-display text-3xl font-bold p-10 text-white">Your Memories</h1>
          {/* CARD GENERATEED FROM API BELOW */}
        </div>
      </section>
    </div>
  );
}

export default MemoryFormPage;
