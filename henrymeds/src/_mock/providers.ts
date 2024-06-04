// these files would ideally be .JSON but it wouldnt let me leave comments :p
import juneData from "../_mock/filtered_june_2024_datetime_strings.json";

// basing this demo off one singular provider for simplicity
const providersMockData = {
  id: 1234,
  name: "Mock Provider",
  // For the sake of this being a 3 hr assesment, I am going to limit the mock data/schedule to 1 month of availability.
  schedule: juneData,
};

export default providersMockData;
