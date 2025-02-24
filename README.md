# Blog Project

A blog platform where users can register, create, and manage content. The project features user registration, authentication, content creation, and management, along with admin functionalities to manage users and posts.

## Screenshots

---

![Alt Text](./screenshot/blog-screenshot.png)

## Features

### User Features:

- **Register**: Users can create an account on the platform.
- **Email Verification**: After registration, users will receive a verification email.
- **Forgot Password**: Users can reset their password if they forget it.
- **Create Content**: Users can create and publish blog posts.
- **Save Content**: Users can save drafts of their content for later editing.
- **Delete Own Content**: Users can delete their own blog posts.
- **Comment on Content**: Users can comment on blog posts.
- **Filter Content**: Users can filter posts by category.
- **Sort Content**: Users can sort posts by latest, newest, trending, or popular.

### Admin Features:

- **Delete All Posts**: Admin can delete all blog posts.
- **Feature Posts**: Admin can feature posts to make them stand out.
- **Manage Users**: Admin can manage user accounts.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/haileyesuschekol/Blog.git
   cd blog-app
   ```

2. Install dependencies:

   client Install dependencies

   ```bash
   cd client
   npm install
   ```

   backend Install dependencies

   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add your configuration (e.g., database URL, JWT secret, etc.)

```bash
backend .env instance
PORT=3000
MONGO=Db-url
CLIENT_URL=
JWT_SECRET=secret-key
MAILTRAP_TOKEN=mailtrap-token
MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
IMAGEKIT_PUBLIC_KEY = image-key-public-key
IMAGEKIT_URL_ENDPOINT = image-kit-endpoitn
IMAGE_KIT_PRIVATE_KEY=image-kit-private-key
SERVER_URL=
```

```bash
client .env instance
VITE_IMAGEKIT_PUBLIC_KIT = image-kit-public-kit
VITE_IMAGEKIT_URL_ENDPOINT = image-kit-endpoint
VITE_API_URL=backend-url

```

4. Run the project:
   ```bash
   cd client npm run dev
   cd backend npm start
   ```

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Libraries**:
  - React Query
  - Multer (for image uploads)

## Contributing

Feel free to fork the repository and submit pull requests. Please ensure your code follows the existing style and includes tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
