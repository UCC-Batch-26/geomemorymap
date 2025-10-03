export async function getCityFromCoords(lat, lng) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const data = await res.json();

    const { suburb, village, neighbourhood, town, city, county, city_district, state } = data.address;

    // Barangay detection
    let barangay = '';
    if (suburb && !suburb.toLowerCase().includes('subdivision')) {
      barangay = suburb;
    } else if (village) {
      barangay = village;
    } else if (neighbourhood) {
      barangay = neighbourhood; // fallback
    }

    // Municipality/city detection
    let municipality = town || city || county || city_district || '';

    if (barangay === municipality) {
      municipality = '';
    }

    // Province
    let province = state || '';

    // Build final result
    const parts = [barangay, municipality, province].filter(Boolean); // remove empty strings
    return parts.length > 0 ? parts.join(', ') : 'Unknown location';
  } catch (error) {
    console.error('Error fetching city:', error);
    return 'Unknown location';
  }
}
