import { useEffect, useState } from "react";

type News = {
  id: number;
  title: string;
};

type Props = {
  children: (data: News[], loading: boolean) => React.ReactNode;
};

function NewsLoader({ children }: Props) {
  const [data, setData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake data — no API needed
    setTimeout(() => {
      setData([
        { id: 1, title: "React 19 Released" },
        { id: 2, title: "TypeScript New Features" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return <>{children(data, loading)}</>;
}

export default NewsLoader;
