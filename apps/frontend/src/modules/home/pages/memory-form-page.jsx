import { useState, useEffect } from 'react';
import MapView from '@/modules/common/components/map-view';
import { uploadImageToCloudinary } from '@/modules/api-hooks/upload-image-cloudinary';
import { createMemory } from '@/modules/api-hooks/create-memory';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function MemoryFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [_memories, setMemories] = useState([]);
  const [location, _setLocation] = useState({ lat: 14.5995, lng: 120.9842 }); // this is default Manila for testing purpose
  const navigate = useNavigate();

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

    // Start a loading toast
    const toastId = toast.loading('Uploading memory...');

    //const postData = { title, description };

    try {
      const token = localStorage.getItem('token'); // Get token for Authorization

      if (!token) {
        toast.error('You must be logged in to create a memory', {
          icon: '⚠️',
        });

        setTimeout(() => {
          navigate('/login'); // if User isn't Authenticated, goes to Login Page
        }, 1500);
        return;
      }

      let photoURL = '';
      if (imageFile) {
        photoURL = await uploadImageToCloudinary(imageFile);
      }

      const newMemory = await createMemory(
        {
          title,
          description,
          location, // { lat, lng }
          photoURL, // string URL from Cloudinary
        },
        token,
      );

      setMemories((prev) => [newMemory, ...prev]);

      // Reset form
      setTitle('');
      setDescription('');
      setImageFile(null);
      toast.success('Memory added successfully!', { id: toastId });
    } catch (error) {
      console.error('Error adding memory:', error);
      toast.error('Failed to add memory. Please try again.', { id: toastId });
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

              <h2 className="font-display p-2 text-2xl">Upload Photo</h2>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="ml-2" />

              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-2 my-2 "
              >
                Submit
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
