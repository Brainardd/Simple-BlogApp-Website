# 📝 Minimalist Blog App
https://dcwithincenter.vercel.app/

A simple **React + TypeScript blog application** with authentication, CRUD operations, and Supabase backend. The app features a clean and minimalist UI built with **Tailwind CSS**.

---

## 🚀 Features

- User registration, login, and logout
- Protected routes for creating and editing blogs
- Create, read, update, delete (CRUD) blogs
- Pagination for blog listings
- Minimalist responsive UI
- Prefilled forms for updating blogs
- Works seamlessly with Supabase backend

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=react-router&logoColor=white)

---

## 📂 Project Structure

```
blog-app/
├─ src/
│  ├─ api/                # Supabase client
│  ├─ components/         # Navbar, PrivateRoute
│  ├─ features/           # Redux slices (auth, blog)
│  ├─ hooks/              # Typed hooks for Redux
│  ├─ pages/
│  │  ├─ Auth/            # Register, Login, Logout
│  │  ├─ Blog/            # BlogList, CreateBlog, UpdateBlog
│  ├─ App.tsx             # Main routes
│  └─ index.tsx           # App entry
├─ package.json
└─ tailwind.config.js
```

---

## ⚡ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure Supabase:

* Create a Supabase project
* Copy your **Supabase URL** and **Anon Key** into `src/api/supabaseClient.ts`:

```ts
export const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

---

## 🖥️ How it works

1. **Authentication**: Users can register, login, and logout. Only logged-in users can create, update, or delete blogs.
2. **Blog CRUD**:

   * **Create**: Fill the form on `/create` to add a new blog.
   * **Read**: All blogs are listed on the homepage with pagination.
   * **Update**: Click “Edit” on a blog to prefill the update form and edit content.
   * **Delete**: Click “Delete” to remove a blog.
3. **State Management**: Redux Toolkit manages blog and auth state.
4. **Backend**: Supabase handles database storage and authentication.
5. **UI**: Tailwind CSS provides a minimal, responsive design.

---

## 📝 Notes

* This project is **fully TypeScript typed**.
* Email confirmation is **disabled** for quick testing.
* Supports responsive design and minimalist UX.

---


