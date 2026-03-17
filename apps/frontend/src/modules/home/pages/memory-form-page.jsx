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
  const [isFileTooBig, setFileTooBig] = useState(false);

  const isGuest = sessionStorage.getItem('guest') === 'true';

  const fetchMemories = async () => {
    try {
      if (isGuest) {
        const guestMemories = sessionStorage.getItem('guestMemories');
        setMemories(guestMemories ? JSON.parse(guestMemories) : []);
        return;
      }

      const token = localStorage.getItem('token');
      const res = await fetch(MEMORY_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch memories');
      const result = await res.json();
      const data = result.data || result._memories;
      console.log('Fetched memories:', data);

      setMemories(data);
    } catch (error) {
      console.error('Error fetching memories', error);
    }
  };

  useEffect(() => {
    const run = async () => {
      const entries = _memories.filter((m) => {
        const memoryId = m._id ?? m.id;
        return m.location && !labels[memoryId];
      });
      
      const updates = {};

      for (const m of entries) {
        const memoryId = m._id ?? m.id;
        const name = await getCityFromCoords(m.location.lat, m.location.lng);
        updates[memoryId] = name ?? null;
      }

      if (Object.keys(updates).length) {
        setLabels((prev) => ({ ...prev, ...updates }));
      }
    };

    run();
  }, [_memories, labels]);

  useEffect(() => {
    const fetchDefaultLocationName = async () => {
      const label = await getCityFromCoords(location.lat, location.lng).catch(() => null);
      setLocationName(label);
    };

    fetchDefaultLocationName();
  }, [location.lat, location.lng]);

  // Fetch memories from backend
  useEffect(() => {
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

      // Guest flow
      if (isGuest) {
        let photoURL = '';

        if (imageFile) {
          photoURL = URL.createObjectURL(imageFile);
        }

        const newMemory = {
          id: Date.now(),
          title,
          description,
          location,
          photoURL,
        };

        const updatedMemories = [newMemory, ..._memories];
        setMemories(updatedMemories);
        sessionStorage.setItem('guestMemories', JSON.stringify(updatedMemories));

        setTitle('');
        setDescription('');
        setImageFile(null);

        toast.success('Memory added temporarily in Guest Mode', { id: toastId });
        return;
      }

      // Normal Logged-In User
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
      if (!photoURL && imageFile) {
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

      // small delay before refetching from backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      await fetchMemories();

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
    <div className="min-h-screen bg-[url(@/assets/geo-memory-map-bg.png)] bg-cover bg-center bg-no-repeat">
      <section className="min-h-screen bg-[#526b5c]/90">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch'>
            <div className="rounded-2xl bg-white/50 p-4 shadow-lg backdrop-blur-sm sm:p-6">
              <div className="mb-6">
                <h1 className="font-display text-2xl sm:text-3xl">Add New Memory</h1>
                <p className="mt-2 text-sm text-gray-700 sm:text-base">
                  Fill out the form and choose your location on the map.
                </p>
              </div>
              {/* FORM STARTS HERE */}
              <form action="" method="post" className="space-y-4" onSubmit={handleSubmit}>
                <label className="mb-2 block font-display text-xl sm:text-2xl">Title</label>

                <input
                  type="text"
                  placeholder="Title of your memory..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-white/30 bg-white/70 px-4 py-3 text-sm outline-none ring-0 placeholder:text-gray-500 focus:border-green-700 sm:text-base"
                  required
                />

                <label className="mb-2 block font-display text-xl sm:text-2xl">Description</label>

                <textarea
                  className="min-h-[120px] w-full rounded-lg border border-white/30 bg-white/70 px-4 py-3 text-sm outline-none placeholder:text-gray-500 focus:border-green-700 sm:min-h-[140px] sm:text-base"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>

                <label className="mb-2 block font-display text-xl sm:text-2xl">Location</label>
                <p className="rounded-lg bg-white/50 px-4 py-3 text-sm text-gray-800 break-words sm:text-base">
                  {locationName
                    ? `${locationName} (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})` // place name with coordinates
                    : `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`}
                </p>

                <label className="mb-2 block font-display text-xl sm:text-2xl">Upload Photo</label>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) {
                        return;
                      }

                      if (file.size > 5 * 1024 * 1024) {
                        setFileTooBig(true);
                        setImageFile(null);
                      } else {
                        setFileTooBig(false);
                        setImageFile(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center justify-center rounded-lg bg-green-700 px-4 py-3 text-sm font-medium text-white shadow transition hover:bg-green-800 sm:text-base"
                  >
                    Upload File
                  </label>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-green-700 rounded-lg shadow hover:bg-green-800 transition"
                  >
                    Submit
                  </button>
                </div>

                {imageFile && (
                  <p className="mt-3 text-sm text-gray-700 break-all">Selected file: {imageFile.name}</p>
                )}

                {/* Warning message */}
                {isFileTooBig && <p className="text-red-500 mt-1 text-sm">File’s too chunky! &lt; 5MB please</p>}

                <p className="text-sm text-gray-500 mt-1">Maximum file size: 5MB</p>
              </form>
            </div>

            <div className="w-full">
              <MapView
                _memories={_memories}
                onLocationSelect={async (coords) => {
                  setLocation(coords); // keep coordinates
                  const label = await getCityFromCoords(coords.lat, coords.lng);
                  setLocationName(label); // store barangay, city for UI
                }}
              />
            </div>
          </div>

          {/* CARD GENERATEED FROM API BELOW */}
            <div className="mt-8 pb-10 sm:mt-10">
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Your Memories</h1>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {_memories
                  .slice()
                  .reverse()
                  .slice(0, 6)
                  .map((memory) => (
                    <MemCards
                      key={memory._id ?? memory.id}
                      img={memory.photoURL}
                      title={memory.title}
                      locationName={labels[memory._id ?? memory.id] ?? null}
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
