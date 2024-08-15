AI Travel Planner
AI Travel Planner is a cutting-edge mobile application designed to simplify the process of planning trips and exploring new destinations. The app leverages AI-driven recommendations to provide users with personalized travel suggestions based on their preferences, making it easier to discover, organize, and enjoy trips around the world.

Features
Trip Planning: Users can create and manage their trips, including adding destinations, dates, and itineraries.
Discover Page: Explore new destinations using an interactive map integrated with Google Maps and AI recommendations.
Location Search: Find and add locations using Google Places Autocomplete.
User Profile: Manage user preferences and trip history with a clean and simple profile interface.
AI Recommendations: The app utilizes Gemini AI to suggest destinations, activities, and points of interest based on user preferences.
Tech Stack
Frontend
React Native: The app is built using React Native, enabling cross-platform mobile development for both iOS and Android.
Expo: Expo is used to streamline the development process, providing a robust environment for building and deploying the application.
react-native-maps: Integrated Google Maps with React Native for displaying maps and markers.
react-native-google-places-autocomplete: For location search and autocomplete functionality within the app.
Backend & AI
Firebase: Firebase is used for authentication, real-time database, and cloud storage, ensuring secure and efficient management of user data.
Gemini AI: The app uses Gemini AI for generating travel recommendations based on user preferences.
CreateTripContext: Context API is utilized for managing global state, particularly for handling trip-related data across the app.
Navigation
React Navigation: The app uses React Navigation for handling navigation between different pages, including the top tab navigator for swipeable navigation.
Other Tools & Libraries
react-native-gesture-handler: For smooth gesture-based interactions in the app.
react-native-screens: Optimizes performance by using native views in navigation.

Installation & Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/ai-travel-planner.git
cd ai-travel-planner
Install dependencies:

bash
Copy code
npm install
Firebase Configuration:

Set up Firebase for your project, and include the configuration in your app.
Add your Firebase API keys and other configuration details in your project.
Start the development server:

bash
Copy code
expo start
Generate APK (if needed):

bash
Copy code
expo build:android
API Key Configuration
Make sure to set up your Google API key in your environment variables for the app to access Google Maps and Places services.

Example:

bash
Copy code
EXPO_PUBLIC_GOOGLE_MAP_KEY=your_google_maps_api_key_here
Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss potential changes.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

This version of the README includes Firebase, highlighting its role in authentication, real-time database, and cloud storage for your application.
