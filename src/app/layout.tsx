import { EmotionRegistry } from "../components/emotion-registry";
import { Provider } from "../components/ui/provider";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning lang="en" className={figtree.variable}>
      <body>
        <EmotionRegistry>
          <Provider>{props.children}</Provider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
