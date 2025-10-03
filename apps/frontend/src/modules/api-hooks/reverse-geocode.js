export async function getCityFromCoords(lat, lng) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const data = await res.json();

    const { suburb, city, town, village, county, state } = data.address;
    
    let barangay = '';
    if (suburb && !suburb.toLowerCase().includes('subdivision')) {
      barangay += suburb;
    }
    else if (village) {
      barangay = village; // fallback to village if suburb is missing
    }

    const municipality = city || town || county || state || '';

    if (barangay && municipality) {
     return `${barangay}, ${municipality}`;
    } else if (municipality) {
      return municipality;
    } else if (barangay) {
      return barangay;
    } else {
      return 'Unknown location'
    }
  } catch (error) {
    console.error('Error fetching city:', error);
    return 'Unknown location';
  }
}
