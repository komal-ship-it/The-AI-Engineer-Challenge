# Mental Coach Chat Application - Frontend

A React-based chat interface for the Mental Coach AI chatbot. This frontend connects to the FastAPI backend to provide a supportive mental coaching experience.

## Features

- 💬 Clean, modern chat interface
- 🎨 Message bubbles (user on right, AI on left)
- ⏳ Loading indicators while AI responds
- ⚠️ Error handling with user-friendly messages
- 📱 Responsive design
- ⌨️ Enter key to send messages

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Backend server running on port 8000 (see [`/api/README.md`](../api/README.md))

## Setup

### 1. Install Dependencies

From the project root, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 2. Environment Configuration

The frontend is pre-configured to connect to the backend at `http://localhost:8000`. This is set in the [`.env.development`](.env.development) file:

```
REACT_APP_API_URL=http://localhost:8000
```

For production deployment, create a `.env.production` file with your production backend URL.

## Running the Application

### Start the Backend First

Before starting the frontend, make sure the backend server is running. From the project root:

```bash
# Set your OpenAI API key
export OPENAI_API_KEY=sk-your-key-here

# Start the backend
uv run uvicorn api.index:app --reload
```

The backend should be running at `http://localhost:8000`.

### Start the Frontend

In a new terminal, from the frontend directory:

```bash
npm start
```

This will:
- Start the development server
- Open your browser to `http://localhost:3000`
- Enable hot-reload for development

## Using the Chat Interface

1. The chat opens with a welcome message from the AI mental coach
2. Type your message in the input field at the bottom
3. Press Enter or click the "Send" button
4. Wait for the AI response (you'll see a typing indicator)
5. Continue the conversation!

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/
│   │   ├── Chat.js      # Main chat component
│   │   └── Chat.css     # Chat styling
│   ├── services/
│   │   └── api.js       # API communication layer
│   ├── App.js           # Main app component
│   ├── App.css          # App styling
│   └── index.js         # Entry point
├── .env.development     # Development environment config
└── package.json         # Dependencies and scripts
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Troubleshooting

### "Unable to connect to the server" Error

This error appears when the frontend can't reach the backend. Check:

1. **Is the backend running?**
   ```bash
   curl http://localhost:8000/
   ```
   Should return: `{"status":"ok"}`

2. **Is it on the correct port?**
   The backend should be on port 8000, frontend on port 3000.

3. **Check the API URL**
   Verify [`.env.development`](.env.development) has:
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Restart the frontend**
   After changing `.env` files, restart the development server:
   ```bash
   # Stop with Ctrl+C, then:
   npm start
   ```

### Port 3000 Already in Use

If you see "Port 3000 is already in use", either:
- Kill the existing process: `lsof -ti:3000 | xargs kill -9`
- Or let React use a different port (it will prompt you)

### CORS Errors

The backend is configured to allow all origins. If you see CORS errors:
1. Verify the backend is running
2. Check the backend console for errors
3. Ensure [`api/index.py`](../api/index.py) has CORS middleware enabled

### OpenAI API Errors

If you see errors about the OpenAI API:
1. Check that `OPENAI_API_KEY` is set in the backend environment
2. Verify your API key is valid and has credits
3. Check the backend console for detailed error messages

## API Integration

The frontend communicates with the backend through the [`services/api.js`](src/services/api.js) module:

### Send Message
```javascript
import { sendMessage } from './services/api';

const reply = await sendMessage("Hello!");
// Returns: "Hi! It's good to hear from you..."
```

### API Endpoint
- **URL**: `POST /api/chat`
- **Request**: `{ "message": "string" }`
- **Response**: `{ "reply": "string" }`

## Customization

### Change Colors

Edit [`src/components/Chat.css`](src/components/Chat.css):

```css
/* User message color */
.user-message .message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* AI message color */
.ai-message .message-bubble {
  background-color: white;
}

/* Header gradient */
.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Welcome Message

Edit [`src/components/Chat.js`](src/components/Chat.js):

```javascript
const [messages, setMessages] = useState([
  {
    text: "Your custom welcome message here!",
    sender: 'ai',
    timestamp: new Date(),
  },
]);
```

### Change AI Model or Prompt

The AI model and system prompt are configured in the backend. See [`api/index.py`](../api/index.py) to modify:
- Model: Change `model="gpt-5"` to another model
- Personality: Change the system message content

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variable: `REACT_APP_API_URL=<your-backend-url>`

### Deploy to Netlify

1. Build the app: `npm run build`
2. Drag the `build/` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Set environment variable: `REACT_APP_API_URL=<your-backend-url>`

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://create-react-app.dev/)
- [FastAPI Backend Documentation](../api/README.md)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the backend logs for API errors
3. Check browser console for frontend errors
