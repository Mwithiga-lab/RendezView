# 📅 RendezView — AI-Powered Event Management

RendezView is a modern, intuitive web application designed to streamline event creation and management. It empowers users to effortlessly craft, display, and discover events, leveraging AI to generate compelling descriptions and unique promotional images. Whether you're organizing a tech conference or a community gathering, RendezView provides the tools to make your event a success.

---

### 🛠️ Features

-   **🗓️ Event Creation & Display:** Easily create events with a clean form and see them displayed in a beautiful, organized list.
-   **📄 Event Detail View:** A dedicated page for each event, showing all relevant details like date, time, location, and a full description.
-   **✨ AI-Assisted Content:** Generate engaging event descriptions and promotional text instantly using the power of AI.
-   **🖼️ AI Image Generation:** Create unique, eye-catching event images with a single click, based on the event's name and category.
-   **📤 Image Upload:** Flexibility to upload your own custom images for a personal touch.
-   **🔍 Event Search & Sort:** Quickly find events using a keyword search or sort them by date or name.

### 🚀 How to Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rendezview.git
    cd rendezview
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Add your API key:** Create a `.env` file in the root of your project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/).
    ```
    GEMINI_API_KEY="your_google_ai_api_key"
    ```

4.  **Run the app locally:**
    ```bash
    npm run dev
    ```

5.  **View in browser:** Open [http://localhost:9002](http://localhost:9002) to see the app in action.

### 💡 UI & Design Details

| Element         | Description                                                                                                                                                             |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎨 Color Scheme | **Primary:** Deep purple (`#673AB7`) for a modern feel. <br> **Accent:** Vibrant orange (`#FF9800`) for energy. <br> **Background:** Clean, light gray (`#F5F5F5`).         |
| 🔠 Typography  | Uses **'Inter'** for both body and headlines — a clean, modern, and highly readable sans-serif font.                                                                        |
| 🌦️ Icons        | Minimalist and consistent icons from **Lucide React** are used for actions and categories, enhancing usability.                                                           |
| 🎬 Animation    | Subtle, standard-duration animations for page transitions and interactions provide a smooth and polished user experience.                                                 |
| 🏗️ Layout       | A clean, structured layout with ample whitespace and a consistent grid system prevents the interface from feeling cluttered.                                              |

### 🏗️ Built With

| Tool/Library          | Purpose                                        |
| :-------------------- | :--------------------------------------------- |
| **Next.js**           | React framework for building the web UI        |
| **TypeScript**        | Ensures type-safe and robust code              |
| **Tailwind CSS**      | For rapid and utility-first UI design          |
| **ShadCN UI**         | A set of reusable and accessible UI components |
| **Genkit (Google AI)**| Powers AI content and image generation         |
| **React Hook Form**   | Manages complex form state and validation      |

### 👤 Author

**Kevin Mwithiga** (This project was created with the assistance of an AI coding partner, Youtube and Google Search).

### 📄 License

This project is open source and available for learning, modification, or personal use.
