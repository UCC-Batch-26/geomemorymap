export async function getCityFromCoords(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    
    const { suburb, city, town, village, county, state } = data.address;
    let locationString = "";
    if (suburb) {
      locationString += suburb;
    }

    const mainPlace = city || town || village || county || state;
    if (mainPlace) {
      if (locationString) {
        locationString += ", ";
      }
      locationString += mainPlace;
    }
    
    return locationString || "Unknown location"
  } catch (error) {
    console.error("Error fetching city:", error);
    return "Unknown location";
  }
}