# TicTacJoy

A visually stunning and playful Tic-Tac-Toe game with delightful animations and a kid-friendly design.

[cloudflarebutton]

## About The Project

TicTacJoy is a visually delightful and modern take on the classic Tic-Tac-Toe game, designed with a 'Kid Playful' aesthetic. The application features a clean, single-page interface with bright, contrasting colors, stylized 2D illustrations for game pieces, and smooth, rounded shapes. The core of the application is a 3x3 game grid where two players take turns placing their marks ('X' and 'O').

The game state, including the board, current player, and winner status, is managed efficiently using a Zustand store. The UI provides clear feedback on the current player's turn, win/draw conditions, and features delightful micro-interactions powered by Framer Motion, such as popping animations for marks and a celebratory confetti effect for the winner. The entire experience is designed to be intuitive, engaging, and visually stunning for users of all ages.

### Key Features

*   **Classic 3x3 Gameplay**: Enjoy the timeless game of Tic-Tac-Toe.
*   **Playful & Modern UI**: A vibrant, kid-friendly design with rounded corners and a bright color palette.
*   **Delightful Animations**: Smooth, engaging animations for placing marks and highlighting wins, powered by Framer Motion.
*   **Confetti on Win**: A celebratory confetti burst makes winning even more fun.
*   **Responsive Design**: Flawless gameplay experience across desktops, tablets, and mobile devices.
*   **Efficient State Management**: Built with Zustand for a predictable and performant state management solution.
*   **Single Page Application**: Fast, clean, and focused user experience on a single page.

## Technology Stack

This project is built with a modern, high-performance tech stack:

*   **Framework**: [React](https://reactjs.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/tictacjoy_game.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd tictacjoy_game
    ```
3.  Install dependencies:
    ```sh
    bun install
    ```

## Development

To run the application in development mode with hot-reloading:

```sh
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

To create a production-ready build of the application:

```sh
bun run build
```

This command bundles the application into the `dist` directory, optimized for performance.

## Deployment

This project is configured for easy deployment to Cloudflare Pages.

1.  **Login to Cloudflare**: Make sure you are logged into your Cloudflare account via the command line:
    ```sh
    npx wrangler login
    ```
2.  **Deploy**: Run the deployment script:
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[cloudflarebutton]

## Available Scripts

In the project directory, you can run:

*   `bun run dev`: Runs the app in development mode.
*   `bun run build`: Builds the app for production.
*   `bun run deploy`: Deploys the app to Cloudflare.
*   `bun run lint`: Lints the codebase using ESLint.

## License

Distributed under the MIT License. See `LICENSE` for more information.