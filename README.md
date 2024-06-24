<div align="center">
  <h1 align="center">
    <br> 
    Entertainment App
  </h1>
  <h3>Alma Better Capstone Project</h3>
  <h3>Developed with</h3>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js" alt="NextJS" />
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React" />
    <img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" alt="TypeScript" />
    <img src="https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5" />
  </p>
</div>

---

## 📖 Table of Contents

- [📍 Overview](#📍-overview)
- [📦 Features](#📦-features)
- [📂 Repository Structure](#📂-repository-structure)
- [🚀 Getting Started](#🚀-getting-started)
  - [🔧 Installation](#🔧-installation)
  - [🤖 Running Flashcard](#🤖-running-flashcard-generator)
  - [🌐 Deployment Link](#🌐-deployment-link)
- [🤝 Contributing](#🤝-contributing)

---

## 📍 Overview

- The Entertainment App allows users to search for their preferred movies or TV series and has the added functionality of bookmarking their favorites.

- TMDB API is used to fetch the movies and tvs data.

- User can bookmark TV Shows and movies making the experience personalize.

---

## 📦 Features

1. **Trending:**

   - The Trending page is the app's central hub, showcasing the most recent and trending movies and TV series in an organized grid system. Users are greeted with an enticing display of captivating content.

2. **Movies:**

   - The Movies Page is dedicated to a diverse collection of movies, offering users a wide array of cinematic choices. Whether users are seeking action-packed adventures, heartfelt dramas, or thrilling mysteries, this page provides a comprehensive catalog of films to cater to varied tastes.

3. **TV Series:**

   - The TV Series Page is designed to cater to television enthusiasts, presenting an extensive selection of TV series spanning across different genres. From riveting dramas to side-splitting comedies, users can explore and binge-watch their favorite shows through this dedicated section.

4. **Bookmarks:**

   - The Bookmark page serves as a personalized space where users can curate their own entertainment library. Here, users can effortlessly add or remove bookmarked movies and TV series, tailoring their viewing experience to align with their preferences. This feature ensures that users have easy access to their favorite content at anytime.

5. **Sign Up:**

   - Aspiring users are granted access to a registration form to initiate their onboarding process

6. **Login:**
   - Returning users, who have already completed the sign-up process, are provided a platform to access the application securely. This enables them to explore the app while retaining access to their meticulously curated bookmarked items.

---

## 📂 Repository Structure

```sh
└── entertainment-app/
    ├── pnpm-lock.yaml
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/auth/
    │   │   │   ├── layout.tsx
    │   │   │   ├── login/
    │   │   │   │   ├── page.tsx
    │   │   │   ├── signup/
    │   │   │   │   ├── page.tsx
    │   │   ├── (main)/auth/
    │   │   │   ├── layout.tsx
    │   │   │   ├── page.tsx
    │   │   │   ├── query.ts
    │   │   │   ├── bookmarks/
    │   │   │   │   ├── page.tsx
    │   │   │   ├── movies/
    │   │   │   │   ├── page.tsx
    │   │   │   ├── tv/
    │   │   │   │   ├── page.tsx
    │   │   ├── api/
    │   │   │   ├── login/
    │   │   │   │   ├── route.tsx
    │   │   │   ├── signup/
    │   │   │   │   ├── route.tsx
    │   │   │   ├── bookmark/
    │   │   │   │   ├── route.tsx
    │   │   └── favicon.ico
    │   │   └── layout.tsx
    │   │   └── globals.css
    │   ├── components/
    │   │   ├── header.tsx
    │   ├── context/
    │   │   ├── auth.tsx
    │   ├── helpers/
    │   │   ├── general.ts
    │   │   ├── notification.tsx
    │   ├── lib/
    │   │   ├── mongodb.ts
    │   │   └── utils.js
    │   ├── types/
    │   │   ├── globals.d.ts
    │   │   ├── tmdb.ts
    │   │   └── users.js
    │   ├── axios.tsx
    └── components.json
    └── next.config.mjs
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.js
    └── tsconfig.json
```

---

## 🚀 Getting Started

- ### 🌐 Deployment Link

  You can visit the app live from [click here](https://entertainment-app-flame.vercel.app/)

---

- ### 🔧 Installation

1. Clone the entertainment-app repository:

```sh
git clone https://github.com/shareef99/entertainment-app.git
```

2. Change to the project directory:

```sh
cd entertainment-app
```

3. Install the dependencies:

```sh
pnpm install
```

### 🤖 Running entertainment-app

```sh
pnpm run dev
```

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/shareef99/entertainment-app/pulls)**: Review open PRs, and submit your own PRs.
- **[Report Issues](https://github.com/shareef99/entertainment-app/issues)**: Submit bugs found or log feature requests.

#### _Contributing Guidelines_

<details closed>
  <summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.

   ```sh
   git clone <your-forked-repo-url>
   ```

3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.

   ```sh
   git checkout -b new-feature-x
   ```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.

   ```sh
   git commit -m 'Implemented new feature x.'
   ```

6. **Push to GitHub**: Push the changes to your forked repository.

   ```sh
   git push origin new-feature-x
   ```

7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---
