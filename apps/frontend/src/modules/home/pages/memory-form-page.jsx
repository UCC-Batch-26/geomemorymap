import { useState, useEffect } from 'react';
import MapView from '@/modules/common/components/map-view';
import { uploadImageToCloudinary } from '@/modules/api-hooks/upload-image-cloudinary';
import { createMemory } from '@/modules/api-hooks/create-memory';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { getCityFromCoords } from '@/modules/api-hooks/reverse-geocode';

const MEMORY_URL = `${import.meta.env.VITE_BACKEND_URL}/api/memories`;
import MemCards from '@/modules/common/components/mem-cards';
// import { getMemories } from '@/modules/api-hooks/get-memories';

function MemoryFormPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [_memories, setMemories] = useState([]);
  const [location, setLocation] = useState({ lat: 14.5995, lng: 120.9842 }); // this is default Manila for testing purpose
  const [locationName, setLocationName] = useState('');
  const navigate = useNavigate();
  const [labels, setLabels] = useState({});

  useEffect(() => {
    const run = async () => {
      const entries = _memories.filter((m) => m.location && !labels[m._id]);
      const updates = {};
      for (const m of entries) {
        const name = await getCityFromCoords(m.location.lat, m.location.lng);
        updates[m._id] = name ?? null;
      }
      if (Object.keys(updates).length) setLabels((prev) => ({ ...prev, ...updates }));
    };
    run();
  }, [_memories]);

  useEffect(() => {
    const fetchDefaultLocationName = async () => {
      const label = await getCityFromCoords(location.lat, location.lng);
      setLocationName(label);
    };

    fetchDefaultLocationName();
  }, [location.lat, location.lng]);

  // Fetch memories from backend
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/memories', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch memories');
        const result = await res.json();
        const data = result.data;
        console.log('Fetched memories:', data);

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
          id: toastId,
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

      let currentMemories = _memories;
      if (!Array.isArray(currentMemories)) {
        currentMemories = [];
      }
      const updatedMemories = [newMemory].concat(currentMemories);
      setMemories(updatedMemories);

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
      <section className=" items-center justify-center bg-[#526b5c]/90 h-full bg-auto bg-no-repeat bg-center justify-items-center ">
        <div className="grid grid-cols-2 gap-4 place-items-center w-[80%]  pt-10">
          <div className="bg-white/50 rounded-lg shadow-lg pb-5">
            <h1 className="font-display pt-5 pl-5 text-3xl">Add New Memory</h1>
            {/* FORM STARTS HERE */}
            <form action="" method="post" className="ml-5 rounded-lg w-160" onSubmit={handleSubmit}>
              <h2 className="font-display p-2 text-2xl">Title</h2>

              <input
                type="text"
                placeholder="Title of your memory..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-2 bg-white/20 w-[90%] rounded-sm"
                required
              />

              <h2 className="font-display p-2 text-2xl">Description</h2>

              <textarea
                className="ml-2 block w-[90%] bg-white/20 rounded-sm min-w-1  max-w-2xl h-full min-h-50"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <h2 className="font-display p-2 text-2xl">Location</h2>
              <p className="ml-2">
                {locationName
                  ? `${locationName} (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})` // place name with coordinates
                  : `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`}
              </p>

              <h2 className="font-display p-2 text-2xl">Upload Photo</h2>
              
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition duration-150 inline-block mr-5"
                >
                  Upload File
                </label>
              

              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 ml-2 my-2 "
              >
                Submit
              </button>
            </form>
          </div>

          <div className="place-items-center">
            <MapView
              onLocationSelect={async (coords) => {
                setLocation(coords); // keep coordinates
                const label = await getCityFromCoords(coords.lat, coords.lng);
                setLocationName(label); // store barangay, city for UI
              }}
            />
          </div>

          {/* CARD GENERATEED FROM API BELOW */}
          <div className="row-start-3 col-span-2 gap-4 pb-5">
            <h1 className="font-display text-3xl font-bold p-10 text-white">Your Memories</h1>
            <div className="flex flex-wrap gap-4 place-content-center">
              {_memories
                .slice()
                .reverse()
                .slice(0, 6)
                .map((memory) => (
                  <MemCards
                    key={memory._id ?? memory.id}
                    img={memory.photoURL}
                    title={memory.title}
                    locationName={labels[memory._id] ?? null}
                    location={memory.location}
                    description={memory.description}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default MemoryFormPage;
