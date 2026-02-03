import { useEffect, useState } from "react";

type News = {
  id: number;
  title: string;
  url: string;
};

type Props = {
  children: (data: News[], loading: boolean) => React.ReactNode;
};

function NewsLoader({ children }: Props) {
  const [data, setData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: 1, title: "React 19 Released", url: "https://react.dev" },
        { id: 2, title: "TypeScript New Features", url: "https://www.typescriptlang.org" },
        { id: 3, title: "Rspack Performance Boost", url: "https://www.rspack.dev" },
        { id: 4, title: "Redux Toolkit Guide", url: "https://redux-toolkit.js.org" },
        { id: 5, title: "Next.js App Router", url: "https://nextjs.org" },
        { id: 6, title: "Vite vs Webpack", url: "https://vitejs.dev" },
        { id: 7, title: "JavaScript ES2026 Preview", url: "https://tc39.es" },
        { id: 8, title: "Node.js Latest Release", url: "https://nodejs.org" },
        { id: 9, title: "CSS Container Queries", url: "https://developer.mozilla.org" },
        { id: 10, title: "Web Performance Tips", url: "https://web.dev" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return <>{children(data, loading)}</>;
}

export default NewsLoader;
